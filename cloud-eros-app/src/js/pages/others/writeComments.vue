<template>
    <div>
        <div class="comment">
            <div class="comment-header">
                <image class="comment-cover" resize="contain" :src="url"></image>
                <text class="comment-label" v-if="show"> {{tagLabel}}</text>
            </div>
            <div class="comment-tag">
                <text class="title">印象标签</text>
                <div class="tag-list">
                    <text class="tag" :style="item.isChoose === true ? {'background-color': '#888888'} : {'background-color': '#f5f5f5'}" @click="changeSelected(index)" v-for="(item, index) of tags" :key="index">{{item.name}}</text>
                </div>
                <text class="add-tag" @click="state.isShow = true">&#xe603;</text>
            </div>
            <div class="write-comment">
                <textarea class="textarea" placeholder="在这里写评论" v-model="commentInfo"></textarea>
            </div>
            <div class="upImage">
                <div class="image-comment" v-for="(item, index) of imgSrc" :key="index">
                    <image class="comment-image" :src="item"></image>
                    <text class="icons" @click="closeImage(index)">&#xe76c;</text>
                </div>
                <text class="add-img" @click="state.isImage = true">&#xe621;</text>
            </div>
        </div>
        <wxc-dialog title="请输入标签" :show="state.isShow" main-btn-color="#e60012" @wxcDialogCancelBtnClicked="state.isShow = false" @wxcDialogConfirmBtnClicked="addTag">
            <input type="text" :autofocus="true" class="input" slot="content" :value="value" @input="e => value = e.value" @change="e => value = e.value" />
        </wxc-dialog>
        <wxc-overlay :show="state.isImage" opacity="0.6" @wxcOverlayBodyClicked="state.isImage = false">
        </wxc-overlay>
        <bui-actionsheet title="" :items="photosItems" v-model="state.isImage" @itemClick="chooseImg"></bui-actionsheet>
    </div>
</template>

<script>
    import { WxcDialog, WxcOverlay } from 'weex-ui'
    import { buiActionsheet } from 'bui-weex'
    import mixins from '../../common/mixins'
    import { uploadFile } from '../../service/baseApi'
    import { getDesignerDetail, addApp, getWorkSite, getById, findTagsByTypeAndBusinessId } from '../../service/commentsApi'

    export default {
        name: 'writeComments',
        components: { buiActionsheet, WxcOverlay, WxcDialog },
        mixins: [mixins],
        data () {
            return {
                state: {
                    isShow: false,
                    isImage: false
                },
                uuid: '',
                uuidArray: [],
                imgSrc: [],
                id: '',
                show: '',
                type: '',
                url: '',
                tagArr: [],
                // 评价的内容
                comments: '',
                photosItems: ['相册', '相机'],
                tags: [],
                commentInfo: '',
                imgpath: []
            }
        },
        computed: {
            tagLabel () {
                if (this.tagArr.length) {
                    return this.tagArr.toString().replace(/\,/g, ' | ')
                }
            }
        },
        methods: {
            // 上传图片
            async addImg () {
                this.imgpath = await this.$image.pick({ maxCount: 9, imageWidth: '800', allowCrop: true })
                await this.upLoadImage(this.getUUID())
            },
            // 得到评论的内容
            async getComment (id, method) {
                const result = await getDesignerDetail(id, method)
                if (result.tags && result.tags.length > 0) {
                    this.show = true
                    for (const item of result.tags) {
                        item.isChoose = false
                        this.tags.push(item)
                        this.tagArr.push(item.name)
                    }
                }
                this.comments = result
            },
            async getfindTagsByTypeAndBusinessId (data, method) {
                const result = await findTagsByTypeAndBusinessId(data, method)
                for (const item of result) {
                    item.isChoose = false
                    this.tags.push(item)
                }
            },
            // 得到工地评论的内容
            async getConstruction (id, method) {
                const result = await getWorkSite(id, method)
                for (const item of result.tags) {
                    item.isChoose = false
                    this.tags.push(item)
                    this.tagArr.push(item.name)
                }
            },
            // 的到门店的评论内容
            async getStore (id, method) {
                const result = await getById(id, method)
                for (const item of result.tags) {
                    item.isChoose = false
                    this.tags.push(item)
                    this.tagArr.push(item.name)
                }
            },
            addTag () {
                const obj = {}
                switch (this.type) {
                case '0': {
                    obj.name = '案例评论自定义标签'
                    obj.code = 'BQ000024'
                    break
                }
                case '1': {
                    obj.name = '楼盘评论自定义标签'
                    obj.code = 'BQ000025'
                    break
                }
                case '2': {
                    obj.name = '门店评论自定义标签'
                    obj.code = 'BQ000026'
                    break
                }
                case '3': {
                    obj.name = '工地评论自定义标签'
                    obj.code = 'BQ000027'
                    break
                }
                case '4': {
                    obj.name = '设计师评论自定义标签'
                    obj.code = 'BQ000028'
                    break
                }
                case '5': {
                    obj.name = '软文评论自定义标签'
                    obj.code = 'BQ000029'
                    break
                }
                case '6': {
                    obj.name = '图片评论自定义标签'
                    obj.code = 'BQ000030'
                    break
                }
                }
                this.tags.push({
                    name: this.value,
                    isChoose: true,
                    code: this.getUUID(),
                    parent: obj
                })
                this.state.isShow = false
                this.value = ''
            },
            changeSelected (index) {
                this.tags[index].isChoose = !this.tags[index].isChoose
            },
            async createdCustome (data) {
                await addApp(data)
                this.toast('创建成功')
                this.$router.setBackParams({ id: this.id, type: this.type, enter: '1' })
                this.$router.back()
            },
            async upLoadImage (businessId) {
                for (let index = 0; index < this.imgpath.length; index++) {
                    const image = this.imgpath[index]
                    await uploadFile(businessId)
                }
            },
            // 发送
            async addComment () {
                if (this.commentInfo.length <= 0) {
                    this.toast('请输入评论内容')
                    return
                }
                const submitData = {
                    businessId: this.id,
                    commentContent: this.commentInfo,
                    commentType: this.type,
                    commentImageId: this.uuid,
                    tags: this.tags
                }
                const array = []
                let businessId = ''
                for (const item of this.tags) {
                    if (item.isChoose) {
                        delete item.isChoose
                        array.push(item)
                    }
                }
                if (array.length >= 1) {
                    submitData.tags = array
                } else if (!array.length || array.length === 0) {
                    submitData.tags = []
                }
                if (this.imgpath.length > 0) {
                    businessId = this.getUUID()
                    await this.upLoadImage(businessId)
                    if (businessId !== '') {
                        submitData.commentImageId = businessId
                    }
                }
                await this.createdCustome(submitData)
            },
            async chooseImg (item) {
                if (item === '相册') {
                    this.uuid = this.getUUID()
                    const result = await this.$image.pick({ maxCount: 9, imageWidth: '800', allowCrop: true })
                    if (result.length + this.imgSrc.length > 9) {
                        this.toast('上传图片数量不能超过9张')
                        return
                    } else {
                        this.imgSrc.push(...result)
                    }
                    if (this.imgSrc.length < 10) {
                        await this.$image.upload({
                            url: `${this.baseImageUrl}${this.uploadUrl}${this.imgParams}&busiType=USER&businessId=${this.uuid}`,
                            header: {
                                token: this.token
                            },
                            source: this.imgSrc
                        })
                        this.toast('上传成功')
                    }
                } else {
                    this.uuid = this.getUUID()
                    const result = await this.$image.camera({ imageWidth: '800', allowCrop: false })
                    if (result.length + this.imgSrc.length > 9) {
                        this.toast('上传图片数量不能超过9张')
                        return
                    } else {
                        this.imgSrc.push(...result)
                    }
                    if (this.imgSrc.length) {
                        await this.$image.upload({
                            url: `${this.baseImageUrl}${this.uploadUrl}${this.imgParams}&busiType=USER&businessId=${this.uuid}`,
                            header: {
                                token: this.token
                            },
                            source: [...this.imgSrc]
                        })
                        this.toast('拍照成功')
                    }
                }
            },
            closeImage (index) {
                this.imgSrc.splice(index, 1)
            }
        },
        async created () {
            const params = await this.$router.getParams()
            this.id = params.id
            this.type = params.type
            this.url = params.url
            if (this.type === '0') {
                await this.getComment(this.id, 'GET')
            }
            if (this.type === '3') {
                await this.getConstruction(this.id, 'GET')
            }
            if (this.type === '2') {
                await this.getStore(this.id, 'GET')
            }
            if (this.type === '4') {
                await this.getfindTagsByTypeAndBusinessId({
                    id: this.id,
                    type: this.type
                })
            }
        },
        mounted () {
            this.$navigator.setRightItem({
                text: '发送',
                textColor: '#D80D18',
                fontSize: '30'
            }, () => {
                this.addComment()
            })
        }
    }
</script>

<style lang="scss" scoped>
    .comment {
        width: 750;
        height: 2000;
        background-color: #fff;
    }

    .comment-header {
        flex-direction: row;
        align-items: center;
        padding: 20;
        background-color: #f5f5f5;
    }

    .comment-cover {
        width: 160;
        height: 88;
        border-radius: 4;
    }

    .comment-label {
        font-size: 24;
        color: #757557;
    }

    .testInput {
        height: 80px;
        padding: 10px;
        font-size: 32px;
        width: 600px;
        display: inline-block;
        color: #666666;
    }

    .comment-tag {
        padding: 0 20 60;
    }

    .title {
        padding: 40 0 20;
        font-size: 28;
        color: #555;
    }

    .tag-list {
        flex-direction: row;
        flex-wrap: wrap;
    }

    .tag {
        padding: 14 20px;
        margin: 0 8 20 0;
        height: 80;
        font-size: 28;
        color: #555;
        background-color: #f5f5f5;
        border-top-style: solid;
        border-top-color: #dbd6d6;
        border-top-width: 2;
        border-left-style: solid;
        border-left-color: #dbd6d6;
        border-left-width: 2;
        border-bottom-style: solid;
        border-bottom-color: #dbd6d6;
        border-bottom-width: 2;
        border-right-style: solid;
        border-right-color: #dbd6d6;
        border-right-width: 2;
        border-radius: 4;
    }

    .add-tag {
        width: 124;
        height: 60;
        line-height: 60;
        font-family: iconfont;
        font-size: 36;
        text-align: center;
        color: #e60012;
        border-top-style: dashed;
        border-top-color: #e60012;
        border-top-width: 2;
        border-left-style: dashed;
        border-left-color: #e60012;
        border-left-width: 2;
        border-bottom-style: dashed;
        border-bottom-color: #e60012;
        border-bottom-width: 2;
        border-right-style: dashed;
        border-right-color: #e60012;
        border-right-width: 2;
        border-radius: 4;
    }

    .upImage {
        flex-direction: row;
        flex-wrap: wrap;
        margin-left: 24px;
    }

    .image-comment {
        position: relative;
        height: 170px;
        width: 170px;
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .comment-image {
        position: absolute;
        height: 170px;
        width: 170px;
    }

    .icons {
        font-family: iconfont;
        font-size: 36;
        position: absolute;
        left: 132px;
        top: 4px;
        color: #000000;
        font-weight: 600;
    }

    .textarea {
        width: 750;
        height: 172;
        padding: 0 20;
        color: #000000;
        tint-color: #e60012;
        border-bottom-style: solid;
        border-bottom-color: #dbd6d6;
        border-bottom-width: 1px;
    }

    .add-img {
        width: 172;
        height: 172;
        line-height: 172;
        text-align: center;
        font-family: iconfont;
        font-size: 56;
        color: #dbd6d6;
        border-top-style: solid;
        border-top-color: #dbd6d6;
        border-top-width: 2;
        border-left-style: solid;
        border-left-color: #dbd6d6;
        border-left-width: 2;
        border-bottom-style: solid;
        border-bottom-color: #dbd6d6;
        border-bottom-width: 2;
        border-right-style: solid;
        border-right-color: #dbd6d6;
        border-right-width: 2;
    }

    .input {
        padding: 10;
        border-bottom-color: #dedede;
        border-bottom-style: solid;
        border-bottom-width: 2;
        tint-color: #e60012;
    }

    .upload-all {
        flex-direction: row;
        flex-wrap: wrap;
        padding-bottom: 50px;
    }

    .upload-box {
        width: 172px;
        height: 172px;
        margin-left: 40px;
        margin-top: 50px;
        position: relative;
    }

    .upload-img {
        width: 172px;
        height: 172px;
    }

    .add-box {
        width: 172px;
        height: 172px;
        justify-content: center;
        align-items: center;
        border-width: 2px;
        border-color: #DBD6D6;
        margin-left: 40px;
        margin-top: 50px;
        border-radius: 8px;
    }

    .add-img {
        font-size: 80px;
        color: #DBD6D6;
    }

</style>
