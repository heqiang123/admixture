<template>
    <div>
        <status-bar></status-bar>
        <wxc-minibar background-color="#fff">
            <text slot="middle" class="title">热装楼盘</text>
            <div class="right-wrapper" slot="right">
                <text class="icon" @click="goTo('others.mapList')">&#xe656;</text>
                <text class="icon" @click="goTo('search.index',{type:'estate'})"> &#xe7d4;</text>
            </div>
        </wxc-minibar>
        <screen-sort type="4" :sortData="sortData" @reset="reset" @chooseDes="chooseDes" @chooseValue="chooseCode"></screen-sort>
        <list class="bui-list" loadmoreoffset="20" :style="{height:pageHeight-80}" v-if="estateList.length">
            <!--<refresh-loading @onRefresh="onRefresh" :refreshIcon="refreshIcon" :display="refreshing"-->
                             <!--:refreshText="refreshText" @onPullingdown="onPullingdown"></refresh-loading>-->
            <refresh @refresh="getContent('refresh')" :display="appState.isRefreshing ? 'show' : 'hide'"></refresh>
            <loading @loading="getContent('more')" :display="appState.isLoading ? 'show' : 'hide'"></loading>
            <cell v-for="(item,index) in estateList" :key="index">
                <estate-item :item="item" :homePhone="homePhone"></estate-item>
            </cell>
            <!--<down-loading @onLoading="onLoading" :display="isShowLoading" :loadingText="loadingText"></down-loading>-->
        </list>
        <no-data v-if="estateListLength"></no-data>
    </div>
</template>
<script>
    import noData from '../../components/noData'
    import EstateItem from '../../components/estateItem'
    import downLoading from '../../components/bui/downLoading'
    import refreshLoading from '../../components/bui/refreshLoading'
    import downMenu from '../../components/downMenu'
    import screenSort from '../../components/screenList'
    import { newGetEstateList } from '../../service/estateApi'
    import { WxcMinibar } from 'weex-ui'
    import StatusBar from '../../components/statusBar'
    import mixins from '../../common/mixins'

    export default {
        name: 'estate',
        components: { refreshLoading, EstateItem, WxcMinibar, downMenu, StatusBar, downLoading, screenSort, noData },
        mixins: [mixins],
        data () {
            return {
                searchText: '',
                tags: [],
                sort: 'ups desc',
                page: 1,
                homePhone: null,
                temptags: [],
                estateList: [],
                refreshing: false,
                isShowLoading: false,
                refreshIcon: 'icon-todown',
                refreshText: '下拉刷新...',
                loadingText: '加载更多数据...',
                sortData: [
                    { title: '智能排序', value: 'ups desc' },
                    { title: '好评数', value: 'comments desc' }
                ],
                totalPage: '',
                estateListLength: false
            }
        },
        watch: {
            sort (val) {
                this.sort = val
                this.page = 1
                this.getList(
                    this.searchText,
                    this.tags,
                    this.sort,
                    this.page,
                    'refresh'
                )
            }
        },
        methods: {

            /**
             * 获取楼盘列表
             * @param name
             * @param tags
             * @param orderby
             * @param page
             * @returns {Promise<void>}
             */
            async getContent (type) {
                this.appShowLoading(type)
                let queryParamList = [{
                    'field': 'name',
                    'type': 'string',
                    'logic': 'like',
                    'value': this.searchText,
                    'items': []
                }]
                const mTages = this.tags.map(value => {
                    return { field: 'tags' + value.key, type: 'string', logic: '', items: value.tags }
                })
                queryParamList = queryParamList.concat(mTages)
                if (type === 'refresh') {
                    const result = await newGetEstateList({
                        export: false,
                        orderBy: 'ups desc,modify_time desc',
                        page: 1,
                        pageSize: 6,
                        queryParamList: queryParamList
                    })
                    this.totalPage = result.totalPage
                    this.estateList = result.content
                } else {
                    if (this.appPage > this.totalPage) {
                        return
                    }
                    const result = await newGetEstateList({
                        export: false,
                        orderBy: 'ups desc,modify_time desc',
                        page: this.appPage,
                        pageSize: 6,
                        queryParamList: queryParamList
                    })
                    this.totalPage = result.totalPage
                    this.estateList.push(...result.content)
                }
                this.appHideLoading(type)
                if (!this.estateList.length) {
                    this.estateListLength = true
                }
            },
            // 选择排序
            chooseDes (sort) {
                this.sort = sort
            },
            reset (param) {
                this.tags = param.paramsTag
                this.getContent('refresh')
            },
            // 获取楼盘筛选标签
            chooseCode (param) {
                this.tags = param.paramsTag
                this.getContent('refresh')
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
            if (params && params.searchValue) {
                this.searchText = params.searchValue
            }
            if (params && params.homePhone) {
                this.homePhone = params.homePhone
            }
            this.getContent('refresh')
        }
    }
</script>

<style lang="scss" scoped>
    .estate-list {
        width: 750px;
        background-color: #fff;
    }

    .title {
        font-size: 33;
        font-weight: 900;
    }

    .right-wrapper {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 120;
        height: 50;
        background: #ffffff;
    }

    .icon {
        line-height: 50;
        font-family: iconfont;
        font-size: 36;
        font-weight: 600;
        color: #212121;
    }

    .estate-filter {
        flex-direction: row;
        width: 750;
        padding: 20;
        background-color: #ffffff;
    }

    .bui-list {
        flex: 1;
        background-color: #ffffff;
    }

    .tag-list {
        flex-direction: row;
        flex-wrap: wrap;
        width: 710;
        padding: 0 20;
        background-color: #ffffff;
    }

    .tags {
        flex-direction: row;
        align-items: center;
        margin: 10;
        padding: 6 14;
        background-color: #353535;
        border-radius: 200;
    }

    .tag-texts {
        font-size: 24;
        color: #fff;
    }

    .icons {
        font-family: iconfont;
        font-size: 36;
        color: #f5f5f5;
        font-weight: 600;
    }
</style>
