<template>
    <div>
        <div class="personal">
            <div class="header" @click="state.isImage = true">
                <image class="avatar" :src="getImageUrl(userInfo.photo)" v-if="userInfo.photo"></image>
                <!--<image class="avatar" src="bmlocal://assets/images/liming.jpg" v-else></image>-->
                <text class="change-avatar">点击修改头像</text>
            </div>
            <div class="main">
                <wxc-cell title="账户">
                    <text class="text">{{userInfo.username}}</text>
                </wxc-cell>
                <wxc-cell title="注册时间">
                    <text class="text">{{$dayjs(userInfo.createTime).format('YYYY-MM-DD')}}</text>
                </wxc-cell>
                <wxc-cell title="用户昵称" @wxcCellClicked="state.isShow = true">
                    <div class="vlue-wrapper">
                        <text class="text">{{userInfo.nickname}}</text>
                        <text class="icon">&#xe60a;</text>
                    </div>
                </wxc-cell>
                <wxc-cell title="性别" @wxcCellClicked="state.showBar = true">
                    <div class="vlue-wrapper">
                        <text class="text">{{sexItems[userInfo.gender]}}</text>
                        <text class="icon">&#xe60a;</text>
                    </div>
                </wxc-cell>
                <am-list>
                    <am-date-picker title="日期" v-model="birth" format="YYYY-MM-DD" @ok="changeBirth" @hide="onHide" minDate="1900-01-01">
                        <am-list-item slot-scope="{ extra, show }" title="生日" brief="" :extra="extra" @click="show"></am-list-item>
                    </am-date-picker>
                </am-list>
                <wxc-cell title="我的邮箱" @wxcCellClicked="state.isEmailShow = true" v-model="email">
                    <div class="vlue-wrapper">
                        <text class="text">{{userInfo.email}}</text>
                        <text class="icon">&#xe60a;</text>
                    </div>
                </wxc-cell>
                <wxc-cell title="我的签名" @wxcCellClicked="state.isSingatureShow = true">
                    <div class="vlue-wrapper">
                        <text class="text">{{userInfo.sign}}</text>
                        <text class="icon">&#xe60a;</text>
                    </div>
                </wxc-cell>
            </div>
        </div>
        <wxc-dialog title="请输入新的昵称" :show="state.isShow" main-btn-color="#e60012" @wxcDialogCancelBtnClicked="state.isShow = false" @wxcDialogConfirmBtnClicked="changeName">
            <input type="text" :autofocus="true" class="input" slot="content" v-model="name" />
        </wxc-dialog>
        <wxc-dialog title="请输入您的邮箱" :show="state.isEmailShow" main-btn-color="#e60012" @wxcDialogCancelBtnClicked="state.isEmailShow = false" @wxcDialogConfirmBtnClicked="changeEmail">
            <input type="text" :autofocus="true" class="input" slot="content" v-model="email" />
        </wxc-dialog>
        <wxc-dialog title="请输入您的签名" :show="state.isSingatureShow" main-btn-color="#e60012" @wxcDialogCancelBtnClicked="state.isSingatureShow = false" @wxcDialogConfirmBtnClicked="changeSingature">
            <input type="text" :autofocus="true" class="input" slot="content" v-model="singature" />
        </wxc-dialog>
        <wxc-overlay :show="state.showBar || state.isImage" opacity="0.6" @wxcOverlayBodyClicked="state.showBar = state.isImage = false"></wxc-overlay>
        <bui-actionsheet title="" :items="sexItems" v-model="state.showBar" @itemClick="changeSex"></bui-actionsheet>
        <bui-actionsheet title="" :items="photosItems" v-model="state.isImage" @itemClick="chooseImg"></bui-actionsheet>
    </div>
</template>

<script>
    import { WxcCell, WxcDialog, WxcOverlay } from 'weex-ui'
    import { buiActionsheet } from 'bui-weex'
    import { saveUserInfo, getUserInfoById } from '../../service/userApi'
    import mixins from '../../common/mixins'
    import { AmDatePicker, AmList, AmListItem } from 'weex-amui'

    export default {
        name: 'personal',
        components: { WxcCell, WxcDialog, WxcOverlay, buiActionsheet, AmDatePicker, AmList, AmListItem },
        mixins: [mixins],
        data: () => ({
            uuid: '',
            imgSrc: [],
            state: {
                isShow: false,
                isEmailShow: false,
                isSingatureShow: false,
                showBar: false,
                isImage: false
            },
            userInfo: {
                photo: ''
            },
            index: 0,
            sexItems: ['男', '女', '保密'],
            photosItems: ['相册', '相机'],
            name: '',
            email: '',
            sex: '保密',
            birth: '',
            singature: ''
        }),
        methods: {
            async getUserInfo () {
                if (this.userId) {
                    this.userInfo = await getUserInfoById(this.userId)
                    this.birth = this.$dayjs(this.userInfo.birthday).format('YYYY-MM-DD')
                } else {
                    setTimeout(() => {
                        this.getUserInfo()
                    }, 500)
                }
            },
            async chooseImg (item) {
                if (item === '相册') {
                    const result = await this.$image.pick({ maxCount: 1, imageWidth: '800', allowCrop: true })
                    this.imgSrc = result[0]
                    if (this.imgSrc.length) {
                        await this.$image.upload({
                            url: `${this.baseImageUrl}${this.uploadUrl}${this.imgParams}&busiType=USER&businessId=${this.uuid}`,
                            header: {
                                token: this.token
                            },
                            source: [this.imgSrc]
                        })
                        const mData = { photo: this.uuid }
                        await this.subData(mData)
                        this.toast('上传成功')
                    }
                } else {
                    const result = await this.$image.camera({ imageWidth: '800', allowCrop: false })
                    this.imgSrc = result[0]
                    if (this.imgSrc.length) {
                        await this.$image.upload({
                            url: `${this.baseImageUrl}${this.uploadUrl}${this.imgParams}&busiType=USER&businessId=${this.uuid}`,
                            header: {
                                token: this.token
                            },
                            source: [this.imgSrc]
                        })
                        const mData = { photo: this.uuid }
                        await this.subData(mData)
                        this.toast('上传成功')
                    }
                }
            },
            changeName () {
                const mData = { nickname: this.name }
                this.subData(mData)
                this.state.isShow = false
                this.name = ''
            },
            changeSex (item, index) {
                const mData = { gender: index }
                this.subData(mData)
                this.state.showBar = false
            },
            changeEmail () {
                if (this.isEmail(this.email)) {
                    const mData = { email: this.email }
                    this.subData(mData)
                } else {
                    this.toast('请输入正确的邮箱地址')
                }
                this.state.isEmailShow = false
                this.email = ''
            },
            changeSingature () {
                const mData = { sign: this.singature }
                this.subData(mData)
                this.state.isSingatureShow = false
            },
            changeBirth (birth) {
                const mData = { birthday: birth + ' 00:00:00' }
                this.subData(mData)
            },
            async subData (data) {
                let type = ''
                for (const key in data) {
                    if (key === 'nickname') {
                        type = '1'
                    }
                    if (key === 'gender') {
                        type = '2'
                    }
                    if (key === 'email') {
                        type = '3'
                    }
                    if (key === 'birthday') {
                        type = '4'
                    }
                    if (key === 'photo') {
                        type = '5'
                    }
                    if (key === 'sign') {
                        type = '6'
                    }
                }
                const result = await saveUserInfo(this.userInfo.id, type, data)
                if (result.type === 'success') {
                    this.toast('保存成功')
                    this.getUserInfo()
                }
            }
        },
        beforeCreate () {
            this.$navigator.setLeftItem({}, () => {
                // 点击回调
                this.goBack()
            })
        },
        async created () {
            this.$router.setBackParams({ todo: 'refresh' })
            await this.getUserInfo()
            this.uuid = this.getUUID()
        }
    }
</script>

<style lang="scss" scoped>
    .personal {
        width: 750;
        height: 2000;
        background-color: #fff;
    }

    .header {
        width: 750;
        height: 300;
        justify-content: center;
        align-items: center;
    }

    .avatar {
        width: 172;
        height: 172;
        border-radius: 86;
    }

    .change-avatar {
        margin-top: 20;
        font-size: 28;
        color: #999;
    }

    .vlue-wrapper {
        flex-direction: row;
        align-items: center;
    }

    .text {
        color: #999;
        font-size: 28;
    }

    .icon {
        font-family: iconfont;
        font-size: 42;
        color: #999;
        font-weight: 600;
    }

    .input {
        padding: 10;
        border-bottom-color: #dedede;
        border-bottom-style: solid;
        border-bottom-width: 2;
        tint-color: #e60012;
    }

    .list-mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 750px;
        z-index: 10;
        background-color: black;
        opacity: 0.65;
    }
</style>
