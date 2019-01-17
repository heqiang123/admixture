<template>
    <div>
        <title-bar type="WORKSITE" :ID="id" :upCount="gdDetails.ups"
                   :isSave="gdDetails.save" :saveCount="gdDetails.saves"
                   :shareTitleName="gdDetails.housesName"
                   :shareContentName="contentName"
                   :shareId="gdDetails.id"
                   address="construction-detail"
                   :sharePicture="picture"
                   @clickSave="clickSave"></title-bar>
        <scroller class="con-details">
            <image class="con-cover" :src="`${getImageUrl(gdDetails.coverUrl)}&level=4`"></image>
            <div class="con-content">
                <div class="con-title">
                    <text class="con-building">{{gdDetails.housesName}}</text>
                    <text class="con-map" @click="goTo('others.map',{marker:{position:[gdDetails.longitude,gdDetails.latitude],title:gdDetails.name}})">&#xe656; 查看地图</text>
                </div>
                <div class="con-address">
                    <div class="line">
                        <text class="key">所在楼盘：</text>
                        <text class="value">{{gdDetails.apartmentType}}</text>
                    </div>
                    <div class="line">
                        <text class="key">楼盘地址：</text>
                        <text class="value">{{gdDetails.housesAddress}}</text>
                    </div>
                </div>
                <div class="personal-info">
                    <text class="key">定制信息</text>
                    <div class="con-basic-column">
                        <div class="con-basic-item">
                            <text class="con-item-label">户型</text>
                            <text class="con-item-value">{{contentTag('BQ000003')}}</text>
                        </div>
                        <div class="line-wrapper"></div>
                        <div class="con-basic-item">
                            <text class="con-item-label">风格</text>
                            <text class="con-item-value">{{contentTag('BQ000002')}}</text>
                        </div>
                        <div class="line-wrapper"></div>
                        <div class="con-basic-item">
                            <text class="con-item-label">建筑面积</text>
                            <text class="con-item-value">{{gdDetails.siteArea}}平方米</text>
                        </div>
                    </div>
                </div>
                <div class="building">
                    <div class="title-zone">
                        <div class="title-wrapper">
                            <text class="title-prefix"></text>
                            <text class="title-content">施工图</text>
                        </div>
                        <text class="title-extra">{{construcitonUrlArr.length}}种</text>
                    </div>
                    <scroller class="building-case" scroll-direction="horizontal" v-if="this.construcitonUrlArr.length">
                        <image @click="tobigImages(index)" style="margin-right: 20px" class="building-img" v-for="(item,index) of construcitonUrlArr.slice(0,6)" :key="index" :src="`${item}&level=4`"></image>
                    </scroller>
                </div>
                <div class="building">
                    <div class="title-zone">
                        <div class="title-wrapper">
                            <text class="title-prefix"></text>
                            <text class="title-content">实景图片</text>
                        </div>
                    </div>
                    <div class="case-case">
                        <div v-for="(item,index) in imgPathArr.slice(0,6)" :key="index" @click="tobigImage(index)">
                            <image class="case-img" resize="cover"  :src="item"></image>
                        </div>
                    </div>
                    <wxc-button text="显示更多" v-if="imgPathArr.length>6"
                                @wxcButtonClicked="goTo('con.image',{imgPathArrs:imgPathArr,isCase:false})"
                                :btnStyle="{'background-color': '#f5f5f5', 'margin-top': 40, 'margin-bottom': 40, height: 82, width: 710}"
                                :textStyle="{'font-size': 28, color: '#757575'}"
                    ></wxc-button>
                </div>
                <div class="designer" @click="goToDesign">
                    <image class="designer-image" resize="cover" :src="getImageUrl(desingerDetails.headUrl)"></image>
                    <div class="designer-intro">
                        <text class="designer-name">{{desingerDetails.name}}</text>
                        <text class="designer-exp">{{desingerDetails.busiContentStoreName}} | {{desingerDetails.jobLength}}年工作经验</text>
                        <div class="goods">
                            <text class="designer-style">擅长风格:</text>
                            <div v-for="(good,index) in goodStyle" :key="index">
                                <text class="designer-style">{{good.name}}|</text>
                            </div>
                        </div>
                    </div>
                </div>
                <Comment-zone :type="3" :id="id" :urlHomePagesImg="getImageUrl(gdDetails.coverUrl)"></Comment-zone>
            </div>
        </scroller>
        <!--<wxc-lightbox-->
                <!--ref="wxc-lightbox"-->
                <!--height="500"-->
                <!--width="750"-->
                <!--overlay-opacity="1"-->
                <!--:show="showImg"-->
                <!--indicator-color="{'item-color': 'rgba(0, 0, 0, 1)','item-selected-color': '#000000','item-size': '0px'}"-->
                <!--:image-list="imageList"-->
                <!--@wxcLightboxOverlayClicked="wxcLightboxOverlayClicked">-->
        <!--</wxc-lightbox>-->
    </div>
</template>

<script>
    import titleBar from '../../components/titleBar'
    import CommentZone from '../../components/commentZone'
    import DesignerCard from '../../components/designerCard'
    import { WxcButton } from 'weex-ui'
    import { getWorkSite, getGdDesinger } from '../../service/constructionApi'
    import mixins from '../../common/mixins'
    import WxcLightbox from '../../components/wxcLightBox'

    export default {
        name: 'conDetails',
        components: { titleBar, CommentZone, DesignerCard, WxcButton, WxcLightbox },
        data () {
            return {
                // 工地的id
                gdId: '',
                // 工地详情
                gdDetails: {},
                // 传入的code
                code: '',
                picture: [],
                // 设计师的详细信息
                desingerDetails: {},
                // 设计师的擅长的风格
                goodStyle: [],
                // 施工图数组
                construcitonUrlArr: [],
                contentName: '工地的分享',
                imgPathArr: [], // 实景图数组
                imageList: Array
            }
        },
        mixins: [mixins],
        methods: {
            goToDesign () {
                if (this.gdDetails.accountId) {
                    this.goTo('design.designer', { id: this.gdDetails.designerId })
                } else {
                    this.goTo('desig.index', { id: this.gdDetails.designerId })
                }
            },
            tobigImage (index) {
                // const bigUrls = JSON.parse(JSON.stringify(this.imgPathArr))
                // const imgList = []
                // this.bigImgs = []
                // for (const i in bigUrls) {
                //     bigUrls[i] += '&level=3'
                //     imgList.push(bigUrls[i])
                //     this.bigImgs.push({ src: bigUrls[i] })
                // }
                // console.log('===========================================================================')
                // console.log(JSON.stringify(this.bigImgs))
                // console.log('===========================================================================')
                // if (weex.config.env.platform === 'iOS') {
                //     weex.requireModule('WeexPreview').showParams(index, imgList)
                // } else {
                //     this.showImg = true
                //     this.initialSlide = index
                //     this.imageList = this.bigImgs
                // }
                this.$image.preview({
                    index: index,
                    images: this.imgPathArr
                })
            },
            tobigImages (index) {
                this.$image.preview({
                    index: index,
                    images: this.construcitonUrlArr
                })
            },
            clickUp (val) {
                this.gdDetails.up = val
            },
            clickSave (val) {
                this.gdDetails.save = val
            },
            // 得到工地的详细信息
            async getGdWorket (id, method) {
                const result = await getWorkSite(id, method)
                if (result) {
                    this.gdDetails = result
                    this.code = result.projectCode
                }
            },
            // 得到工地的相关设计师
            async getGdDesingerDetails () {
                const result = await getGdDesinger(this.code, 'GET')
                if (result) {
                    this.desingerDetails = result
                }
                if (result && result.tags.length > 0) {
                    result.tags.forEach((value) => {
                        if (value.parent.code === 'BQ000002') {
                            this.goodStyle.push(value)
                        }
                    })
                }
            },
            contentTag (index) {
                for (const key in this.gdDetails.customerTags) {
                    if (this.gdDetails.customerTags.hasOwnProperty(key)) {
                        const element = this.gdDetails.customerTags[key]
                        if (element.parent.code === index) {
                            return element.name
                        }
                    }
                }
                return '暂无'
            }
        },
        beforeCreate () {
            this.$navigator.setNavigationInfo({
                title: '',
                navShow: false,
                statusBarStyle: 'Default'
            })
        },
        async mounted () {
            const params = await this.$router.getParams()
            if (params && params.id) {
                this.id = params.id
                await this.getGdWorket(this.id, 'GET')
                await this.getGdDesingerDetails()
            }
            this.headId = await this.getImageUrl(this.gdDetails.coverUploadPicturePath)
            const construction = await this.getImageUrls(this.gdDetails.constructionUploadPicturePath)
            for (const value of construction) {
                this.construcitonUrlArr.push(value)
            }
            const url2 = await this.getImageUrls(this.gdDetails.startPreparationUploadPicturePath)
            const url3 = await this.getImageUrls(this.gdDetails.hydropowerStageUploadPicturePath)
            const url4 = await this.getImageUrls(this.gdDetails.mudWoodStageUploadPicturePath)
            const url5 = await this.getImageUrls(this.gdDetails.paintInstallationStageUploadPicturePath)
            for (let index = 0; index < url2.length; index++) {
                this.imgPathArr.push(`${url2[index]}&level=3`)
            }
            for (let index = 0; index < url3.length; index++) {
                this.imgPathArr.push(`${url3[index]}&level=3`)
            }
            for (let index = 0; index < url4.length; index++) {
                this.imgPathArr.push(`${url4[index]}&level=3`)
            }
            for (let index = 0; index < url5.length; index++) {
                this.imgPathArr.push(`${url5[index]}&level=3`)
            }

            this.picture = this.getImageUrl(this.gdDetails.coverUrl)
            // this.$storage.deleteSync('urlHomeImg')
            this.$storage.setSync('urlHomeImg', this.picture)
        },
        eros: {
            async appeared (params) {
                if (params && params.id) {
                    this.id = params.id
                    await this.getGdWorket(this.id, 'GET')
                    await this.getGdDesingerDetails()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .con-details {
        width: 750;
        background-color: #fff;
    }

    .con-content {
        padding: 20;
    }

    .con-cover {
        width: 750;
        height: 450;
    }

    .goods {
        flex-direction: row;

    }

    .con-title {
        margin-top: 20;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
    }

    .con-building {
        font-size: 36;
        font-weight: 700;
    }

    .con-map {
        font-family: iconfont;
        font-size: 24;
        color: #555;
    }

    .line {
        margin-top: 20;
        flex-direction: row;
    }

    .key {
        font-size: 30;
        color: #212121;
    }

    .value {
        width: 560;
        flex-wrap: wrap;
        font-size: 30;
        color: #555;
    }

    .personal-info {
        margin-top: 40;
    }

    .con-basic-column {
        margin: 20 0;
        flex-direction: row;
        height: 90;
    }

    .con-basic-item {
        width: 250;
        justify-content: space-between;
        align-items: center;
    }

    .con-item-label {
        font-size: 28;
        color: #999;
    }

    .con-item-value {
        font-size: 32;
        color: #212121;
    }

    .line-wrapper {
        height: 70;
        width: 2;
        background-color: rgba(0, 0, 0, .1);
    }

    .building {
        margin-top: 80;
    }

    .title-zone {
        margin-bottom: 40;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .title-wrapper {
        flex-direction: row;
        align-items: center;
    }

    .title-prefix {
        width: 12;
        height: 40;
        margin-right: 20;
        background-color: #353535;
    }

    .title-content {
        font-size: 32;
        color: #212121;
    }

    .title-extra {
        font-family: iconfont;
        font-size: 28;
        color: #999;
    }

    .building-case {
        height: 304;
        flex-direction: row;
    }

    .building-wrapper {
        position: relative;
        width: 552;
        height: 304;
        margin-right: 12;
    }

    .building-img {
        width: 552;
        height: 304;
    }

    .case-case {
        flex-direction: row;
        flex-wrap: wrap;
    }

    .case-img {
        width: 230;
        height: 230;
        margin: 0 6 6 0;
    }

    .designer {
        margin-top: 40;
        flex-direction: row;
        align-items: center;
        height: 140;
    }

    .designer-intro {
        height: 140;
        justify-content: space-between;
        margin-left: 20;
    }

    .designer-image {
        width: 140;
        height: 140;
        border-radius: 140;
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
</style>
