<template>
    <div>
        <status-bar></status-bar>
        <div class="scan">
            <text class="title-bar-left" @click="$router.back()">&#xe601;</text>
            <text class="title-bar-center">{{title}}</text>
            <div class="title-bar-right">
                <text class="title-bar-icon star" @click="openBottomPopup">&#xe620;</text>
            </div>
        </div>
        <web :src="url" style="width: 750px;height:2000px"></web>
        <wxc-popup popup-color="#DFE0DF"
                   :show="isBottomShow"
                   @wxcPopupOverlayClicked="popupOverlayBottomClick"
                   pos="bottom"
                   height="350">
            <div class="share-box">
                <div class="share-title">分享到</div>
                <div class="bottom-share">
                    <div class="bottom-image" @click=" shareFriend()">
                        <div class="image-box"><image style="width:40px;height:40px;margin-top:10px" src="bmlocal://assets/images/wx.png"/>  </div>
                        <div class="share-type">微信好友</div>
                    </div>
                    <div class="bottom-image"  @click=" sharePyq()">
                        <div class="image-box"><image style="width:40px;height:40px;margin-top:10px" src="bmlocal://assets/images/pyq.png"/>  </div>
                        <div class="share-type">朋友圈</div>
                    </div>
                </div>
                <div @click="popupOverlayBottomClick" class="cancle-share">取消</div>
            </div>
        </wxc-popup>
    </div>
</template>

<script>
    import { getBusiContentCaseById, getDesignerDetail } from '../../service/caseApi'
    import { getEstateById } from '../../service/estateApi'
    import { getById } from '../../service/storeApi.js'
    import { getWorkSite } from '../../service/constructionApi'
    import { getContentById } from '../../service/softApi'
    import { getFileInfo } from '../../service/baseApi'
    import StatusBar from '../../components/statusBar'
    import mixins from '../../common/mixins'
    const modal = weex.requireModule('modal')
    import { WxcPopup } from 'weex-ui'
    const bmWXShare = weex.requireModule('bmWXShare')
    if (weex.config.env.platform === 'iOS') {
        bmWXShare.initUM('5bc180cef1f5568df60006d3')// 友盟平台的 ios appkey
    } else {
        bmWXShare.initUM('5bc18170f1f55653fa000309')// 友盟平台的android appkey
    }
    bmWXShare.initWX({
        appKey: 'wx6b97854effaee8d3', // 微信开发平台申请的appkey
        appSecret: '61ae8f237d2dbd8bc091e1636470d799', // appKey对应的appSecret，
        redirectURL: 'index' // 授权回调页面
    })
    const result = bmWXShare.isInstallWXApp()
    export default {
        name: 'scan',
        components: { StatusBar, WxcPopup },
        mixins: [mixins],
        data () {
            return {
                isBottomShow: false,
                url: '',
                urls: '',
                name: '软文的分享',
                cName: '工地的分享',
                content: '分享出去的内容',
                id: '',
                infoDetails: '',
                img: '',
                title: ''
            }
        },
        methods: {
            // 微信分享
            async shareFriend () {
                bmWXShare.share({
                    title: this.title, // 分享的标题
                    content: this.infoDetails, // 分享的文字内容
                    url: this.url, // 分享对应的URL地址，如h5、音乐链接、视频链接、小程序的链接
                    image: this.img, // 分享的图片url
                    path: '', // 分享小程序用到的页面路径
                    userName: '', // 小程序名称
                    shareType: 'Webpage', // 分享的类型
                    platform: 'WechatSession' // 分享平台 朋友圈/好友（注意：历史版本的字段名是platforms,现在是一个字符串而不是数组）
                }, function (resData) { // 注意： 历史版本返回的是一个promise对象，现在的是callback回调
                    // 成功回调
                }, function (resData) {
                    // 失败回调
                })
            },
            async sharePyq () {
                bmWXShare.share({
                    title: this.title, // 分享的标题
                    content: this.infoDetails, // 分享的文字内容
                    url: this.url, // 分享对应的URL地址，如h5、音乐链接、视频链接、小程序的链接
                    image: this.img, // 分享的图片url
                    path: '', // 分享小程序用到的页面路径
                    userName: '', // 小程序名称
                    shareType: 'Webpage', // 分享的类型
                    platform: 'WechatTimeLine' // 分享平台 朋友圈/好友（注意：历史版本的字段名是platforms,现在是一个字符串而不是数组）
                }, function (resData) { // 注意： 历史版本返回的是一个promise对象，现在的是callback回调
                    // 成功回调
                }, function (resData) {
                    // 失败回调
                })
            },
            openBottomPopup () {
                this.isBottomShow = true
            },
            // 非状态组件，需要在这里关闭
            popupOverlayBottomClick () {
                this.isBottomShow = false
            }
        },
        async created () {
            const params = await this.$router.getParams()
            if (params && params.url) {
                this.url = params.url
            }
            if (params && params.id) {
                this.id = params.id
                if (params && params.type) {
                    if (params.type === 'case-detail') {
                        this.content = await getBusiContentCaseById(this.id, 'GET')
                        this.title = this.content.title
                        this.infoDetails = this.delHtmlTags(this.content.profile)
                        this.infoDetails = this.infoDetails.slice(0, 15)
                        this.infoDetails += '...'
                        if (this.content) {
                            const url = await getFileInfo(this.content.impressionId)
                            this.img = url.data[0].ossUrl
                        }
                    }
                    if (params.type === 'designer') {
                        this.content = await getDesignerDetail(this.id, 'GET')
                        this.title = this.content.name
                        this.infoDetails = this.delHtmlTags(this.content.personalIntroduction)
                        this.infoDetails = this.infoDetails.slice(0, 15)
                        this.infoDetails += '...'
                        this.img = this.getImageUrl(this.content.headId)
                    }
                    if (params.type === 'estate') {
                        this.content = await getEstateById(this.id, 'GET')
                        this.title = this.content.name
                        this.infoDetails = this.delHtmlTags(this.content.otherInformation)
                        this.infoDetails = this.infoDetails.slice(0, 15)
                        this.infoDetails += '...'
                        this.img = this.getImageUrl(this.content.frontUrl)
                    }
                    if (params.type === 'store') {
                        this.content = await getById(this.id, 'GET')
                        this.url = `https://sit-m.singohome.com/store-detail/${this.id}`
                        this.title = this.content.name
                        this.infoDetails = this.delHtmlTags(this.content.introduction)
                        this.infoDetails = this.infoDetails.slice(0, 15)
                        this.infoDetails += '...'
                        this.img = this.getImageUrl(this.content.coverUrl)
                    }
                    if (params.type === 'construction') {
                        this.content = await getWorkSite(this.id, 'GET')
                        this.title = this.content.housesName
                        this.infoDetails = this.cName
                        this.infoDetails = this.infoDetails.slice(0, 15)
                        this.infoDetails += '...'
                        this.img = this.getImageUrl(this.content.coverUrl)
                    }
                    if (params.type === 'news') {
                        this.content = await getContentById(this.id)
                        this.content = this.content.content
                        this.title = this.content.title
                        this.infoDetails = this.delHtmlTags(this.content.description)
                        this.infoDetails = this.infoDetails.slice(0, 15)
                        this.infoDetails += '...'
                        this.img = this.content.titleImage
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .scan {
        flex-direction: row;
        justify-content: space-between;
        padding-right: 20px;
    }

    .title-bar-left {
        font-family: iconfont;
        font-size: 50;
        font-weight: 800;
        color: #212121;
    }

    .title-bar-center {
        width: 400px;
        margin-left: 100px;
    }

    .title-bar-right {
        flex-direction: row;
        align-items: center;
        width: 50;
    }

    .title-bar-icon {
        font-family: iconfont;
        color: #999;
    }

    .star {
        font-size: 42;
    }

    .title-bar-text {
        font-size: 36;
        color: #999;
    }

    .iconfont-text-2 {
        font-family: iconfont2;
        font-size: 26px;
        color: #999999;
    }

    .active {
        color: #E60012;
    }
    .bottom-share{
        flex-direction: row;
        justify-content: space-around;
        padding-top: 40px
    }
    .bottom-image{
        align-items: center;
    }
    .share-title{
        align-items:center;
        margin-top:15;
        font-size: 16;
        color: #666666
    }
    .image-box{
        width: 60px;
        height: 60px;
        background-color: #fff;
        align-items: center;
        border-radius: 10px
    }
    .share-type{
        margin-top: 8px;
    }
    .cancle-share{
        align-items: center;
        background-color: #fff;
        height: 80px;
        padding-top: 20px;
        margin-top: 65px
    }

</style>
