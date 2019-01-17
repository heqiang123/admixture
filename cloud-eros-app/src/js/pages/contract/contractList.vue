<template>
    <div>
        <status-bar></status-bar>
        <div class="contractlist">
            <image class="contractlist-back" src="bmlocal://assets/images/sliceBack@2x.png" @click="$router.back()"></image>
            <text class="contractlist-font">费用汇总</text>
        </div>
        <!--<wxc-tab-page ref="wxc-tab-page" :tab-titles="tabTitles" :tab-styles="tabStyles" title-type="icon" wrap-bg-color="#ffffff" @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">-->
        <list class="item-container" :style="{ height:`${pageHeight-110}`}">
            <cell class="cell">
                <div class="content">
                    <div class="line"></div>
                    <div class="top">
                        <div class="tags">
                            <div class="tags-image"></div>
                            <text class="tags-font">总费用:</text>
                            <text class="tags-pay">￥1512100.00</text>
                        </div>
                    </div>
                    <div class="middle">
                        <div class="label">
                            <text class="label-sumpaid">合计已付:</text>
                            <text class="label-pay">￥1512100.00</text>
                            <text class="label-paid">已付:</text>
                            <text class="label-rate">30%</text>
                        </div>
                    </div>
                    <div class="bottom-sum">
                        <text class="bottom-font">合计未付:</text>
                        <text class="label-bottom">￥1512100.00</text>
                    </div>
                </div>
            </cell>
                <cell v-for="(item,key) of allTab" class="cell" :key="key">
                    <!--<wxc-pan-item @wxcPanItemPan="wxcPanItemPan">-->
                        <div class="hr"></div>
                        <div class="warp">
                            <div class="content">
                                <div class="top">
                                    <div class="tags">
                                        <image class="tags-image" resize="cover" src="bmlocal://assets/images/rectangle@2x.png"></image>
                                        <text class="tags-name">{{item.code}}</text>
                                    </div>
                                    <div class="date">
                                        <text class="time">{{$dayjs(item.signTime).format('YYYY-MM-DD')}}</text>
                                    </div>
                                </div>
                                <div class="middle">
                                    <div class="label">
                                        <text class="label-name">签约金额：</text>
                                        <text class="label-val">￥{{item.price}}</text>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <div class="label">
                                        <text class="label-name">已付：</text>
                                        <text class="label-val text-color-red">{{item.ratio || '0.00%'}}</text>
                                    </div>
                                    <div class="date">
                                        <text class="time text-color-blue">{{item.designerName || ''}}</text>
                                    </div>
                                </div>
                            </div>
                            <div class="line"></div>
                            <div class="operation">
                                <text class="text-btn btn-red" @click="goTo('contract.detail',{id:item.bussinessId})">合同详情</text>
                                <text class="text-btn btn-red" @click="goTo('contract.coatDetail',{id:item.id,type:item.type})">费用详情</text>
                                <text class="text-btn btn-red" v-if="item.name==='材料合同'" @click="goTo('quotation.list',{id:item.id,sid:serviceId,enter:2})">材料详情</text>
                            </div>
                        </div>
                    <!--</wxc-pan-item>-->
                </cell>
                <cell class="list-none" :style="{height: pageHeight-80}" v-if="state.isEmpty === 0">
                    <text>暂无数据</text>
                </cell>
            </list>
            <list class="item-container" :style="{ height:`${pageHeight-80}px`}">
                <cell v-for="(item,key) of DSHTab" class="cell" :key="key">
                    <!--<wxc-pan-item @wxcPanItemPan="wxcPanItemPan">-->
                        <div class="warp">
                            <div class="content">
                                <div class="top">
                                    <div class="tags">
                                        <image class="tags-image" resize="cover" src="bmlocal://assets/images/rectangle@2x.png"></image>
                                        <text class="tags-name">{{item.code}}</text>
                                    </div>
                                    <div class="date">
                                        <text class="time">{{$dayjs(item.signTime).format('YYYY-MM-DD')}}</text>
                                    </div>
                                </div>
                                <div class="middle">
                                    <div class="label">
                                        <text class="label-name">签约金额：</text>
                                        <text class="label-val">￥{{item.price}}</text>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <div class="label">
                                        <text class="label-name">已付：</text>
                                        <text class="label-val text-color-red">{{item.ratio || '0.00%'}}</text>
                                    </div>
                                    <div class="date">
                                        <text class="time text-color-blue">{{item.designerName || ''}}</text>
                                    </div>
                                </div>
                            </div>
                            <div class="line"></div>
                            <div class="operation">
                                <text class="text-btn btn-red" @click="goTo('contract.detail',{id:item.bussinessId})">合同详情</text>
                                <text class="text-btn btn-red" @click="goTo('contract.coatDetail',{id:item.id,type:item.type})">费用详情</text>
                            </div>
                        </div>
                    <!--</wxc-pan-item>-->
                </cell>
                <cell class="list-none" :style="{height: pageHeight-80}" v-if="state.isEmpty === 1">
                    <text>暂无数据</text>
                </cell>
            </list>
            <list class="item-container" :style="{ height:`${pageHeight-80}px`}">
                <cell v-for="(item,key) of DSHuoTab" class="cell" :key="key">
                    <!--<wxc-pan-item @wxcPanItemPan="wxcPanItemPan">-->
                        <div class="warp">
                            <div class="content">
                                <div class="top">
                                    <div class="tags">
                                        <image class="tags-image" resize="cover" src="bmlocal://assets/images/rectangle@2x.png"></image>
                                        <text class="tags-name">{{item.code}}</text>
                                    </div>
                                    <div class="date">
                                        <text class="time">{{$dayjs(item.signTime).format('YYYY-MM-DD')}}</text>
                                    </div>
                                </div>
                                <div class="middle">
                                    <div class="label">
                                        <text class="label-name">签约金额：</text>
                                        <text class="label-val">￥{{item.price}}</text>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <div class="label">
                                        <text class="label-name">已付：</text>
                                        <text class="label-val text-color-red">{{item.ratio || '0%'}}</text>
                                    </div>
                                    <div class="date">
                                        <text class="time text-color-blue">{{item.designerName || ''}}</text>
                                    </div>
                                </div>
                            </div>
                            <div class="line"></div>
                            <div class="operation">
                                <text class="text-btn btn-red" @click="goTo('contract.detail',{id:item.bussinessId})">合同详情</text>
                                <text class="text-btn btn-red" @click="goTo('contract.coatDetail',{id:item.id,type:item.type})">费用详情</text>
                            </div>
                        </div>
                    <!--</wxc-pan-item>-->
                </cell>
                <cell class="list-none" :style="{height: pageHeight-80}" v-if="state.isEmpty === 2">
                    <text>暂无数据</text>
                </cell>
            </list>
            <list class="item-container" :style="{ height:`${pageHeight-80}px`,paddingBottom:100}">
                <cell v-for="(item,key) of YWCTab" class="cell" :key="key">
                    <!--<wxc-pan-item @wxcPanItemPan="wxcPanItemPan">-->
                        <div class="warp">
                            <div class="content">
                                <div class="top">
                                    <div class="tags">
                                        <image class="tags-image" resize="cover" src="bmlocal://assets/images/rectangle@2x.png"></image>
                                        <text class="tags-name">{{item.code}}</text>
                                    </div>
                                    <div class="date">
                                        <text class="time">{{$dayjs(item.signTime).format('YYYY-MM-DD')}}</text>
                                    </div>
                                </div>
                                <div class="middle">
                                    <div class="label">
                                        <text class="label-name">签约金额：</text>
                                        <text class="label-val">￥{{item.price}}</text>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <div class="label">
                                        <text class="label-name">已付：</text>
                                        <text class="label-val text-color-red">{{item.ratio || '0%'}}</text>
                                    </div>
                                    <div class="date">
                                        <text class="time text-color-blue">{{item.designerName || ''}}</text>
                                    </div>
                                </div>
                            </div>
                            <div class="line"></div>
                            <div class="operation">
                                <text class="text-btn btn-red" @click="goTo('contract.detail',{id:item.bussinessId})">合同详情</text>
                                <text class="text-btn btn-red" @click="goTo('contract.coatDetail',{id:item.id,type:item.type})">费用详情</text>
                                <text class="text-btn btn-red" v-if="item.name==='材料合同'" @click="goTo('quotation.list',{id:item.id,sid:serviceId,enter:2})">材料详情</text>
                            </div>
                        </div>
                    <!--</wxc-pan-item>-->
                </cell>
                <cell class="cell" v-if="pageType === 3">
                    <div class="fixed-btn">
                        <text class="color-333 font-36 bg-fff cl-btn-fy">全部费用</text>
                        <text class="color-fff font-36 bg-red cl-btn-dd" @click="goTo('quotation.list',{sid:serviceId,enter:2})">全部订单</text>
                    </div>
                </cell>
                <cell class="list-none" :style="{height: pageHeight-80}" v-if="state.isEmpty === 3">
                    <text>暂无数据</text>
                </cell>
            </list>
            <list class="item-container" :style="{ height:`${pageHeight-80}px`}">
                <cell v-for="(item,key) of YQXTab" class="cell" :key="key">
                    <!--<wxc-pan-item @wxcPanItemPan="wxcPanItemPan">-->
                        <div class="warp">
                            <div class="content">
                                <div class="top">
                                    <div class="tags">
                                        <image class="tags-image" resize="cover" src="bmlocal://assets/images/rectangle@2x.png"></image>
                                        <text class="tags-name">{{item.code}}</text>
                                    </div>
                                    <div class="date">
                                        <text class="time">{{$dayjs(item.signTime).format('YYYY-MM-DD')}}</text>
                                    </div>
                                </div>
                                <div class="middle">
                                    <div class="label">
                                        <text class="label-name">签约金额：</text>
                                        <text class="label-val">￥{{item.price}}</text>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <div class="label">
                                        <text class="label-name">已付：</text>
                                        <text class="label-val text-color-red">{{item.ratio || '0%'}}</text>
                                    </div>
                                    <div class="date">
                                        <text class="time text-color-blue">{{item.designerName || ''}}</text>
                                    </div>
                                </div>
                            </div>
                            <div class="line"></div>
                            <div class="operation">
                                <text class="text-btn btn-red" @click="goTo('contract.detail',{id:item.bussinessId})">合同详情</text>
                                <text class="text-btn btn-red" @click="goTo('contract.coatDetail',{id:item.id,type:item.type})">费用详情</text>
                            </div>
                        </div>
                    <!--</wxc-pan-item>-->
                </cell>
                <cell class="list-none" :style="{height: pageHeight-80}" v-if="state.isEmpty === 4">
                    <text>暂无数据</text>
                </cell>
            </list>
        <!--</wxc-tab-page>-->
    </div>
</template>

<script>
    import { WxcTabPage, WxcPanItem, BindEnv } from 'weex-ui'
    import mixins from '../../common/mixins'
    import StatusBar from '../../components/statusBar'
    import { getContractList } from '../../service/atjiaApi'

    export default {
        components: { WxcTabPage, WxcPanItem, StatusBar },
        mixins: [mixins],
        props: {
            id: {
                type: Number
            }
        },
        data () {
            return {
                serviceId: '',
                pageType: 0,
                tabTitles: [
                    {
                        title: '全部',
                        type: '0'
                    },
                    {
                        title: '设计合同',
                        type: '1'
                    },
                    {
                        title: '基装合同',
                        type: '2'
                    },
                    {
                        title: '材料合同',
                        type: '3'
                    },
                    {
                        title: '意向合同',
                        type: '4'
                    }
                ],
                tabStyles: {
                    activeTitleColor: '#E60012',
                    activeBgColor: '#FFFFFF',
                    width: 160,
                    height: 80,
                    fontSize: 28
                },
                allTab: [],
                DSHTab: [],
                DSHuoTab: [],
                YWCTab: [],
                YQXTab: [],
                state: {
                    isEmpty: ''
                }
            }
        },
        watch: {
            pageType (val) {
                this.pageType = val
                this.getList(this.serviceId, this.pageType)
            },
            id (val) {
                // this.getList(val, this.pageType)
                // console.log('合同的数据123-----------', val)
            }
        },
        async created () {
            const params = await this.$router.getParams()
            if (params && params.id) {
                this.id = params.id
            }
            await this.getList(this.id, this.pageType)
            // console.log('合同的数据----------', this.id + '/' + this.pageType)
            // console.log('合同的数据', this.state.isEmpty)
        },
        methods: {
            async wxcTabPageCurrentTabSelected (e) {
                const index = e.page
                this.pageType = index
            },
            wxcPanItemPan (e) {
                if (BindEnv.supportsEBForAndroid()) {
                    this.$refs['wxc-tab-page'].bindExp(e.element)
                }
            },
            async getList (serviceId, type) {
                const result = await getContractList(serviceId, type)
                switch (this.pageType) {
                case 0: {
                    if (result.length) {
                        this.allTab = result
                        console.log('基装合同', JSON.stringify(this.allTab))
                    } else {
                        this.state.isEmpty = 0
                    }
                    break
                }
                case 1: {
                    if (result.length) {
                        this.DSHTab = result
                    } else {
                        this.state.isEmpty = 1
                    }
                    break
                }
                case 2: {
                    if (result.length) {
                        this.DSHuoTab = result
                    } else {
                        this.state.isEmpty = 2
                    }
                    break
                }
                case 3: {
                    if (result.length) {
                        this.YWCTab = result
                    } else {
                        this.state.isEmpty = 3
                    }
                    break
                }
                case 4: {
                    if (result.length) {
                        this.YQXTab = result
                    } else {
                        this.state.isEmpty = 4
                    }
                    break
                }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    .contractlist {
        width: 750px;
        height: 90px;
        background-color: #FFFFFF;
        align-items: center;
        justify-content: center;
    }

    .contractlist-back {
        height: 60px;
        width: 60px;
        position: absolute;
        top: 14px;
        left: 20px
    }

    .contractlist-font {
        font-size: 36px;
    }

    .item-container {
        width: 750px;
        background-color: #f2f3f4;
    }

    .cell {
        background-color: #ffffff;
    }

    .content {
        width: 750px;
        height: 260px;
        /*border-bottom-width: 1px;*/
        align-items: center;
        justify-content: center;
    }

    .hr {
        width: 750;
        height: 20;
        background-color: #f3f3f3;
    }

    .item-box {
        background-color: #f3f3f3;
        /*height:1334;*/
    }

    .warp {
        width: 750;
        height: 308;
        background-color: #FFFFFF;
        border-width: 1px;
        border-style: solid;
        border-color: rgba(219, 214, 214, 0.5);
    }

    .content {
        width: 750;
        height: 226;
        padding: 25 0;
    }

    .top {
        flex-direction: row;
        width: 750;
        align-items: center;
        align-content: center;
        justify-content: space-between;
    }

    .tags {
        flex-direction: row;
        align-items: center;
        align-content: center;
    }

    .tags-name {
        color: #333333;
        font-size: 34;
    }

    .tags-image {
        width: 10;
        height: 64;
        margin-right: 30;
    }

    .date {
        width: 200px;
        padding-right: 30;
    }

    .time {
        font-size: 28;
        color: #999999;
        text-align: right;
    }

    .middle {
        width: 750px;
        padding: 14 40;
    }

    .bottom {
        padding: 14 40;
        width: 750px;
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-content: space-between;
    }

    .bottom-sum {
        padding: 14 40;
        width: 750px;
        flex-direction: row;
        align-items: center;
        align-content: center;
    }

    .bottom-font {
        font-size: 30px;
    }

    .label-bottom {
        color: #6287B2;
        font-size: 30px;
        margin-left: 10px;
    }

    .label {
        flex-direction: row;
        align-items: center;
        align-content: center;
    }

    .tags-font {
        font-size: 32px;
    }

    .tags-pay {
        font-size: 32px;
        color: #E60012;
        margin-left: 10px;
    }

    .label-sumpaid {
        font-size: 30px;
    }

    .label-pay {
        font-size: 30px;
        margin-left: 10px;
    }

    .label-paid {
        margin-left: 200px;
        font-size: 30px;
    }

    .label-rate {
        font-size: 30px;
        color: #E60012;
        margin-left: 10px;
    }

    .label-name {
        color: #333333;
        font-size: 30;
    }

    .label-val {
        color: #333333;
        font-size: 32;
    }

    .text-color-red {
        color: #E60012;
    }

    .text-color-blue {
        color: #6287B2;
    }

    .line {
        width: 750;
        height: 2;
        border-width: 1px;
        border-style: solid;
        border-color: rgba(219, 214, 214, 0.5);
    }

    .operation {
        width: 750;
        height: 78;
        padding: 0 30;
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-content: flex-end;
    }

    .text-btn {
        padding: 10 24;
        font-size: 26;
        color: #353535;
        border-radius: 4;
        border-width: 1px;
        border-style: solid;
        border-color: #353535;
        margin-left: 20;
        /*height:60;*/
    }

    .text-btnd {
        padding: 10 24;
        font-size: 26;
        color: #353535;
        border-radius: 4;
        border-width: 1px;
        border-style: solid;
        border-color: #353535;
        margin-left: 20;
    }

    .text-btns {
        padding: 10 24;
        font-size: 26;
        color: #353535;
        border-radius: 4;
        border-width: 1px;
        border-style: solid;
        border-color: #353535;
        margin-left: 20;
    }

    .btn-red {
        color: #E60012;
        border-width: 1px;
        border-style: solid;
        border-color: #E60012;
    }

    .list-none {
        align-items: center;
        justify-content: center;
        width: 750px;
    }

    .fixed-btn{
        width: 750px;
        height: 100%;
        background-color: #FFFFFF;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: #b3b3b3;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        left: 0;
        bottom: 0;
    }

    .cl-btn-fy{
        width: 375px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #333333;
    }

    .cl-btn-dd{
        width: 375px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        background-color: #E60012;
        color: #FFFFFF;
    }
</style>
