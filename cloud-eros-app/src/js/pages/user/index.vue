<template>
    <div>
        <div class="user">
            <div class="user-header">
                <image class="bg-image" resize="cover" src="bmlocal://assets/images/building.jpeg"></image>
                <text class="user-name">{{userInfo.nickname}}</text>
                <text class="user-setting" @click="goTo('user.setting',{},'needLogin')"> &#xe60b;</text>
                <div class="user-avatar" @click="goTo('user.personal',{info:userInfo},'needLogin')">
                    <div class="avatar-wrapper">
                        <image class="avatar-image" resize="cover" :src="userPic"></image>
                    </div>
                    <text class="user-edit">&#xe683;</text>
                </div>
            </div>
            <div class="user-content">
                <wxc-cell @wxcCellClicked="goTo('user.inspiration',{info:userInfo},'needLogin')" title="我的灵感" :has-bottom-border="true">
                    <text class="label" slot="label">&#xe612;</text>
                    <text class="arrow" slot="value">&#xe60a;</text>
                </wxc-cell>
                <wxc-cell @wxcCellClicked="goTo('personInfo.index',{info:userInfo},'needLogin')" title="房屋信息" :has-bottom-border="true">
                    <text class="label2" slot="label">&#xe604;</text>
                    <text class="arrow" slot="value">&#xe60a;</text>
                </wxc-cell>
                <wxc-cell @wxcCellClicked="goTo('user.message',{info:userInfo},'needLogin')" title="消息中心" :has-bottom-border="true">
                    <text class="label" slot="label">&#xe631;</text>
                    <text class="arrow" slot="value">&#xe60a;</text>
                </wxc-cell>
                <wxc-cell @wxcCellClicked="goTo('user.aboutUs')" title="关于我们" :has-bottom-border="true">
                    <text class="label" slot="label">&#xe72c;</text>
                    <text class="arrow" slot="value">&#xe60a;</text>
                </wxc-cell>
                <!--<wxc-cell @wxcCellClicked="goToAtjia('newAtJia.index')" title="测试跳转我的家">-->
                    <!--<text class="label" slot="label">&#xe72c;</text>-->
                    <!--<text class="arrow" slot="value">&#xe60a;</text>-->
                <!--</wxc-cell>-->
                <!--<wxc-cell @wxcCellClicked="goToAtjia('myHome.myHome')" title="测试跳转我的家11111">-->
                    <!--<text class="label" slot="label">&#xe72c;</text>-->
                    <!--<text class="arrow" slot="value">&#xe60a;</text>-->
                <!--</wxc-cell>-->
                <!--<wxc-cell @wxcCellClicked="goToAtjia('feeDetails.allFees')" title="测试跳转我的家22222222222">-->
                    <!--<text class="label" slot="label">&#xe72c;</text>-->
                    <!--<text class="arrow" slot="value">&#xe60a;</text>-->
                <!--</wxc-cell>-->
            </div>
        </div>
    </div>
</template>

<script>
    import { WxcCell, WxcDialog } from 'weex-ui'
    import mixins from '../../common/mixins'
    import { getUserInfoById } from '../../service/userApi'

    export default {
        name: 'user',
        components: { WxcCell, WxcDialog },
        mixins: [mixins],
        data: () => ({
            userInfoImage: [],
            show: false,
            isChecked: false,
            name: '',
            titleName: '佘山银湖别墅'
        }),
        props: {
            token: {
                type: String
            },
            userInfo: {
                type: Object
            }
        },
        computed: {
            userPic () {
                if (this.userInfo.photo) {
                    return `${this.getImageUrl(this.userInfo.photo)}&level=5`
                } else {
                    return 'bmlocal://assets/images/liming.jpg'
                }
            }
        },
        methods: {
            // async checkProject () {
            //     if (this.userId) {
            //         this.userInfo = await getUserInfoById(this.userId)
            //     } else {
            //         setTimeout(() => {
            //             this.checkProject()
            //         }, 500)
            //     }
            // },
            goToAtjia (url, params, navTitle) {
                this.$router.open({ name: url, params, navTitle: this.titleName, backgroundColor: '#fff' })
            }
        }
        // async created () {
        //     await this.checkProject()
        // },

    }
</script>

<style lang="scss" scoped>
    .user {
        width: 750px;
        height: 2000px;
        background-color: #fff;
    }

    .user-header {
        position: relative;
        padding-bottom: 100;
    }

    .bg-image {
        width: 750;
        height: 410;
    }

    .user-name {
        position: absolute;
        left: 40;
        top: 60;
        font-size: 36;
        color: #fff;
    }

    .user-setting {
        position: absolute;
        top: 60;
        right: 40;
        font-family: iconfont;
        font-size: 48;
        color: #fff;
    }

    .user-avatar {
        position: absolute;
        bottom: 12;
        left: 60;
        width: 240px;
    }

    .avatar-wrapper {
        width: 192;
        height: 192;
        border-top-style: solid;
        border-top-color: #fff;
        border-top-width: 10;
        border-left-style: solid;
        border-left-color: #fff;
        border-left-width: 10;
        border-bottom-style: solid;
        border-bottom-color: #fff;
        border-bottom-width: 10;
        border-right-style: solid;
        border-right-color: #fff;
        border-right-width: 10;
        border-radius: 96;
        box-shadow: 0 4 8 0 hsla(0, 0%, 63%, .5);
    }

    .avatar-image {
        width: 172;
        height: 172;
        border-radius: 96;
    }

    .user-edit {
        position: absolute;
        bottom: 30;
        left: 184;
        padding: 6;
        font-family: iconfont;
        font-size: 30;
        color: #555;
        border-radius: 20;
        box-shadow: 0 4 8 0 hsla(0, 0%, 63%, .5);
    }

    .user-content {
        position: relative;
        padding-left: 60;
        background-color: #fff;
    }

    .label {
        margin-right: 30;
        font-family: iconfont;
        font-size: 50;
        color: #353535;
    }

    .label2 {
        margin-right: 36;
        font-family: iconfont2;
        font-size: 40;
        color: #353535;
    }

    .arrow {
        margin-right: 30;
        font-family: iconfont;
        font-size: 40;
        color: #353535;
    }
</style>
