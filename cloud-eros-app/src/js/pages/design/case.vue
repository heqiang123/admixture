<template>
    <div>
        <div v-if="params && !isTabBar">
            <status-bar></status-bar>
            <wxc-minibar background-color="#fff">
                <text slot="middle" class="title">案例</text>
                <div class="right-wrapper" slot="right">
                    <text class="icon" @click="goTo('search.index',{ type: 'case'})"> &#xe7d4;</text>
                </div>
            </wxc-minibar>
        </div>
        <div class="container" :style="[isTabBar?{height:pageHeight - 135}:{height:pageHeight - 20}]">
            <screen-sort type="2" :sortData="sortData" @reset="reset" @chooseDes="chooseDes" @chooseValue="chooseCode"></screen-sort>
            <waterfall class="case" show-scrollbar="false" :column-width="columnWidth" :column-count="columnCount" :column-gap="columnGap" :show-scrollbar="showScrollbar" :scrollable="scrollable" v-if="imgLIst.length">
                <refresh @refresh="getContent('refresh')" :display="appState.isRefreshing ? 'show' : 'hide'"></refresh>
                <loading @loading="getContent('more')" :display="appState.isLoading ? 'show' : 'hide'"></loading>
                <cell class="case-item-wrapper" v-for="(item,index) in imgLIst" :key="index">
                    <case-card :item="item" :style="{marginBottom:5}"></case-card>
                </cell>
            </waterfall>
            <no-data v-if="emptyIsShow&&!imgLIst.length"></no-data>
        </div>
    </div>
</template>

<script>
    import downMenu from '../../components/downMenu'
    import { BusiContentCase } from '../../service/caseApi'
    import mixins from '../../common/mixins'
    import CaseItem from '../../components/caseItem'
    import caseCard from '../../components/caseCard'
    import noData from '../../components/noData'
    import screenSort from '../../components/screenList'
    import { WxcMinibar } from 'weex-ui'
    import StatusBar from '../../components/statusBar'

    export default {
        name: 'case',
        components: { downMenu, CaseItem, caseCard, screenSort, WxcMinibar, StatusBar, noData },
        mixins: [mixins],
        props: {
            isTabBar: {
                type: Boolean
            }
        },
        data () {
            return {
                // 接收后台传过来的数据
                columnWidth: 375,
                params: {},
                columnCount: 2,
                columnGap: 0,
                showScrollbar: false,
                scrollable: true,
                imgLIst: [],
                temptags: [],
                searchText: '',
                sort: 'ups desc',
                tags: [],
                sortData: [
                    { title: '智能排序', value: 'ups desc' },
                    { title: '好评数', value: 'comments desc' }
                ],
                totalPage: '',
                emptyIsShow: false
            }
        },
        watch: {
            searchText (val) {
                this.searchText = val
            },
            temptags (val) {
                this.temptags = val
            }
        },
        methods: {
            async getContent (type) {
                this.appShowLoading(type)
                let queryParamList = [{
                    'field': 'title',
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
                    const result = await BusiContentCase({
                        export: false,
                        orderBy: this.sort || 'ups desc',
                        page: 1,
                        pageSize: 18,
                        queryParamList: queryParamList
                    })
                    this.totalPage = result.totalPage
                    this.imgLIst = result.content
                } else {
                    if (this.appPage > this.totalPage) {
                        return
                    }
                    const result = await BusiContentCase({
                        export: false,
                        orderBy: this.sort || 'ups desc',
                        page: this.appPage,
                        pageSize: 18,
                        queryParamList: queryParamList
                    })
                    this.totalPage = result.totalPage
                    this.imgLIst.push(...result.content)
                }
                this.emptyIsShow = true
                this.appHideLoading(type)
            },
            // 选择排序
            chooseDes (sort) {
                this.sort = sort
                this.getContent('refresh')
            },
            reset (param) {
                this.tags = param.paramsTag
                // this.imgLIst = []
                this.page = 1
                this.getBusinessImg(
                    this.searchText,
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
                this.getContent('refresh')
            }
        },
        async created () {
            const params = await this.$router.getParams()
            // if (params.types) {
            //     this.types = params.types
            // }
            if (params && params.searchValue) {
                this.searchText = params.searchValue
            }
            this.getContent('refresh')
        }
    }
</script>

<style lang="scss" scoped>
    .case {
        width: 750px;
    }

    .container {
        width: 750px;
    }

    .case-filter {
        flex-direction: row;
        flex-wrap: wrap;
        width: 750;
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
        margin-left: 50px;
    }

    .title {
        font-size: 33;
        font-weight: 900;
    }

    .tag-text {
        font-size: 24;
        color: #fff;
    }

    .case-filter {
        flex-direction: row;
        width: 750;
        padding: 20;
        background-color: #fff;
    }

    .icon {
        font-family: iconfont;
        font-size: 36;
        color: #dddddd;
        font-weight: 600;
    }

    .cards {
        flex-direction: row;
        width: 750;
    }

    .case-item-wrapper {
        width: 350;
        background-color: #fff;
    }
</style>
