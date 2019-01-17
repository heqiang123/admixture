<template>
    <div>
        <status-bar></status-bar>
        <wxc-minibar
                :show="isShowBar"
                background-color="#fff"
                @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                @wxcMinibarRightButtonClicked="minibarRightButtonClick">
            <text slot="middle" class="title">工地列表</text>
        </wxc-minibar>
        <screen-sort :sortData="sortData" @reset="reset" @chooseDes="chooseDes"
                     @chooseValue="chooseCode"></screen-sort>
        <list class="construction-list" :style="{height:pageHeight-80}" v-if="contrucList.length">
            <refresh-loading @onRefresh="onRefresh" :refreshIcon="refreshIcon" :display="refreshing"
                             :refreshText="refreshText" @onPullingdown="onPullingdown"></refresh-loading>
            <cell v-for="(item,index) in contrucList" :key="index">
                <con-item :item="item" :homePhone="homePhone"></con-item>
            </cell>
            <down-loading @onLoading="onLoading" :display="isShowLoading" :loadingText="loadingText"></down-loading>
        </list>
        <no-data v-if="contrucListLength"></no-data>
    </div>
</template>

<script>
    import noData from '../../components/noData'
    import ConItem from '../../components/conItem'
    import DownMenu from '../../components/downMenu'
    import StatusBar from '../../components/statusBar'
    import screenSort from '../../components/screenList'
    import { WxcMinibar } from 'weex-ui'
    import mixins from '../../common/mixins'
    import { getConstList, getConstListByestateId } from '../../service/storeApi'
    import downLoading from '../../components/bui/downLoading'
    import refreshLoading from '../../components/bui/refreshLoading'

    export default {
        name: 'construction',
        mixins: [mixins],
        props: {
            isShowBar: {
                type: Boolean,
                default: true
            }
        },
        components: { ConItem, WxcMinibar, DownMenu, StatusBar, screenSort, downLoading, refreshLoading, noData },
        data () {
            return {
                sortData: [
                    { title: '智能排序', value: 'ups desc' },
                    { title: '好评数', value: 'comments desc' }
                ],
                contrucList: [],
                searchText: '',
                esateId: null,
                tags: [],
                temptags: [],
                sort: '',
                page: 1,
                homePhone: null,
                totalPage: 999,
                refreshing: false,
                isShowLoading: false,
                refreshIcon: 'icon-todown',
                refreshText: '下拉刷新...',
                loadingText: '加载更多数据...',
                contrucListLength: false
            }
        },
        methods: {
            async getListByesateId (esateId, tags, orderby, page, refresh) {
                let queryParamList = [{
                    'field': 'frontHouseId',
                    'type': 'string',
                    'logic': 'like',
                    'value': esateId || '',
                    'items': []
                }]
                const mTages = tags.map(value => {
                    return { field: 'tags' + value.key, type: 'string', logic: '', items: value.tags }
                })
                queryParamList = queryParamList.concat(mTages)
                const result = await getConstListByestateId({
                    export: false,
                    orderBy: orderby || 'ups desc',
                    page: page,
                    pageSize: 6,
                    queryParamList: queryParamList
                })
                this.totalPage = result.totalPage
                if (refresh === 'refresh') {
                    this.contrucList = result.content
                } else {
                    this.contrucList.push(...result.content)
                }
                this.page = this.page + 1
            },

            async getList (name, tags, orderby, page, refresh) {
                let queryParamList = [{
                    'field': 'houseName',
                    'type': 'string',
                    'logic': 'like',
                    'value': name || '',
                    'items': []
                }]
                const mTages = tags.map(value => {
                    return { field: 'tags' + value.key, type: 'string', logic: '', items: value.tags }
                })
                queryParamList = queryParamList.concat(mTages)
                const result = await getConstList({
                    export: false,
                    orderBy: orderby || 'ups desc',
                    page: page,
                    pageSize: 6,
                    queryParamList: queryParamList
                })
                this.totalPage = result.totalPage
                if (refresh === 'refresh') {
                    this.contrucList = result.content
                } else {
                    this.contrucList.push(...result.content)
                }
                this.page = this.page + 1
                if (!this.contrucList.length) {
                    this.contrucListLength = true
                }
            },

            chooseDes (sort) {
                this.sort = sort
                this.page = 1
                if (this.esateId) {
                    this.getListByesateId(
                        this.esateId,
                        this.tags,
                        this.sort,
                        this.page,
                        'refresh'
                    )
                }
                if (this.searchText || this.searchText === '') {
                    this.getList(
                        this.searchText,
                        this.tags,
                        this.sort,
                        this.page,
                        'refresh'
                    )
                }
            },
            reset (param) {
                this.tags = param.paramsTag
                this.page = 1
                if (this.esateId) {
                    this.getListByesateId(
                        this.esateId,
                        this.tags,
                        this.sort,
                        this.page,
                        'refresh'
                    )
                }
                if (this.searchText || this.searchText === '') {
                    this.getList(
                        this.searchText,
                        this.tags,
                        this.sort,
                        this.page,
                        'refresh'
                    )
                }
            },
            // 获取楼盘筛选标签
            chooseCode (param) {
                this.tags = param.paramsTag
                this.page = 1
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
                    this.refreshText = '刷新成功'
                    setTimeout(() => {
                        this.page = 1
                        this.refreshing = false
                        if (this.esateId) {
                            this.getListByesateId(
                                this.esateId,
                                this.tags,
                                this.sort,
                                this.page,
                                'refresh'
                            )
                        }
                        if (this.searchText) {
                            this.getList(
                                this.searchText,
                                this.tags,
                                this.sort,
                                this.page,
                                'refresh'
                            )
                        }
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
                        if (this.esateId) {
                            this.getListByesateId(
                                this.esateId,
                                this.tags,
                                this.sort,
                                this.page
                            )
                        }
                        if (this.searchText) {
                            this.getList(
                                this.searchText,
                                this.tags,
                                this.sort,
                                this.page
                            )
                        }
                    }
                }, 1000)
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
            this.homePhone = params.homePhone
            if (params && params.searchValue === '' || params.searchValue) {
                this.searchText = params.searchValue
                await this.getList(
                    this.searchText,
                    this.tags,
                    this.sort,
                    this.page
                )
            }
            if (params && params.id) {
                this.esateId = params.id
                await this.getListByesateId(
                    this.esateId,
                    this.tags,
                    this.sort,
                    this.page
                )
            }
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
