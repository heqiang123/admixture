<template>
    <div>
        <status-bar></status-bar>
        <wxc-minibar background-color="#fff">
            <text slot="middle" class="title">费用详情</text>
        </wxc-minibar>
        <scroller :style="{height:`${pageHeight-150}px`}">
               <div class="base-contract">
                   <div class="base-contract1"><text class="base-contract1-tittle">{{costDetailobj.title}}</text>
                       <text class="base-contract1-date" v-if="costDetailobj.creatTime">{{$dayjs(costDetailobj.creatTime).format('YYYY-MM-DD')}}</text>
                       <text class="base-contract1-date" v-else></text>
                   </div>
                   <div class="total-amount">
                       <p class="total-amount1">
                           <span class="total-amount1-money1"><text class="total-amount1-money2">总金额：</text></span>
                           <span class="total-amount1-money3"><text class="total-amount1-money4">¥{{signingMoney?Number(signingMoney).toFixed(2):'0.00'}}</text></span>
                       </p>
                       <p class="total-amount2"><text class="total-amount2-text">已付：</text><text class="total-amount2-text2">{{costDetailobj.ratio}}</text></p>
                   </div>
                   <p class="signing-common"><span class="signing-common-text"><text class="signing-common-text1">签约金额：</text></span><text class="signing-common-text2">¥{{costDetailobj.amount?Number(costDetailobj.amount).toFixed(2):'0.00'}}</text></p>
                   <p class="signing-common"><span class="signing-common-text"><text class="signing-common-text1">变更金额：</text></span><text class="signing-common-text2">¥{{costDetailobj.changeAmount?Number(costDetailobj.changeAmount).toFixed(2):'0.00'}}</text></p>
                   <p class="signing-common"><span class="signing-common-text"><text class="signing-common-text1">已付金额：</text></span><text class="signing-common-text2">¥{{costDetailobj.paid?Number(costDetailobj.paid).toFixed(2):'0.00'}}</text></p>
               </div>
             <div v-for="(item,index) of costDetailobj.list" :key="index">
                 <div class="one-period"  v-if="index===0">
                     <div class="one-period-top">
                         <div class="one-top">
                             <div class="one-top-left">
                                 <p class="vertical"></p>
                                 <p class="one-top-left1">
                                     <span class="one-top-left2"><text class="one-top-left3">{{item.name}}</text></span>
                                     <span class="one-top-left4"><text class="one-top-left5" v-if="item.handle&&item.changeAmount">¥{{Number(Number(item.handle)+Number(item.changeAmount)).toFixed(2)}}</text></span>
                                 </p>
                             </div>
                             <span v-if="item.time"><text class="base-contract1-date">{{$dayjs(item.time).format('YYYY-MM-DD')}}</text></span>
                             <span v-else><text class="base-contract1-date"></text></span>
                         </div>
                         <p class="one-center">
                             <spaan><text class="one-center1">合同款：</text></spaan>
                             <span class="one-center2"><text class="one-center3">¥{{item.handle?Number(item.handle).toFixed(2):'0.00'}}</text></span>
                         </p>
                         <p class="one-center">
                             <spaan><text class="one-center1">变更款：</text></spaan>
                             <span class="one-center2"><text class="one-center3">¥{{item.changeAmount?Number(item.changeAmount).toFixed(2):'0.00'}}</text></span>
                         </p>
                     </div>
                     <div class="one-period-bottom">
                         <p class="paid">
                            <span class="paid1">
                                <text class="paid2">已付：</text>
                            </span>
                             <span class="paid3">
                                <text class="paid4">¥{{item.paid?Number(item.paid).toFixed(2):'0.00'}}</text>
                            </span>
                         </p>
                         <p class="unpaid">
                             <span class="unpaid1"><text class="unpaid2">未付：</text></span>
                             <span class="unpaid3"><text class="unpaid4">¥{{item.unpaid?Number(item.unpaid).toFixed(2):'0.00'}}</text></span>
                         </p>
                     </div>
                 </div>
                 <div v-if="index===1" class="one-period">
                     <div class="one-period-top">
                         <div class="one-top">
                             <div class="one-top-left">
                                 <p class="vertica2"></p>
                                 <p class="one-top-left1">
                                     <span class="one-top-left2"><text class="one-top-left3-color">{{item.name}}</text></span>
                                     <span class="one-top-left4"><text class="one-top-left5-color">¥{{Number(Number(item.handle)+Number(item.changeAmount)).toFixed(2)}}</text></span>
                                 </p>
                             </div>
                             <span v-if="item.time"><text class="base-contract1-date">{{$dayjs(item.time).format('YYYY-MM-DD')}}止</text></span>
                             <span v-else><text class="base-contract1-date"></text></span>
                         </div>
                         <p class="one-center">
                             <spaan><text class="one-center1">合同款：</text></spaan>
                             <span class="one-center2"><text class="one-center3">¥{{item.handle?Number(item.handle).toFixed(2):'0.00'}}</text></span>
                         </p>
                         <p class="one-center">
                             <spaan><text class="one-center1">变更款：</text></spaan>
                             <span class="one-center2"><text class="one-center3">¥{{item.changeAmount?Number(item.changeAmount).toFixed(2):'0.00'}}</text></span>
                         </p>
                     </div>
                     <div class="one-period-bottom">
                         <p class="paid">
                            <span class="paid1">
                                <text class="paid2">已付：</text>
                            </span>
                             <span class="paid3">
                                <text class="paid4">¥{{item.paid?Number(item.paid).toFixed(2):'0.00'}}</text>
                            </span>
                         </p>
                         <p class="unpaid">
                             <span class="unpaid1"><text class="unpaid2">未付：</text></span>
                             <span class="unpaid3"><text class="unpaid4">¥{{item.unpaid?Number(item.unpaid):'0.00'}}</text></span>
                         </p>
                     </div>
                 </div>
                 <div v-if="index>=2" class="one-period">
                     <div class="one-period-top">
                         <div class="one-top">
                             <div class="one-top-left">
                                 <p class="vertica3"></p>
                                 <p class="one-top-left1">
                                     <span class="one-top-left2"><text class="one-top-left3-color1">{{item.name}}</text></span>
                                     <span class="one-top-left4"><text class="one-top-left5-color1">¥{{Number(Number(item.handle)+Number(item.changeAmount)).toFixed(2)}}</text></span>
                                 </p>
                             </div>
                             <span v-if="item.time"><text class="base-contract1-date">{{$dayjs(item.time).format('YYYY-MM-DD')}}止</text></span>
                             <span v-else><text class="base-contract1-date"></text></span>
                         </div>
                         <p class="one-center">
                             <spaan><text class="one-center1">合同款：</text></spaan>
                             <span class="one-center2"><text class="one-center3">¥{{item.handle?Number(item.handle).toFixed(2):'0.00'}}</text></span>
                         </p>
                         <p class="one-center">
                             <spaan><text class="one-center1">变更款：</text></spaan>
                             <span class="one-center2"><text class="one-center3">¥{{item.changeAmount?Number(item.changeAmount).toFixed(2):'0.00'}}</text></span>
                         </p>
                     </div>
                     <div class="one-period-bottom">
                         <p class="paid">
                            <span class="paid1">
                                <text class="paid2">已付：</text>
                            </span>
                             <span class="paid3">
                                <text class="paid4">¥{{item.paid?Number(item.paid).toFixed(2):'0.00'}}</text>
                            </span>
                         </p>
                         <p class="unpaid">
                             <span class="unpaid1"><text class="unpaid2">未付：</text></span>
                             <span class="unpaid3"><text class="unpaid4">¥{{item.unpaid?Number(item.unpaid).toFixed(2):'0.00'}}</text></span>
                         </p>
                     </div>
                 </div>
             </div>
        </scroller>
        <div class="statistics">
            <div class="statistics-left">
                <p class="total-paid"><text class="total-paid1">合计已付：</text></p>
                <p class="total-paid2"><text class="total-paid3">¥{{costDetailobj.paid?Number(costDetailobj.paid).toFixed(2):'0.00'}}</text></p>
            </div>
            <div class="statistics-right">
                <p class="total-paid"><text class="total-paid1-color">合计未付：</text></p>
                <p class="total-paid2"><text class="total-paid3-color">¥{{costDetailobj.unpaid?Number(costDetailobj.unpaid).toFixed(2):'0.00'}}</text></p>
            </div>
        </div>
    </div>
</template>

<script>
    import { getCostDetailById } from '../../service/atjiaApi.js'
    import { WxcMinibar } from 'weex-ui'
    import StatusBar from '../../components/statusBar'
    import mixins from '../../common/mixins'
    export default {
        name: 'feeDetails',
        components: { WxcMinibar, StatusBar },
        mixins: [mixins],
        data () {
            return {
                moneyDetailsId: '',
                moneyType: '',
                costDetailobj: {},
                signingMoney: 0
            }
        },
        async created () {
            const params = await this.$router.getParams()
            if (params && params.id) {
                this.moneyDetailsId = params.id
            }
            await this.getCostDetail(this.moneyDetailsId, 2)
            if (this.costDetailobj.amount && this.costDetailobj.changeAmount) {
                this.signingMoney = Number(this.costDetailobj.amount) + Number(this.costDetailobj.changeAmount)
                this.signingMoney = this.signingMoney.toFixed(2)
            }
        },
        methods: {
            async getCostDetail (id, type) {
                const result = await getCostDetailById(id, type)
                this.costDetailobj = result
                console.log('·············', result)
                this.costDetailobj.list.forEach((item, index) => {
                    if (index === 0) {
                        if (Number(item.paid) === 0 || (Number(item.paid) > 0 && Number(item.paid) < Number(item.handle))) {
                            this.costDetailobj.list[1].status = 0
                        } else {
                            this.costDetailobj.list[1].status = 1
                        }
                    }
                })
            }

        }
    }
</script>

<style scoped>
    .base-contract{
        border-top-color: rgba(219,214,214,1);
        border-top-style: solid;
        border-top-width: 1px;
        background-color: #fff;
        padding: 40px;
    }
    .base-contract1{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
    }
    .base-contract1-tittle{
        font-size:34px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .base-contract1-date{
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
    }
    .total-amount{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        margin-top: 22px;
    }
    .total-amount1{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
    }
    .total-amount2{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
    }
    .total-amount1-money1{
        width: 150px;
        margin-right: 12px;
    }
    .total-amount1-money2{
        font-size:30px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .total-amount1-money4{
        font-size:36px;
        font-family:AvenirNext-Medium;
        font-weight:500;
        color:rgba(230,0,18,1);
    }
    .total-amount2-text{
        font-size:30px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .total-amount2-text2{
        font-size:30px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#E60012;
    }
    .signing-common-text{
        width: 150px;
        margin-right: 12px;
    }
    .signing-common{
        display: flex;
        align-items: center;
        flex-direction: row;
        margin-top: 12px;
    }
    .signing-common-text1{
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
    }
    .signing-common-text2{
        font-size:32px;
        font-family:AvenirNext-Medium;
        font-weight:500;
        color:rgba(102,102,102,1);
    }
    .one-period{
        background-color: #fff;
        margin-top: 20px;
    }
    .one-period-top{
        padding-top: 28px;
        padding-bottom: 28px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #DBD6D6;
    }
    .one-top{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 30px;
        flex-direction: row;
    }
    .one-top-left{
        display: flex;
        align-items: center;
        flex-direction: row;
    }
    .vertical{
        width:8px;
        height:60px;
        background-color: #BBBBBB;
        border-top-left-radius:0px;
        border-top-right-radius:20px;
        border-bottom-right-radius:20px;
        border-bottom-left-radius:0px;
    }
    .vertica2{
        width:8px;
        height:60px;
        background-color: #E60012;
        border-top-left-radius:0px;
        border-top-right-radius:20px;
        border-bottom-right-radius:20px;
        border-bottom-left-radius:0px;
    }
    .vertica3{
        width:8px;
        height:60px;
        background-color: #333333;
        border-top-left-radius:0px;
        border-top-right-radius:20px;
        border-bottom-right-radius:20px;
        border-bottom-left-radius:0px;
    }
    .one-top-left1{
        display: flex;
        align-items: center;
        flex-direction: row;
        margin-left: 32px;
    }
    .one-top-left2{
        margin-right: 20px;
    }
    .one-top-left3{
        font-size:34px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(153,153,153,1);
    }
    .one-top-left3-color{
          font-size:34px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:#E60012;
      }
    .one-top-left3-color1{
        font-size:34px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:#333333;
    }
    .one-top-left5{
        font-size:36px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
    }
    .one-top-left5-color{
        font-size:36px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#E60012;
    }
    .one-top-left5-color1{
        font-size:36px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#333333;
    }
    .one-center{
        display: flex;
        align-items: center;
        flex-direction: row;
        padding-left: 40px;
        margin-top: 30px;
    }
    .one-center1{
        font-size:30px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .one-center2{
        margin-left: 12px;
    }
    .one-center3{
        font-size:32px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .one-period-bottom{
        background-color: #fff;
        padding-left: 40px;
        padding-right: 40px;
        padding-top: 20px;
        padding-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
    }
    .paid{
        display: flex;
        align-items: center;
        flex-direction: row;
    }
    .unpaid{
        display: flex;
        align-items: center;
        flex-direction: row;
    }
    .paid1{
        margin-right: 12px;
    }
    .paid2{
        font-size:30px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .paid4{
        font-size:32px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .unpaid1{
        margin-right: 12px;
    }
    .unpaid2{
        font-size:30px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .unpaid4{
        font-size:32px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(98,135,178,1);
    }
    .statistics{
        width: 750px;
        height: 128px;
        position: fixed;
        bottom: 0;
        left: 0;
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

</style>
