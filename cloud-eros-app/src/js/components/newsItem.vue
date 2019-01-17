<template>
    <div class="news-item" @click="goTo('home.newsDetails',{id:dt.id,url:getImageUrl(dt.titleImage)})">
        <div class="news-item-wrapper">
            <!--<image class="news-cover" :src="`${getImageUrl(dt.titleImage)}&level=4`"></image>-->
            <image class="news-cover" :src="dt.titleImage"></image>
            <text class="news-label">{{dt.channelName}}</text>
            <div class="news-comment">
                <text class="number">&#xe60d; {{dt.comments}}</text>
            </div>
        </div>
        <text class="news-title">{{dt.title}}</text>
    </div>
</template>

<script>
    import mixins from '../common/mixins'

    export default {
        name: 'newsItem',
        mixins: [mixins],
        props: ['dt']
    }
</script>

<style lang="scss" scoped>
    .news-item {
        width: 710;
        margin: 20;
        border-right-color: #f2f2f2;
        border-right-style: solid;
        border-right-width: 2;
        border-bottom-color: #f2f2f2;
        border-bottom-style: solid;
        border-bottom-width: 2;
        border-left-color: #f2f2f2;
        border-left-style: solid;
        border-left-width: 2;
    }

    .news-item-wrapper {
        position: relative;
        border-top-left-radius: 8;
        border-top-right-radius: 8;
    }

    .news-cover {
        width: 710;
        height: 400;
    }

    .news-label {
        position: absolute;
        top: 20;
        right: 20;
        width: 140;
        height: 48;
        line-height: 48;
        font-size: 24;
        border-radius: 24;
        text-align: center;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.7);
    }

    .news-comment {
        flex-direction: row;
        align-items: center;
        position: absolute;
        right: 20;
        bottom: 20;
        width: 60;
        height: 40;
        background-color: rgba(0, 0, 0, .3);
        border-radius: 4;
    }

    .number {
        font-family: iconfont;
        font-size: 24;
        color: #fff;
        text-align: center;
    }

    .news-title {
        lines: 1;
        text-overflow: ellipsis;
        padding: 24 20;
        font-size: 32;
        color: #212121;
    }
</style>
