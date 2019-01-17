<template>
    <div>
        <status-bar v-if="isShowBar"></status-bar>
        <wxc-minibar :show="isShowBar" background-color="#fff" @wxcMinibarLeftButtonClicked="minibarLeftButtonClick" @wxcMinibarRightButtonClicked="minibarRightButtonClick">
            <text slot="middle" class="title">门店</text>
            <div class="right-wrapper" slot="right">
                <text class="icon" @click="goTo('others.map')">&#xe656;</text>
                <text class="icon" @click="goTo('search.index',{type:'store'})"> &#xe7d4;</text>
            </div>
        </wxc-minibar>
        <screen-sort :sortData="sortData" @reset="reset" @chooseDes="chooseDes" @chooseValue="chooseCode"></screen-sort>
        <list class="construction-list" :style="{height:pageHeight-110}" v-if="stroeList.length">
            <refresh @refresh="getContent('refresh')" :display="appState.isRefreshing ? 'show' : 'hide'"></refresh>
            <loading @loading="getContent('more')" :display="appState.isLoading ? 'show' : 'hide'"></loading>
            <cell v-for="(item,index) in stroeList" :key="index">
                <store-item :item="item" :homePhone="homePhone"></store-item>
            </cell>
        </list>
        <no-data v-if="stroeListLength"></no-data>
    </div>
</template>

<script>
    import noData from '../../components/noData'
    import StoreItem from '../../components/storeItem'
    import DownMenu from '../../components/downMenu'
    import screenSort from '../../components/screenList'
    import StatusBar from '../../components/statusBar'
    import { WxcMinibar } from 'weex-ui'
    import { getStoreList } from '../../service/baseApi'
    import mixins from '../../common/mixins'

    export default {
        name: 'store',
        mixins: [mixins],
        props: {
            isShowBar: {
                type: Boolean,
                default: true
            },
            homePhone: {
                type: Object
            }
        },
        components: { StoreItem, WxcMinibar, DownMenu, StatusBar, screenSort, noData },
        data () {
            return {
                searchText: '',
                tags: [],
                temptags: [],
                sort: 'ups desc',
                stroeList: [],
                sortData: [
                    { title: '智能排序', value: 'ups desc' },
                    { title: '好评数', value: 'comments desc' }
                ],
                totalPage: '',
                stroeListLength: false
            }
        },
        watch: {
            sort (val) {
                this.sort = val
                this.getContent('refresh')
            }
        },
        methods: {
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
                    const result = await getStoreList({
                        export: false,
                        orderBy: this.sort || 'ups desc',
                        page: 1,
                        pageSize: 12,
                        queryParamList: queryParamList
                    })
                    this.totalPage = result.totalPage
                    this.stroeList = result.content
                } else {
                    if (this.appPage > this.totalPage) {
                        return
                    }
                    const result = await getStoreList({
                        export: false,
                        orderBy: this.sort || 'ups desc',
                        page: this.appPage,
                        pageSize: 12,
                        queryParamList: queryParamList
                    })
                    this.totalPage = result.totalPage
                    this.stroeList.push(...result.content)
                }
                this.appHideLoading(type)
                if (!this.stroeList.length) {
                    this.stroeListLength = true
                }
            },
            // 选择排序
            chooseDes (sort) {
                this.sort = sort
            },
            reset (param) {
                this.tags = param.paramsTag
                this.temptags = param.temptags
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
            this.getContent('refresh')
        }
    }
</script>

<style lang="scss" scoped>
    .construction-list {
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
    }

    .icon {
        line-height: 50;
        font-family: iconfont;
        font-size: 36;
        font-weight: 600;
        color: #212121;
    }

    .construction-filter {
        flex-direction: row;
        width: 750;
        padding: 20;
        background-color: #fff;
    }
</style>
