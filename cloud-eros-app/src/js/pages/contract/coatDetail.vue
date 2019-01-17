<template>
    <scroller>
        <div class="container">
            <div class="header">
                <div class="content">
                    <text class="label-text" v-if="costDetailobj.name">{{costDetailobj.name}}</text>
                    <text class="label-text" v-else>{{costDetailobj.title}}</text>
                    <text class="timel-text">{{$dayjs(costDetailobj.creatTime).format('YYYY-MM-DD')}}</text>
                </div>
                <div class="content" v-if="moneyType !== 4 && moneyType !== 2">
                    <div class="lf">
                        <text class="label-text2">签约金额:</text>
                        <text class="m-text">￥{{costDetailobj.amount}}</text>
                    </div>
                    <div class="lf">
                        <text class="label-text2">已付:</text>
                        <text class="m-text2">{{costDetailobj.ratio}}</text>
                    </div>
                </div>
                <div class="content" v-if="moneyType === 2">
                    <div>
                        <div class="lf">
                            <text class="label-text2">总金额:</text>
                            <text class="m-text">￥{{signingMoney}}</text>
                        </div>
                        <div class="lf">
                            <text class="label-text3">签约金额:</text>
                            <text class="m-text3">￥{{costDetailobj.amount}}</text>
                        </div>
                        <div class="lf">
                            <text class="label-text3">变更金额:</text>
                            <text class="m-text3">￥{{costDetailobj.changeAmount}}</text>
                        </div>
                    </div>
                    <div class="lf">
                        <text class="label-text4">已付:</text>
                        <text class="m-text2">{{costDetailobj.ratio}}</text>
                    </div>
                </div>
                <div v-if="moneyType === 4">
                    <div class="content">
                        <div class="lf">
                            <text class="intention">意向合同金额:</text>
                            <text class="m-text">￥{{costDetailobj.amount}}</text>
                        </div>
                    </div>
                    <div class="content" v-if="costDetailobj.deduction">
                        <div class="lf">
                            <text class="label-money">抵扣金额:</text>
                            <text class="intention">￥{{costDetailobj.deduction}}</text>
                        </div>
                    </div>
                </div>
            </div>
            <div class="borderLine" v-if="moneyType === 2"></div>
            <div class="box" v-if="moneyType !== 4 && moneyType !== 2">
                <div class="borderLineSinge"></div>
                <div class="box-title">
                    <text class="title-name">应付</text>
                    <text class="title-name">已付</text>
                </div>
                <process-report :list="costDetailobj.list" :detailtype="moneyType"></process-report>
            </div>
            <div class="box" v-if="moneyType !== 4 && moneyType === 2" v-for="(item, index) of costDetailobj.list" :key="index">
                <process-report :listItem="item" :detailtype="moneyType"></process-report>
            </div>
            <div class="status" v-if="moneyType === 2">
                <div class="statusPaid">
                    <text class="statusPaidFont">合计已付:</text>
                    <text class="statusPaidColor">￥{{costDetailobj.paid}}</text>
                </div>
                <div class="statusUnpaid">
                    <text class="statusUnpaidFont">合计未付:</text>
                    <text class="statusUnpaidColor">{{costDetailobj.unpaid}}</text>
                </div>
            </div>
        </div>
    </scroller>
</template>

<script>
    import processReport from '../../components/myatjia/processReport'
    import { getCostDetailById } from '../../service/atjiaApi.js'
    import mixins from '../../common/mixins'

    export default {
        name: 'coatDetail',
        components: { processReport },
        mixins: [mixins],
        data () {
            return {
                // 页面传过来的合同Id
                moneyDetailsId: '',
                moneyType: '',
                costDetailobj: {},
                signingMoney: 0
            }
        },
        methods: {
            async getCostDetail (id, type) {
                const result = await getCostDetailById(id, type)
                this.costDetailobj = result
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
        },
        async created () {
            const params = await this.$router.getParams()
            if (params && params.id && params.type) {
                this.moneyDetailsId = params.id
                this.moneyType = params.type
                await this.getCostDetail(this.moneyDetailsId, this.moneyType)
            }
            if (this.costDetailobj.amount && this.costDetailobj.changeAmount) {
                this.signingMoney = Number(this.costDetailobj.amount) + Number(this.costDetailobj.changeAmount)
                this.signingMoney = this.signingMoney.toFixed(2)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header {
        width: 750;
        background-color: #FFFFFF;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: #DBD6D6;
        padding: 30 40;
    }

    .content {
        flex-direction: row;
        justify-content: space-between;
        margin: 10 0;
    }

    .label-text {
        font-weight: 600;
        font-size: 32;
        color: #333333;
    }

    .label-money {
        width: 250px;
    }

    .label-text2 {
        font-weight: 500;
        font-size: 30;
        color: #333333;
        width: 150px;
    }

    .intention {
        font-weight: 500;
        width: 250px;
    }

    .label-text3 {
        font-weight: 500;
        font-size: 30;
        color: #666666;
        width: 150px;
    }

    .label-text4 {
        font-size: 30;
        font-weight: 500;
        color: #333333;
        width: 80px;
    }

    .timel-text {
        color: #999999;
    }

    .lf {
        flex-direction: row;
        height: 50px;
        margin-top: 10px;
    }

    .lfPaid {
        flex-direction: row;
        height: 50px;
        margin-top: 10px;
    }

    .m-text {
        color: #E60012;
        font-weight: 500;
        font-size: 28;
    }

    .m-text3 {
        color: #666666;
        font-weight: 500;
        font-size: 28;
    }

    .m-text2 {
        margin-left: 10;
        color: #E60012;
        font-weight: 500;
        font-size: 28;
    }

    .borderLine {
        width: 750px;
        height: 16px;
        background-color: rgba(245,245,245,1);
    }

    .borderLineSinge {
        width: 750px;
        height: 2px;
        background-color: #DBD6D6;
    }

    .box {
        background-color: #ffffff;
    }

    .box-title {
        width: 750;
        background: #f00;
        padding: 36 0;
        flex-direction: row;
        padding-left: 230;
    }

    .title-name {
        width: 250px;
        color: #333333;
    }

    .status {
        height: 100px;
        flex-direction: row;
    }
    .statusPaid {
        width: 375px;
        background-color: #FFFFFF;
        padding: 16px
    }
    .statusPaidFont {
        color: #333333;
        margin-left: 10px;
        font-weight: 600;
    }
    .statusPaidColor {
        color: #E60012;
        margin-left: 10px;
    }
    .statusUnpaid {
        width: 375px;
        background-color: #E60012;
        padding: 16px
    }
    .statusUnpaidFont {
        color: #FFFFFF;
        font-weight: 600;
        margin-left: 10px;
    }
    .statusUnpaidColor {
        color: #FFFFFF;
        margin-left: 40px;
    }
</style>
