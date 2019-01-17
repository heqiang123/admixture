<template>
    <div>
        <div v-if="state.navShow" class="status-bar"></div>
        <wxc-minibar :show="state.navShow" background-color="#fff" height="56">
            <div slot="left" class="minibar-left">
                <text class="icon" :style="{color: '#555'}">&#xe601;</text>
                <image class="minibar-avatar" :src="`${deginerDetails.headUrl}?x-oss-process=image/resize,w_64/crop,x_0,y_0,w_64,h_64/circle,r_100/format,png`" v-if="deginerDetails.headId"></image>
            </div>
            <div slot="middle" class="minibar-middle">
                <text slot="middle">{{deginerDetails.name}}</text>
                <div class="handdle-wrapper">
                    <text class="minibar-focus" @click="seeDesinger">{{(deginerDetails.follow == true)?'已关注':'+关注'}}</text>
                    <text class="minibar-date" @click="goTo('order.fastBudget',{ id:deginerDetails.id,name: deginerDetails.name,indexs:10})">约TA</text>
                </div>
            </div>
            <div slot="right" class="minibar-right" @click="openBottomPopup">
                <text class="icon" :style="{color: '#555'}">&#xe620;</text>
            </div>
        </wxc-minibar>
        <list class="designer">
            <cell>
                <div class="designer-intro">
                    <image v-if="!state.navShow" resize="cover" class="bg-image" :src="`${deginerDetails.personalPic}?x-oss-process=image/resize,w_700`"></image>
                    <div class="designer-header" v-if="!state.navShow">
                        <text class="icon" @click="$router.back()">&#xe601;</text>
                        <text class="icon" @click="openBottomPopup">&#xe620;</text>
                    </div>
                    <div class="designer-info">
                        <image class="designer-image" resize="cover" :src="`${deginerDetails.headUrl}?x-oss-process=image/resize,w_140/crop,x_0,y_0,w_140,h_140/circle,r_100/format,png`"></image>
                        <text class="designer-title">{{deginerDetails.level}}</text>
                        <div class="designer-details">
                            <div :style="{'flex-direction': 'row', 'align-items': 'center'}">
                                <text class="designer-name">{{deginerDetails.name}}</text>
                                <text class="icon2" v-if="deginerDetails.gender == 1" :style="{'font-size': 36, color: '#2eb0dd'}">&#xe61f;</text>
                                <text class="icon2" v-if="deginerDetails.gender == 2" :style="{'font-size': 36, color: '#FF52CE'}">&#xe6a8;</text>
                            </div>
                            <text class="designer-exp">{{years}}</text>
                            <text class="designer-style">{{deginerDetails.busiContentStoreName}}</text>
                        </div>
                    </div>
                    <div class="designer-follow">
                        <div class="see">
                            <text class="designer-follwer">关注{{deginerDetails.wasFllows?deginerDetails.wasFllows:'0' }}</text>
                            <text class="designer-follwers"> | </text>
                            <text class="designer-follwers">粉丝{{deginerDetails.follows?deginerDetails.follows:'0'}}</text>
                        </div>
                        <div class="designer-handdle" @disappear="showNav" @appear="hideNav">
                            <text class="designer-focus" @click="seeDesinger">{{(deginerDetails.follow == true)?'已关注':'+关注'}}</text>
                            <text class="designer-date" @click="goTo('order.fastBudget',{ id:deginerDetails.id,name: deginerDetails.name,indexs:10})">约TA</text>
                        </div>
                    </div>
                </div>
            </cell>
            <header>
                <div class="header">
                    <text class="design-title" :style="!state.caseActive ? nomalStyle : selectedStyle" @click="state.caseActive = !state.caseActive">动态</text>
                    <text class="design-title" :style="state.caseActive ? nomalStyle : selectedStyle" @click="state.caseActive = !state.caseActive">作品</text>
                </div>
            </header>
            <cell v-if="state.caseActive">
                <div class="designer-des">
                    <div class="designer-des-wrapper" :style="state.isShowMore ? {} : {height: 200}">
                        <text class="content">设计理念：{{infoDesinger}}</text>
                        <text class="content">个人简介：代表作品：{{infoPeople?infoPeople:'无'}}</text>
                        <text class="content">个人荣誉：{{infoHonor?infoHonor:''}}</text>
                    </div>
                    <text class="designer-more-info" @click="state.isShowMore = !state.isShowMore">{{state.isShowMore ? '↑收起' : '更多TA的信息'}}</text>
                </div>
            </cell>
            <cell v-if="state.caseActive"  v-for="(item, index) in datalist" :key="index">
                <moment-item :name="deginerDetails.name" :img="getImageUrl(deginerDetails.headUrl)" :content="item.content" :images="item.pictureId" :tags="item.tags" :id="item.id"
                             :dynamicId="deginerDetails.id" :title="deginerDetails.level" :stamp="item.createTime" :follows="item.up" :comments="item.allComments" :location="item.addressName"
                             @handelDel="handelDel(index)">
                </moment-item>
            </cell>
            <cell v-if="state.caseActive">
                <div class="designer-comment">
                    <comment-zone :details="detailsDeginer" type='4' :id="deginerDetails.id" :urlHomePagesImg="getImageUrl(deginerDetails.headUrl)"></comment-zone>
                </div>
            </cell>
            <cell v-else>
                <div v-for="(work, index) in desingerWork" :key="index">
                    <work-item :item="work"></work-item>
                </div>
            </cell>
        </list>
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
    import CommentZone from '../../components/commentZone'
    import workItem from '../../components/workItem'
    import mixins from '../../common/mixins'
    import downLoading from '../../components/bui/downLoading'
    import refreshLoading from '../../components/bui/refreshLoading'
    import { getDesingerStateApi } from '../../service/designerApi'
    import { getDesignerDetail, findTagsByTypeAndBusinessId, getCaseBydesignerId } from '../../service/caseApi'
    import { getImgUrls } from '../../service/baseApi'
    import { see } from '../../service/userApi'
    import { WxcMinibar, WxcButton } from 'weex-ui'
    import MomentItem from '../../components/momentItem'
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
        name: 'designerInfo',
        components: { CommentZone, WxcMinibar, workItem, downLoading, refreshLoading, MomentItem, WxcButton, WxcPopup },
        data () {
            return {
                indexs: 10,
                allPisd: [],
                comments: '',
                tabPageHeight: 1314,
                datalist: [],
                page: 1,
                totalPage: 999,
                // 接收传过来的id
                deginerId: '',
                // 从业年限
                years: '',
                // 设计风格
                infoDesinger: '',
                upHeaderCount: 0,
                saveHeaderCount: 0,
                cityName: '',
                city: '',
                urlHomeImg: '',
                height: 50,
                infoHonor: '',
                // 个人简介
                infoPeople: '',
                // 返回的总数据
                deginerDetails: {},
                personalId: '',
                detailsDeginer: {},
                isBottomShow: false,
                state: {
                    caseActive: true,
                    isShowMore: false,
                    navShow: false
                },
                isShowLoading: false,
                desingerWork: [],
                isShow: false,
                nomalStyle: {
                    color: '#999',
                    'border-bottom-color': 'transparent',
                    'border-bottom-style': 'solid',
                    'border-bottom-width': 4
                },
                selectedStyle: {
                    color: 'red',
                    'border-bottom-color': '#e60012',
                    'border-bottom-style': 'solid',
                    'border-bottom-width': 4
                }
            }
        },
        mixins: [mixins],
        methods: {
            async getFileInfo (businessIds, callback) {
                const result = await getImgUrls(businessIds)
                callback(result)
            },
            async getDesingerState () {
                const result = await getDesingerStateApi(this.deginerId, {
                    authCondition: '',
                    'export': false,
                    'orderBy': 'id desc',
                    'page': 1,
                    'pageSize': 10,
                    'queryParamList': []
                })
                this.datalist.push(...result.content)
            },
            // 得到设计师的详情
            async getGeragin (id, method) {
                const result = await getDesignerDetail(id, method)
                this.infoDesinger = this.delHtmlTags(result.designIdea)
                this.infoPeople = this.delHtmlTags(result.personalIntroduction)
                this.infoHonor = this.delHtmlTags(result.honor)
                this.deginerDetails = result
            },
            // 得到设计师的作品
            async getDesigner (name, page) {
                const queryParamList = [{
                    'field': 'busiContentDesigner.id',
                    'type': 'string',
                    'logic': 'like',
                    'value': name || '',
                    'items': []
                }]
                const result = await getCaseBydesignerId({
                    export: false,
                    orderBy: 'id desc',
                    page: page,
                    pageSize: 6,
                    queryParamList: queryParamList

                })
                if (result && result.content.length > 0) {
                    this.totalPage = result.totalPage
                    this.desingerWork = this.desingerWork.concat(result.content)
                    this.page = this.page + 1
                }
            },
            onLoading (e) {
                this.isShowLoading = true
                setTimeout(() => {
                    this.isShowLoading = false
                    if (this.page > this.totalPage) {
                        this.loadingText = '没有更多数据了'
                        return
                    } else {
                        this.loadingText = '加载更多数据...'
                        this.getDesigner(
                            this.id,
                            this.page
                        )
                    }
                }, 1000)
            },
            // 点击关注
            async seeDesinger () {
                // 判断是否有token没有跳登录页面
                if (!this.token) {
                    this.goTo('user.login')
                } else {
                    if (this.deginerDetails.follow === true) {
                        this.toast('已经关注过了')
                        return
                    } else {
                        const result = await see(this.deginerId)
                        if (result.type === 'success') {
                            this.deginerDetails.follow = true
                            this.deginerDetails.follows = Number(this.deginerDetails.follows) + 1
                        }
                    }
                }
            },
            async getTag (data, method) {
                const result = await findTagsByTypeAndBusinessId(data, method)
                this.detailsDeginer = result
            },
            showNav () {
                this.state.navShow = true
            },
            hideNav () {
                this.state.navShow = false
            },
            // 微信分享
            async shareFriend () {
                bmWXShare.share({
                    title: this.deginerDetails.name, // 分享的标题
                    content: this.infoDesinger, // 分享的文字内容
                    url: `https://m.atjia.com/${this.cityName}/designer-nobusdetail/${this.deginerDetails.id}`, // 分享对应的URL地址，如h5、音乐链接、视频链接、小程序的链接
                    image: this.getImageUrl(this.deginerDetails.headId), // 分享的图片url
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
                    title: this.deginerDetails.name, // 分享的标题
                    content: this.infoDesinger, // 分享的文字内容
                    url: `https://m.atjia.com/${this.cityName}/designer-nobusdetail/${this.deginerDetails.id}`, // 分享对应的URL地址，如h5、音乐链接、视频链接、小程序的链接
                    image: this.getImageUrl(this.deginerDetails.headId), // 分享的图片url
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
        beforeCreate () {
            this.$navigator.setNavigationInfo({
                title: '',
                navShow: false,
                statusBarStyle: 'Default'
            })
        },
        async created () {
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
            const params = await this.$router.getParams()
            this.deginerId = params.id
            await this.getGeragin(this.deginerId, 'GET')
            await this.getTag({ id: this.deginerId, type: '4' })
            await this.getDesigner(this.deginerId, this.page)
            await this.getDesingerState()
            this.infoDesinger = this.infoDesinger.slice(0, 15)
            this.infoDesinger += '...'
            console.log('获取到的标题------------', this.deginerDetails.name)
            console.log('获取到的正文------------', this.infoDesinger)
            console.log('获取到的图片------------', this.getImageUrl(this.deginerDetails.headId))
            console.log('获取到的ID--------------', this.deginerDetails.id)
        }
    }
</script>

<style lang="scss" scoped>

    .iconfont {
        font-family: iconfont2;
    }

    .designer {
        width: 750;
        background-color: #fff;
    }

    .zuoPin {
        /*height:1440;*/
    }

    .status-bar {
        height: 36;
        background-color: #fff;
    }

    .bg-image {
        width: 750;
        height: 500;
    }

    .designer-intro {
        position: relative;
        height: 500;
    }

    .designer-header {
        position: fixed;
        top: 60;
        width: 750;
        padding: 0 20;
        flex-direction: row;
        justify-content: space-between;

    }

    .icon {
        font-family: iconfont;
        font-size: 42;
        color: #fff;
    }

    .icon2 {
        font-family: iconfont2;
        font-size: 42;
        color: #fff;
    }

    .designer-info {
        position: absolute;
        top: 140;
        padding: 0 30;
        flex-direction: row;
        align-items: center;
        height: 140;
    }

    .designer-image {
        width: 140;
        height: 140;
    }

    .designer-title {
        position: absolute;
        top: 104;
        left: 34;
        font-size: 24;
        padding: 4;
        color: #fff;
        background-color: #e60012;
        border-top-left-radius: 10;
        border-bottom-right-radius: 10;
    }

    .designer-details {
        height: 140;
        justify-content: space-between;
        margin-left: 20;
    }

    .designer-name {
        font-size: 40;
        color: #fff;
    }

    .designer-exp {
        font-size: 24;
        color: #fff;
    }

    .designer-style {
        font-size: 28;
        color: #fff;
    }

    .see {
        flex-direction: row;
        width: 280;
        justify-content: space-around;
    }

    .designer-follwers {
        color: #FFFFFF;
        margin-left: -90px;
    }

    .designer-follow {
        position: absolute;
        top: 360;
        width: 750px;
        height: 200px;
        flex-direction: row;
        justify-content: space-between;
    }

    .input {
        width: 600;
        height: 80;
        padding: 0 16;
        border-top-style: solid;
        border-top-color: #98999a;
        border-top-width: 2;
        border-left-style: solid;
        border-left-color: #98999a;
        border-left-width: 2;
        border-bottom-style: solid;
        border-bottom-color: #98999a;
        border-bottom-width: 2;
        border-right-style: solid;
        border-right-color: #98999a;
        border-right-width: 2;
        border-radius: 6;
    }

    .designer-follwer {
        color: #fff;
        height: 100px;
    }

    .designer-handdle {
        flex-direction: row;
        height: 60px;
    }

    .designer-focus {
        width: 160;
        height: 60;
        line-height: 60;
        font-size: 30;
        text-align: center;
        color: #333;
        background-color: #fff;
    }

    .designer-date {
        width: 160;
        height: 60;
        line-height: 60;
        margin-right: 30;
        font-size: 30;
        color: #fff;
        text-align: center;
        background-color: #e60012;
    }

    .header {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 750;
        height: 96;
        background-color: #fff;
        border-bottom-style: solid;
        border-bottom-color: #f5f5f5;
        border-bottom-width: 2;
    }

    .design-title {
        width: 180;
        height: 96;
        line-height: 96;
        text-align: center;
        font-size: 36;
    }

    .designer-des-wrapper {
        width: 690;
        line-height: 50;
        margin: 30;
        overflow: hidden;
    }

    .content {
        font-size: 28;
        line-height: 50;
    }

    .designer-comment {
        padding: 0 10;
        background-color: #fff;
    }

    .designer-more-info {
        text-align: center;
        color: #757575;
    }

    .case-item {
        padding: 10 30;
    }

    .case-image {
        width: 690;
        height: 426;
    }

    .case-des {
        padding: 10;
    }

    .case-text {
        padding-left: 30;
    }

    .minibar-left {
        flex-direction: row;
        align-items: center;
    }

    .minibar-avatar {
        width: 64;
        height: 64;
        border-radius: 64;
    }

    .minibar-middle {
        width: 400;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .handdle-wrapper {
        flex-direction: row;
    }

    .minibar-focus {
        width: 130;
        height: 52;
        line-height: 52;
        text-align: center;
        background-color: #fff;
        color: #e60012;
        border-top-style: solid;
        border-top-color: #e60012;
        border-top-width: 2;
        border-left-style: solid;
        border-left-color: #e60012;
        border-left-width: 2;
        border-bottom-style: solid;
        border-bottom-color: #e60012;
        border-bottom-width: 2;
        border-right-style: solid;
        border-right-color: #e60012;
        border-right-width: 2;
        border-radius: 4;
    }

    .minibar-date {
        margin-left: 20;
        width: 96;
        height: 52;
        line-height: 52;
        text-align: center;
        background-color: #e60012;
        color: #fff;
        border-radius: 4;
    }

    .minibar-right {
        flex-direction: row;
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
