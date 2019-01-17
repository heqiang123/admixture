<template>
    <wxc-tab-page ref="wxc-tab-page"
                  :tab-titles="tabTitles"
                  :tab-styles="tabStyles"
                  :title-use-slot="true"
                  :tab-page-height="pageHeight"
                  @wxcTabPageCurrentTabSelected="changeSelected">
        <div slot="tab-title-0">
            <text class="icon" :class="[index===0?'whiteText':'']">&#xe604; 收藏</text>
        </div>
        <div slot="tab-title-1">
            <text class="icon" :class="[index===1?'whiteText':'']">&#xe658; 关注</text>
        </div>
        <div slot="tab-title-2">
            <text class="icon" :class="[index===2?'whiteText':'']">&#xe613; 点赞</text>
        </div>
        <list class="item-container" :style="{height:`${pageHeight - 80}px`}">
            <refresh-loading @onRefresh="saveContent('refresh')" :refreshIcon="refreshIcon" :display="refreshing"
                             :refreshText="refreshText" :onPullingdown="onPullingdown"></refresh-loading>
            <cell class="cell" v-for="(saveItem,index) of dataList" :key="index">
                <Collection-item :index="index" :item="saveItem" @deleteSaves="deleteItems"></Collection-item>
            </cell>
            <down-loading @onLoading="saveContent('more')" :display="isShowLoading" :loadingText="loadingText"></down-loading>
        </list>
        <list class="item-container" :style="{height:`${pageHeight - 80}px`}">
            <refresh-loading @onRefresh="followContent('refresh')" :refreshIcon="refreshIcon" :display="refreshing"
                             :refreshText="refreshText" :onPullingdown="onPullingdown"></refresh-loading>
            <cell class="cell" v-for="(flowItem,index) of flowResultList" :key="index">
                <focus-item :index="key" :item="flowItem" @deleteFouce="deleteItemd"></focus-item>
            </cell>
            <down-loading @onLoading="followContent('more')" :display="isShowLoading" :loadingText="loadingText"></down-loading>
        </list>
        <list class="item-container" :style="{height:`${pageHeight - 80}px`}">
            <refresh-loading @onRefresh="upContent('refresh')" :refreshIcon="refreshIcon" :display="refreshing"
                             :refreshText="refreshText" :onPullingdown="onPullingdown"></refresh-loading>
            <cell class="cell" v-for="(upItem,index) of dataListUp" :key="index">
                <Up-item :index="index" :item="upItem" @delete="deleteItem"></Up-item>
            </cell>
            <down-loading @onLoading="upContent('more')" :display="isShowLoading" :loadingText="loadingText"></down-loading>
        </list>
    </wxc-tab-page>
</template>

<script>
    import { WxcTabPage, WxcPanItem, BindEnv } from 'weex-ui'
    import CollectionItem from '../../components/collectionItem'
    import FocusItem from '../../components/focusItem'
    import downLoading from '../../components/bui/downLoading'
    import refreshLoading from '../../components/bui/refreshLoading'
    import UpItem from '../../components/upItem'
    import { favorsQuery } from '../../service/userApi'
    import mixins from '../../common/mixins'

    export default {
        components: { WxcTabPage, WxcPanItem, CollectionItem, FocusItem, UpItem, downLoading, refreshLoading },
        mixins: [mixins],
        data () {
            return {
                id: null,
                tabTitles: [{ title: '' }, { title: '' }, { title: '' }],
                tabStyles: {
                    activeTitleColor: '#fff',
                    activeBgColor: '#e60012',
                    width: 200,
                    height: 80,
                    fontSize: 32
                },
                index: 0,
                tabList: [
                    [0, 0, 0],
                    [1, 1, 1],
                    [2, 2, 2]
                ],
                upIndex: '',
                dataUp: [],
                dataListUp: [],
                dataList: [],
                page: 1,
                totalPage: 999,
                tags: [],
                refreshing: false,
                isShowLoading: false,
                refreshIcon: 'icon-todown',
                refreshText: '下拉刷新...',
                loadingText: '加载更多数据...',
                flowResultList: [],
                savePage: 1,
                savetotalpage: '',
                followPage: 1,
                followtotalPage: '',
                upPage: 1,
                uptotalPage: ''
            }
        },
        methods: {
            async saveContent (type) {
                if (type === 'refresh') {
                    this.refreshing = true
                    // 下面代码是模拟异步请求效果
                    this.refreshIcon = 'icon-checkbox-on'
                    this.refreshText = '刷新成功'
                    this.savePage = 1
                    const result = await favorsQuery(this.savePage, 'save')
                    this.savetotalpage = result.totalPage
                    this.dataList = result.content
                    this.refreshing = false
                } else {
                    if (this.savePage >= this.savetotalpage) {
                        this.isShowLoading = true
                        this.loadingText = '没有更多数据了'
                        setTimeout(() => {
                            this.isShowLoading = false
                        }, 500)
                    } else {
                        this.loadingText = '加载更多数据...'
                        this.isShowLoading = true
                        this.savePage++
                        const result = await favorsQuery(this.savePage, 'save')
                        this.dataList.push(...result.content)
                        this.isShowLoading = false
                    }
                }
            },
            async followContent (type) {
                if (type === 'refresh') {
                    this.refreshing = true
                    // 下面代码是模拟异步请求效果
                    this.refreshIcon = 'icon-checkbox-on'
                    this.refreshText = '刷新成功'
                    this.followPage = 1
                    const flowResult = await favorsQuery(this.followPage, 'follow')
                    this.followtotalPage = flowResult.totalPage
                    this.flowResultList = flowResult.content
                    this.refreshing = false
                } else {
                    if (this.followPage >= this.followtotalPage) {
                        this.isShowLoading = true
                        this.loadingText = '没有更多数据了'
                        setTimeout(() => {
                            this.isShowLoading = false
                        }, 500)
                    } else {
                        this.loadingText = '加载更多数据...'
                        this.isShowLoading = true
                        this.followPage++
                        const flowResult = await favorsQuery(this.followPage, 'follow')
                        this.flowResultList.push(...flowResult.content)
                        this.isShowLoading = false
                    }
                }
            },
            async upContent (type) {
                if (type === 'refresh') {
                    this.refreshing = true
                    // 下面代码是模拟异步请求效果
                    this.refreshIcon = 'icon-checkbox-on'
                    this.refreshText = '刷新成功'
                    this.upPage = 1
                    const resultUp = await favorsQuery(this.upPage, 'up')
                    this.uptotalPage = resultUp.totalPage
                    this.dataListUp = resultUp.content
                    this.refreshing = false
                } else {
                    if (this.upPage >= this.uptotalPage) {
                        this.isShowLoading = true
                        this.loadingText = '没有更多数据了'
                        setTimeout(() => {
                            this.isShowLoading = false
                        }, 500)
                    } else {
                        this.loadingText = '加载更多数据...'
                        this.isShowLoading = true
                        this.upPage++
                        const resultUp = await favorsQuery(this.upPage, 'up')
                        this.dataListUp.push(...resultUp.content)
                        this.isShowLoading = false
                    }
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
            changeSelected (e) {
                const index = e.page
                this.index = index
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
            deleteItem (value) {
                // this.dataListUp.splice(value, 1)
                this.upContent('refresh')
            },
            deleteItems (value) {
                // this.dataList.splice(value, 1)
                this.saveContent('refresh')
            },
            deleteItemd (value) {
                // this.flowResultList.splice(value, 1)
                this.followContent('refresh')
            }
        },
        async created () {
            await this.saveContent('refresh')
            await this.followContent('refresh')
            await this.upContent('refresh')
            this.tabList = [...Array(this.tabTitles.length).keys()].map(i => [])
            this.$set(this.tabList, 0, this.dataList)
        }
    }
</script>

<style scoped>
    .item-container {
        width: 750;
        background-color: #fff;
    }

    .icon {
        font-family: iconfont;
        font-size: 32;
    }

    .cell {
        background-color: #ffffff;
    }

    .item-container {
        width: 750px;
        background-color: #f2f3f4;
    }

    .content {
        width: 750;
        align-items: center;
        justify-content: center;
    }

    .whiteText {
        color: #ffffff;
    }
</style>
