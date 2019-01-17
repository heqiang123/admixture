<template>
    <div>
        <status-bar></status-bar>
        <div class="title-bar" :style="{height: height}">
            <text class="title-bar-left" @click="$router.back()">&#xe601;</text>
            <div class="title-bar-right">
                <text v-if="type ==='DESIGN'" class="iconfont-text-2 follows" :class="[isFollow?'active':'']" @click="clickfollow">{{isFollow?'&#xe611;':'&#xe61e;'}}</text>
                <text v-if="type ==='DESIGN'" class="title-bar-text">{{followCount}}</text>
                <text class="iconfont-text-2 follows" :class="[isUp?'active':'']" @click="clickUp">{{isUp?'&#xe8ed;':'&#xe602;'}}</text>
                <text class="title-bar-text">{{upHeaderCount}}</text>
                <text v-if="type !=='DESIGN'" class="iconfont-text-2 star" :class="[isSave?'active':'']" @click="clickSave">{{isSave?'&#xe607;':'&#xe68d;'}}</text>
                <text v-if="type !=='DESIGN'" class="title-bar-text">{{saveHeaderCount}}</text>
                <text class="title-bar-icon share" @click="goTo('service.index')">&#xe61e;</text>
                <text class="title-bar-icon star" @click="openBottomPopup">&#xe620;</text>
            </div>
        </div>
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
    import StatusBar from './statusBar'
    import { userSetUp, userSetSave, userSetFollow } from '../service/baseApi'
    import mixins from '../common/mixins'
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
        name: 'titleBar',
        props: {
            type: {
                type: String
            },
            ID: {
                type: String
            },
            address: {
                type: String
            },
            upCount: {
                type: Number
            },
            isSave: {
                type: Boolean
            },
            saveCount: {
                type: Number
            },
            isFollow: {
                type: Boolean
            },
            followCount: {
                type: Number
            },
            shareTitleName: {
                type: String
            },
            shareContentName: {
                type: String
            },
            shareId: {
                type: String
            },
            sharePicture: {
                type: String
            }
        },
        created () {
            if (this.shareContentName) {
                this.shareContentName = this.shareContentName.slice(0, 15)
                this.shareContentName += '...'
            }
            setTimeout(() => {
                if (this.shareContentName) {
                    this.shareContentName = this.shareContentName.slice(0, 15)
                    this.shareContentName += '...'
                }
                this.city = this.$storage.getSync('currentValue').name
                if (this.city === '上海市') {
                    this.cityName = 'sh'
                } if (this.city === '杭州市') {
                    this.cityName = 'hz'
                } if (this.city === '苏州市') {
                    this.cityName = 'sz'
                } if (this.city === '无锡市') {
                    this.cityName = 'wx'
                } if (this.city === '宁波市') {
                    this.cityName = 'nb'
                } if (this.city === '南京市') {
                    this.cityName = 'nj'
                } if (this.city === '天津市') {
                    this.cityName = 'tj'
                } if (this.city === '南通市') {
                    this.cityName = 'nt'
                }
            }, 5000)
        },
        mixins: [mixins],
        components: { StatusBar, WxcPopup },
        data: () => ({
            upHeaderCount: 0,
            saveHeaderCount: 0,
            cityName: '',
            shareContentName: '',
            city: '',
            urlHomeImg: '',
            isBottomShow: false,
            height: 50,
            isUp: false,
            flag: 0
        }),
        computed: {
            height () {
                return weex.config.eros.navBarHeight
            }
        },

        watch: {
            upCount (val) {
                this.upHeaderCount = val
            },
            isSave (val) {
                this.isSave = val
            },
            saveCount (val) {
                this.saveHeaderCount = val
            },
            isFollow (val) {
                this.isFollow = val
            },
            followCount (val) {
                this.followCount = val
            },
            shareTitleName (val) {
                this.shareTitleName = val
            },
            shareContentName (val) {
                this.shareContentName = val
                this.shareContentName = this.shareContentName.slice(0, 15)
                this.shareContentName += '...'
            },
            shareId (val) {
                this.shareId = val
            },
            sharePicture (val) {
                this.sharePicture = val
                this.flag = 1
            }
        },
        methods: {
            // 点赞
            async clickUp () {
                if (this.isUp) {
                    this.toast('您已经赞过啦')
                } else {
                    this.isUp = true
                    this.upHeaderCount += 1
                    await userSetUp(this.type, this.ID)
                }
            },
            async clickSave () {
                if (this.userId) {
                    if (this.isSave) {
                        this.toast('您已经收藏过啦')
                    } else {
                        this.saveHeaderCount += 1
                        this.isSave = true
                        this.$emit('clickSave', true)
                        await userSetSave(this.type, this.ID)
                    }
                } else {
                    this.goTo('user.login')
                }
            },
            async clickfollow () {
                if (this.userId) {
                    if (this.isFollow) {
                        this.toast('您已经关注过啦')
                    } else {
                        this.followCount += 1
                        this.isFollow = true
                        this.$emit('clickFollow', true)
                        await userSetFollow(this.type, this.ID)
                    }
                } else {
                    this.goTo('user.login')
                }
            },
            // 微信分享
            async shareFriend () {
                if (this.sharePicture) {
                    bmWXShare.share({
                        title: this.shareTitleName, // 分享的标题
                        content: this.shareContentName, // 分享的文字内容
                        url: `https://m.atjia.com/${this.cityName}/${this.address}/${this.shareId}`, // 分享对应的URL地址，如h5、音乐链接、视频链接、小程序的链接
                        image: this.sharePicture, // 分享的图片url
                        path: '', // 分享小程序用到的页面路径
                        userName: '', // 小程序名称
                        shareType: 'Webpage', // 分享的类型
                        platform: 'WechatSession' // 分享平台 朋友圈/好友（注意：历史版本的字段名是platforms,现在是一个字符串而不是数组）
                    }, function (resData) { // 注意： 历史版本返回的是一个promise对象，现在的是callback回调
                        // 成功回调
                    }, function (resData) {
                        // 失败回调
                    })
                    this.flag = 0
                }
            },
            async sharePyq () {
                if (this.sharePicture) {
                    bmWXShare.share({
                        title: this.shareTitleName, // 分享的标题
                        content: this.shareContentName, // 分享的文字内容
                        url: `https://m.atjia.com/${this.cityName}/${this.address}/${this.shareId}`, // 分享对应的URL地址，如h5、音乐链接、视频链接、小程序的链接
                        image: this.sharePicture, // 分享的图片url
                        path: '', // 分享小程序用到的页面路径
                        userName: '', // 小程序名称
                        shareType: 'Webpage', // 分享的类型
                        platform: 'WechatTimeLine' // 分享平台 朋友圈/好友（注意：历史版本的字段名是platforms,现在是一个字符串而不是数组）
                    }, function (resData) { // 注意： 历史版本返回的是一个promise对象，现在的是callback回调
                        // 成功回调
                    }, function (resData) {
                        // 失败回调
                    })
                    this.flag = 0
                }
            },
            openBottomPopup () {
                if (this.flag === 1) {
                    this.isBottomShow = true
                }
            },
            // 非状态组件，需要在这里关闭
            popupOverlayBottomClick () {
                this.isBottomShow = false
            }

        }
    }
</script>

<style lang="scss" scoped>
    .title-bar {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 20;
        width: 750;
        background-color: #fff;
    }

    .title-bar-left {
        font-family: iconfont;
        font-size: 50;
        font-weight: 800;
        color: #212121;
    }

    .title-bar-right {
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 320;
    }

    .title-bar-icon {
        font-family: iconfont;
        color: #999;
    }

    .praise {
        font-size: 40;
    }

    .follows {
        font-size: 36;
    }

    .star {
        font-size: 42;
    }

    .share {
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
