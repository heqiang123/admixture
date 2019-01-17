<template>
    <div>
        <title-bar type="STORE" :ID="storeId" :upCount="storeDetail.ups"
                   :isSave="storeDetail.save"
                   :saveCount="storeDetail.saves"
                   :shareTitleName="storeDetail.name"
                   :shareContentName="storeIntrod"
                   :shareId="storeDetail.id"
                   :sharePicture="picture"
                   address="store-detail"
                   @clickSave="clickSave">
        </title-bar>
        <scroller :style="{ height:`${pageHeight-85}px`}" class="store-details">
            <div class="store-header">
                <image class="store-cover" :src="getImageUrl(storeDetail.coverUrl)"></image>
                <div class="designer-info">
                    <div class="info-wrapper">
                        <text class="u-name">{{storeDetail.name}}</text>
                        <text class="star-icon">&#xe6d9; &#xe6d9; &#xe6d9; &#xe6d9; &#xe6d9;</text>
                        <text class="u-exp">设计师{{storeDetail.designerCount}} | 案例{{storeDetail.caseCount}}</text>
                    </div>
                </div>
                <div class="designer-line">

                </div>
                <div class="manager">
                    <image class="manager-avatar" :src="`${getImageUrl(storeDetail.storeManagerUrl)}&level=6`"></image>
                    <text class="manager-name">{{storeDetail.storeManager}}</text>
                    <text class="manager-title">店长</text>
                </div>
            </div>
            <div class="store-content">
                <div class="store-address">
                    <text class="key">门店地址：</text>
                    <text class="value">{{storeDetail.addr}}</text>
                    <text class="store-map" @click="goTo('others.map',{marker:{position:[storeDetail.longitude,storeDetail.latitude],title:storeDetail.name}})">&#xe656; 查看地图</text>
                </div>
                <div class="personal-info">
                    <text class="key info-title">门店介绍</text>
                    <text class="info-text">{{storeIntrod}}</text>
                </div>
                <div class="designer">
                    <div class="title-zone">
                        <div class="title-wrapper">
                            <text class="title-prefix"></text>
                            <text class="title-content">设计师</text>
                        </div>
                        <text class="title-extra" @click="goTo('design.storeDesigner', {storeDesigner:desingerList})">查看全部 &#xe60a;</text>
                    </div>
                    <scroller scroll-direction="horizontal" class="building-case">
                        <div @click="goToDesigner(item)" class="designer-card" v-for="(item,index) of desingerList" :key="index">
                            <image class="designer-image" resize="cover" :src="`${item.headUrl}?x-oss-process=image/resize,w_200/crop,x_0,y_0,w_200,h_200/circle,r_100/format,png`"></image>
                            <text class="designer-name">{{item.name}}</text>
                            <div class="designerLeval">
                                <text class="designer-title info">{{item.level}}</text>
                                <div class="symbol" v-if="tagsJson[index]">
                                    <text class="info">|</text>
                                </div>
                                <div class="designer-intr" v-for="(jsonItem, jsonIndex) of tagsJson" :key="jsonIndex" v-if="jsonIndex === index">
                                    <text class="designer-company info">从业{{jsonItem.year}}</text>
                                </div>
                            </div>
                            <div class="designer-label-zone">
                                <text class="designer-label" v-for="(nameItem,index) in item.tags" :key="index" v-if="index<3">{{nameItem.name}}</text>
                            </div>
                        </div>
                    </scroller>
                </div>
                <div class="case">
                    <div class="title-zone">
                        <div class="title-wrapper">
                            <text class="title-prefix"></text>
                            <text class="title-content">TA的设计案例</text>
                        </div>
                    </div>
                    <div class="case-case">
                        <image class="case-img" v-for="(item,index) of caseImgList" :key="index" @click="goTo('design.case',{id:item.id})" resize="cover" :src="`${item.homepageId}?x-oss-process=image/resize,w_200`" v-if="index < 6"></image>
                    </div>
                    <wxc-button v-if="storeDetail&&storeDetail.caseCount>6" text="显示更多"
                                @wxcButtonClicked="goTo('case.list',{id:storeId,type:'3',caseList:caseImgList})"
                                :btnStyle="{'background-color': '#f5f5f5', 'margin-top': 40, 'margin-bottom': 40, height: 82, width: 710}"
                                :textStyle="{'font-size': 28, color: '#757575'}"
                    ></wxc-button>
                </div>
                <Comment-zone type="2" :id="storeId" :urlHomePagesImg="getImageUrl(storeDetail.coverUrl)"></Comment-zone>
            </div>
        </scroller>
        <div class="store-handdle">
            <text class="btn store-phone" @click="$coms.call('4006578320', false)">电话咨询</text>
            <text class="btn store-date" @click="goTo('order.store',{id:storeDetail.id,name:storeDetail.name})">约TA设计</text>
        </div>
    </div>
</template>

<script>
    import titleBar from '../../components/titleBar'
    import CommentZone from '../../components/commentZone'
    import DesignerCard from '../../components/designerCard'
    import mixins from '../../common/mixins'
    import { WxcButton } from 'weex-ui'
    import { getAllCaseByStoreIdPage, getDesignerByStoreIdPage, getById } from '../../service/storeApi.js'

    export default {
        name: 'storeDetails',
        components: { titleBar, CommentZone, DesignerCard, WxcButton },
        mixins: [mixins],
        data () {
            return {
                // 接收数据的声明的id
                storeId: '',
                // 案例展示的图片
                caseImgList: [],
                // 门店的详细数据
                storeDetail: {},
                picture: [],
                // 门店介绍
                storeIntrod: '',
                // 获取设计师的列表
                desingerList: [],
                tagsJson: []
            }
        },
        methods: {
            // 得到门店的案例
            async getStoreCase (data, method) {
                const result = await getAllCaseByStoreIdPage(data, method)
                result.content.slice(0, 6)
                this.caseImgList = result.content
                console.log('门店的案例,', JSON.stringify(this.caseImgList))
            },
            // 得到门店的详细信息
            async getStoreInfo (id, method) {
                const result = await getById(id, method)
                if (result) {
                    this.storeDetail = result
                    this.storeIntrod = this.delHtmlTags(result.introduction)
                }
            },
            // 得到门店的相关设计师
            async getDesinger (data, method) {
                const result = await getDesignerByStoreIdPage(data, method)
                this.desingerList = result.content
                this.desingerList.forEach((item, index) => {
                    item.tags.forEach((item, index) => {
                        if ([...item.name].indexOf('年') === [...item.name].length - 1) {
                            this.tagsJson.push({ year: item.name })
                        }
                    })
                })
            },
            goToDesigner (item) {
                if (item.accountId) {
                    this.goTo('design.designer', { id: item.id })
                } else {
                    this.goTo('desig.index', { id: item.id })
                }
            },
            clickSave (val) {
                this.storeDetail.save = val
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
            const params = await this.$router.getParams()
            this.storeId = params.id
            await this.getStoreCase({
                'export': false,
                'orderBy': 'id desc',
                // 'pageSize': 10000,
                'pageSize': 20,
                'queryParamList': [{
                    'field': 'storeId',
                    'type': 'string',
                    'logic': 'like',
                    'value': this.storeId,
                    'items': []
                }]
            })
            await this.getStoreInfo(this.storeId, 'GET')
            await this.getDesinger({
                'export': false,
                'orderBy': 'id desc',
                'page': 1,
                // 'pageSize': 10000,
                'pageSize': 20,
                'queryParamList': [{
                    'field': 'busiContentStore.id',
                    'type': 'string',
                    'logic': 'like',
                    'value': this.storeId,
                    'items': []
                }]
            })
            this.picture = this.getImageUrl(this.storeDetail.coverUrl)
        }
    }
</script>

<style lang="scss" scoped>
    .store-details {
        width: 750;
        background-color: #fff;
    }

    .store-content {
        padding: 20;
    }

    .store-header {
        position: relative;
        padding-bottom: 80;
    }

    .designer-info {
        position: absolute;
        left: 50;
        bottom: 0;
        width: 650;
        height: 200;
        background-color: #fff;
        box-shadow: 0 0 44 8 hsla(0, 0%, 87%, .5)
    }

    .info-wrapper {
        width: 450;
        height: 160;
        margin: 20 10;
        justify-content: space-between;
        align-items: center;
    }

    .u-name {
        font-size: 44;
        color: #555;
        font-weight: 700;
    }

    .star-icon {
        font-family: iconfont;
        font-size: 28;
        color: #e60012;
    }

    .u-exp {
        font-size: 28;
        color: #353535;
    }

    .designer-line {
        position: absolute;
        right: 240;
        bottom: 34;
        width: 2;
        height: 120;
        background-color: #dbd6d6;
    }

    .manager {
        position: absolute;
        right: 70;
        bottom: 24;
        width: 160;
        height: 236;
        justify-content: space-between;
        align-items: center;
    }

    .manager-avatar {
        width: 120;
        height: 120;
        border-radius: 60;
    }

    .manager-name {
        font-size: 32;
        color: #212121;
    }

    .manager-title {
        font-size: 24;
        color: #999;
    }

    .store-cover {
        width: 750;
        height: 450;
    }

    .store-address {
        margin-top: 20;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 710;
    }

    .key {
        font-size: 30;
        color: #212121;
    }

    .value {
        width: 400;
        flex-wrap: wrap;
        font-size: 30;
        color: #555;
    }

    .store-map {
        font-family: iconfont;
        font-size: 24;
        color: #555;
    }

    .personal-info {
        margin: 40 0 80;
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
        flex-direction: row;
        width: 700px;
        height: 400px;
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
        width: 351;
        height: 351;
        margin-right: 12;
    }

    .constructions-img {
        width: 351;
        height: 351;
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
        width: 351;
        padding: 10;
        font-size: 32;
        text-align: center;
        color: #fff;
        background-color: #353535;
    }

    .case {
        margin-top: 60;
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

    .store-handdle {
        padding: 20;
        flex-direction: row;
        justify-content: space-between;
        background-color: #fff;
        border-top-color: #dbd6d6;
        border-top-style: solid;
        border-top-width: 1;
    }

    .btn {
        width: 342;
        height: 80;
        line-height: 80;
        font-size: 28;
        text-align: center;
        background-color: #e60012;
        border-top-color: #e60012;
        border-top-style: solid;
        border-top-width: 2;
        border-right-color: #e60012;
        border-right-style: solid;
        border-right-width: 2;
        border-bottom-color: #e60012;
        border-bottom-style: solid;
        border-bottom-width: 2;
        border-left-color: #e60012;
        border-left-style: solid;
        border-left-width: 2;
        border-radius: 6;
    }

    .store-phone {
        color: #e60012;
        background-color: #fff;
    }

    .store-date {
        color: #fff;
        background-color: #e60012;
    }





    .designer-card {
        height: 400px;
        width: 300px;
        margin-left: 14px;
        align-items: center;
        border-bottom-color: #dddddd;
        border-bottom-style: solid;
        border-bottom-width: 2px;
        border-top-color: #dddddd;
        border-top-style: solid;
        border-top-width: 2px;
        border-left-color: #dddddd;
        border-left-style: solid;
        border-left-width: 2px;
        border-right-color: #dddddd;
        border-right-style: solid;
        border-right-width: 2px;
        background-color: #fff;
        border-radius: 5px;
    }

    .designerLeval {
        flex-direction: row;
        height: 60px;
        justify-content: center;
        align-items: center;
    }

    .designer-image {
        width: 140px;
        height: 140px;
        border-radius: 70px;
        margin-top: 40px;
    }

    .designer-intr {
        align-items: center;
        justify-content: center;
    }

    .designer-box {
        width: 300;
        align-items: center;
        justify-content: center;
    }

    .designer-name {
        margin-top: 26px;
        font-size: 30;
        color: #212121;
    }

    .info {
        font-size: 24;
        color: #757575;
    }

    .symbol {
        width: 20px;
        justify-content: center;
        align-items: center;
    }

    .designer-company {
        margin: 10 0;
    }

    .designer-label-zone {
        margin-top: 20px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .designer-label {
        margin-right: 10;
        padding: 5 8;
        font-size: 22;
        color: #fff;
        background-color: #353535;
        border-radius: 4;
    }
</style>
