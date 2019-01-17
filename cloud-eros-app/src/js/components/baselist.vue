<template>
    <div class="warp">
        <div class="dividingLine"></div>
        <div class="content">
            <div class="top">
                <div class="tags">
                    <image class="tags-image" resize="cover" src="bmlocal://assets/images/rectangle@2x.png"></image>
                    <text class="tags-name">{{itemBase.changeCode}}</text>
                </div>
                <div class="dateTime">
                    <text class="times">{{$dayjs(itemBase.modifyTime).format('YYYY-MM-DD')}}</text>
                </div>
            </div>
            <div class="prompt">
                <text class="promptText">工程名称</text>
                <text class="promptTextCenter">款项名称</text>
                <text class="promptTextRight">变更金额</text>
            </div>
            <div class="middle" v-for="(item, index) in itemBase.proJectChangeBaseList" :key="index">
                <div class="label">
                    <text style="width: 210px;">{{item.projectName}}</text>
                    <text class="label-name">{{item.name}}</text>
                    <text class="label-val">￥{{item.changeNum}}</text>
                </div>
            </div>
            <div class="line"></div>
            <div class="bottom">
                <div class="date">
                    <text class="font">合计:</text>
                    <text class="price">￥{{itemBase.total}}</text>
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
        props: {
            itemBase: {
                type: Object
            }
        },
        mixins: [mixins]
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
        background-color: #FFFFFF;
    }

    .tags {
        flex-direction: row;
        align-items: center;
        align-content: center;
    }

    .price {
        color: #ff0000;
        font-size: 38px;
        align-content: center;
        padding-top: 20;
    }

    .font {
        padding-top: 20;
    }

    .tags-name {
        color: #333333;
        font-size: 34;
        font-weight: 600;
        background-color: #FFFFFF;
    }

    .tags-image {
        width: 10;
        height: 64;
        margin-right: 30;
    }

    .date {
        padding-right: 10;
        flex-direction: row;
        width: 400px;
        align-items: center;
        justify-content: flex-start;
    }

    .dateTime {
        padding-right: 30;
        background-color: #FFFFFF;
    }

    .times {
        color: #aaaaaa;
    }

    .dividingLine {
        height: 20px;
        background-color: #F9F9F9;
        border-bottom-style: solid;
        border-bottom-color: #aaaaaa;
        border-bottom-width: 1px;
    }

    .prompt {
        margin-top: 13px;
        flex-direction: row;
        background-color: rgba(241,241,241,1);
        height: 82px;
        align-items: center;
    }

    .promptText {
        text-align: center;
        width: 210px;
        color: #979797;
    }

    .promptTextCenter {
        text-align: center;
        width: 210px;
        margin-left: 30px;
        color: #979797;
    }

    .promptTextRight {
        text-align: center;
        width: 210px;
        margin-left: 60px;
        color: #979797;
    }

    .middle {
        padding: 0 40;
        height: 150px;
        border-bottom-style: solid;
        border-bottom-color: #999999;
        border-bottom-width: 1px;
        background-color: #FFFFFF;
    }

    .bottom {
        /*padding: 0 10;*/
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-content: flex-end;
    }

    .label {
        flex-direction: row;
        margin-top: 50px;
    }

    .label-name {
        color: #333333;
        font-size: 30;
        width: 210px;
        text-align: left;
        padding-left: 30px;
    }

    .label-val {
        color: #3990F5;
        font-size: 30;
        text-align: right;
        padding-left: 70px;
    }

    .line {
        width: 750;
        height: 2;
        border-width: 1px;
        border-style: solid;
        border-color: rgba(219, 214, 214, 0.5);
    }
</style>
