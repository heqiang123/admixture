<template>
    <div class="estate-item" @click="goTo('estate.details',{ id: item.id, homePhone: homePhone })">
        <div class="estate-item-wrapper">
            <image class="estate-cover" :src="item.frontImg+'?x-oss-process=style/w800_q80'"></image>
            <div class="estate-des">
                <text class="estate-name">{{item.name}}</text>
                <div class="estate-info">
                    <text class="text">在建工地</text>
                    <text class="number">{{item.constructionNum || '0'}}</text>
                    <text class="text">个 | 已预约次</text>
                    <text class="number">{{item.appointmentNum || '0'}}</text>
                    <text class="text">次</text>
                </div>
            </div>
        </div>
        <text class="estate-address">&#xe656; {{item.city || ''}}-{{item.addr || ''}}</text>
    </div>
</template>

<script>
    import mixins from '../common/mixins'

    export default {
        name: 'estateItem',
        props: {
            item: {
                type: Object,
                required: true
            },
            homePhone: {
                type: Object
            }
        },
        mixins: [mixins]
    }
</script>

<style lang="scss" scoped>
    .estate-item {
        width: 710;
        margin: 0 20;
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
