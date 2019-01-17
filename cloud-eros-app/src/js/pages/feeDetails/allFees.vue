<template>
    <div>
        <div class="remarks">
            <div class="remarks-left">
                <image class="remarks-img" resize="cover" src="bmlocal://assets/images/attention@2x.png"></image>
            </div>
           <div class="remarks-right">
               <text class="remarks-text">备注：各项材料在过程中均有增减项，最后以实际结算单为准</text>
           </div>
        </div>
        <scroller :style="{height:`${pageHeight}px`}">
               <div class="cost-top">
                   <div class="total-cost">
                       <p class="total-cost-left">
                           <span class="total-cost-left1"><text class="total-cost-left2">总费用：</text></span>
                           <span class="total-cost-left3"><text class="total-cost-left4">¥{{allOrderList.totalCost?Number(allOrderList.totalCost).toFixed(2):'0.00'}}</text></span>
                       </p>
                       <span><text class="total-cost-left5" v-if="allOrderList.contractDate">{{$dayjs(allOrderList.contractDate).format('YYYY-MM-DD')}}</text></span>
                   </div>
                   <p class="total-contract">
                       <span class="total-contract1"><text class="total-contract2">合同总额：</text></span>
                       <span class="total-contract3"><text class="total-contract4">¥{{allOrderList.contractTotalMoney?Number(allOrderList.contractTotalMoney).toFixed(2):'0.00'}}</text></span>
                   </p>
                   <p class="total-contract">
                       <span class="total-contract1"><text class="total-contract2">变更总额：</text></span>
                       <span class="total-contract3"><text class="total-contract4">¥{{allOrderList.changeTotalMoney?Number(allOrderList.changeTotalMoney).toFixed(2):'0.00'}}</text></span>
                   </p>
               </div>
               <div class="total-paid">
                   <span class="total-paid1"><text class="total-paid2">合计已付：</text></span>
                   <span class="total-paid3"><text class="total-paid4">¥{{allOrderList.payTotalMoney?Number(allOrderList.payTotalMoney).toFixed(2):'0.00'}}</text></span>
               </div>
               <div class="payable">
                   <p class="payable-top">
                       <span><text class="payable-top1">本期应付：</text></span>
                       <span class="payable-top2"><text class="payable-top3">¥{{allOrderList.currentPayMoney?Number(allOrderList.currentPayMoney).toFixed(2):'0.00'}}</text></span>
                   </p>
                   <p class="payable-bottom">
                       <span><text class="payable-bottom1">应付日期：</text></span>
                       <span class="payable-bottom2"><text class="payable-bottom3">{{$dayjs(allOrderList.payMoneyDate).format('YYYY-MM-DD')}}</text></span>
                   </p>
               </div>
        </scroller>
    </div>
</template>
<script>
    import {
        allFees
    } from '../../service/homeAtj.Api'
    import mixins from '../../common/mixins'
    export default {
        name: 'allFees',
        mixins: [mixins],
        data () {
            return {
                idList: [],
                allOrderList: [],
                id: ''
            }
        },
        async created () {
            const params = await this.$router.getParams()
            if (params && params.idLIs) {
                this.idList = params.idLIs
                this.getOrderById(this.idList)
            }
            if (params && params.id) {
                this.id = params.id
                this.getOrderById(this.id)
            }
        },
        methods: {
            async getOrderById (id) {
                const result = await allFees(id)
                this.allOrderList = result
                console.log('&&&&&&&&&&~~~~~~~~~~~~~~', JSON.stringify(result))
            }
        }
    }
</script>

<style scoped>
.remarks{
    height: 108px;
    background-color: #F9E4B7;
    align-items: center;
    justify-content: center;
    flex-direction: row;
}
    .remarks-left{
        width: 28px;
        height: 72px;
    }
    .remarks-img{
        width: 28px;
        height: 28px;
    }
    .remarks-right{
        margin-left: 10px;
        width: 632px;
        height: 72px;
    }
    .remarks-text{
        font-size:26px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height: 36px;
    }
    .cost-top{
        height: 278px;
        background-color: #fff;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #DDDDDD;
        padding-left: 40px;
        padding-right: 40px;
    }
    .total-cost{
        margin-top: 40px;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
    }
    .total-cost-left{
        align-items: center;
        flex-direction: row;
    }
    .total-cost-left1{
       width: 160px;
    }
.total-cost-left2{
    font-size:34px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
}
    .total-cost-left3{
        margin-left: 26px;
    }
    .total-cost-left4{
        font-size:36px;
        font-family:AvenirNext-Medium;
        font-weight:500;
        color:rgba(230,0,18,1);
    }
    .total-cost-left5{
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
    }
    .total-contract{
        margin-top: 32px;
        align-items: center;
        flex-direction: row;
    }
    .total-contract1{
        width: 160px;
    }
    .total-contract2{
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
    }
    .total-contract3{
        margin-left: 26px;
    }
    .total-contract4{
        font-size:32px;
        font-family:AvenirNext-Medium;
        font-weight:500;
        color:rgba(102,102,102,1);
    }
    .total-paid{
        height: 96px;
        background-color: #fff;
        padding: 40px;
        align-items: center;
        flex-direction: row;
    }
    .total-paid2{
        font-size:30px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .total-paid3{
        margin-left: 20px;
    }
    .total-paid4{
        font-size:32px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .payable{
        height: 158px;
        background-color: #fff;
        padding-left: 40px;
        margin-top: 20px;
    }
    .payable-top{
        align-items: center;
        flex-direction: row;
        margin-top: 24px;
    }
    .payable-bottom{
        align-items: center;
        flex-direction: row;
        margin-top: 20px;
    }
    .payable-top1{
        font-size:32px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .payable-top2{
        margin-left: 12px;
    }
    .payable-top3{
        font-size:36px;
        font-family:AvenirNext-Medium;
        font-weight:500;
        color:rgba(230,0,18,1);
    }
    .payable-bottom1{
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
    }
    .payable-bottom2{
        margin-left: 13px;
    }
    .payable-bottom3{
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
    }
</style>
