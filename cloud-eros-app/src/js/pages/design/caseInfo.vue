<template>
    <div v-if="showPage">
        <title-bar type="CASE" :ID="id"  :upCount="content.ups" :isSave="content.save" :saveCount="content.saves"
        @clickSave="clickSave" :shareTitleName="content.title"
         :shareContentName="infoDetails" :shareId ="content.id" :sharePicture="urlHomePagesImg" address="case-detail">
         </title-bar>
        <scroller class="case-info">
            <div class="case-list">
                <div class="img-list">
                    <div v-for="(item,index) in urls.slice(0,6)" :key="index" @click="tobigImage(index)">
                        <image class="case-image" resize="cover" :src="`${item.ossUrl}?x-oss-process=image/resize,w_200`"></image>
                    </div>
                </div>
                <div class="case-more-photos" v-if="urls.length>6">
                    <div class="inner-wrapper">
                        <text class="photo-number">{{urls.length}}</text>
                        <text class="photo-des">PHOTOS</text>
                    </div>
                </div>
            </div>
            <div class="case-details">
                <div class="case-intro">
                    <text class="case-title">{{content.title}}</text>
                    <div class="case-address">
                        <text class="case-building">所在楼盘：{{content.housesName}}</text>
                        <text class="case-map" @click="goTo('others.map',{marker:{position:[caseData.housesLongitude,caseData.housesLatitude],title:content.housesName}})">&#xe656; 查看地图</text>
                    </div>
                </div>
                <div class="case-basic-info">
                    <div class="case-basic-title">定制信息</div>
                    <div class="case-basic-column">
                        <div class="case-basic-item">
                            <text class="case-item-label">户型</text>
                            <text class="case-item-value">{{housetype}}</text>

                        </div>
                        <div class="line"></div>
                        <div class="case-basic-item">
                            <text class="case-item-label">风格</text>
                            <text class="case-item-value">{{housestyle}}</text>
                        </div>
                        <div class="line"></div>
                        <div class="case-basic-item">
                            <text class="case-item-label">建筑面积</text>
                            <text class="case-item-value">{{housearea}}</text>
                        </div>
                        <div class="line"></div>
                        <div class="case-basic-item">
                            <text class="case-item-label">总造价</text>
                            <text class="case-item-value">{{housecost}}</text>
                        </div>
                    </div>
                    <div class="case-personal-info">
                        <div class="case-basic-title">案例简介</div>
                        <text class="case-personal-content" :style="state.isShowMore ? {} : {height: 160}">{{infoDetails}}</text>
                        <text class="case-more-info" @click="state.isShowMore = !state.isShowMore" v-if="infoDetails.length > 88">{{state.isShowMore ? '↑收起' : '更多简介'}}</text>
                    </div>
                    <div @click="goToDesigner" class="case-designer-info">
                        <image class="designer-image" resize="cover" :src="`${desingDeatils.headUrl}?x-oss-process=image/resize,w_200/crop,x_0,y_0,w_200,h_200/circle,r_100/format,png`"></image>
                        <div class="designer-intro">
                            <text class="designer-name">{{desingDeatils.name}}</text>
                            <text class="designer-exp">{{desingDeatils.busiContentStoreName}} | {{desingDeatils.jobLength}}年工作经验</text>
                            <text class="designer-style">擅长风格:</text>
                            <list class="list-good">
                                <cell v-for="item of goodStyle">
                                    <text class="designer-style">{{item}}</text>
                                </cell>
                            </list>
                        </div>
                    </div>
                    <comment-zone :id="id" type="0" :urlHomePagesImg="urlHomePagesImg" :details="tagsArrs" enter="2"></comment-zone>
                </div>
                <div class="case-more" @appear="onappear()">
                    <div class="designer-item-title">
                        <text class="designer-title-prefix"></text>
                        <text class="designer-title-content">喜欢这个案例的人还看了…</text>
                    </div>
                    <div class="case-list" v-if="likeCaseAppearIshow">
                        <image v-for="(item,index) in bootomImgList.slice(0,6)" :key="index" class="case-more-image" @click="goTo('design.case',{id:item.id})" resize="cover" :src="`${getImageUrl(item.homepageUrl)}&level=5`"></image>
                    </div>
                    <wxc-button v-if="bootomImgList.length>6" text="显示更多"
                                @wxcButtonClicked="goTo('case.list',{id:this.id,type:'1'})"
                                :btnStyle="{'background-color': '#f5f5f5', 'margin-top': 8, height: 82, width: 710}"
                                :textStyle="{'font-size': 28, color: '#757575'}"
                    ></wxc-button>
                </div>

            </div>
        </scroller>
        <wxc-lightbox
                ref="wxc-lightbox"
                height="500"
                width="750"
                overlay-opacity="1"
                :show="showImg"
                indicator-color="{'item-color': 'rgba(0, 0, 0, 1)','item-selected-color': '#000000','item-size': '0px'}"
                :image-list="imageList"
                @wxcLightboxOverlayClicked="wxcLightboxOverlayClicked">
        </wxc-lightbox>
    </div>
</template>

<script>
    import commentInput from '../../components/commentInput'
    import titleBar from '../../components/titleBar'
    import CommentZone from '../../components/commentZone'
    import { WxcMask } from 'weex-ui'
    import {
        getBusiContentCaseById,
        getBusiContentHouseByCaseId,
        getBusiContentDesignerById,
        getgroomCase
    } from '../../service/caseApi'
    import { findTagsByTypeAndBusinessId } from '../../service/commentsApi'
    import { WxcButton, Utils } from 'weex-ui'
    import WxcLightbox from '../../components/wxcLightBox'
    import mixins from '../../common/mixins'

    export default {
        name: 'caseInfo',
        components: { titleBar, WxcButton, CommentZone, commentInput, WxcMask, WxcLightbox },
        mixins: [mixins],
        data: () => ({
            isShow: false,
            // 展示页面的内容
            showPage: true,
            backgroudColor: '#000000',
            content: {},
            caseData: {},
            loupanContent: {},
            urls: [],
            tagsArrs: [],
            id: '',
            name: '',
            styleName: '',
            totalNme: '',
            priceName: '',
            infoDetails: '',
            // 设计师的详细信息
            desingDeatils: {},
            // 案例传过来的id
            urlHomePagesImg: '',
            // 设计师擅长的风格
            goodStyle: [],
            bootomImgList: [],
            imageLists: '',
            state: {
                isShowMore: false
            },
            showIndicator: false,
            imageList: [],
            showImg: false,
            housetype: '',
            housestyle: '',
            housearea: '',
            housecost: '',
            initialSlide: 0,
            show: false,
            overlayCanClose: true,
            isFalse: false,
            hasAnimation: true,
            bigUrl: '',
            pageHeight: 0,
            likeCaseAppearIshow: false
        }),
        methods: {
            goToDesigner () {
                if (this.desingDeatils.accountId) {
                    this.goTo('design.designer', { id: this.desingDeatils.id })
                } else {
                    this.goTo('desig.index', { id: this.desingDeatils.id })
                }
            },
            onappear () {
                this.likeCaseAppearIshow = true
            },
            // 获取案例的信息
            async getCaseDetail (id, method) {
                const result = await getBusiContentCaseById(id, method)
                this.content = result
                console.log('contentid-------', JSON.stringify(this.content))
                if (this.content) {
                    const url1 = await this.getImageInfoData(this.content.housesId)
                    const url2 = await this.getImageInfoData(this.content.impressionId)
                    const url3 = await this.getImageInfoData(this.content.viewId)
                    const url4 = await this.getImageInfoData(this.content.planId)
                    this.urls = this.urls.concat(url1, url2, url3, url4)
                    console.log(JSON.stringify(this.urls))
                    this.urlHomePagesImg = this.urls[0].imageUrl
                    // this.$storage.deleteSync('urlHomeImg')
                    // this.$storage.setSync('urlHomeImg', this.urlHomePagesImg)
                }
                if (this.content.tags) {
                    for (let index = 0; index < this.content.tags.length; index++) {
                        if (this.content.tags[index].parent.code === 'BQ000009') {
                            this.housetype = this.content.tags[index].name
                        }
                        if (this.content.tags[index].parent.code === 'BQ000010') {
                            this.housestyle = this.content.tags[index].name
                        }
                        if (this.content.tags[index].parent.code === 'BQ000013') {
                            this.housearea = this.content.tags[index].name
                        }
                        if (this.content.tags[index].parent.code === 'BQ000011') {
                            this.housecost = this.content.tags[index].name
                        }
                    }
                } else {
                    this.housetype = '无'
                    this.housestyle = '无'
                    this.housearea = '无'
                    this.housecost = '无'
                }
                this.infoDetails = this.delHtmlTags(result.profile)
            },
            async getCaseData (id, method) {
                this.caseData = await getBusiContentHouseByCaseId(id, method)
            },
            // 获取标签的内容
            async getfindTagsByTypeAndBusinessId (data, method) {
                const result = await findTagsByTypeAndBusinessId(data, method)
                this.tagsArrs = result
            },
            // 获取设计师的信息
            async getDesingDetails (id, method) {
                const result = await getBusiContentDesignerById(id, method)
                this.desingDeatils = result
                console.log('mmmmmmmmmmm-------------', this.desingDeatils)
                if (result && result.tags > 0) {
                    for (let i = 0; i < result.tags.length; i++) {
                        this.goodStyle.push(result.tags[i].name)
                    }
                }
            },
            // 得到下面的图片
            async caseImgList (id, method) {
                const result = await getgroomCase(id, method)
                this.bootomImgList = result
            },
            clickSave (val) {
                this.content.save = val
            },
            // 得到大的图片
            // tobigImage (index) {
            //     // 点击看大图
            //     // this.showImg = true
            //     // this.initialSlide = index
            //     // this.bigImgs = []
            //     // const bigUrls = JSON.parse(JSON.stringify(this.urls))
            //     // for (const i in bigUrls) {
            //     //     bigUrls[i].imageUrl += '&level=1'
            //     //     this.bigImgs.push({ src: bigUrls[i].imageUrl })
            //     // }
            //     // this.imageList = this.bigImgs
            //     const bigUrls = JSON.parse(JSON.stringify(this.urls))
            //     const imgList = []
            //     this.bigImgs = []
            //     for (const i in bigUrls) {
            //         bigUrls[i].imageUrl += '&level=3'
            //         imgList.push(bigUrls[i].imageUrl)
            //         this.bigImgs.push({ src: bigUrls[i].imageUrl })
            //     }
            //     if (weex.config.env.platform === 'iOS') {
            //         weex.requireModule('WeexPreview').showParams(index, imgList)
            //     } else {
            //         this.showImg = true
            //         this.initialSlide = index
            //         this.imageList = this.bigImgs
            //     }
            // },
            // 得到大的图片
            tobigImage (index) {
                // 点击看大图
                console.log(index)
                // this.showImg = true
                // this.initialSlide = index
                // this.bigImgs = []
                // const bigUrls = JSON.parse(JSON.stringify(this.urls))
                // for (const i in bigUrls) {
                //     bigUrls[i].imageUrl += '&level=1'
                //     this.bigImgs.push({ src: bigUrls[i].imageUrl })
                // }
                // this.imageList = this.bigImgs
                const bigUrls = JSON.parse(JSON.stringify(this.urls))
                const imgList = []
                this.bigImgs = []
                for (const i in bigUrls) {
                    bigUrls[i].ossUrl += '?x-oss-process=image/resize,w_800'
                    imgList.push(bigUrls[i].ossUrl)
                    this.bigImgs.push({ src: bigUrls[i].ossUrl })
                }
                // 从新定义数组
                const exampleList = []
                const exampleLists = []
                this.bigImgs.map((arr, idx) => {
                    if (idx < index) {
                        exampleList.push(arr)
                    } else {
                        exampleLists.push(arr)
                    }
                })
                const arr = exampleLists.concat(exampleList)
                console.log(arr)
                if (weex.config.env.platform === 'iOS') {
                    weex.requireModule('WeexPreview').showParams(index, imgList)
                } else {
                    this.showImg = true
                    this.initialSlide = index
                    this.imageList = arr
                }
            },
            wxcLightboxOverlayClicked (e) {
                // 无状态组件，需要在此次关闭
                this.showImg = false
            },
            selectSort () {
                this.isShow = false
            },
            closeSwiper () {
                this.isShow = false
            },
            async reloadList (value) {
                if (value.reload === 'true' && this.content) {
                    this.urls = []
                    const url1 = await this.getImageInfoData(this.content.housesId)
                    const url2 = await this.getImageInfoData(this.content.impressionId)
                    const url3 = await this.getImageInfoData(this.content.viewId)
                    const url4 = await this.getImageInfoData(this.content.planId)
                    this.urls = this.urls.concat(url1, url2, url3, url4)
                }
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
            this.$router.setBackParams({ todo: 'refresh' })
            this.showLoading('加载中')
            const params = await this.$router.getParams()
            if (params.id) {
                this.id = params.id
                await this.getCaseDetail(this.id, 'GET')
                await this.getCaseData(this.id, 'GET')
                await this.getDesingDetails(this.id, 'GET')
                await this.caseImgList(this.id, 'GET')
                await this.getfindTagsByTypeAndBusinessId({ id: this.id, type: 0 })
            }
            this.hideLoading()
        },
        mounted () {
            // this.reloadList()
            this.pageHeight = Utils.env.getPageHeight()
        }
    }
</script>

<style lang="scss" scoped>
    .case-info {
        width: 750px;
        background-color: #fff;
    }

    .case-list {
        width: 750;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .case-image {
        width: 245;
        height: 245;
        margin: 2;
    }

    .img-list {
        width: 750;
        flex-direction: row;
        flex-wrap: wrap;
        /*justify-content: space-between;*/
    }

    .case-more-photos {
        position: absolute;
        bottom: 50;
        right: 50;
        width: 150;
        height: 150;
        padding: 10;
        border-top-style: solid;
        border-top-color: #fff;
        border-top-width: 2;
        border-left-style: solid;
        border-left-color: #fff;
        border-left-width: 2;
        border-bottom-style: solid;
        border-bottom-color: #fff;
        border-bottom-width: 2;
        border-right-style: solid;
        border-right-color: #fff;
        border-right-width: 2;
    }

    .inner-wrapper {
        justify-content: center;
        align-items: center;
        height: 126;
        background-color: #fff;
    }

    .photo-number {
        font-size: 32;
    }

    .photo-des {
        font-size: 24;
    }

    .case-details {
        padding: 20;
        /*height: ;*/
    }

    .case-intro {
        height: 120;
        justify-content: space-between;
    }

    .case-title {
        font-size: 36;
        color: #212121;
        font-weight: 700;
    }

    .case-address {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .case-map {
        font-family: iconfont;
        font-size: 24;
        color: #555;
    }

    .case-basic-info {
        margin-top: 40;
        /*height:1200;*/
    }

    .case-basic-title {
        font-size: 32;
        color: #555;
    }

    .case-basic-column {
        margin: 20 0;
        flex-direction: row;
        height: 90;
    }

    .designer-comment {
        margin: 20 0;
        flex-direction: row;
        height: 90;
    }

    .case-basic-item {
        width: 176;
        justify-content: space-between;
        align-items: center;
    }

    .case-item-label {
        font-size: 28;
        color: #999;
    }

    .case-item-value {
        font-size: 32;
        color: #212121;
    }

    .line {
        height: 70;
        width: 2;
        background-color: rgba(0, 0, 0, .1);
    }

    .case-personal-content {
        margin: 50 30 30;
        font-size: 30;
        line-height: 40;
        height: 160;
        overflow: hidden;
        color: #555;
    }

    .case-more-info {
        text-align: center;
        color: #757575;
    }

    .case-more {
        /*height:800;*/
    }

    .case-designer-info {
        margin-top: 60;
        font-size: 28;
        flex-direction: row;
        align-items: center;
        height: 140;
    }

    .designer-image {
        width: 140;
        height: 140;
        /*border-radius: 140;*/
    }

    .designer-intro {
        height: 140;
        justify-content: space-between;
        margin-left: 20;
    }

    .designer-name {
        font-size: 40;
        color: #555;
    }

    .designer-exp {
        font-size: 28;
        color: #999;
    }

    .designer-style {
        font-size: 24;
        color: #757575;
    }

    .designer-item-title {
        margin-top: 60;
        margin-bottom: 40;
        flex-direction: row;
        align-items: center;
    }

    .designer-title-prefix {
        width: 12;
        height: 40;
        margin-right: 20;
        background-color: #353535;
    }

    .designer-title-content {
        font-size: 32;
        color: #212121;
    }

    .case-more-image {
        width: 230;
        height: 230;
        margin: 2;
    }

    .goods {
        flex-direction: row;

    }

    .list-good {
        flex-direction: row;
        width: 600;
        justify-content: space-between;
    }

    .inner {
        width: 100;
        height: 100;
    }

    .content {
        background-color: grey;
        height: 500;
        width: 750;
    }

    .bigImage {
        height: 500;
        width: 750;
    }

    .wex-demo {
        /*position: absolute;*/
        /*top: 0;*/
        /*bottom: 0;*/
        /*left: 0;*/
        /*right: 0;*/
        background-color: #000000;

    }
</style>
