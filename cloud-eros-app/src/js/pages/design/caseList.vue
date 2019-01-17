<template>
    <div>
        <screen-sort type="2" :sortData="sortData" @reset="reset" @chooseDes="chooseDes" @chooseValue="chooseCode"></screen-sort>
        <list class="case" :style="{height:pageHeight-95}">
            <refresh-loading @onRefresh="onRefresh" :refreshIcon="refreshIcon" :display="refreshing"
                             :refreshText="refreshText" @onPullingdown="onPullingdown"></refresh-loading>
            <cell v-for="(caseItem,index) in caseDetail"
                  :key="index"
                  class="case-item"
            >
                <case-item :item="caseItem"></case-item>
            </cell>
            <down-loading @onLoading="onLoading" :display="isShowLoading" :loadingText="loadingText"></down-loading>
        </list>
    </div>
</template>

<script>
    import downMenu from '../../components/downMenu'
    import CaseItem from '../../components/caseItem'
    import { BusiContentCase } from '../../service/caseApi'
    import mixins from '../../common/mixins'
    import downLoading from '../../components/bui/downLoading'
    import refreshLoading from '../../components/bui/refreshLoading'
    import screenSort from '../../components/screenList'
    import { getAllCaseByStoreIdPage } from '../../service/storeApi.js'

    export default {
        name: 'caseList',
        components: { downMenu, CaseItem, downLoading, refreshLoading, screenSort },
        mixins: [mixins],
        data () {
            return {
                caseDetail: [],
                designerName: '',
                caseList: [],
                designerCase: [],
                sort: 'ups desc',
                page: 1,
                temptags: [],
                totalPage: 999,
                tags: [],
                // 页面传过来的id
                id: '',
                // 页面传过来的数据type
                type: '',
                refreshing: false,
                isShowLoading: false,
                refreshIcon: 'icon-todown',
                refreshText: '下拉刷新...',
                loadingText: '加载更多数据...',
                sortData: [
                    { title: '智能排序', value: 'ups desc' },
                    { title: '好评数', value: 'comments desc' }
                ]
            }
        },
        watch: {
            searchText (val) {
                this.searchText = val
            },
            sort (val) {
                this.sort = val
                this.page = 1
                this.getBusinessImg(
                    this.searchText,
                    this.tags,
                    this.sort,
                    this.page,
                    'refresh'
                )
            }
        },
        methods: {
            async getBusinessImg (name, tags, orderby, page, refresh) {
                let queryParamList = [{
                    'field': 'storeId',
                    'type': 'string',
                    'logic': 'like',
                    'value': name || '',
                    'items': []
                }]
                const queryCaseParamList = [{
                    'field': 'housesId',
                    'type': 'string',
                    'logic': 'like',
                    'value': name || '',
                    'items': []
                }]
                const queryDesignerParamList = [{
                    'field': 'designerId',
                    'type': 'string',
                    'logic': 'like',
                    'value': name || '',
                    'items': []
                }]
                const mTages = tags.map(value => {
                    return { field: 'tags' + value.Key, type: 'string', logic: '', items: value.tags }
                })
                queryParamList = queryParamList.concat(mTages)
                if (this.type === '1') {
                    const result = await BusiContentCase({
                        export: false,
                        orderBy: orderby || 'ups desc',
                        page: page,
                        pageSize: 12,
                        queryParamList: queryParamList

                    })
                    this.totalPage = result.totalPage
                    if (refresh === 'refresh') {
                        this.caseDetail = result.content
                    } else {
                        this.caseDetail.push(...result.content)
                    }
                    this.page = this.page + 1
                }
                // if (this.type === '3') {
                //     console.log(1111111111)
                // }
                if (this.type === '3') {
                    const result = await getAllCaseByStoreIdPage({
                        export: false,
                        orderBy: orderby || 'ups desc',
                        page: page,
                        pageSize: 12,
                        queryParamList: queryParamList

                    })
                    this.totalPage = result.totalPage
                    if (refresh === 'refresh') {
                        this.caseDetail = result.content
                    } else {
                        this.caseDetail.push(...result.content)
                    }
                    this.page = this.page + 1
                }
                if (this.type === '2') {
                    const result = await BusiContentCase({
                        export: false,
                        orderBy: orderby || 'ups desc',
                        page: page,
                        pageSize: 6,
                        queryParamList: queryDesignerParamList

                    })
                    this.totalPage = result.totalPage
                    if (refresh === 'refresh') {
                        this.caseDetail = result.content
                    } else {
                        this.caseDetail.push(...result.content)
                    }
                    this.page = this.page + 1
                    console.log('ssssssssss------------', JSON.stringify(this.caseDetail))
                }
                if (this.type === '4') {
                    const result = await BusiContentCase({
                        export: false,
                        orderBy: orderby || 'ups desc',
                        page: page,
                        pageSize: 6,
                        queryParamList: queryCaseParamList

                    })
                    this.totalPage = result.totalPage
                    if (refresh === 'refresh') {
                        this.caseDetail = result.content
                    } else {
                        this.caseDetail.push(...result.content)
                    }
                    this.page = this.page + 1
                }
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
                        this.getBusinessImg(
                            this.id,
                            this.tags,
                            this.sort,
                            this.page,
                            'refresh'
                        )
                    }, 300)
                }, 200)
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
                        this.getBusinessImg(
                            this.id,
                            this.tags,
                            this.sort,
                            this.page
                        )
                    }
                }, 200)
            },
            // 选择排序
            chooseDes (sort) {
                this.sort = sort
            },
            //
            reset (param) {
                this.tags = param.paramsTag
                this.page = 1
                this.getBusinessImg(
                    this.id,
                    this.tags,
                    this.sort,
                    this.page,
                    'refresh'
                )
            },
            // 获取案例筛选标签
            chooseCode (param) {
                this.tags = param.paramsTag
                this.temptags = param.temptags
                this.page = 1
                this.getBusinessImg(
                    this.searchText,
                    this.tags,
                    this.sort,
                    this.page,
                    'refresh'
                )
            }
        },
        async created () {
            const params = await this.$router.getParams()
            this.id = params.id
            this.type = params.type
            await this.getBusinessImg(this.id, this.tags, this.sort, this.page)
        },
        eros: {
            beforeBackAppear (params) {
                if (params.todo === 'refresh') {
                    this.getBusinessImg(this.id, this.tags, this.sort, 1, 'refresh')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .case {
        width: 750;
    }

    .case-filter {
        flex-direction: row;
        flex-wrap: wrap;
        width: 750;
        padding: 20;
        background-color: #fff;
    }

    .tag-list {
        flex-direction: row;
        flex-wrap: wrap;
        width: 710;
        padding: 0 20;
    }

    .tag {
        flex-direction: row;
        align-items: center;
        margin: 10;
        padding: 6 14;
        background-color: #353535;
        border-radius: 200;
    }

    .tag-text {
        font-size: 24;
        color: #fff;
    }

    .icon {
        font-family: iconfont;
        font-size: 36;
        color: #f5f5f5;
        font-weight: 600;
    }

    .case-item {
        flex-direction: row;
        background-color: #fff;
    }

    .case-item-wrapper {
        width: 375;
    }

    .case-image {
        width: 369;
        height: 369;
        margin: 4;
    }
</style>
