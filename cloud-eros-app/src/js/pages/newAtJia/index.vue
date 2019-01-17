<template>
    <wxc-tab-bar :tab-titles="tabTitles" :tab-styles="tabStyles" ref="wxc-tab-bar" @wxcTabBarCurrentTabSelected="selected">
        <div class="width-750">
            <atjia :userInfo="userInfo" :houseIds="houseId" :urls="urls" :isActive="index" :teamIndex="teamIndex" @changeServiceId="getServiceId" v-if="state.home && isShowInf"></atjia>
        </div>
        <div class="width-750">
            <designDrawings :id="serviceId" :page="page" v-if="isShowInf"></designDrawings>
        </div>
        <div class="width-750">
            <costSummary :id="serviceId" v-if="isShowInf"></costSummary>
        </div>
        <div class="width-750">
            <allOrders  :id="serviceId" v-if="isShowInf"></allOrders>
        </div>
    </wxc-tab-bar>
</template>
<script>
    import atjia from '../atjia/index.vue'
    import costSummary from '../costSummary/costSummary.vue'
    import designDrawings from '../others/designDrawings.vue'
    import allOrders from '../allOrders/allOrders.vue'
    import contractlist from '../contract/contractlist.vue'
    import mixins from '../../common/mixins'
    import { WxcTabBar } from 'weex-ui'
    export default {
        name: 'index',
        mixins: [mixins],
        components: { atjia, WxcTabBar, contractlist, designDrawings, allOrders, costSummary },
        data () {
            return {
                tabStyles: {
                    iconWidth: 44,
                    iconHeight: 44,
                    width: 160,
                    height: 100,
                    fontSize: 24
                },
                userInfo: {
                    nickname: ''
                },
                state: {
                    home: true,
                    isObjectBase: false,
                    isShow: false
                },
                needInfo: [],
                isShowInf: false,
                serviceOrderList: [],
                page: 0,
                needChildIndex: 0,
                serviceOrderId: '',
                qiehuanId: '',
                serviceGeShu: {},
                teamIndex: 0,
                index: 0,
                porjectId: '',
                workStage: '',
                houseDeatils: [],
                houseId: '',
                needId: '',
                serviceId: '',
                urls: ''
            }
        },
        computed: {
            tabTitles () {
                const array = [{
                    'title': '动态',
                    'icon': 'bmlocal://assets/images/dongtai1.png',
                    'activeIcon': 'bmlocal://assets/images/dongtai2.png'
                },
                {
                    'title': '设计',
                    'icon': 'bmlocal://assets/images/sheji1.png',
                    'activeIcon': 'bmlocal://assets/images/sheji2.png'
                },
                {
                    'title': '费用',
                    'icon': 'bmlocal://assets/images/feiyong1.png',
                    'activeIcon': 'bmlocal://assets/images/feiyong2.png'
                },
                {
                    'title': '订单',
                    'icon': 'bmlocal://assets/images/dingdan1.png',
                    'activeIcon': 'bmlocal://assets/images/dingdan2.png'
                }]
                return array
            }
        },
        methods: {
            getServiceId (val) {
                this.serviceId = val
            }
        },
        async created () {
            const params = await this.$router.getParams()
            if (params && params.id) {
                this.houseId = params.id
                this.isShowInf = true
            }
            if (params && params.graphicId) {
                this.serviceId = params.graphicId
                this.isShowInf = true
            }
            if (params && params.depthId) {
                this.serviceId = params.depthId
                this.isShowInf = true
            }
            if (params && params.page) {
                this.page = params.page
                const pageJson = { 'page': this.page }
                this.selected(pageJson)
                this.$refs['wxc-tab-bar'].setPage(this.page, null, false)
            }
            if (params && params.pageP) {
                const pageJson = { 'page': params.pageP }
                this.selected(pageJson)
                this.$refs['wxc-tab-bar'].setPage(params.pageP, null, false)
            }
            if (params && params.dynamic) {
                this.index = params.dynamic
            }
            if (params && params.houseId) {
                this.houseId = params.houseId
                this.isShowInf = true
            }
            if (params && params.serviceId) {
                this.serviceId = params.serviceId
                this.isShowInf = true
            }
            if (params && params.urls) {
                this.urls = params.urls
                this.isShowInf = true
            }
            if (params && params.indexTeam) {
                this.teamIndex = params.indexTeam
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/css/base.scss";
</style>
