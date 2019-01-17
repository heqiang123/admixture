<template>
    <div>
        <status-bar></status-bar>
        <div class="soft-header">
            <text class="soft-back" @click="$router.back()">&#xe601;</text>
            <text class="soft-title" :style="!state.typeActive ? nomalStyle : selectedStyle" @click="state.typeActive = !state.typeActive">潮流奢品</text>
            <text class="soft-title" :style="state.typeActive ? nomalStyle : selectedStyle" @click="state.typeActive = !state.typeActive">精选案例</text>
            <text class="soft-search" @click="goTo('search.index',{type:'news'})">&#xe7d4;</text>
        </div>
        <div class="news-filter">
            <screen-sort :sortData="sortData" @reset="reset" @chooseDes="chooseDes"
                         @chooseValue="chooseCode"></screen-sort>
        </div>
        <list class="news-list" :style="{height:height}">
            <refresh-loading @onRefresh="onRefresh" :refreshIcon="refreshIcon" :display="refreshing"
                             :refreshText="refreshText" @onPullingdown="onPullingdown"></refresh-loading>
            <cell v-for="(item,index) in softData" :key="index">
                <news-item :dt="item"></news-item>
            </cell>
            <down-loading @onLoading="onLoading" :display="isShowLoading" :loadingText="loadingText"></down-loading>
        </list>
    </div>
</template>

<script>
    import downMenu from '../../components/downMenu'
    import NewsItem from '../../components/newsItem'
    import StatusBar from '../../components/statusBar'
    import { getSoftList } from '../../service/softApi'
    import downLoading from '../../components/bui/downLoading'
    import refreshLoading from '../../components/bui/refreshLoading'
    import { WxcMinibar } from 'weex-ui'
    import mixins from '../../common/mixins'
    import screenSort from '../../components/screenList'

    export default {
        name: 'softList',
        components: { downMenu, NewsItem, WxcMinibar, StatusBar, downLoading, refreshLoading, screenSort },
        mixins: [mixins],
        data () {
            return {
                state: {
                    typeActive: true
                },
                type: 1,
                nomalStyle: {
                    color: '#999',
                    'border-bottom-color': 'transparent',
                    'border-bottom-style': 'solid',
                    'border-bottom-width': 4
                },
                selectedStyle: {
                    'border-bottom-color': '#e60012',
                    'border-bottom-style': 'solid',
                    'border-bottom-width': 4
                },
                softData: [],
                changeId: 151,
                searchText: '',
                tags: [],
                page: 1,
                orderBy: '0',
                isShouType: '',
                totalPage: 999,
                refreshing: false,
                isShowLoading: false,
                refreshIcon: 'icon-todown',
                refreshText: '下拉刷新...',
                loadingText: '加载更多数据...',
                sortData: [
                    { title: '热度', value: '4' },
                    { title: '好评数', value: '6' },
                    { title: '时间', value: '3' }
                ]
            }
        },
        watch: {
            state: {
                handler (o) {
                    if (o.typeActive) {
                        this.changeId = 151
                    } else {
                        this.changeId = 155
                    }
                    this.page = 1
                    this.getSoft(this.searchText, this.changeId, this.isShouType, this.tags, this.orderBy, this.page, 'refresh')
                },
                deep: true
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
            // 获取软文分页列表
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
                    this.softData = result.content
                } else {
                    this.softData.push(...result.content)
                }
                this.page = this.page + 1
            },
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
                        this.newsData = []
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
            }

        },
        beforeCreate () {
            this.$router.getParams(dt => {
                this.type = dt.type || 1
            })
            this.$navigator.setNavigationInfo({
                title: '',
                navShow: false,
                statusBarStyle: 'Default'
            })
        },
        async created () {
            await this.getSoft(this.searchText, this.changeId, this.isShouType, this.tags, this.orderBy, this.page)
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
        height: 96px;
        padding: 20;
        background-color: #fff;
        padding-top: 0;
    }

    .soft-header {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 750;
        height: 110;
        background-color: #fff;
    }

    .soft-title {
        width: 180;
        height: 80;
        line-height: 80;
        text-align: center;
        font-size: 36;
    }

    .soft-search {
        position: absolute;
        top: 42;
        right: 60;
        font-family: iconfont;
        font-size: 36;
    }

    .soft-back {
        position: absolute;
        top: 36;
        left: 40;
        font-family: iconfont;
        font-size: 48;
        font-weight: 600;
    }
</style>
