<template>
    <div class="warp">
        <div class="content" @click="goTo('contract.detail',{id:6})">
            <div class="top">
                <div class="tags">
                    <image class="tags-image" resize="cover" src="bmlocal://assets/images/rectangle@2x.png"></image>
                    <text class="tags-name">基础合同</text>
                </div>
                <div class="date">
                    <text class="time">2018-03-15</text>
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
                    <text class="label-val text-color-red">{{item.price || '0%'}}</text>
                </div>
                <div class="date">
                    <text class="time text-color-blue">{{item.bussinessId || ''}}</text>
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div class="operation">
            <text class="text-btn" @click="goTo('contract.detail',{id:item.buiFlow})">合同原件</text>
            <text class="text-btn btn-red" @click="goTo('contract.coatDetail',{id:item.id})">费用详情</text>
            <text class="text-btn btn-red">材料详情</text>
        </div>
    </div>
</template>

<script>
    import mixins from '../common/mixins'

    export default {
        name: 'contractListItem',
        mixins: [mixins],
        props: {
            item: {
                type: Object
            }
        },
        watch: {
            item (val) {
                this.item = val
            }
        }
    }
</script>

<style scoped>
    .warp {
        width: 750;
        height: 308;
        background-color: #FFFFFF;
        border-width: 1px;
        border-style: solid;
        border-color: rgba(219, 214, 214, 0.5);
        margin-bottom: 20;
    }

    .content {
        width: 750;
        height: 226;
        padding: 25 0;
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
        padding-right: 30;
    }

    .time {
        font-size: 28;
        color: #999999;
        text-align: right;
    }

    .middle {
        padding: 14 40;
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
        align-items: center;
        align-content: center;
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
    }

    .btn-red {
        color: #E60012;
        border-width: 1px;
        border-style: solid;
        border-color: #E60012;
    }
</style>
