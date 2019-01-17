<template>
    <div>
        <status-bar></status-bar>
        <div class="designDrawings">
            <image class="designDrawings-back" src="bmlocal://assets/images/sliceBack@2x.png" @click="$router.back()"></image>
            <text class="designDrawings-font">设计图纸</text>
        </div>
        <wxc-tab-page ref="wxc-tab-page"
                      :tab-titles="tabTitles"
                      :tab-styles="tabStyles"
                      title-type="icon"
                      :tab-page-height="pageHeight"
                      wrap-bg-color="#ffffff"
                      @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected" style="border-top-width: 1px;border-top-style: solid;border-top-color: #cccccc;">
            <list class="item-container" :style="{height:`${pageHeight-120}px`}">
                <cell class="cell" v-for="(item,index) of imgListId" :key="index" >
                    <render-list :item="item.photoIds" :index="index" @getBig="getBig($event)"></render-list>
                </cell>
            </list>
            <list class="item-container" :style="{height:`${pageHeight-120}px`}">
                <cell class="cell" v-for="(item,index) of imgListIds" :key="index">
                    <render-list :item="item.photoIds" :index="index" @getBig="getBig($event)"></render-list>
                </cell>
            </list>
        </wxc-tab-page>
        <wxc-lightbox
                ref="wxc-lightbox"
                height="500"
                width="750"
                overlay-opacity="1"
                :show="showImg"
                indicator-color="{'item-color': 'rgba(0, 0, 0, 1)','item-selected-color': '#000000','item-size': '0px'}"
                :image-list="imageList"
                @wxcLightboxOverlayClicked="wxcLightboxOverlayClicked">
        </wxc-lightbox>
    </div>
</template>

<script>
    import mixins from '../../common/mixins'
    import StatusBar from '../../components/statusBar'
    import { WxcTabPage, WxcPanItem, BindEnv } from 'weex-ui'
    import { getChart, getDeepChart } from '../../service/baseApi'
    import renderList from '../../components/render'
    import WxcLightbox from '../../components/wxcLightBox'

    export default {
        name: 'designDrawings',
        mixins: [mixins],
        components: { WxcTabPage, WxcPanItem, renderList, WxcLightbox, StatusBar },
        data () {
            return {
                tabTitles: [
                    {
                        title: '平面图',
                        ids: '0'
                    },
                    {
                        title: '效果图',
                        ids: '1'
                    }

                ],
                tabStyles: {
                    activeTitleColor: '#E60012',
                    activeBgColor: '#FFFFFF',
                    activeBottomColor: '#E60012',
                    activeBottomHeight: 6,
                    activeBottomWidth: 80,
                    isActiveTitleBold: true,
                    width: 300,
                    height: 80,
                    leftOffset: 75,
                    fontSize: 28
                },
                tabList: [],
                demoList: [1, 2, 3, 4, 5, 6, 7, 8],
                imgList: [],
                imgUrl: 1,
                resultId: '',
                imgUrlArray: [],
                imgListIds: [],
                imgListId: [],
                // 接收页面传过来的id
                designerId: '',
                // 接收页面传过来的服务id
                serviceId: '',
                showImg: false,
                imageList: [],
                designerName: ''
            }
        },
        props: {
            id: {
                type: Number
            },
            page: {
                type: String
            }
        },
        watch: {
            id (val) {
                this.imgListId = []
                this.imgListIds = []
                this.getChartList({ 'key': [val] })
                this.getdeepChartList({ 'key': [val] })
            }
        },
        async mounted () {
            const params = await this.$router.getParams()
            if (params && params.graphicId) {
                this.id = params.graphicId
            }
            if (params && params.depthId) {
                this.id = params.depthId
            }
            if (params && params.pageP) {
                this.page = params.pageP
            }
            if (params && params.page) {
                this.page = params.page
            }
            this.tabList = [...Array(this.tabTitles.length).keys()].map(i => [])
            this.$set(this.tabList, 0, this.demoList)
            await this.getChartList({ 'key': [this.id] })
            await this.getdeepChartList({ 'key': [this.id] })
            console.log('设计图的page', this.page)
            console.log('设计图的id', this.id)
            const pageJson = { 'page': this.page }
            this.wxcTabPageCurrentTabSelected(pageJson)
            this.$refs['wxc-tab-page'].setPage(this.page, null, false)
        },
        methods: {
            async getChartList (id) {
                const result = await getChart(id)
                this.imgListId = result
            },
            async getdeepChartList (id) {
                const result = await getDeepChart(id)
                this.imgListIds = result
            },
            wxcTabPageCurrentTabSelected (e) {
                const index = e.page
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
            getBig (url) {
                // 点击看大图
                this.showImg = true
                this.imageList = [{ 'src': url }]
            },
            wxcLightboxOverlayClicked (e) {
                // 无状态组件，需要在此次关闭
                this.showImg = false
            }
        }
    }
</script>

<style scoped>
    .designDrawings {
        width: 750px;
        height: 90px;
        background-color: #FFFFFF;
        align-items: center;
        justify-content: center;
        flex-direction: row;
    }

    .designDrawings-back {
        height: 60px;
        width: 60px;
        position: absolute;
        top: 14px;
        left: 20px
    }

    .designDrawings-font {
        font-size: 36px;
    }

    .iconfont {
        font-family: iconfont2;
    }

    .item-container {
        width: 750px;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: #cccccc;
    }

    .border-cell {
        background-color: #f3f3f3;
        width: 750px;
        height: 24px;
        align-items: center;
        justify-content: center;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: #e0e0e0;
    }

    .cell {
        background-color: #ffffff;
    }

    .content {
        width: 750px;
        height: 300px;
        border-bottom-width: 1px;
        align-items: center;
        justify-content: center;
    }

    .line {
        width: 750;
        height: 20;
        border-width: 1px;
        border-style: solid;
        border-color: rgba(219, 214, 214, 0.5);
    }

    .item-box {
        background-color: #ffffff;
        border-top-width: 1;
        border-top-color: #DBD6D6;
        border-top-style: solid;
    }

    .draw-box {
        padding: 20;
    }

    .draw-title {
        flex-direction: row;
        align-items: center;
        align-content: center;
    }

    .icon-index {
        width: 40;
        height: 40;
        line-height: 40;
        font-size: 26;
        border-radius: 50%;
        background-color: #E60012;
        color: #ffffff;
        text-align: center;
    }

    .title-name {
        margin-left: 20;
        color: #333333;
        font-size: 28;
    }

    .draw {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 20 0;
    }

    .draw-img {
        width: 562;
        height: 392;
        object-fit: cover;
        overflow: hidden;
    }

    .draw-desc {
        background-color: #f2f2f2;
        padding: 20 32;
    }

    .draw-desc-label {
        font-size: 30;
        color: #444444;
    }

    .draw-desc-text {
        font-size: 28;
        color: #555555;
        padding-top: 6;
    }
</style>
