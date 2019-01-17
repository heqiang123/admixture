<template>
<div>
    <status-bar></status-bar>
    <wxc-minibar background-color="#fff">
        <text slot="middle" class="title">费用汇总</text>
    </wxc-minibar>
    <scroller :style="{height:`${pageHeight-120}px`}">
        <div class="in-total">
            <p class="total-cost"><span class="total-cost1"><text class="total-cost2">总费用：</text></span>
                <span class="total-cost3"><text class="total-cost4" v-if="allOrderList.totalCost">¥{{Number(allOrderList.totalCost).toFixed(2)}}</text></span></p>
            <div class="total-paid">
                <p class="total-paid1"><span class="total-paid2"><text class="total-paid3">合计已付：</text></span>
                <span class="total-paid4"><text class="total-paid5" v-if="allOrderList.totalAlreadyCost">¥{{Number(allOrderList.totalAlreadyCost).toFixed(2)}}</text></span></p>
                <p class="total-paid6">
                    <span class="total-paid7"><text class="total-paid8">已付：</text></span>
                    <span class="total-paid9"><text class="total-paid10">{{allOrderList.totalAlreadyCostRatio?allOrderList.totalAlreadyCostRatio:'0%'}}</text></span>
                </p>
            </div>
            <p class="total-unpaid"><span class="total-unpaid1"><text class="total-unpaid2">合计未付：</text></span>
                <span class="total-unpaid3">
                    <text class="total-unpaid4" v-if="allOrderList.totalNotCost">¥{{Number(allOrderList.totalNotCost).toFixed(2)}}</text>
                </span>
            </p>
        </div>
        <div class="material-contract" v-if="allOrderList.materialsContract.MaterialContract.length">
                <div class="material-contract-top">
                    <span class="line"></span>
                    <span class="material-contract-top1"><text class="material-contract-top2">材料合同</text></span>
                </div>
                <div class="material-contract-common" v-for="(materialItem,index) of allOrderList.materialsContract.MaterialContract">
                    <p class="material-contract-common1">
                        <span><text class="material-contract-common2">材料合同</text></span>
                        <span class="material-contract-common3">
                            <text class="material-contract-common4">{{materialItem.code}}</text></span></p>
                    <span><text class="material-contract-common5">{{$dayjs(materialItem.createTime).format('YYYY-MM-DD')}}</text></span>
                </div>
            <div class="signing">
                <p class="signing-amount"><span><text class="signing-amount1">签约金额：</text></span>
                    <span class="signing-amount2">
                        <text class="signing-amount3">¥{{allOrderList.materialTotalCost?Number(allOrderList.materialTotalCost).toFixed(2):'0.00'}}</text>
                    </span></p>
                <p class="amount-paid"><span><text class="amount-paid1">已付金额：</text></span>
                    <span class="amount-paid2">
                        <text class="amount-paid3">¥{{allOrderList.materialCost?Number(allOrderList.materialCost).toFixed(2):'0.00'}}</text>
                    </span></p>
            </div>
            <div class="bottom-button">
                <span class="original-contract" @click="goTo('contract.detail',{id:allOrderList.contractMaterialAttrachIdsOssDtos})"><text class="original-contract-text">合同原件</text></span>
                <span class="fee-details" v-if="ifShow" @click="goTo('feeDetails.allFees',{idLIs:idList})"><text class="fee-details-text">费用详情</text></span>
            </div>
        </div>
        <div class="base-contract" v-for="(baseItem,index) of allOrderList.baseContract.BaseContract" :key="index" v-if="allOrderList.baseContract.BaseContract.length">
                <div class="base-contract-top">
                    <p class="base-contract-right">
                        <span class="line"></span>
                        <span class="base-contract-right1"><text class="base-contract-right2">基装合同</text></span>
                        <span class="base-contract-right3"><text class="base-contract-right4">{{baseItem.code}}</text></span>
                    </p>
                    <span><text class="base-contract-left">{{$dayjs(baseItem.createTime).format('YYYY-MM-DD')}}</text></span>
                </div>
            <div class="signing">
                <p class="signing-amount"><span><text class="signing-amount1">签约金额：</text></span>
                    <span class="signing-amount2"><text class="signing-amount3" v-if="allOrderList.baseTotalCost">¥{{Number(allOrderList.baseTotalCost).toFixed(2)}}</text></span></p>
                <p class="amount-paid"><span><text class="amount-paid1">已付金额：</text></span>
                    <span class="amount-paid2"><text class="amount-paid3" v-if="allOrderList.baseCost">¥{{Number(allOrderList.baseCost).toFixed(2)}}</text></span></p>
            </div>
            <div class="bottom-button">
                <span class="original-contract"  @click="goTo('contract.baseContract',{id:allOrderList.contractBaseAttrachIdsOssDtos})"><text class="original-contract-text">合同原件</text></span>
                <span class="fee-details" @click="goTo('feeDetails.feeDetails',{id:baseItem.id})"><text class="fee-details-text">费用详情</text></span>
            </div>
        </div>
        <div class="base-contract" v-for="(contractItem,index) of allOrderList.designContract.DesignContract" :key="index" v-if="allOrderList.designContract.DesignContract.length">
            <div class="base-contract-top">
                <p class="base-contract-right">
                    <span class="line"></span>
                    <span class="base-contract-right1"><text class="base-contract-right2">设计合同</text></span>
                    <span class="base-contract-right3"><text class="base-contract-right4">{{contractItem.code}}</text></span>
                </p>
                <span><text class="base-contract-left">{{$dayjs(contractItem.createTime).format('YYYY-MM-DD')}}</text></span>
            </div>
            <div class="signing">
                <p class="signing-amount"><span><text class="signing-amount1">签约金额：</text></span>
                    <span class="signing-amount2"><text class="signing-amount3" v-if="allOrderList.designTotalCost">¥{{Number(allOrderList.designTotalCost).toFixed(2)}}</text></span></p>
                <p class="amount-paid"><span><text class="amount-paid1">已付金额：</text></span>
                    <span class="amount-paid2"><text class="amount-paid3" v-if="allOrderList.designCost">¥{{Number(allOrderList.designCost).toFixed(2)}}</text></span></p>
            </div>
            <div class="bottom-button">
                <span class="original-contract" @click="goTo('contract.designContract',{id:allOrderList.contractDesignerAttrachIdsOssDtos})"><text class="original-contract-text">合同原件</text></span>
                <span class="fee-details" @click="goTo('contract.coatDetail',{id:contractItem.id,type:1})"><text class="fee-details-text">费用详情</text></span>
            </div>
        </div>
    </scroller>
</div>
</template>

<script>
    import {
        costSummary
    } from '../../service/homeAtj.Api'
    import { WxcMinibar } from 'weex-ui'
    import StatusBar from '../../components/statusBar'
    import mixins from '../../common/mixins'
    export default {
        name: 'costSummary',
        components: { WxcMinibar, StatusBar },
        mixins: [mixins],
        data () {
            return {
                allOrderList: [],
                idList: [],
                ifShow: false
            }
        },
        props: {
            id: {
                type: Number
            }
        },
        watch: {
            id (val) {
                this.getOrderById(val)
            }
        },
        created () {
            this.getOrderById(this.id)
        },
        methods: {
            async getOrderById (id) {
                const result = await costSummary(id)
                this.allOrderList = result
                for (const value of this.allOrderList.materialsContract.MaterialContract) {
                    this.idList.push(value.id)
                }
                this.ifShow = true
            }
        }
    }
</script>

<style scoped>
.in-total{
    padding: 40px;
    background-color: #fff;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: #DBD6D6;
}
    .total-cost{
        display: flex;
        align-items: center;
        flex-direction: row;
    }
    .total-cost1{
        width: 170px;
    }
    .total-cost2{
        ont-size:34px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .total-cost3{
        margin-left: 12px;
    }
    .total-cost4{
        font-size:36px;
        font-family:AvenirNext-Medium;
        font-weight:500;
        color:rgba(230,0,18,1);
    }
    .total-paid{
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        margin-top: 28px;
    }
    .total-paid1{
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
    }
    .total-paid2{
        width: 170px;
    }
    .total-paid3{
        font-size:30px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .total-paid4{
        margin-left: 12px;
    }
    .total-paid5{
        font-size:32px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .total-paid6{
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
    }
    .total-paid8{
        font-size:30px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .total-paid9{
        margin-left: 8px;
    }
    .total-paid10{
        font-size:30px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#E60012;
    }
    .total-unpaid{
        align-items: center;
        flex-direction: row;
        margin-top: 26px;
    }
    .total-unpaid1{
        width: 170px;
    }
    .total-unpaid2{
        font-size:30px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .total-unpaid3{
        margin-left: 12px;
    }
    .total-unpaid4{
        font-size:32px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(98,135,178,1);
    }
    .material-contract{
        background-color: #fff;
        margin-top: 20px;
    }
    .material-contract-top{
        align-items: center;
        flex-direction: row;
        height: 102px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #DBD6D6;
    }
    .line{
        width:8px;
        height:64px;
        background-color: #E60012;
        border-top-left-radius:0px;
        border-top-right-radius:20px;
        border-bottom-right-radius:20px;
        border-bottom-left-radius:0px;
    }
    .material-contract-top1{
        margin-left: 30px;
    }
    .material-contract-top2{
        font-size:34px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .material-contract-common{
        height: 120px;
        padding: 40px;
        background-color: #FCFCFC;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #DBD6D6;
    }
    .material-contract-common1{
        align-items: center;
        flex-direction: row;
    }
    .material-contract-common2{
        font-size:30px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .material-contract-common3{
        margin-left: 20px;
    }
    .material-contract-common4{
        font-size:30px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .material-contract-common5{
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
    }
    .signing{
        height: 150px;
        padding-left: 40px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #DBD6D6;
        padding-top: 22px;
    }
    .signing-amount{
        align-items: center;
        flex-direction: row;
    }
    .signing-amount1{
        font-size:30px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .signing-amount2{
        margin-left: 12px;
    }
    .signing-amount3{
        font-size:32px;
        font-family:AvenirNext-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .amount-paid{
        align-items: center;
        flex-direction: row;
        margin-top: 20px;
    }
    .amount-paid1{
        font-size:30px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .amount-paid2{
        margin-left: 12px;
    }
    .amount-paid3{
        font-size:30px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#E60012;
    }
    .bottom-button{
        height: 80px;
        padding-right: 30px;
        align-items: center;
        justify-content: flex-end;
        flex-direction: row;
    }
    .original-contract{
        width: 152px;
        height: 56px;
        border-radius:4px;
        border-width: 1px;
        border-style: solid;
        border-color: #353535;
        align-items: center;
        justify-content: center;
        margin-left: 20px;
        margin-right: 20px;
    }
    .original-contract-text{
        font-size:26px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(53,53,53,1);
    }
    .fee-details{
        width: 152px;
        height: 56px;
        border-radius:4px;
        border-width: 1px;
        border-style: solid;
        border-color: #E60012;
        align-items: center;
        justify-content: center;
    }
    .fee-details-text{
        font-size:26px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#E60012;
    }
    .base-contract{
        background-color: #fff;
        margin-top: 20px;
    }
    .base-contract-top{
        height: 100px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-right: 30px;
    }
    .base-contract-right{
        flex-direction: row;
        align-items: center;
    }
    .base-contract-right1{
        margin-left: 40px;
    }
    .base-contract-right2{
        font-size:34px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .base-contract-right3{
        margin-left: 12px;
    }
    .base-contract-right4{
        font-size:34px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .base-contract-left{
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
    }
    .base-change{
        width: 152px;
        height: 56px;
        border-radius:4px;
        border-width: 1px;
        border-style: solid;
        border-color: #353535;
        align-items: center;
        justify-content: center;
    }
    .base-change-text{
        font-size:26px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(53,53,53,1);
    }
</style>
