<template>
    <div>
        <status-bar></status-bar>
        <wxc-minibar
                background-color="#fff"
                @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                @wxcMinibarRightButtonClicked="minibarRightButtonClick">
            <text slot="middle" class="title">{{title}}</text>
            <text slot="right" class="search" @click="goTo('search.index',{type:'news'})">&#xe7d4;</text>
        </wxc-minibar>
        <div class="news-filter">
            <screen-sort :sortData="sortData" @reset="reset" @chooseDes="chooseDes" @chooseValue="chooseCode"></screen-sort>
        </div>
        <list class="news-list" v-if="newsData.length">
            <refresh-loading @onRefresh="onRefresh" :refreshIcon="refreshIcon" :display="refreshing"
                             :refreshText="refreshText" @onPullingdown="onPullingdown"></refresh-loading>
            <cell v-for="(item,index) in newsData" :key="index">
                <news-item :dt="item"></news-item>
            </cell>
            <down-loading @onLoading="onLoading" :display="isShowLoading" :loadingText="loadingText"></down-loading>
        </list>
        <no-data v-if="newsDataLength"></no-data>
    </div>
</template>

<script>
    import noData from '../../components/noData'
    import downMenu from '../../components/downMenu'
    import NewsItem from '../../components/newsItem'
    import downLoading from '../../components/bui/downLoading'
    import refreshLoading from '../../components/bui/refreshLoading'
    import StatusBar from '../../components/statusBar'
    import { getSoftList } from '../../service/softApi'
    import { WxcMinibar } from 'weex-ui'
    import screenSort from '../../components/screenList'
    import mixins from '../../common/mixins'

    export default {
        name: 'newsList',
        components: { downMenu, NewsItem, WxcMinibar, StatusBar, downLoading, refreshLoading, screenSort, noData },
        mixins: [mixins],
        data () {
            return {
                type: null,
                title: '',
                changeId: 124,
                searchText: '',
                tags: [],
                page: 1,
                orderBy: '0',
                isShouType: '',
                totalPage: 999,
                newsData: [],
                refreshing: false,
                isShowLoading: false,
                refreshIcon: 'icon-todown',
                refreshText: '下拉刷新...',
                loadingText: '加载更多数据...',
                sortData: [
                    { title: '热度', value: '4' },
                    { title: '好评数', value: '6' },
                    { title: '时间', value: '3' }
                ],
                newsDataLength: false
            }
        },
        watch: {
            type (val) {
                if (val) {
                    this.title = '家装头条'
                    this.changeId = 124
                } else {
                    this.title = '软装品牌'
                    this.changeId = 125
                }
            },
            orderBy (val) {
                this.page = 1
                this.getSoft(
                    this.searchText,
                    this.changeId,
                    this.isShouType,
                    this.tags,
                    this.orderBy,
                    this.page,
                    'refresh'
                )
            }
        },
        methods: {
            onPullingdown (e) {
                // 默认refresh文字与图标
                this.refreshIcon = 'icon-todown'
                this.refreshText = '下拉可以刷新...'
                // 下拉一定距离时文字与图标
                if (Math.abs(e.pullingDistance) > 60) {
                    this.refreshIcon = 'icon-toup'
                    this.refreshText = '松开即可刷新...'
                }
            },
            onRefresh (e) {
                this.refreshing = true
                // 下面代码是模拟异步请求效果
                setTimeout(() => {
                    this.refreshIcon = 'icon-checkbox-on'
                    setTimeout(() => {
                        this.page = 1
                        this.refreshing = false
                        this.getSoft(this.searchText, this.changeId, this.isShouType, this.tags, this.orderBy, this.page, 'refresh')
                        this.refreshText = '刷新成功'
                    }, 300)
                }, 500)
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
                        this.getSoft(this.searchText, this.changeId, this.isShouType, this.tags, this.orderBy, this.page)
                    }
                }, 1000)
            },

            reset (param) {
                this.tags = param.paramsTag
                this.page = 1
                this.getSoft(
                    this.searchText,
                    this.changeId,
                    this.isShouType,
                    this.tags,
                    this.orderBy,
                    this.page,
                    'refresh'
                )
            },
            chooseDes (sort) {
                this.orderBy = sort
            },
            chooseCode (param) {
                this.tags = param.paramsTag
                this.page = 1
                this.getSoft(
                    this.searchText,
                    this.changeId,
                    this.isShouType,
                    this.tags,
                    this.orderBy,
                    this.page,
                    'refresh'
                )
            },
            // 获取家装头条列表
            async getSoft (name, changeId, type, tags = [], orderby, page, refresh) {
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
                        'value': changeId,
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
                this.totalPage = result.totalPage
                if (refresh === 'refresh') {
                    this.newsData = result.content
                } else {
                    this.newsData.push(...result.content)
                }
                this.page = this.page + 1
                if (!this.newsData.length) {
                    this.newsDataLength = true
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
            const params = await this.$router.getParams()
            if (params) {
                this.type = params.type
                if (params.type) {
                    this.changeId = 124
                } else {
                    this.changeId = 125
                }
            }
            if (params && params.searchValue) {
                this.searchText = params.searchValue
                this.changeId = ''
            }
            this.showLoading('加载中...')
            await this.getSoft(this.searchText, this.changeId, this.isShouType, this.tags, this.orderBy, this.page)
            this.hideLoading()
        }
    }
</script>

<style lang="scss" scoped>
    .news-list {
        width: 750px;
        background-color: #fff;
    }

    .title {
        font-size: 33;
        font-weight: 900;
    }

    .search {
        width: 50;
        height: 50;
        line-height: 50;
        font-family: iconfont;
        font-size: 36;
        font-weight: 600;
        color: #212121;
    }

    .news-filter {
        flex-direction: row;
        width: 750;
        padding: 20;
        height: 96px;
        background-color: #fff;
        padding-top: 0;
    }
</style>
