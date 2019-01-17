<template>
    <div class="estate-item" @click="goTo('design.case',{id:item.id})">
        <div class="estate-item-wrapper">
            <image class="estate-cover" :src="getImageUrl(item.homepageUrl)"></image>
            <div class="estate-des">
                <div class="estate-info">
                </div>
            </div>
        </div>
        <text class="estate-address">&#xe656;{{item.title}}</text>
    </div>
</template>

<script>
    import mixins from '../common/mixins'

    export default {
        name: 'workItem',
        props: {
            item: {
                type: Object,
                required: true
            }
        },
        mixins: [mixins]
    }
</script>

<style lang="scss" scoped>
    .estate-item {
        width: 710;
        margin: 0 20;
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

    .estate-item-wrapper {
        position: relative;
        border-top-left-radius: 4;
        border-top-right-radius: 4;
    }

    .estate-cover {
        width: 710;
        height: 380;
    }

    .estate-des {
        justify-content: space-between;
        position: absolute;
        left: 20;
        bottom: 20;
        height: 100;
    }

    .estate-info {
        flex-direction: row;
    }

    .estate-name {
        font-size: 36;
        color: #fff;
    }

    .text {
        font-size: 30;
        color: #fff;
    }

    .number {
        font-size: 30;
        color: #e60012;
    }

    .estate-address {
        lines: 1;
        font-family: iconfont;
        text-overflow: ellipsis;
        padding: 24 20;
        font-size: 28;
        color: #757575;
    }
</style>
