<template>
    <div class="container" :style="[isTabBar?{height:pageHeight - 135}:{height:pageHeight}]">
        <screen-sort type="1" :sortData="sortData" @reset="reset" @chooseDes="chooseDes" @chooseValue="chooseCode"></screen-sort>
        <waterfall  class="designer" show-scrollbar="false" :column-width="columnWidth" :column-count="columnCount" :column-gap="columnGap" :show-scrollbar="showScrollbar" :scrollable="scrollable" v-if="desingerDetails.length>=2">
            <refresh @refresh="getContent('refresh')" :display="appState.isRefreshing ? 'show' : 'hide'"></refresh>
            <loading @loading="getContent('more')" :display="appState.isLoading ? 'show' : 'hide'"></loading>
            <!--<refresh-loading @onRefresh="onRefresh" :refreshIcon="refreshIcon" :display="refreshing" :refreshText="refreshText" @onPullingdown="onPullingdown"></refresh-loading>-->
            <cell class="designer-item-wrapper" v-for="(desingerItem,index) in desingerDetails" :key="index">
                <designer-card :item="desingerItem"></designer-card>
            </cell>
            <!--<down-loading @onLoading="onLoading" :display="isShowLoading" :loadingText="loadingText"></down-loading>-->
        </waterfall>
        <div v-if="desingerDetails.length===1">
            <div class="designer-item-wrapper1" v-for="(desingerItem,index) in desingerDetails" :key="index">
                <designer-card :item="desingerItem"></designer-card>
            </div>
        </div>
        <no-data v-if="emptyIsShow&&!desingerDetails.length"></no-data>
    </div>
</template>

<script>
    import noData from '../../components/noData'
    import downMenu from '../../components/downMenu'
    import designerCard from '../../components/designerCard'
    import mixins from '../../common/mixins'
    import { newGetBusiContentDesignerFrontAction } from '../../service/caseApi'
    import screenSort from '../../components/screenList'
    import { getDesignesByEstate } from '../../service/estateApi'
    export default {
        name: 'designer',
        components: { downMenu, designerCard, screenSort, noData },
        mixins: [mixins],
        props: {
            isTabBar: {
                type: Boolean
            }
        },
        data () {
            return {
                frontHouseId: '',
                columnWidth: 365,
                columnCount: 2,
                columnGap: 0,
                showScrollbar: false,
                scrollable: true,
                sort: 'ups desc',
                desingerDetails: [],
                temptags: [],
                page: 1,
                searchText: '',
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
            searchText (newVal, oldVal) {
                this.searchText = newVal
            },
            sort (val) {
                this.page = 1
                this.sort = val
                this.getContent('refresh')
            },
            temptags (val) {
                this.temptags = val
            }
        },
        methods: {
            async getContent (type) {
                this.appShowLoading(type)
                if (this.frontHouseId) {
                    let queryParamList = [{
                        'field': 'frontHouseId',
                        'type': 'string',
                        'logic': 'like',
                        'value': this.frontHouseId,
                        'items': []
                    }]
                    const mTages = this.tags.map(value => {
                        return { field: 'tags' + value.key, type: 'string', logic: '', items: value.tags }
                    })
                    queryParamList = queryParamList.concat(mTages)
                    if (type === 'refresh') {
                        const result = await getDesignesByEstate({
                            'export': false,
                            'orderBy': this.sort || 'ups desc',
                            page: 1,
                            'pageSize': 12,
                            'queryParamList': queryParamList
                        })
                        this.totalPage = result.totalPage
                        this.desingerDetails = result.content
                    } else {
                        if (this.appPage > this.totalPage) {
                            return
                        }
                        const result = await getDesignesByEstate({
                            'export': false,
                            'orderBy': this.sort || 'ups desc',
                            page: this.appPage,
                            'pageSize': 12,
                            'queryParamList': queryParamList
                        })
                        this.totalPage = result.totalPage
                        this.desingerDetails.push(...result.content)
                    }
                    this.appHideLoading(type)
                } else {
                    let queryParamList = [{
                        'field': 'name',
                        'type': 'string',
                        'logic': 'like',
                        'value': this.searchText || '',
                        'items': []
                    }]
                    const mTages = this.tags.map(value => {
                        return { field: 'tags' + value.key, type: 'string', logic: '', items: value.tags }
                    })
                    queryParamList = queryParamList.concat(mTages)

                    if (type === 'refresh') {
                        const result = await newGetBusiContentDesignerFrontAction({
                            'export': false,
                            'orderBy': this.sort || 'ups desc',
                            page: 1,
                            'pageSize': 12,
                            'queryParamList': queryParamList
                        })
                        this.totalPage = result.totalPage
                        this.desingerDetails = result.content
                    } else {
                        const result = await newGetBusiContentDesignerFrontAction({
                            'export': false,
                            'orderBy': this.sort || 'ups desc',
                            page: this.appPage,
                            'pageSize': 12,
                            'queryParamList': queryParamList
                        })
                        this.totalPage = result.totalPage
                        this.desingerDetails.push(...result.content)
                    }
                    this.emptyIsShow = true
                    this.appHideLoading(type)
                }
            },

            // 选择排序
            chooseDes (sort) {
                this.sort = sort
            },
            //
            reset (param) {
                this.tags = param.paramsTag
                this.getContent('refresh')
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
            if (params && params.frontHouseId) {
                this.frontHouseId = params.frontHouseId
            }
            if (params && params.searchValue) {
                this.searchText = params.searchValue
            }
            this.getContent('refresh')
        }
    }
</script>

<style lang="scss" scoped>
    .designer {
        width: 750px;
    }

    .container {
        width: 750px;
    }

    .designer-filter {
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

    .designer-item-wrapper {
        width: 350;
        height: 670px;
        background-color: #fff;
    }
    .designer-item-wrapper1 {
        width: 370;
        height: 670px;
    }

    .case-filter {
        flex-direction: row;
        flex-wrap: wrap;
        width: 750;
        padding: 20;
        background-color: #fff;
    }
</style>
