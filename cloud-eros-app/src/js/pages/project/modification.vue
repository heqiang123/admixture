<template>
    <div class="wrapper">
        <wxc-tab-page ref="wxc-tab-page" :tab-titles="tabTitles" :tab-styles="tabStyles" title-type="iconFont"
                      :tab-page-height="pageHeight" @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
            <list class="item-container" :style="{height:`${pageHeight-80}px`}">
                <cell class="cell" v-for="(item, index) in marticalBaseList" :key="index">
                    <base-list :itemBase="item"></base-list>
                </cell>
            </list>
            <list class="item-container" :style="{height:`${pageHeight-80}px`}">
                <cell class="border-cell" v-for="(item, index) in marticalList" :key="index">
                    <meditor-list :itemMartical=item></meditor-list>
                </cell>
            </list>
        </wxc-tab-page>
    </div>
</template>

<script>
    import mixins from '../../common/mixins'
    import baseList from '../../components/baseList'
    import meditorList from '../../components/meditorList'
    import { WxcTabPage, WxcPanItem, BindEnv } from 'weex-ui'
    import { getProjectMaterial, getProjectBase } from '../../service/baseApi'

    export default {
        components: { WxcTabPage, WxcPanItem, baseList, meditorList },
        mixins: [mixins],
        data () {
            return {
                pageIndex: 1,
                isWaitSend: true,
                isWaitReceive: true,
                isComplete: true,
                isMyPurchase: true,
                // 下拉刷新
                loadinging: false,
                // 上拉刷新
                refreshing: false,
                // 总页数
                totalPages: '',
                // 基装
                marticalBaseList: [],
                // 材料
                marticalList: [],
                tabTitles: [
                    {
                        title: '基装'
                    },
                    {
                        title: '材料'
                    }
                ],
                tabStyles: {
                    activeTitleColor: '#E60012',
                    activeBgColor: '#FFFFFF',
                    activeBottomColor: '#E60012',
                    activeBottomHeight: 6,
                    activeBottomWidth: 70,
                    textPaddingRight: 12,
                    width: 295,
                    height: 80,
                    fontSize: 28
                },
                tabList: [],
                contractId: '',
                // 详细的合同材料
                detailedMaterial: '',
                // 基庄合同的详细信息
                baseDetails: '',
                // 获取材料合同的列表
                materialList: [],
                content: [],
                // 接收页面传过来的项目id
                projectedId: '',
                sortIdArr: [],
                // 传过来的serviceId
                serviceId: ''

            }
        },
        computed: {
            listHeight () {
                const { deviceWidth, deviceHeight, navBarHeight, statusBarHeight } = weex.config.eros
                return deviceHeight * 750 / deviceWidth - navBarHeight - statusBarHeight
            }
        },
        methods: {
            wxcTabPageCurrentTabSelected (e) {
                const index = e.page
                if (Object.keys(this.tabList[index]).length) {
                    setTimeout(() => {
                        this.$set(this.tabList, index, this.demoList)
                    }, 100)
                }
            },
            wxcPanItemPan (e) {
                if (BindEnv.supportsEBForAndroid()) {
                    this.$refs['wxc-tab-page'].bindExp(e.element)
                }
            },
            async projectMaterial (projectId) {
                const result = await getProjectMaterial(projectId)
                this.marticalList = result
            },
            async projectBase (projectId) {
                const result = await getProjectBase(projectId)
                this.marticalBaseList = result
            }
        },
        mounted () {
            this.tabList = [...Array(this.tabTitles.length).keys()].map(i => [])
            this.$set(this.tabList, 0, this.demoList)
            this.listHeight = weex.config.eros.deviceHeight - weex.config.eros.navBarHeight - 100
        },
        async created () {
            const params = await this.$router.getParams()
            this.projectedId = params.id
            this.serviceId = params.serviceId
            await this.projectBase(this.projectedId)
            await this.projectMaterial(this.serviceId)
        }
    }
</script>
<style lang="scss" scoped>
    .wrapper {
        border-top-style: solid;
        border-top-color: #888888;
        border-top-width: 2px;
    }

    .item-container {
        width: 750px;
        background-color: #FFFFFF;
    }

    .cell {
        background-color: #FFFFFF;
        border-top-width: 1px;
        border-top-color: #999999;
        border-top-style: solid;
    }

    .border-cell {
        border-top-width: 1px;
        border-top-color: #999999;
        border-top-style: solid;
    }

    .content {
        width: 750px;
        height: 300px;
        border-bottom-width: 1px;
        align-items: center;
        justify-content: center;
    }

    .img-box {
        width: 144px;
        height: 144px;

    }

    .contract-code {
        width: 698px;
        height: 324px;
        border-width: 1px;
        border-style: solid;
        border-color: #EEEEEE;
        margin-left: 26px;
        margin-top: 20px;
        border-radius: 16px;
    }

    .text-title1-left {
        text-align: left;
        font-size: 26px;
        color: #424552;
    }

    .text-title1-center {
        margin-left: 50px;

        font-size: 26px;
        color: #424552;
    }

    .text-content-left {
        width: 100px;
        text-align: left;
        font-size: 26px;
        color: #E60012;

    }

    .text-content-center {
        margin-left: 60px;
        width: 200px;

        font-size: 26px;
        color: #424552;
    }

    .text-title1-right {
        margin-left: 260px;

        color: #424552;
        font-size: 26px;
    }

    .text-content-right {
        margin-left: 160px;
        width: 200px;
        color: #424552;
        font-size: 26px;
    }

    .customer-information-top {
        height: 74px;
        background-color: #F7F7F7;
        padding-left: 28px;
        padding-right: 30px;
        align-items: center;
        flex-direction: row;
    }

    .tittl-text {
        font-size: 26px;
        color: #424552;
        font-weight: bold;
    }

    .tittl-text-right {
        font-size: 26px;
        color: #E60012;
    }

    .tittl-text-content {
        font-size: 26px;
        color: #737685;;
    }

    .center-div {
        flex-direction: row;
        margin-top: 16px;
    }

    .center-div1 {
        flex-direction: row;
    }

    .center-left-text1 {
        width: 200px;
        text-align: right;
        font-size: 26px;
        color: #737685;
    }

    .center-right-text1 {
        margin-left: 20px;
        font-size: 26px;
        color: #333333;
    }

    .code {
        height: 100px;
        padding-left: 40px;
        padding-right: 40px;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #EEEEEE;
    }

    .code-left {
        font-size: 32px;
        color: #333333;
    }

    .code-right {
        font-size: 32px;
        color: #E60012;
    }

    .customer-information {
        width: 698px;
        height: 248px;
        border-width: 1px;
        border-style: solid;
        border-color: #EEEEEE;
        margin-left: 26px;
        margin-top: 20px;
        border-radius: 16px;
    }

    .customer-information-top {
        height: 74px;
        background-color: #F7F7F7;
        padding-left: 28px;
        padding-right: 30px;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
    }

    .center-box {
        padding-left: 20px;
    }

    .tittl-text {
        font-size: 26px;
        color: #424552;
        font-weight: bold;
    }

    .center-div {
        flex-direction: row;
        margin-top: 16px;
    }

    .center-left-text {
        font-size: 26px;
        color: #737685;
    }

    .center-right-text {
        font-size: 26px;
        color: #333333;
    }

    .contract-main-information {
        width: 698px;
        height: 720px;
        border-width: 1px;
        border-style: solid;
        border-color: #EEEEEE;
        margin-left: 26px;
        margin-top: 20px;
        border-radius: 16px;
    }

    .contract-main-informationBase {
        width: 698px;
        height: 820px;
        border-width: 1px;
        border-style: solid;
        border-color: #EEEEEE;
        margin-left: 26px;
        margin-top: 20px;
        border-radius: 16px;
    }

    .contract-main-information1 {
        height: 248px;
        border-bottom-width: 1px;
        border-bottom-style: dashed;
        border-bottom-color: #EEEEEE;
    }

    .center-left-text1 {
        width: 200px;
        text-align: right;
        font-size: 26px;
        color: #737685;
    }

    .center-right-text1 {
        margin-left: 20px;
        font-size: 26px;
        color: #333333;
    }

    .contract-main-information2 {
        height: 168px;
        border-bottom-width: 1px;
        border-bottom-style: dashed;
        border-bottom-color: #EEEEEE;
    }

    .contract-signing-engineering-stage {
        width: 698px;
        height: 644px;
        border-width: 1px;
        border-style: solid;
        border-color: #EEEEEE;
        margin-left: 26px;
        margin-top: 20px;
        border-radius: 16px;
    }

    .tittl-text-right {
        font-size: 24px;
        color: #E60012;
    }

    .special-text {
        margin-top: 20px;
        font-size: 26px;
        color: #333333;
    }

    .partyB-collection-information {
        width: 698px;
        height: 248px;
        border-width: 1px;
        border-style: solid;
        border-color: #EEEEEE;
        margin-left: 26px;
        margin-top: 20px;
        border-radius: 16px;
    }

    .customer-billing-information {
        width: 698px;
        height: 370px;
        border-width: 1px;
        border-style: solid;
        border-color: #EEEEEE;
        margin-left: 26px;
        margin-top: 20px;
        border-radius: 16px;
    }

    .customer-participation-promotions {
        width: 698px;
        height: 248px;
        border-width: 1px;
        border-style: solid;
        border-color: #EEEEEE;
        margin-left: 26px;
        margin-top: 20px;
        border-radius: 16px;
    }

    .quotation-information {
        width: 698px;
        height: 340px;
        border-width: 1px;
        border-style: solid;
        border-color: #EEEEEE;
        margin-left: 26px;
        margin-top: 20px;
        border-radius: 16px;
    }

    .center-div1 {
        height: 84px;
        padding-left: 25px;
        border-bottom-width: 1px;
        border-bottom-style: dashed;
        border-bottom-color: #eeeeee;
        align-items: center;
        flex-direction: row;
    }

    .center-div2 {
        height: 200px;
        padding-left: 25px;
        border-bottom-width: 1px;
        border-bottom-style: dashed;
        border-bottom-color: #eeeeee;
        align-items: flex-start;
        flex-direction: column;
    }

    .center-right-text2 {
        font-size: 26px;
        color: #6287B2;
    }

    .contract-attachment {
        width: 698px;
        height: 278px;
        border-width: 1px;
        border-style: solid;
        border-color: #EEEEEE;
        margin-left: 26px;
        margin-top: 20px;
        border-radius: 16px;
    }

    .contract-attachment {
        width: 698px;
        height: 400px;
        border-width: 1px;
        border-style: solid;
        border-color: #EEEEEE;
        margin-left: 26px;
        margin-top: 20px;
        border-radius: 16px;
    }

    .contract-attachment-center {
        height: 204px;
        align-items: center;
        justify-content: space-around;
        flex-direction: row;
    }

    .img-box {
        width: 144px;
        height: 144px;
        background-color: pink;
    }

    .related-personnel {
        width: 698px;
        height: 284px;
        border-width: 1px;
        border-style: solid;
        border-color: #EEEEEE;
        margin-left: 26px;
        margin-top: 20px;
        border-radius: 16px;
    }

    .indicator-text {
        font-size: 42px;
        text-align: center;
        width: 750px;
    }

    .indicator {
        margin-top: 16px;
        height: 60px;
        width: 60px;
        margin-left: 345px;
        color: blue;
    }
</style>
