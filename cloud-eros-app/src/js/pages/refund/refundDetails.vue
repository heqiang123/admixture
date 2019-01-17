<template>
    <div class="item-content">
        <list :style="{height:`${pageHeight}`}">
            <cell class="list" v-for="(item,index) in orderDetailsdeLink" :key="index" @click="goTo('refund.list',{items:item})">
                <div>
                    <div class="leftContent">
                        <text class="quotation font-28">退货单号：{{item.code}}</text>
                        <text class="font-28">店铺：{{item.storeName}}</text>
                    </div>
                    <div class="centerContent">
                        <text class="font-color font-28">{{$dayjs(item.flowTime).format('YYYY-MM-DD')}}</text>
                    </div>
                </div>
                <div class="rightContent">
                    <text class="arrow" slot="value">&#xe60a;</text>
                </div>
            </cell>
            <cell class="list-none" :style="{height: pageHeight}" v-if="state.isEmpty">
                <text>暂无数据</text>
            </cell>
        </list>
    </div>
</template>

<script>
    import mixins from '../../common/mixins'
    import { getBackList } from '../../service/meatirChangeApi'

    export default {
        name: 'index',
        mixins: [mixins],
        data () {
            return {
                // 接收页面传过来的id
                redefundId: '',
                orderDetailsdeLink: [],
                state: {
                    isEmpty: false
                }
            }
        },
        methods: {
            async getRefundDetails (id) {
                const result = await getBackList(id)
                if (result.length) {
                    this.orderDetailsdeLink = result
                } else {
                    this.state.isEmpty = true
                }
            }
        },
        async created () {
            const params = await this.$router.getParams()
            this.redefundId = params.id
            await this.getRefundDetails(this.redefundId)
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/base";

    .item-container {
        width: 750px;
        background-color: #f2f3f4;

    }

    .item-content {
        margin-top: 20px;
    }

    .list {
        width: 750px;
        height: 120px;
        background-color: #ffffff;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom-width: 1px;
        border-bottom-color: #7d7d7d;
        border-bottom-style: solid;
    }

    .leftContent {
        margin-left: 20px;
    }

    .centerContent {
        width: 500px;
        margin-top: 4px;
        margin-left: 20px;
    }

    .quotation {
        margin-bottom: 6px;
        color: grey;
    }

    .font-color {
        color: grey;
    }

    .arrow {
        margin-right: 30;
        font-family: iconfont;
        font-size: 40;
        color: #353535;
    }

    .border-cell {
        background-color: #DBD6D6;
        width: 750px;
        height: 1px;
    }

    .cell {
        background-color: #ffffff;
    }

    .shopList {
        /*height:200;*/
    }

    .pageItem {
        height: 3000;
    }

    .prebook {
        width: 750px;
        background-color: #fff;
    }

    .prebook-back {
        position: absolute;
        top: 20;
        left: 20;
        font-family: iconfont;
        font-size: 48;
        font-weight: 600;
    }

    .prebook-header {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 750;
        height: 92;
        background-color: #fff;
    }

    .prebook-title {
        width: 150;
        height: 80;
        line-height: 80;
        text-align: center;
        font-size: 36;
    }

    .prebook-search {
        position: absolute;
        top: 20;
        right: 40;
        font-family: iconfont;
        font-size: 48;
    }

    purchaseCustomerContentBox1 {
        flex-direction: row;
        justify-content: center;
    }

    .jine {
        color: #ffffff;
        font-size: 38px;
    }

    .content-box-bottom-total {
        width: 750px;
        /*height: 120px;*/
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        background-color: #E0E0E0;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        position: fixed;
        bottom: 0px;
    }

    .fontDing {
        font-size: 24px;
        color: gray;
        margin-top: 10px;
    }

    .dingjia {
        margin-left: 10px;
        width: 360px;
        height: 120px;

    }

    .jines {
        color: green;
        font-size: 38px;
    }

    .total {
        /*margin-right: 60px;*/
        width: 390px;
        height: 120px;
        padding-left: 10px;
        /*padding-top:10px;*/
        padding-right: 2px;
        background-color: green;
    }

    .totalPrice {
        margin-top: 10px;
        color: #ffffff;
        font-size: 24px;
    }

    .list-none {
        align-items: center;
        justify-content: center;
        width: 750px;
    }
</style>

