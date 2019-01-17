<template>
    <div>
        <div class="item-container" v-if="detailtype !== 4 && detailtype !== 2" :key="0">
            <div class="item-container-box" v-for="(item,index) of list" :key="index">
                <div class="business-left">
                    <div class="business-time">
                        <text class="business-text" :class="[Number(item.paid) === Number(item.handle) || Number(item.paid) > Number(item.handle)?'color-c':'color-red']" v-if="item.name === '首期'">{{item.name}}</text>
                        <text class="business-text" :class="[Number(item.paid) === 0 && Number(item.status) === 0?'color-black':[(Number(item.paid) > 0 && Number(item.paid) < Number(item.handle) && Number(item.status) === 1) || (Number(item.paid) === 0 && Number(item.status) === 1) ? 'color-red':[Number(item.paid) >= Number(item.handle) && Number(item.status) === 1?'color-c':'']]]" v-else>{{item.name}}</text>
                        <text class="business-time-p1" :class="[Number(item.paid) === Number(item.handle) || Number(item.paid) > Number(item.handle)?'color-c':'color-red']" v-if="item.time && item.name === '首期'">{{$dayjs(item.time).format('YYYY-MM-DD')}}</text>
                        <text class="business-time-p1" :class="[Number(item.paid) === 0 && Number(item.status) === 0?'color-black':[(Number(item.paid) > 0 && Number(item.paid) < Number(item.handle) && Number(item.status) === 1) || (Number(item.paid) === 0 && Number(item.status) === 1) ? 'color-red':[Number(item.paid) >= Number(item.handle) && Number(item.status) === 1?'color-c':'']]]" v-if="item.time && item.name === '尾期'">{{$dayjs(item.time).format('YYYY-MM-DD')}}</text>
                    </div>
                </div>
                <div class="business-right" :class="[(index === list.length) ? 'noBorder' : '']">
                    <div class="business-content-box1">
                        <text class="business-content-p1" :class="[Number(item.paid) === Number(item.handle) || Number(item.paid) > Number(item.handle)?'color-c':'color-red']" v-if="item.name === '首期'">{{item.handle}}</text>
                        <text class="business-content-p1" :class="[Number(item.paid) === 0 && Number(item.status) === 0?'color-black':[(Number(item.paid) > 0 && Number(item.paid) < Number(item.handle) && Number(item.status) === 1) || (Number(item.paid) === 0 && Number(item.status) === 1) ? 'color-red':[Number(item.paid) >= Number(item.handle) && Number(item.status) === 1?'color-c':'']]]" v-else>{{item.handle}}</text>
                        <text class="business-content-p1" :class="[Number(item.paid) === Number(item.handle) || Number(item.paid) > Number(item.handle)?'color-c':'color-red']" v-if="item.name === '首期'">{{item.paid}}</text>
                        <text class="business-content-p1" :class="[Number(item.paid) === 0 && Number(item.status) === 0?'color-black':[(Number(item.paid) > 0 && Number(item.paid) < Number(item.handle) && Number(item.status) === 1) || (Number(item.paid) === 0 && Number(item.status) === 1) ? 'color-red':[Number(item.paid) >= Number(item.handle) && Number(item.status) === 1?'color-c':'']]]" v-else>{{item.paid}}</text>
                    </div>
                </div>
                <div class="business-process">
                    <text class="iconfont font-40" :class="[Number(item.paid) === Number(item.handle) || Number(item.paid) > Number(item.handle)?'color-c':'color-red']" v-if="item.name === '首期'">&#xe617;</text>
                    <text class="iconfont font-40" :class="[Number(item.paid) === 0 && Number(item.status) === 0?'color-black':[(Number(item.paid) > 0 && Number(item.paid) < Number(item.handle) && Number(item.status) === 1) || (Number(item.paid) === 0 && Number(item.status) === 1) ? 'color-red':[Number(item.paid) >= Number(item.handle) && Number(item.status) === 1?'color-c':'']]]" v-else>&#xe617;</text>
                </div>
            </div>
        </div>
        <div class="costDetail" v-if="detailtype === 2" :key="1">
            <div class="indexMoney">
                <div class="moneyName">
                    <div class="moneyNameLeft">
                        <image class="tags-image" resize="cover" src="bmlocal://assets/images/iconcontract.png" v-if="listItem.unpaid <= 0"></image>
                        <image class="tags-image" resize="cover" src="bmlocal://assets/images/RectangleRed@2x.png" v-if="Number(listItem.unpaid) < moneyName && listItem.unpaid > 0"></image>
                        <image class="tags-image" resize="cover" src="bmlocal://assets/images/RectangleBlock@2x.png" v-if="listItem.unpaid === moneyName"></image>
                        <text v-if="listItem.name === '首期'" :class="[listItem.unpaid <= 0 ? 'moneyFontFirst':[Number(listItem.unpaid) < moneyName && listItem.unpaid > 0 ? 'moneyFontSecond':[listItem.unpaid === moneyName?'moneyFont':'']]]">一期款</text>
                        <text v-else :class="[listItem.unpaid <= 0 ? 'moneyFontFirst':[Number(listItem.unpaid) < moneyName && listItem.unpaid > 0 ? 'moneyFontSecond':[listItem.unpaid === moneyName?'moneyFont':'']]]">{{listItem.name}}款</text>
                        <text :class="[listItem.unpaid <= 0 ? 'moneyTotalStyle':[Number(listItem.unpaid) < moneyName && listItem.unpaid > 0 ? 'moneyTotalStyleScond':[listItem.unpaid === moneyName?'moneyTotalStyleThird':'']]]">￥{{moneyName}}</text>
                    </div>
                    <div class="moneyNameRight">
                        <text class="timeColor" v-if="listItem.time">{{$dayjs(listItem.time).format('YYYY-MM-DD')}}</text>
                        <text class="timeColor" v-else></text>
                    </div>
                </div>
                <div class="borderBottom">
                    <div class="contractMoney">
                        <text class="conChaFont">合同款</text>
                        <text class="contractFontMoney">￥{{listItem.handle}}</text>
                    </div>
                    <div class="changeMoney" v-if="listItem.changeAmount">
                        <text class="conChaFont">变更款</text>
                        <text class="contractFontMoney">￥{{listItem.changeAmount}}</text>
                    </div>
                </div>
                <div class="statusMoney">
                    <div class="statusLeft">
                        <text class="statusFont">已付:</text>
                        <text class="statusColor">￥{{listItem.paid}}</text>
                    </div>
                    <div class="statusRight">
                        <text class="statusUnpaidFont">未付:</text>
                        <text class="statusUnpaidColor">￥{{listItem.unpaid}}</text>
                    </div>
                </div>
            </div>
            <div class="borderLine"></div>
        </div>
    </div>
</template>
<script>
    import mixins from '../../common/mixins'

    export default {
        mixins: [mixins],
        data () {
            return {
                dayDate: null,
                houseDate: null,
                imgUrlArray: [],
                moneyName: 0
            }
        },
        props: {
            listItem: {
                type: Object
            },
            list: {
                type: Array
            },
            detailtype: {
                type: Number
            }
        },
        created () {
            if (this.listItem) {
                if (this.listItem.handle && this.listItem.changeAmount) {
                    this.moneyName = Number(this.listItem.handle) + Number(this.listItem.changeAmount)
                    this.moneyName = this.moneyName.toFixed(2)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .iconfont {
        font-family: iconfont2;
    }

    .color-green {
        color: #5AAC00;
    }

    .color-red {
        color: #E60012;
    }

    .color-black {
        color: #444444;
    }

    .item-container {
        width: 750px;
        background-color: #ffffff;
    }

    .content {
        width: 750px;
        height: 300px;
        border-bottom-width: 1px;
        align-items: center;
        justify-content: center;
    }

    .item-container-box {
        width: 750px;
        flex-direction: row;
    }

    .business-left {
        width: 180px;
        flex-direction: row;
    }

    .business-time {
        width: 120px;
        position: relative;
    }

    .business-process {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #ffffff;
        position: absolute;
        top: 0;
        left: 160px;
        z-index: 9999;
    }

    .business-text {
        height: 34px;
        font-size: 30px;
        color: #999999;
        line-height: 34px;
        text-align: right;
    }

    .business-text-2 {
        height: 34px;
        font-size: 30px;
        color: #E60012;
        line-height: 34px;
        text-align: right;
    }

    .business-text-3 {
        height: 34px;
        font-size: 30px;
        color: #444444;
        line-height: 34px;
        text-align: right;
    }

    .business-time-p1 {
        height: 40px;
        font-size: 22px;
        color: #666666;
        line-height: 40px;
        text-align: right;
    }

    .business-time-p2 {
        height: 28px;
        font-size: 20px;
        color: #666666;
        line-height: 28px;
        text-align: right;
    }

    .business-time-p2 {
        height: 28px;
        font-size: 20px;
        color: #444444;
        line-height: 28px;
        text-align: right;
    }

    .business-right {
        position: relative;
        width: 510px;
        height: 150px;
        padding-left: 50px;
        border-left-color: #000000;
        border-left-width: 1px;
        border-left-style: solid;
        flex-direction: row;
        justify-content: space-between;
        z-index: 100;
    }

    .noBorder {
        border-left-color: #ffffff;
    }

    .business-content-box1 {
        flex-direction: row;
        justify-content: space-between;
    }

    .business-content-p1 {
        color: #333333;
        font-size: 32px;
        width: 250px;
    }

    .business-content-p2 {
        color: #E60012;
        font-size: 40px;
    }

    .font-40 {
        font-size: 40;
        color: #cbcbcb;
    }

    .color-c {
        color: #cbcbcb;
    }

    .moneyName {
        flex-direction: row;
        height: 100px;
        align-items: center;
        justify-content: space-between;
    }
    .moneyNameLeft {
        flex-direction: row;
        align-items: center;
    }
    .moneyFontFirst {
        color: #999999;
        font-size: 30px
    }
    .moneyFontSecond {
        color: #E60012;
        font-size: 30px
    }
    .moneyFont {
        color: #333333;
        font-weight: 600;
        font-size: 30px
    }
    .moneyTotalStyle {
        color: #999999;
        margin-left: 20px;
    }
    .moneyTotalStyleScond {
        color: #E60012;
        margin-left: 20px;
    }
    .moneyTotalStyleThird {
        color: #333333;
        margin-left: 20px;
        font-weight: 600;
    }
    .moneyNameRight {
        margin-right: 40px;
    }
    .timeColor {
        color: #999999;
    }
    .contractMoney {
        flex-direction: row;
        height: 80px;
        align-items: center;
    }
    .conChaFont {
        color: #333333;
        font-size: 28;
    }
    .contractFontMoney {
        color: #333333;
        margin-left: 20px;
        font-size: 28;
    }
    .changeMoney {
        flex-direction: row;
        height: 100px;
        align-items: center;
        font-size: 28;
    }
    .statusMoney {
        flex-direction: row;
        height: 100px;
        align-items: center;
        margin-left: 40px;
        font-size: 28;
    }
    .statusLeft {
        flex-direction: row;
        width: 300px;
    }
    .statusRight {
        flex-direction: row;
    }
    .statusFont {
        color: #333333;
        width: 100px;
        font-size: 28;
    }
    .statusColor {
        color: #333333;
        font-size: 28;
    }
    .statusUnpaidFont {
        margin-left: 60px;
        width: 100px;
        font-size: 28;
    }
    .statusUnpaidColor {
        color: #6287B2;
        margin-right: 20px;
        font-size: 28;
    }
    .tags-image {
        width: 10px;
        height: 64px;
        margin-right: 30px;
    }
    .indexMoney {
    }
    .borderBottom {
        padding-left: 40px;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: #DBD6D6;
    }
    .borderLine {
        width: 750px;
        height: 16px;
        background-color: rgba(245,245,245,1);
    }
</style>
