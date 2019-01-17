<template>
    <div>
        <title-bar type="HOUSE" :ID="estateId" :upCount="estateDetail.ups"
                   :isSave="estateDetail.save" :saveCount="estateDetail.saves"
                   :shareTitleName="estateDetail.name"
                   :shareContentName="otherInformation"
                   :shareId="estateDetail.id"
                   :sharePicture="picture"
                   address="estate-detail"
                   @clickSave="clickSave">
        </title-bar>
        <scroller class="estate-details">
            <image class="estate-cover" :src="`${getImageUrl(estateDetail.frontUrl)}&level=4`"></image>
            <div class="estate-content">
                <div class="estate-title">
                    <text class="estate-building">{{estateDetail.name || ''}}</text>
                    <text class="estate-map" @click="goTo('others.map',{marker:{position:[estateDetail.longitude,estateDetail.latitude],title:estateDetail.name}})">&#xe656; 查看地图</text>
                </div>
                <div class="estate-address">
                    <div class="line">
                        <text class="key">楼盘地址：</text>
                        <text class="value">{{estateDetail.addr || ''}}</text>
                    </div>
                    <div class="line">
                        <text class="key">开发商：</text>
                        <text class="value">{{estateDetail.developer || ''}}</text>
                    </div>
                </div>
                <div class="personal-info">
                    <text class="key info-title" v-if="otherInformation?true:false">楼盘简介</text>
                    <text class="info-text">{{otherInformation}}</text>
                </div>
                <div class="building" v-if="houseKindDetailData && houseKindDetailData.length">
                    <div class="title-zone">
                        <div class="title-wrapper">
                            <text class="title-prefix"></text>
                            <text class="title-content">户型图</text>
                        </div>
                        <text class="title-extra">{{ houseKindDetailData ? houseKindDetailData.length : 0 }}种</text>
                    </div>
                    <scroller class="building-case" scroll-direction="horizontal">
                        <div class="building-wrapper" v-for="(item,index) of houseKindDetailData" :key="index">
                            <image class="building-img" :src="item"></image>
                            <!--<text class="building-des">{{item.houseTypeKind}} | {{item.imageCount}}图</text>-->
                        </div>
                    </scroller>
                </div>
                <div class="constructions" v-if="newWorkSite && newWorkSite.length">
                    <div class="title-zone">
                        <div class="title-wrapper">
                            <text class="title-prefix"></text>
                            <text class="title-content">楼盘工地</text>
                            <text class="title-extra">已预约{{appointmentCount}}次</text>
                        </div>
                        <text class="title-extra">{{workSite.length ? workSite.length : ''}}个</text>
                    </div>
                    <scroller class="building-case" scroll-direction="horizontal">
                        <div class="constructions-wrapper" @click="goTo('con.details',{id:item.id})" v-for="(item,index) of workSite" :key="index" v-if="item.worksiteType === '1'">
                            <image class="constructions-img" :style="{height:351}"
                                   :src="`${getImageUrl(item.coverUrl)}&level=5`"></image>
                            <text class="constructions-des" v-if="item.worksiteType == 0" @click="goTo('order.con',{id:item.id,name:item.housesName,type:9})">预约参观</text>
                            <text class="constructions-status">{{constructionStageDic[item.constructionStage]}}</text>
                        </div>
                    </scroller>
                    <wxc-button text="显示更多"
                                @wxcButtonClicked="goTo('con.index',{id:estateId,homePhone:homePhone})"
                                :btnStyle="{'background-color': '#f5f5f5', 'margin-top': 40, 'margin-bottom': 40, height: 82, width: 710}"
                                :textStyle="{'font-size': 28, color: '#757575'}"
                    ></wxc-button>
                </div>
                <div class="case" v-if="caseList && caseList.length">
                    <div class="title-zone" @appear="onappear()">
                        <div class="title-wrapper">
                            <text class="title-prefix"></text>
                            <text class="title-content">案例</text>
                        </div>
                    </div>
                    <div class="case-case" v-if="estateDetailCaseAppearIsshow">
                        <image class="case-img" v-for="(item,index) of caseList"
                               @click="goTo('design.case',{id:item.id})" :key="index"
                               :src="`${item.homepageId}?x-oss-process=image/resize,w_250`"></image>
                    </div>
                    <wxc-button v-if="totalRows>6" text="显示更多"
                                @wxcButtonClicked="goTo('case.list',{id:estateId,type:'4'})"
                                :btnStyle="{'background-color': '#f5f5f5', 'margin-top': 40, 'margin-bottom': 40, height: 82, width: 710}"
                                :textStyle="{'font-size': 28, color: '#757575'}"
                    ></wxc-button>
                </div>
                <div class="designer">
                    <div class="title-zone">
                        <div class="title-wrapper">
                            <text class="title-prefix"></text>
                            <text class="title-content">设计师</text>
                        </div>
                        <text class="title-extra" @click="goTo('designer.index',{frontHouseId:estateDetail.id})">查看全部 &#xe60a;</text>
                    </div>
                    <scroller class="building-case" :style="{height: 440}" scroll-direction="horizontal">
                        <designer-card :detail="item" v-for="(item,index) of designerList" :key="index"></designer-card>
                    </scroller>
                </div>
            </div>
            <Comment-zone :id="estateId" type='1' :urlHomePagesImg="getImageUrl(estateDetail.frontUrl)"></Comment-zone>
        </scroller>
    </div>
</template>

<script>
    import titleBar from '../../components/titleBar'
    import CommentZone from '../../components/commentZone'
    import DesignerCard from '../../components/designerCard2'
    import { WxcButton } from 'weex-ui'
    import mixins from '../../common/mixins'
    import { getCommentList } from '../../service/baseApi'
    import { getEstateById, getWorkSiteByEstate, getDesignesByEstate, getCaseByEstate } from '../../service/estateApi'
    import { AmHtml } from 'weex-amui'
    import { AtjiaView } from '../../components/atjiaView'

    export default {
        name: 'estateDetails',
        components: { titleBar, CommentZone, DesignerCard, WxcButton, AtjiaView, AmHtml },
        mixins: [mixins],
        data () {
            return {
                estateId: '',
                appointmentCount: 0,
                homePhone: null,
                estateDetail: {},
                otherInformation: '',
                houseKindDetailData: [],
                picture: '',
                workSite: [],
                newWorkSite: [],
                designerList: [],
                caseList: [],
                // 传过来的id
                easteId: '',
                constructionStageDic: [
                    '开工准备',
                    '水电阶段',
                    '泥木阶段',
                    '油漆安装阶段'
                ],
                estateDetailCaseAppearIsshow: false,
                totalRows: ''
            }
        },
        methods: {
            onappear () {
                this.estateDetailCaseAppearIsshow = true
            },
            // 获取评论
            async getComList () {
                const result = await getCommentList({ type: 1, id: this.estateId })
            },
            // 通过id获取楼盘详情
            async getEstateDetail (id) {
                if (!this.isEmpty(id)) {
                    const result = await getEstateById(id, 'GET')
                    this.estateDetail = result
                    console.log('楼盘的信息', JSON.stringify(this.estateDetail))
                    this.otherInformation = this.delHtmlTags(result.otherInformation)
                    const list = result.busiContentHouseFrontDetailDtoList
                    for (let index = 0; index < list.length; index++) {
                        const element = list[index]
                        const urlArray = await this.getImageUrls(element.houseTypePicture)
                        element.headUrl = urlArray
                        list[index] = element
                    }
                    this.houseKindDetailData = list[0].headUrl
                    console.log('zzzzzzzzzzz-------------', JSON.stringify(this.houseKindDetailData))
                } else {
                    this.toast('系统异常')
                }
            },
            // 获取当前楼盘的工地
            async getWorkSite (id, pageSize, tags = [], orderby, page) {
                let queryParamList = [
                    {
                        'field': 'frontHouseId',
                        'type': 'string',
                        'logic': 'like',
                        'value': id,
                        'items': []
                    }
                ]
                const mTages = tags.map(value => {
                    return { field: 'tags' + value.Key, type: 'string', logic: '', items: value.tags }
                })
                queryParamList = queryParamList.concat(mTages)
                const result = await getWorkSiteByEstate({
                    export: false,
                    orderBy: orderby || 'appointment desc',
                    page: page || 1,
                    pageSize: pageSize || 6,
                    queryParamList: queryParamList
                })
                this.workSite = result.content
                this.workSite.forEach((item, index) => {
                    if (item.worksiteType === '1') {
                        this.newWorkSite.push(item)
                    }
                })
                let appointmentCount = 0
                result.content.forEach(element => {
                    if (!element.appointment) {
                        element.appointment = 0
                    }
                    appointmentCount += element.appointment
                })
                this.appointmentCount = appointmentCount
            },
            // 获取当前楼盘的设计师
            async getDesignes (id, pageSize, tags = [], orderby, page) {
                let queryParamList = [
                    {
                        'field': 'frontHouseId',
                        'type': 'string',
                        'logic': 'like',
                        'value': id,
                        'items': []
                    }
                ]
                const mTages = tags.map(value => {
                    return { field: 'tags' + value.Key, type: 'string', logic: '', items: value.tags }
                })
                queryParamList = queryParamList.concat(mTages)
                const result = await getDesignesByEstate({
                    export: false,
                    orderBy: orderby || 'ups desc',
                    page: page || 1,
                    pageSize: 10,
                    queryParamList: queryParamList
                })
                const list = result.content
                // for (let index = 0; index < list.length; index++) {
                //     const url = await this.getImageUrl(list[index].headId)
                //     list[index].headUrl = url
                // }
                this.designerList = list
            },
            // 获取当前楼盘的案例
            async getCase (id, pageSize, tags = [], orderby, page) {
                let queryParamList = [
                    {
                        'field': 'housesId',
                        'type': 'string',
                        'logic': 'like',
                        'value': id,
                        'items': []
                    }
                ]
                const mTages = tags.map(value => {
                    return { field: 'tags' + value.Key, type: 'string', logic: '', items: value.tags }
                })
                queryParamList = queryParamList.concat(mTages)
                const result = await getCaseByEstate({
                    export: false,
                    orderBy: orderby || 'ups desc',
                    page: page || 1,
                    pageSize: pageSize || 6,
                    queryParamList: queryParamList
                })
                this.caseList = result.content
                this.totalRows = result.totalRows
            },
            clickSave (val) {
                this.estateDetail.save = val
            }

        },
        async beforeCreate () {
            this.$navigator.setNavigationInfo({
                title: '',
                navShow: false,
                statusBarStyle: 'Default'
            })
        },
        async created () {
            const params = await this.$router.getParams()
            this.estateId = params.id
            this.homePhone = params.homePhone
            if (params.id) {
                this.showLoading('加载中...')
                await this.getEstateDetail(this.estateId)
                await this.getWorkSite(this.estateId, 4)
                await this.getDesignes(this.estateId, 4)
                await this.getCase(this.estateId, null)
                await this.getComList()
                this.hideLoading()
            }
            this.picture = this.getImageUrl(this.estateDetail.frontUrl)
            // this.$storage.deleteSync('urlHomeImg')
            this.$storage.setSync('urlHomeImg', this.picture)
        }
    }
</script>

<style lang="scss" scoped>
    .estate-details {
        width: 750;
        background-color: #fff;
    }

    .estate-content {
        padding: 20;
    }

    .estate-cover {
        width: 750;
        height: 450;
    }

    .estate-title {
        margin-top: 20;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
    }

    .estate-building {
        font-size: 36;
        font-weight: 700;
    }

    .estate-map {
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

    .info-title {
        margin-bottom: 20;
    }

    .info-text {
        width: 710;
        flex-wrap: wrap;
        font-size: 30;
        line-height: 50;
        color: #555;
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

    .building-des {
        position: absolute;
        bottom: 0;
        width: 552;
        padding: 20;
        font-size: 32;
        color: #fff;
        background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, .5));
    }

    .constructions {
        margin-top: 60;
    }

    .constructions-wrapper {
        position: relative;
        width: 351px;
        height: 304px;
        margin-right: 12;
    }

    .constructions-img {
        width: 351px;
        height: 351px;
    }

    .constructions-status {
        position: absolute;
        top: 0;
        padding: 10;
        font-size: 32;
        color: #fff;
    }

    .constructions-des {
        position: absolute;
        bottom: 0;
        color: #fff;
        background-color: #353535;
        width: 351;
        height: 62;
        line-height: 62px;
        text-align: center;
        vertical-align: center;
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
    .case {
        margin-top: 30px;
    }

</style>
