<template>
    <div class="box">
        <!--<div class="content-box">-->
        <!--<scroller class="scroller">-->
        <div class="itemBox">
            <!--<scroller class="scroller">-->
            <!--<div class="content-box-top">-->
            <!--<div class="box-top-left">-->
            <!--<text class="top-left-name" @click="goTo('project.modification')">{{item.name}}</text>-->
            <!--<text class="top-left-num">{{item.money}}</text>-->
            <!--</div>-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--<list>-->
            <!--<cell v-for="details in item.children">-->
            <div class="content-box-center">
                <div class="items-left">
                    <image class="img-left" src="bmlocal://assets/images/111.jpg"></image>
                </div>
                <div class="purchaseCustomerContent">
                    <div class="purchaseCustomerContentBox">
                        <text class="purchaseCustomer-p4">{{item.storeName}}</text>
                    </div>
                    <div class="purchaseCustomerContentBox">
                        <text class="purchaseCustomer-p1">区域：</text>
                        <text class="purchaseCustomer-p2">{{item.customerAddress}}</text>
                        <!--<text class="purchaseCustomer-p1" style="margin-left:-35px;">区域：</text>-->
                        <!--<text class="purchaseCustomer-p2">b1酒吧</text>-->
                    </div>
                    <div class="purchaseCustomerContentBox">
                        <text class="purchaseCustomer-p1">规格：</text>
                        <div class="purchaseCustomer-container">
                            <text class="purchaseCustomer-p2">{{items.skuName}}</text>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-box-bottom">
                <div class="kong">
                    <text>{{$dayjs(item.flowTime).format('YYYY-MM-DD')}}</text>
                </div>
                <div class="shops">
                    <text>共{{parseInt(items.amount)}}件商品</text>
                    <!--<div class="qian">-->
                    <text>金额:</text>
                    <text class="jine">￥{{Number(items.applyBackSaleMoney).toFixed(2)}}</text>
                </div>
            </div>
            <!--</cell>-->
            <!--</list>-->
        </div>
        <!--</scroller>-->
        <!--</div>-->
    </div>
</template>
<script>
    import mixins from '../common/mixins'

    export default ({
        data () {
            return {
                refullDetailList: []
            }
        },
        mixins: [mixins],
        props: {
            item: {
                type: Object
            },
            items: {
                type: Object
            }
        }
    })
</script>
<style scoped>
    .box {
        width: 700px;
        margin-top: 20px;
        /*height: 200px;*/
        /*border-width: 3px;*/
        /*border-style: solid;*/
        /*border-color: rgb(162, 217, 192);*/
        margin-left: 25px;
    }

    .purchaseCustomer-p4 {
        width: 500;
    }

    .itemBox {
        /*height:400px;*/
    }

    .item-container {
        width: 750px;
        background-color: #f2f3f4;
        flex-direction: row;
        justify-content: space-around;
    }

    .border-cell {
        background-color: #DBD6D6;
        width: 750px;
        height: 1px;
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

    .shopList {
        /*height:200;*/
    }

    .pageItem {
        height: 3000;
    }

    .items-left {
        align-items: center;
        align-content: center;
        justify-content: center;
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
        color: red;
        font-size: 38px;
    }

    .total {
        /*margin-right: 60px;*/
        width: 390px;
        height: 120px;
        padding-left: 10px;
        /*padding-top:10px;*/
        padding-right: 2px;
        background-color: red;
    }

    .totalPrice {
        margin-top: 10px;
        color: #ffffff;
        font-size: 24px;
    }

    .img-left {
        width: 100px;
        height: 100px;
        margin-bottom: 20px;
        margin-top: 40px;
        border-radius: 100%;
        align-items: center;
    }

    .upload-all {
        flex-direction: row;
        flex-wrap: wrap;
        padding-bottom: 50px;
    }

    .upload-box {
        width: 172px;
        height: 172px;
        margin-left: 40px;
        margin-top: 50px;
        position: relative;
    }

    .jine {
        color: #008000;
        font-size: 38px;
    }

    /*.box{*/
    /*height:3000px;*/
    /*}*/

    .upload-img {
        width: 172px;
        height: 172px;
    }

    .shops {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 620;
    }

    .add-box {
        width: 172px;
        height: 172px;
        justify-content: center;
        align-items: center;
        border-width: 2px;
        border-color: #DBD6D6;
        margin-left: 40px;
        margin-top: 50px;
        border-radius: 8px;
    }

    .add-img {
        font-size: 80px;
        color: #DBD6D6;
    }

    .contract-code {
        width: 698px;
        height: 324px;
        border-width: 1px;
        border-style: solid;
        border-color: #EEEEEE;
        margin-left: 26px;
        margin-top: 20px;
        border-radius: 16px;
    }

    .text-title1-left {
        text-align: left;
        font-size: 26px;
        color: #424552;
    }

    .qian {
        margin-left: 10px;
        display: inline-block;
    }

    .text-title1-center {
        margin-left: 50px;

        font-size: 26px;
        color: #424552;
    }

    .text-content-left {
        width: 100px;
        text-align: left;
        font-size: 26px;
        color: #E60012;

    }

    .text-content-center {
        margin-left: 60px;
        width: 200px;

        font-size: 26px;
        color: #424552;
    }

    .text-title1-right {
        margin-left: 260px;

        color: #424552;
        font-size: 26px;
    }

    .text-content-right {
        margin-left: 160px;
        width: 200px;
        color: #424552;
        font-size: 26px;
    }

    .customer-information-top {
        height: 74px;
        background-color: #F7F7F7;
        padding-left: 28px;
        padding-right: 30px;
        align-items: center;
        flex-direction: row;
    }

    .tittl-text {
        font-size: 26px;
        color: #424552;
        font-weight: bold;
    }

    .tittl-text-right {
        font-size: 26px;
        color: #E60012;
    }

    .tittl-text-content {
        font-size: 26px;
        color: #737685;;
    }

    .center-div {
        flex-direction: row;
        margin-top: 16px;
    }

    .center-div1 {
        flex-direction: row;
    }

    .center-left-text1 {
        width: 200px;
        text-align: right;
        font-size: 26px;
        color: #737685;
    }

    .center-right-text1 {
        margin-left: 20px;
        font-size: 26px;
        color: #333333;
        word-wrap: break-word;
    }

    .code {
        height: 100px;
        padding-left: 40px;
        padding-right: 40px;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #EEEEEE;
    }

    .code-left {
        font-size: 32px;
        color: #333333;
    }

    .code-right {
        font-size: 32px;
        color: #E60012;
    }

    .customer-information {
        width: 698px;
        height: 248px;
        border-width: 1px;
        border-style: solid;
        border-color: #EEEEEE;
        margin-left: 26px;
        margin-top: 20px;
        border-radius: 16px;
    }

    .customer-information-top {
        height: 74px;
        background-color: #F7F7F7;
        padding-left: 28px;
        padding-right: 30px;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
    }

    .center-box {
        padding-left: 20px;
    }

    .tittl-text {
        font-size: 26px;
        color: #424552;
        font-weight: bold;
    }

    .center-div {
        flex-direction: row;
        margin-top: 16px;
    }

    .center-left-text {
        font-size: 26px;
        color: #737685;
    }

    .center-right-text {
        font-size: 26px;
        color: #333333;
    }

    .contract-main-information {
        width: 698px;
        height: 720px;
        border-width: 1px;
        border-style: solid;
        border-color: #EEEEEE;
        margin-left: 26px;
        margin-top: 20px;
        border-radius: 16px;
    }

    .contract-main-informationBase {
        width: 698px;
        height: 820px;
        border-width: 1px;
        border-style: solid;
        border-color: #EEEEEE;
        margin-left: 26px;
        margin-top: 20px;
        border-radius: 16px;
    }

    .contract-main-information1 {
        height: 248px;
        border-bottom-width: 1px;
        border-bottom-style: dashed;
        border-bottom-color: #EEEEEE;
    }

    .center-left-text1 {
        width: 200px;
        text-align: right;
        font-size: 26px;
        color: #737685;
    }

    .center-right-text1 {
        margin-left: 20px;
        font-size: 26px;
        color: #333333;
    }

    .contract-main-information2 {
        height: 168px;
        border-bottom-width: 1px;
        border-bottom-style: dashed;
        border-bottom-color: #EEEEEE;
    }

    .contract-signing-engineering-stage {
        width: 698px;
        height: 644px;
        border-width: 1px;
        border-style: solid;
        border-color: #EEEEEE;
        margin-left: 26px;
        margin-top: 20px;
        border-radius: 16px;
    }

    .tittl-text-right {
        font-size: 24px;
        color: #E60012;
    }

    .special-text {
        margin-top: 20px;
        font-size: 26px;
        color: #333333;
    }

    .partyB-collection-information {
        width: 698px;
        height: 248px;
        border-width: 1px;
        border-style: solid;
        border-color: #EEEEEE;
        margin-left: 26px;
        margin-top: 20px;
        border-radius: 16px;
    }

    .customer-billing-information {
        width: 698px;
        height: 400px;
        border-width: 1px;
        border-style: solid;
        border-color: #EEEEEE;
        margin-left: 26px;
        margin-top: 20px;
        border-radius: 16px;
    }

    .customer-participation-promotions {
        width: 698px;
        height: 248px;
        border-width: 1px;
        border-style: solid;
        border-color: #EEEEEE;
        margin-left: 26px;
        margin-top: 20px;
        border-radius: 16px;
    }

    .quotation-information {
        width: 698px;
        height: 340px;
        border-width: 1px;
        border-style: solid;
        border-color: #EEEEEE;
        margin-left: 26px;
        margin-top: 20px;
        border-radius: 16px;
    }

    .center-div1 {
        height: 84px;
        padding-left: 25px;
        border-bottom-width: 1px;
        border-bottom-style: dashed;
        border-bottom-color: #eeeeee;
        align-items: center;
        flex-direction: row;
    }

    .center-div2 {
        height: 200px;
        padding-left: 25px;
        border-bottom-width: 1px;
        border-bottom-style: dashed;
        border-bottom-color: #eeeeee;
        align-items: flex-start;
        flex-direction: column;
    }

    .center-right-text2 {
        font-size: 26px;
        color: #6287B2;
    }

    .contract-attachment {
        width: 698px;
        height: 278px;
        border-width: 1px;
        border-style: solid;
        border-color: #EEEEEE;
        margin-left: 26px;
        margin-top: 20px;
        border-radius: 16px;
    }

    .contract-attachment {
        width: 698px;
        height: 400px;
        border-width: 1px;
        border-style: solid;
        border-color: #EEEEEE;
        margin-left: 26px;
        margin-top: 20px;
        border-radius: 16px;
    }

    .contract-attachment-center {
        height: 204px;
        align-items: center;
        justify-content: space-around;
        flex-direction: row;
    }

    .img-box {
        width: 144px;
        height: 144px;
        background-color: pink;
    }

    .related-personnel {
        width: 698px;
        height: 284px;
        border-width: 1px;
        border-style: solid;
        border-color: #EEEEEE;
        margin-left: 26px;
        margin-top: 20px;
        border-radius: 16px;
    }

    .content-box {
        width: 698px;
        border-width: 1px;
        border-style: solid;
        border-color: #E0E0E0;
        border-radius: 10px;
        margin-top: 20px;
        margin-left: 26px;
        background-color: #FFFFFF;
    }

    .content-box-top {
        height: 74px;
        background-color: #F7F7F7;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
    }

    .box-top-left {
        width: 350px;
        height: 74px;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        padding-left: 28px;
    }

    .top-left-name {
        font-size: 32px;
        color: #333333;
        font-weight: bold;
    }

    .box-top-right {
        /*width: 348px;*/
        height: 74px;
        align-items: center;
        flex-direction: row;
        justify-items: flex-end;
        /*justify-content: space-between;*/
    }

    .top-right-num {
        font-size: 26px;
        color: #424552;
    }

    .top-right-num1 {
        font-size: 26px;
        color: #737685;
        margin-left: 38px;
    }

    .content-box-center {
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: #E0E0E0;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #E0E0E0;
        flex-direction: row;
        justify-content: space-between;
    }

    .purchaseCustomerContent {
        padding: 30px 0;
        flex-direction: column;
        justify-content: center;
    }

    .purchaseCustomerContentBox {
        flex-direction: row;
    }

    purchaseCustomerContentBox1 {
        flex-direction: row;
        justify-content: center;
    }

    .purchaseCustomer-container {
        width: 520px;
        flex-direction: column;
    }

    .purchaseCustomer-p1 {
        width: 80px;
        /*text-align: right;*/
        font-size: 26px;
        color: #737685;
        line-height: 40px;
    }

    .purchaseCustomer-p2 {
        text-align: left;
        font-size: 26px;
        color: #333333;
        line-height: 40px;
        font-weight: bold;
    }

    .purchaseCustomer-p3 {
        text-align: left;
        font-size: 26px;
        color: #737685;
        line-height: 40px;
        font-weight: bold;
    }

    .nav {
        width: 698px;
        height: 40px;
        margin-bottom: 32px;
        align-items: center;
        flex-direction: row;
        justify-items: center;
        padding-left: 30px;
    }

    .beg {
        border-radius: 10px;
        color: #fff;
        padding-left: 17px;
        padding-top: 5px;
        padding-right: 17px;
        padding-bottom: 5px;
        font-size: 26px;
    }

    .beg1 {
        background-color: #737685;
    }

    .beg2 {
        background-color: #E60012;
    }

    .beg3 {
        background-color: #E0E0E0;
    }

    .next-img {
        margin-left: 2px;
        margin-right: 2px;
        font-size: 20px;
        color: #e0e0e0;
    }

    .content-box-bottom {
        width: 798px;
        height: 100px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background-color: #F7F7F7;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;

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

    .bottom-btn {
        margin-left: 10px;
        color: #E60012;
        font-size: 28px;
    }
</style>
