<template>
    <div class="warp">
        <div class="dividingLine"></div>
        <div class="content">
            <div class="top">
                <div class="tags">
                    <image class="tags-image" resize="cover" src="bmlocal://assets/images/rectangle@2x.png"></image>
                    <text class="tags-name">{{itemMartical.total}}</text>
                </div>
            </div>
            <div class="middle" v-if="itemMartical.details.length">
                <div class="label" v-for="(item, index) in itemMartical.details" :key="index">
                    <div class="matior">
                        <text class="label-name">{{item.name}}</text>
                        <text class="label-val" v-if="Number(item.money) > 0">+￥{{item.money}}</text>
                        <text class="labelcount-val" v-else>-￥{{item.money}}</text>
                    </div>
                    <div class="data">
                        <text class="dataStyle">{{$dayjs(itemMartical.time).format('YYYY-MM-DD')}}</text>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="bottom-right">
                    <text></text>
                </div>
                <div class="date">
                    <text class="font">合计:</text>
                    <text class="price">+￥{{itemMartical.amount}}</text>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import mixins from '../common/mixins'

    export default {
        data () {
            return {
                dayDate: null,
                count: 0
            }
        },
        mixins: [mixins],
        props: {
            itemMartical: {
                type: Object
            }
        },
        methods: {
            getNum () {
                for (let i = 0; i < this.itemMartical.list.length; i++) {
                    this.count += Number(this.itemMartical.list[i].price)
                }
                return this.count
            }
        },
        async mounted () {
            await this.getNum()
        }
    }
</script>

<style scoped>
    .warp {
        width: 750;
        background-color: #FFFFFF;
        margin-bottom: 20;
    }

    .content {
        width: 750;
        padding: 25 0;
        background-color: #FFFFFF;
    }

    .top {
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-content: space-between;
    }

    .tags {
        flex-direction: row;
        align-items: center;
        align-content: center;
    }

    .data {
        height: 40px;
        padding-bottom: 30px;
        align-items: flex-start;
        justify-content: flex-start;
    }

    .dataStyle {
        width: 210px;
        margin-left:60px;
        padding-left: 30px;
        color: #999999
    }

    .matior {
        flex-direction: row;
    }

    .price {
        color: #ff0000;
        font-size: 38px;
        align-content: center;
        padding-top: 20;
    }

    .dividingLine {
        height: 20px;
        background-color: #F9F9F9;
        border-bottom-style: solid;
        border-bottom-color: #aaaaaa;
        border-bottom-width: 1px;
    }

    .font {
        padding-top: 20;
    }

    .tags-name {
        color: #333333;
        font-size: 34;
        font-weight: 600;
    }

    .tags-image {
        width: 10;
        height: 64;
        margin-right: 30;
    }

    .date {
        padding-right: 30;
        flex-direction: row;
        width: 300px;
        align-items: center;
        justify-content: center;
    }

    .middle {
        padding: 10 40;
        margin-top: -10px;
        border-bottom-style: solid;
        border-bottom-color: #DBD6D6;
        border-bottom-width: 1px;
    }

    .bottom {
        padding: 0 40;
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-content: space-between;
    }

    .label {
        flex-direction: row;
        height: 150px;
        width: 750px;
    }

    .label-name {
        color: #333333;
        font-size: 30;
        width: 210px;
        text-align: center;
    }

    .label-val {
        color: #E60012;
        font-size: 30;
        width: 210px;
        text-align: center;
        padding-left: 50px;
    }

    .labelcount-val {
        color: #5AAC00;
        font-size: 30;
        width: 210px;
        text-align: center;
        padding-left: 50px;
    }
</style>
