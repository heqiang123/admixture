<template>
   <div>
       <status-bar></status-bar>
       <wxc-minibar background-color="#fff">
           <text slot="middle" class="title">费用汇总</text>
       </wxc-minibar>
       <wxc-tab-page ref="wxc-tab-page" :tab-titles="tabTitles" :tab-styles="tabStyles" @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
           <div v-if="allOrderList.length>=1">
               <list class="tab-bar" :style="{height:`${pageHeight-180}px`}">
                   <refresh-loading @onRefresh="onRefresh" :refreshIcon="refreshIcon" :display="refreshing"
                                    :refreshText="refreshText" @onPullingdown="onPullingdown"></refresh-loading>
                   <cell>
                       <div class="new" v-for="(item,index) of allOrderList" :key="index">
                           <div class="new-top" @click="expand(index,item.id)">
                               <p class="new-top-left"><text class="new-top-date">{{item.orderDate}}</text><span class="new-text" v-if="item.isRead==0"><text class="new-text1">NEW</text></span></p>
                               <span>
                             <image class="arrow" resize="cover" src="bmlocal://assets/images/downarrow.png" v-if="indexList==index"></image>
                             <image class="arrow" resize="cover" src="bmlocal://assets/images/uparrow.png" v-else></image>
                        </span>
                           </div>
                           <div class="common" v-if="indexList==index">
                               <p class="common-p" v-for="(detailList,indexs) of item.bizOrderMaterialDetailAtJiaAppDtos">
                                   <image class="brand-img" resize="cover" src="bmlocal://assets/images/1.png"></image>
                                   <span  class="common-tittle"><text class="common-tittle-text">{{detailList.threeClassName}}</text></span>
                               </p>
                           </div>
                           <div class="coomon-money" v-if="indexList==index">
                               <p class="money-left">
                                   <span class="money-left1"><text class="money-left2">金额：</text></span>
                                   <span class="money-left3"><text class="money-left4" v-if="item.orderSaleMoney">¥{{Number(item.orderSaleMoney).toFixed(2)}}</text></span>
                               </p>
                               <span class="confirm" v-if="item.status==4" @click="confirm(item.id)" ><text class="confirm-text">确认</text></span>
                               <span class="confirm1" v-else><text class="confirm-text">已确认</text></span>
                           </div>
                       </div>
                   </cell>
                   <down-loading @onLoading="onLoading" :display="isShowLoading" :loadingText="loadingText"></down-loading>
               </list>
               <div class="statistics">
                   <div class="statistics-left">
                       <p class="total-paid"><text class="total-paid1">待确认金额：</text></p>
                       <p class="total-paid2"><text class="total-paid3" v-if="allOrderList[0].noAffirmMoney">¥{{Number(allOrderList[0].noAffirmMoney).toFixed(2)}}</text></p>
                   </div>
                   <div class="statistics-right">
                       <p class="total-paid"><text class="total-paid1-color">已确认金额：</text></p>
                       <p class="total-paid2"><text class="total-paid3-color" v-if="allOrderList[0].affirmMoney">¥{{Number(allOrderList[0].affirmMoney).toFixed(2)}}</text></p>
                   </div>
               </div>
           </div>
           <div v-else>
                   <list class="tab-bar" :style="{height:`${pageHeight-180}px`}">
                       <cell>
                       </cell>
                   </list>
           </div>
           <div v-if="orderPlacedList.length>=1">
               <list class="tab-bar" :style="{height:`${pageHeight-180}px`}">
                   <refresh-loading @onRefresh="onRefresh1" :refreshIcon="refreshIcon" :display="refreshing"
                                    :refreshText="refreshText" @onPullingdown="onPullingdown1"></refresh-loading>
                   <cell>
                       <div class="new" v-for="(item,index) of orderPlacedList" :key="index">
                           <div class="new-top" @click="expand1(index,item.id)">
                               <p class="new-top-left"><text class="new-top-date">{{item.orderDate}}</text><span class="new-text" v-if="item.isRead==0"><text class="new-text1">NEW</text></span></p>
                               <span>
                             <image class="arrow" resize="cover" src="bmlocal://assets/images/downarrow.png" v-if="indexList1==index"></image>
                             <image class="arrow" resize="cover" src="bmlocal://assets/images/uparrow.png" v-else></image>
                        </span>
                           </div>
                           <div class="common-order" v-if="indexList1==index" v-for="(items,indexs) of item.bizOrderMaterialDetailAtJiaAppDtos">
                               <p class="common-p">
                                   <image class="brand-img" resize="cover" src="bmlocal://assets/images/1.png"></image>
                                   <span class="common-tittle"><text class="common-tittle-text">{{items.threeClassName}}</text></span>
                               </p>
                               <span><text class="common-order-money" v-if="items.saleMoney">¥{{Number(items.saleMoney).toFixed(2)}}</text></span>
                           </div>
                       </div>
                   </cell>
                   <down-loading @onLoading="onLoading1" :display="isShowLoading" :loadingText="loadingText"></down-loading>
               </list>
               <div class="total-amount">
                        <span><text class="total-amount-text1">总金额：</text></span>
                        <span  class="total-amount-text2"><text  class="total-amount-text3" v-if="orderPlacedList[0].totalMoney">¥{{Number(orderPlacedList[0].totalMoney).toFixed(2)}}</text></span>
               </div>
           </div>
           <div v-else>
               <list class="tab-bar" :style="{height:`${pageHeight-180}px`}">
                   <cell>
                   </cell>
               </list>
           </div>
          <div  v-if="returnedList.length>=1">
              <list class="tab-bar" :style="{height:`${pageHeight-180}px`}">
                  <refresh-loading @onRefresh="onRefresh2" :refreshIcon="refreshIcon" :display="refreshing"
                                   :refreshText="refreshText" @onPullingdown="onPullingdown2"></refresh-loading>
                  <cell>
                      <div class="new" v-for="(item,index) of returnedList" :key="index">
                          <div class="new-top" @click="expand2(index,item.id)">
                              <p class="new-top-left"><text class="new-top-date">{{item.orderDate}}</text><span class="new-text" v-if="item.isRead==0"><text class="new-text1">NEW</text></span></p>
                              <span>
                             <image class="arrow" resize="cover" src="bmlocal://assets/images/downarrow.png" v-if="indexList2==index"></image>
                             <image class="arrow" resize="cover" src="bmlocal://assets/images/uparrow.png" v-else></image>
                        </span>
                          </div>
                          <div class="common-order" v-if="indexList2==index" v-for="(items,indexs) of item.bizOrderMaterialDetailAtJiaAppDtos">
                              <p class="common-p">
                                  <image class="brand-img" resize="cover" src="bmlocal://assets/images/1.png"></image>
                                  <span class="common-tittle"><text class="common-tittle-text">{{items.threeClassName}}</text></span>
                              </p>
                              <span><text class="common-order-money-color" v-if="items.returnMoney">¥{{Number(items.returnMoney).toFixed(2)}}</text></span>
                          </div>
                      </div>
                  </cell>
                  <down-loading @onLoading="onLoading2" :display="isShowLoading" :loadingText="loadingText"></down-loading>
              </list>
              <div class="total-amount">
                  <span><text class="total-amount-text1">退货金额：</text></span>
                  <span  class="total-amount-text2"><text  class="total-amount-text3-color" v-if="returnedList[0].totalMoney">¥{{Number(returnedList[0].totalMoney).toFixed(2)}}</text></span>
              </div>
          </div>
           <div v-else>
               <list class="tab-bar" :style="{height:`${pageHeight-180}px`}">
                   <cell>
                   </cell>
               </list>
           </div>
       </wxc-tab-page>
   </div>
</template>

<script>
    import {
        newAllOrders, orderPlaced, returned, confirmButton, oldAllOrders
    } from '../../service/homeAtj.Api'
    import { WxcTabPage, WxcMinibar } from 'weex-ui'
    import mixins from '../../common/mixins'
    import downLoading from '../../components/bui/downLoading'
    import refreshLoading from '../../components/bui/refreshLoading'
    import downMenu from '../../components/downMenu'
    import StatusBar from '../../components/statusBar'
    export default {
        name: 'allOrders',
        components: { WxcTabPage, downMenu, downLoading, refreshLoading, WxcMinibar, StatusBar },
        mixins: [mixins],
        props: {
            id: {
                type: Number
            }
        },
        data () {
            return {
                refreshing: false,
                isShowLoading: false,
                refreshIcon: 'icon-todown',
                refreshText: '下拉刷新...',
                loadingText: '加载更多数据...',
                tabTitles: [{
                    title: '报价中'
                },
                {
                    title: '已下单'
                },
                {
                    title: '已退货'
                }],
                tabStyles: {
                    bgColor: '#FFFFFF',
                    titleColor: '#666666',
                    activeTitleColor: '#E60012',
                    isActiveTitleBold: true,
                    width: 200,
                    height: 80,
                    fontSize: 28,
                    hasActiveBottom: true,
                    activeBottomColor: '#E60012',
                    activeBottomHeight: 4,
                    activeBottomWidth: 112,
                    textPaddingLeft: 10,
                    textPaddingRight: 10
                },
                indexList: null,
                showDown: true,
                allOrder: [],
                page1: 1,
                page2: 1,
                page3: 1,
                allOrderList: [],
                totalPage: 999,
                totalPage1: 999,
                totalPage2: 999,
                orderPlacedList: [],
                returnedList: [],
                indexList1: null,
                indexList2: null,
                confirmed: '',
                upShow: false
            }
        },
        watch: {
            id (val) {
                this.getOrderById(val, 1)
                this.getOrderPlaced(val, 1)
                this.getreturned(val, 1)
            }
        },
        async created () {
            const params = await this.$router.getParams()
            if (params && params.id) {
                this.id = params.id
            }
            this.getOrderById(this.id, this.page1)
            this.getOrderPlaced(this.id, this.page2)
            this.getreturned(this.id, this.page3)
        },
        methods: {
            async expand (i, id) {
                if (this.indexList === i) {
                    this.indexList = 99999999999999
                } else {
                    this.indexList = i
                }
                const result = await oldAllOrders(id, 0)
                if (result.type === 'success') {
                    this.getOrderById(this.id, 1, 'refresh')
                }
            },
            async expand1 (i, id) {
                if (this.indexList1 === i) {
                    this.indexList1 = 99999999999999
                } else {
                    this.indexList1 = i
                }
                const result = await oldAllOrders(id, 1)
                if (result.type === 'success') {
                    this.getOrderPlaced(this.id, 1, 'refresh')
                }
            },
            async expand2 (i, id) {
                if (this.indexList2 === i) {
                    this.indexList2 = 99999999999999
                } else {
                    this.indexList2 = i
                }
                const result = await oldAllOrders(id, 2)
                if (result.type === 'success') {
                    this.getreturned(this.id, 1, 'refresh')
                }
            },
            async getOrderById (id, page, refresh) {
                const result = await newAllOrders(id, {
                    'page': page,
                    'pageSize': 9999999,
                    'orderBy': 'id desc',
                    'totalRows': 0,
                    'export': false,
                    'queryParamList': []
                })
                if (result.content) {
                    if (result && result.content.length > 0) {
                        this.totalPage = result.totalPage
                        if (refresh === 'refresh') {
                            this.allOrderList = result.content
                        } else {
                            this.allOrderList.push(...result.content)
                        }
                        this.page1 = this.page1 + 1
                    }
                    this.refreshText = '下拉刷新...'
                } else {
                    this.allOrderList = []
                }
            },
            async getOrderPlaced (id, page, refresh) {
                const result = await orderPlaced(id, {
                    'page': page,
                    'pageSize': 9999999,
                    'orderBy': 'id desc',
                    'totalRows': 0,
                    'export': false,
                    'queryParamList': [{
                        'field': 'orderType',
                        'type': 'string',
                        'logic': '=',
                        'value': '1',
                        'items': []
                    }, {
                        'field': 'status',
                        'type': 'string',
                        'logic': '=',
                        'value': '4',
                        'items': []
                    }]
                })
                if (result.content) {
                    if (result && result.content.length > 0) {
                        this.totalPage1 = result.totalPage
                        if (refresh === 'refresh') {
                            this.orderPlacedList = result.content
                        } else {
                            this.orderPlacedList.push(...result.content)
                        }
                        this.page2 = this.page2 + 1
                    }
                    this.refreshText = '下拉刷新...'
                } else {
                    this.orderPlacedList = []
                }
            },
            async getreturned (id, page, refresh) {
                const result = await returned(id, {
                    'page': page,
                    'pageSize': 9999999,
                    'orderBy': 'id desc',
                    'totalRows': 0,
                    'export': false,
                    'queryParamList': [{
                        'field': 'billStatus',
                        'type': 'string',
                        'logic': '=',
                        'value': '4',
                        'items': []
                    }]
                })
                if (result.content) {
                    if (result && result.content.length > 0) {
                        this.totalPage2 = result.totalPage
                        if (refresh === 'refresh') {
                            this.returnedList = result.content
                        } else {
                            this.returnedList.push(...result.content)
                        }
                        this.page3 = this.page3 + 1
                    }
                    this.refreshText = '下拉刷新...'
                } else {
                    this.returnedList = []
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
                        this.page1 = 1
                        this.refreshing = false
                        this.getOrderById(
                            this.id,
                            this.page1,
                            'refresh'
                        )
                    }, 300)
                }, 500)
            },
            onLoading (e) {
                this.isShowLoading = true
                setTimeout(() => {
                    this.isShowLoading = false
                    if (this.page1 > this.totalPage) {
                        this.loadingText = '没有更多数据了'
                        return
                    } else {
                        this.loadingText = '加载更多数据...'
                        this.getOrderById(
                            this.id,
                            this.page1
                        )
                    }
                }, 2000)
            },
            onPullingdown1 (e) {
                // 默认refresh文字与图标
                this.refreshIcon = 'icon-todown'
                this.refreshText = '下拉可以刷新...'
                // 下拉一定距离时文字与图标
                if (Math.abs(e.pullingDistance) > 60) {
                    this.refreshIcon = 'icon-toup'
                    this.refreshText = '松开即可刷新...'
                }
            },
            onRefresh1 (e) {
                this.refreshing = true
                // 下面代码是模拟异步请求效果
                setTimeout(() => {
                    this.refreshIcon = 'icon-checkbox-on'
                    this.refreshText = '刷新成功'
                    setTimeout(() => {
                        this.page2 = 1
                        this.refreshing = false
                        this.getOrderPlaced(
                            this.id,
                            this.page2,
                            'refresh'
                        )
                    }, 300)
                }, 500)
            },
            onLoading1 (e) {
                this.isShowLoading = true
                setTimeout(() => {
                    this.isShowLoading = false
                    if (this.page2 > this.totalPage1) {
                        this.loadingText = '没有更多数据了'
                        return
                    } else {
                        this.loadingText = '加载更多数据...'
                        this.getOrderPlaced(
                            this.id,
                            this.page2
                        )
                    }
                }, 2000)
            },
            onPullingdown2 (e) {
                // 默认refresh文字与图标
                this.refreshIcon = 'icon-todown'
                this.refreshText = '下拉可以刷新...'
                // 下拉一定距离时文字与图标
                if (Math.abs(e.pullingDistance) > 60) {
                    this.refreshIcon = 'icon-toup'
                    this.refreshText = '松开即可刷新...'
                }
            },
            onRefresh2 (e) {
                this.refreshing = true
                // 下面代码是模拟异步请求效果
                setTimeout(() => {
                    this.refreshIcon = 'icon-checkbox-on'
                    this.refreshText = '刷新成功'
                    setTimeout(() => {
                        this.page3 = 1
                        this.refreshing = false
                        this.getreturned(
                            this.id,
                            this.page3,
                            'refresh'
                        )
                    }, 300)
                }, 500)
            },
            onLoading2 (e) {
                this.isShowLoading = true
                setTimeout(() => {
                    this.isShowLoading = false
                    if (this.page3 > this.totalPage2) {
                        this.loadingText = '没有更多数据了'
                        return
                    } else {
                        this.loadingText = '加载更多数据...'
                        this.getreturned(
                            this.id,
                            this.page3
                        )
                    }
                }, 2000)
            },
            async confirm (id) {
                const result = await confirmButton(id)
                this.confirmed = result.data
                if (this.confirmed === '客户确认报价单成功') {
                    this.getOrderById(this.id, 1, 'refresh')
                }
            }
        }
    }
</script>

<style scoped>
.tab-bar{
    width: 750px;
}
    .arrow{
        width: 60px;
        height: 20px;
    }
    .new{
        margin-top: 20px;
    }
    .new-top-left{
        align-items: center;
        flex-direction: row;
    }
    .new-top{
        height: 106px;
        background-color: #fff;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        padding: 30px;
    }
    .new-top-date{
        font-size:32px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .new-text{
        margin-left: 16px;
        padding-left:10px;
        padding-right: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        border-radius: 10px;
        background-color: #E60012;
    }
    .new-text1{
        font-size:30px;
        font-family:DINCondensed-Bold;
        font-weight:bold;
        color:rgba(255,255,255,1);
    }
    .common-p{
        height: 180px;
        background-color: #F7F7F7;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #DBD6D6;
        padding-left: 30px;
        align-items: center;
        flex-direction: row;
    }
    .common-order{
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        padding-right: 30px;
    }
    .common-order-money{
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
    }
    .common-order-money-color{
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#5AAC00;
    }
    .brand-img{
        width: 140px;
        height: 140px;
    }
    .common-tittle{
       margin-left: 20px;
    }
    .common-tittle-text{
        font-size:32px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .coomon-money{
      height: 106px;
        padding: 30px;
        background-color: #fff;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
    }
    .money-left{
        align-items: center;
        flex-direction: row;
    }
    .money-left2{
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .money-left3{
        margin-left: 12px;
    }
    .money-left4{
        font-size:36px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#E60012;
    }
    .confirm{
        width: 140px;
        height: 60px;
        border-radius: 4px;
        background-color: #E60012;
        align-items: center;
        justify-content: center;
    }
    .confirm-text{
        color: #fff;
    }
.confirm1{
    width: 140px;
    height: 60px;
    border-radius: 4px;
    background-color: #DDDDDD;
    align-items: center;
    justify-content: center;
}
.statistics{
    position: absolute;
    bottom: 0;
    width: 750px;
    height: 128px;
    align-items: center;
    flex-direction: row;
}
.statistics-left{
    width: 375px;
    height: 128px;
    background-color: #fff;
    padding-left: 40px;
    align-items: flex-start;
    justify-content: center;
}
.statistics-right{
    width: 375px;
    height: 128px;
    background-color: #E60012;
    padding-left: 40px;
    align-items: flex-start;
    justify-content: center;
}
.total-paid1{
    font-size:30px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:#333333;
}
.total-paid1-color{
    font-size:30px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:#fff;
}
.total-paid2{
    margin-top: 10px;
}
.total-paid3{
    font-size:40px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:#E60012;
}
.total-paid3-color{
    font-size:40px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:#fff;
}
    .total-amount{
        height: 98px;
        width: 750px;
        background-color: #fff;
        position: absolute;
        bottom: 0;
        align-items: center;
        justify-content: flex-end;
        flex-direction: row;
        padding-right: 30px;
    }
    .total-amount-text1{
        font-size: 28px;
        color: #333333;
    }
    .total-amount-text2{
        margin-left: 12px;
    }
    .total-amount-text3{
        font-size: 36px;
        color: #E60012;
    }
    .total-amount-text3-color{
        font-size: 36px;
        color: #5AAC00;
    }
</style>
