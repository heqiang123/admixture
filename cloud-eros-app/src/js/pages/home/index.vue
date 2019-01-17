<template>
    <div>
        <div class="top-title" v-if="isTop">
            <div slot="left" class="minibar-left" @click="showCityMenu">
                <text :style="{color: '#555'}">{{selectedCity}}</text>
                <text class="icon">&#xe605;</text>
            </div>
            <text slot="middle" class="minibar-middle" @click="goTo('search.index')">&#xe7d4; 搜索在家</text>
            <text slot="right" class="icon minibar-right" @click="showMenu">&#xe603;</text>
        </div>
        <wxc-popover ref="wxc-menu"
                     :buttons="menu"
                     :position="{x:500,y:120}"
                     :arrowPosition="{pos:'top',x: 170}"
                     @wxcPopoverButtonClicked="menuSelected">
        </wxc-popover>
        <scroller class="home" :style="{height: pageHeight+20}">
            <slider class="slider-wrapper" :auto-play="true" :show-indicators="true" :interval="6000">
                <div class="slider-wrapper" v-for="(item,index) of swiperData" :key="index" @click="jumpToWeb(item)">
                    <image class="slider-image" resize="cover" :src="`${getImageUrl(item.imageId)}&level=4`"></image>
                </div>
                <indicator item-color="#fff" item-selected-color="#e60012" :item-size="16 " class="indicator"></indicator>
            </slider>
            <div class="home-wrapper">
                <div class="home-category">
                    <text class="category-title">为你的家做出更好的选择</text>
                    <div class="category-main">
                        <div @click="goTo('case.index')" class="category-inner">
                            <div class="category-item">
                                <image class="category-image" resize="cover" src="bmlocal://assets/images/icon_case.png"></image>
                            </div>
                            <text class="category-text">案例欣赏</text>
                        </div>
                        <div class="category-inner" @click="goTo('estate.index',{homePhone:homePhoneQr})">
                            <div class="category-item">
                                <image class="category-image" resize="cover" src="bmlocal://assets/images/icon_hot.png"></image>
                            </div>
                            <text class="category-text">热装楼盘</text>
                        </div>
                        <div class="category-inner" @click="goTo('order.prebook',{homePhone:homePhoneQr})">
                            <div class="category-item">
                                <image class="category-image" resize="cover" src="bmlocal://assets/images/icon_service.png"></image>
                            </div>
                            <text class="category-text">服务预约</text>
                        </div>
                        <div class="category-inner" @click="goTo('order.preciseBudget')">
                            <div class="category-item">
                                <image class="category-image" resize="cover" src="bmlocal://assets/images/icon_offer.png"></image>
                            </div>
                            <text class="category-text">智能报价</text>
                        </div>
                    </div>
                </div>
                <div class="hot-news column">
                    <div class="title">
                        <div class="title-main-wrapper">
                            <image class="title-icon" resize="cover" src="bmlocal://assets/images/Headline.png"></image>
                            <text class="title-main">家装头条</text>
                        </div>
                        <div class="title-more-wrapper" @click="goTo('home.newsList',{type:true})">
                            <text class="title-more">查看更多</text>
                            <text class="title-more-icon">&#xe60a;</text>
                        </div>
                    </div>
                    <scroller scroll-direction="horizontal" class="news-list" :style="{height: 280}">
                        <div class="news-wrapper" v-for="(item, index) of newsData" :key="index"
                             @click="goTo('home.newsDetails', {id:item.id,url:getImageUrl(item.titleImage)})">
                            <image class="news-image" resize="contain" :src="getImageUrl(item.titleImage)"></image>
                            <text lines="1" class="news-des">{{item.title}}</text>
                        </div>
                    </scroller>
                </div>
                <div class="soft-wear column" @appear="softWearAppear()">
                    <div class="title">
                        <div class="title-main-wrapper">
                            <image class="title-icon" resize="cover" src="bmlocal://assets/images/Soft_wear.png"></image>
                            <text class="title-main">软装品牌馆</text>
                        </div>
                        <div class="title-more-wrapper" @click="goTo('home.softList', {type:1})">
                            <text class="title-more">查看更多</text>
                            <text class="title-more-icon">&#xe60a;</text>
                        </div>
                    </div>
                    <scroller v-if="softWearIsshow" scroll-direction="horizontal" class="news-list" :style="{height: 200}">
                        <div class="soft-wrapper" v-for="(item, index) of brandData" :key="index"
                             @click="goTo('home.newsDetails',{id:item.id,url:getImageUrl(item.titleImage)})">
                            <image class="soft-image" resize="cover" :src="getImageUrl(item.titleImage)"></image>
                            <text lines="1" class="soft-des">{{item.title}}</text>
                        </div>
                    </scroller>
                </div>
                <div class="soft-wear column" @appear="hotHousesAppear()">
                    <div class="title">
                        <div class="title-main-wrapper">
                            <image class="title-icon" resize="cover" src="bmlocal://assets/images/Best_Sellers.png"></image>
                            <text class="title-main">热装楼盘</text>
                        </div>
                        <div class="title-more-wrapper" @click="goTo('estate.index')">
                            <text class="title-more">查看更多</text>
                            <text class="title-more-icon">&#xe60a;</text>
                        </div>
                    </div>
                    <scroller v-if="hotHousesIsshow" scroll-direction="horizontal" class="news-list" :style="{height: 340}">
                        <div class="seller-wrapper" v-for="(item,index) of HotEstate" :key="index"
                             @click="goTo('estate.details',{id:item.id})">
                            <text lines="1" class="seller-title">{{item.name}}</text>
                            <text lines="1" class="seller-des">{{item.constructionNum || 0 }}个项目正在施工</text>
                            <image class="seller-image" resize="cover" :src="`${getImageUrl(item.frontUrl)}&level=6`"></image>
                            <div class="seller-grandient"></div>
                        </div>
                    </scroller>
                </div>
            </div>
            <div class="hot-case">
                <div class="hot-case-title">
                    <div class="title-main-wrapper">
                        <image class="title-icon" resize="cover" src="bmlocal://assets/images/case.png"></image>
                        <text class="title-main">精选案例</text>
                    </div>
                </div>
                <div class="case-list">
                    <case-item v-for="(item,index) of caseDataTop" :key="index" :item="item" class="item"></case-item>
                    <div class="hot-designer column">
                        <div class="title">
                            <div class="title-main-wrapper">
                                <image class="title-icon" resize="cover" src="bmlocal://assets/images/Designer.png"></image>
                                <text class="title-main">设计师</text>
                            </div>
                            <div class="title-more-wrapper" @click="goTo('designer.index')">
                                <text class="title-more">查看更多</text>
                                <text class="title-more-icon">&#xe60a;</text>
                            </div>
                        </div>
                        <scroller scroll-direction="horizontal" class="designer-wrapper">
                            <div class="designer-card" v-for="(item,index) of designerData" :key="index" @click="goToDesigner(item)">
                                <image class="designer-avatar" resize="stretch" :src="`${item.headId}?x-oss-process=image/resize,w_200/crop,x_0,y_0,w_200,h_200/circle,r_100/format,png`"></image>
                                <text class="designer-name">{{item.name}}</text>
                                <text class="designer-title">{{item.level}}</text>
                                <!--<text class="designer-btn">{{item.isAttention ?'关注':'已关注'}}</text>-->
                                <text class="designer-btn">关注</text>
                            </div>
                        </scroller>
                    </div>
                    <case-item v-for="(item,index) of caseDataBottom" :key="index" :item="item"
                               class="item"></case-item>
                </div>
            </div>
        </scroller>
        <city-popup ref="wxc-popoup" :data="cityParams" @checked="selectCity" @hide="hideCityMenu" :isShow="state.isShow" :height="400"></city-popup>
    </div>
</template>

<script>
    import { WxcPopover } from 'weex-ui'
    import caseItem from '../../components/caseItems'
    import cityPopup from '../../components/cityPopup'
    import { getAvaliableRegion, getAdvertisement } from '../../service/homeApi'
    import { getHotEstateList } from '../../service/estateApi'
    import { getSoftList } from '../../service/softApi'
    import { serverPhone } from '../../service/baseApi'
    import { getChoiceCase } from '../../service/caseApi'
    import { getChoiceDesigner } from '../../service/designerApi'
    import mixins from '../../common/mixins'
    const bmPush = weex.requireModule('bmPush')
    bmPush.initPush({
        appId: 'B9CChnBOStAcSvwIltBXL8', // appId、appKey、appSecret 需要到个推后台获取
        appKey: 'l42vfCr8Ia5c8eIDgs0FH',
        appSecret: 'TySnpAaJ8O73ha5Nsnoes5'
    })
    bmPush.getCid(result => {
    })
    export default {
        name: 'home',
        components: { WxcPopover, caseItem, cityPopup },
        mixins: [mixins],
        props: {
            isTop: {
                type: Boolean,
                defalut: true
            }
        },
        data () {
            return {
                state: {
                    isShow: false
                },
                homePhoneQr: null,
                HotEstate: [],
                swiperData: [],
                newsData: [],
                brandData: [],
                caseDataTop: [],
                caseDataBottom: [],
                designerData: [],
                type: '',
                cityParams: [],
                menu: [
                    {
                        icon: 'bmlocal://assets/images/scan.png',
                        text: '扫一扫',
                        key: '扫一扫'
                    },
                    {
                        icon: 'bmlocal://assets/images/pinglun.png',
                        text: '客服',
                        key: '客服'
                    },
                    {
                        icon: 'bmlocal://assets/images/dianhua.png',
                        text: '电话',
                        key: '电话'
                    }],
                selectedCity: '',
                softWearIsshow: false,
                hotHousesIsshow: false
            }
        },
        watch: {
            cityParams (val) {
                this.cityParams = val
            }
        },
        methods: {
            softWearAppear () {
                this.softWearIsshow = true
            },
            hotHousesAppear () {
                this.hotHousesIsshow = true
            },
            jumpToWeb (item) {
                if (!this.isEmpty(item.linkCarousel)) {
                    this.$router.toWebView({
                        url: item.linkCarousel,
                        title: item.titile,
                        navshow: true
                    })
                } else {
                    return false
                }
            },
            async getPhoneNum () {
                const result = await serverPhone()
                if (result && result.storePhone) {
                    this.homePhoneQr = result.storePhone.replace(/-/g, '')
                }
            },
            async selectCity (e) {
                this.selectedCity = e.name
                this.state.isShow = false
                this.$storage.setSync('currentValue', { currentValue: e.code, name: e.name })
                // await this.update()
                this.$router.refresh()
            },
            showCityMenu () {
                this.state.isShow = true
            },
            hideCityMenu () {
                this.state.isShow = false
            },
            showMenu () {
                this.$refs['wxc-menu'].wxcPopoverShow()
            },
            popoverButtonClicked (obj) {
                this.selectedCity = obj.key
            },
            async menuSelected (obj) {
                if (obj.key === '扫一扫') {
                    const result = await this.$tools.scan()
                    if (result.indexOf('case-detail') > 0 || result.indexOf('designer') > 0 || result.indexOf('estate') > 0 || result.indexOf('store') > 0 || result.indexOf('construction') > 0 || result.indexOf('news') > 0) {
                        if (result.indexOf('case-detail') > 0) {
                            this.type = 'case-detail'
                            const urlSplice = result.lastIndexOf('/')
                            this.goTo('home.scan', { url: result, id: result.slice(urlSplice + 1), type: this.type })
                        } else if (result.indexOf('designer') > 0) {
                            this.type = 'designer'
                            const urlSplice = result.lastIndexOf('/')
                            this.goTo('home.scan', { url: result, id: result.slice(urlSplice + 1), type: this.type })
                        } else if (result.indexOf('estate') > 0) {
                            this.type = 'estate'
                            const urlSplice = result.lastIndexOf('/')
                            this.goTo('home.scan', { url: result, id: result.slice(urlSplice + 1), type: this.type })
                        } else if (result.indexOf('store') > 0) {
                            this.type = 'store'
                            const urlSplice = result.lastIndexOf('=')
                            this.goTo('home.scan', { url: result, id: result.slice(urlSplice + 1), type: this.type })
                        } else if (result.indexOf('construction') > 0) {
                            this.type = 'construction'
                            const urlSplice = result.lastIndexOf('/')
                            this.goTo('home.scan', { url: result, id: result.slice(urlSplice + 1), type: this.type })
                        } else if (result.indexOf('news') > 0) {
                            this.type = 'news'
                            const urlSplice = result.lastIndexOf('/')
                            this.goTo('home.scan', { url: result, id: result.slice(urlSplice + 1), type: this.type })
                        }
                    } else if (this.checkUrL(result)) {
                        this.$router.toWebView({
                            url: result,
                            navshow: true
                        })
                    } else {
                        this.toast('二维码不合法')
                    }
                }
                if (obj.key === '客服') {
                    this.goTo('service.index')
                }
                if (obj.key === '电话') {
                    return this.$coms.call(this.homePhoneQr, false)
                }
            },
            // 获取设计师
            async getDesigner () {
                const result = await getChoiceDesigner()
                this.designerData = result
            },
            // 获取案例
            async getCaseData () {
                const result = await getChoiceCase()
                const casedatas = result.map(item => {
                    if (item.tags) {
                        const tags = item.tags // JSON.parse(item.tags)
                        for (let index = 0; index < tags.length; index++) {
                            const element = tags[index]
                            if (element.parent && element.parent['code'] === 'BQ000010') {
                                item.tag = element.name
                            }
                        }
                    }
                    return item
                })
                if (casedatas.length > 2) {
                    this.caseDataBottom = casedatas.slice(2)
                }
                this.caseDataTop = casedatas.slice(0, 2)
            },
            // 获取热装楼盘
            async getHotEstate () {
                const result = await getHotEstateList()
                this.HotEstate = result
            },
            // 获取家装头条列表
            async getSoft (name = '', type = '', tags = [], channelId = '', orderby = '0', page = 1) {
                let queryParamList = [
                    {
                        'field': 'title',
                        'type': 'string',
                        'logic': 'like',
                        'value': name,
                        'items': []
                    },
                    {
                        'field': 'channelIds',
                        'type': 'string',
                        'logic': 'like',
                        'value': channelId,
                        'items': []
                    }, {
                        'field': 'isShou',
                        'logic': 'like',
                        'type': 'string',
                        'value': type,
                        'items': []
                    }
                ]
                const mTages = tags.map(value => {
                    return { field: 'tags' + value.Key, type: 'string', logic: '', items: value.tags }
                })
                queryParamList = queryParamList.concat(mTages)
                const result = await getSoftList({
                    export: false,
                    orderBy: orderby,
                    page: page,
                    pageSize: 6,
                    queryParamList: queryParamList
                })
                if (channelId === 124) {
                    this.newsData = result.content
                }
                if (channelId === 125) {
                    this.brandData = result.content
                }
            },
            async getRegion () {
                const defaultStoreValue = this.$storage.getSync('defaultValue')
                const currentValue = this.$storage.getSync('currentValue')
                const result = await getAvaliableRegion('GET')
                if (result) {
                    const defaultValue = result.defaultValue
                    const params = result.params
                    if (!defaultStoreValue) {
                        for (const item of params) {
                            if (item.code === defaultValue) {
                                this.$storage.setSync('defaultValue', { defaultValue: defaultValue, name: item.name })
                            }
                        }
                    }
                    this.$storage.setSync('defaultRegions', params)
                    if (!currentValue) {
                        for (const item of params) {
                            if (item.code === defaultValue) {
                                this.$storage.setSync('currentValue', { currentValue: item.code, name: item.name })
                                this.selectedCity = this.$storage.getSync('defaultValue').name
                            }
                        }
                    }
                    this.cityParams = params
                }
            },
            // 获取轮播图
            async getAdvertList () {
                const result = await getAdvertisement()
                this.swiperData = result
            },
            async init () {
                const currentValue = this.$storage.getSync('currentValue')
                const defaultValue = this.$storage.getSync('defaultValue')
                const params = this.$storage.getSync('defaultRegions')
                const num = this.$storage.getSync('frequency')
                if (!this.isEmpty(currentValue)) {
                    this.selectedCity = this.$storage.getSync('currentValue').name
                }
                if (!this.isEmpty(params)) {
                    this.cityParams = params
                }
                if (!this.isEmpty(num)) {
                    this.$storage.setSync('frequency', Number(num) + 1)
                } else {
                    this.$storage.setSync('frequency', 0)
                }
                if (!this.isEmpty(currentValue) && currentValue.currentValue !== defaultValue.defaultValue && num === 3) {
                    this.confirm('系统定位您在' + defaultValue.name + '是否切换站点？', (result) => {
                        if (result === '确认') {
                            this.$storage.setSync('currentValue', {
                                currentValue: defaultValue.defaultValue,
                                name: defaultValue.name
                            })
                            this.$router.refresh()
                        }
                    })
                }
            },
            async update () {
                await this.init()
                await this.getRegion()
                await this.getPhoneNum()
                await this.getAdvertList()
                await this.getHotEstate()
                await this.getCaseData()
                await this.getDesigner()
                await this.getSoft('', 'homePage', [], 124, '0', 1)
                await this.getSoft('', 'homePage', [], 125, '0', 1)
            },
            goToDesigner (item) {
                if (item.accountId) {
                    this.goTo('design.designer', { id: item.id })
                } else {
                    this.goTo('desig.index', { id: item.id })
                }
            }
        },

        async created () {
            this.init()
            await this.getRegion()
            await this.getPhoneNum()
            await this.getAdvertList()
            await this.getHotEstate()
            await this.getCaseData()
            await this.getDesigner()
            await this.getSoft('', 'homePage', [], 124, '0', 1)
            await this.getSoft('', 'homePage', [], 125, '0', 1)
        },
        eros: {
            beforeBackAppear (params) {
                if (params.todo === 'refresh') {
                    this.getCaseData()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .top-title{
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-content: space-between;
        width: 750px;
        height: 130px;
        padding-top: 42px;
        padding-left: 20px;
        padding-right: 20px;
        background-color:#ffffff;
        position: fixed;
        top: 0;
        left: 0;
    }

    .home {
        width: 750px;
        background-color: #fff;
    }

    .minibar-left {
        flex-direction: row;
        margin-right: 30px;
    }

    .minibar-middle {
        width: 460;
        height: 60;
        line-height: 60;
        text-align: center;
        font-family: iconfont;
        color: #888;
        background-color: #e9e9e9;
        border-radius: 4;
    }

    .minibar-right {
        width: 120;
        color: #555;
        text-align: center;
    }

    .icon {
        font-family: iconfont;
        font-size: 42;
        color: #555;
    }

    .slider-wrapper {
        background-color: #fff;
        width: 750;
        height: 580;
    }

    .slider-image {
        width: 750;
        height: 580;
    }

    .indicator {
        width: 750;
        height: 300;
        position: absolute;
        top: 380;
        left: 0;
        item-color: #fff;
        item-selected-color: #e60012;
        item-size: 16;
    }

    .home-wrapper {
        padding: 20;
    }

    .category-title {
        margin: 40 0;
        font-size: 28;
        color: #999;
    }

    .category-main {
        flex-direction: row;
        justify-content: space-between;
    }

    .category-item {
        justify-content: center;
        align-items: center;
        width: 140;
        height: 140;
        background-color: #fff;
        border-radius: 16;
        box-shadow: 0 16 44 0 #ddd;
    }

    .category-image {
        width: 80;
        height: 80;
    }

    .category-text {
        width: 140;
        text-align: center;
        margin-top: 26;
        font-size: 28;
        color: #353535;
    }

    .column {
        margin-top: 80;
    }

    .title {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .title-main-wrapper {
        flex-direction: row;
    }

    .title-icon {
        width: 40;
        height: 40;
        margin-right: 10;
        align-self: center;
    }

    .title-main {
        margin-top: 4;
        font-size: 32;
        color: #353535;
    }

    .title-more-wrapper {
        height: 40;
        margin-top: 3;
        flex-direction: row;
        align-items: center;
    }

    .title-more {
        font-size: 28;
        color: #555;
    }

    .title-more-icon {
        font-family: iconfont;
        font-size: 40;
        font-weight: 600;
        color: #555;
    }

    .news-list {
        margin-top: 30;
        flex-direction: row;
    }

    .news-wrapper {
        margin-right: 20;
    }

    .news-image {
        width: 440;
        height: 280;
    }

    .news-des {
        lines: 1;
        position: absolute;
        top: 200;
        padding: 20;
        width: 440;
        height: 280;
        font-size: 32;
        color: #fff;
    }

    .soft-wrapper {
        padding: 0 20;
        margin-right: 20;
    }

    .soft-image {
        width: 224;
        height: 135;
    }

    .soft-des {
        margin-top: 20;
        lines: 1;
        width: 224;
        text-overflow: ellipsis;
    }

    .seller-wrapper {
        position: relative;
        margin-right: 20;
        padding-top: 48;
        align-items: center;
    }

    .seller-title {
        font-size: 36;
        color: #353535;
    }

    .seller-des {
        margin: 20 0;
        font-size: 24;
        color: #999;
    }

    .seller-image {
        width: 272;
        height: 200;
    }

    .seller-grandient {
        position: absolute;
        top: 200;
        width: 272;
        height: 160;
        background-image: linear-gradient(to top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
    }

    .hot-case {
        margin-top: 80;
    }

    .hot-case-title {
        flex-direction: row;
        align-items: center;
        margin: 0 20 30;
    }

    .hot-designer {
        margin-top: 80;
        padding: 0 20;
    }

    .designer-wrapper {
        flex-direction: row;
        margin-top: 40;
        height: 400px;
    }

    .designer-card {
        width: 320;
        padding: 40 20;
        margin-right: 20;
        align-items: center;
        border-top-style: solid;
        border-top-color: #eee;
        border-top-width: 2;
        border-left-style: solid;
        border-left-color: #eee;
        border-left-width: 2;
        border-bottom-style: solid;
        border-bottom-color: #eee;
        border-bottom-width: 2;
        border-right-style: solid;
        border-right-color: #eee;
        border-right-width: 2;
        border-radius: 8;
    }

    .head-img{
        width: 168px;
        height: 168px;
        border-radius: 84px;
        overflow: hidden;
    }

    .designer-avatar {
        width: 168;
        height: 168;
    }

    .designer-name {
        margin-top: 28;
        font-size: 32;
        color: #212121;
    }

    .designer-title {
        margin: 12 0;
        font-size: 24;
        color: #555;
    }

    .designer-btn {
        width: 116;
        height: 56;
        line-height: 56;
        color: #e60012;
        text-align: center;
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
</style>
