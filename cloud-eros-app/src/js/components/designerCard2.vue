<template>
    <div class="designer-wrapper" @click="goToDesigner(detail)">
        <div class="designer-card">
            <image class="designer-avatar" resize="cover" :src="`${detail.headUrl}?x-oss-process=image/resize,w_200/crop,x_0,y_0,w_200,h_200/circle,r_100/format,png`"></image>
            <text class="designer-name">{{detail.name || '星杰设计师'}}</text>
            <text class="designer-title">{{detail.level || '首席设计师'}} | 从业{{detail.jobLength || '13'}}年</text>
            <div class="tags-box">
                <text class="designer-label" v-for="(tag, index) of detail.tags.slice(0,3)">{{tag.name}}</text>
            </div>
        </div>
        <div class="designer-bar"></div>
    </div>
</template>

<script>
    import mixins from '../common/mixins'

    export default {
        name: 'designerCard2',
        mixins: [mixins],
        props: {
            detail: {
                type: Object
            }
        },
        methods: {
            goToDesigner (detail) {
                if (detail.accountId) {
                    this.goTo('design.designer', { id: detail.id })
                } else {
                    this.goTo('desig.index', { id: detail.id })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .designer-wrapper {
        align-items: center;
    }

    .designer-card {
        width: 320;
        padding: 40 20;
        margin-right: 20;
        align-items: center;
        border-top-style: solid;
        border-top-color: #eee;
        border-top-width: 2;
        border-left-style: solid;
        border-left-color: #eee;
        border-left-width: 2;
        border-bottom-style: solid;
        border-bottom-color: #eee;
        border-bottom-width: 2;
        border-right-style: solid;
        border-right-color: #eee;
        border-right-width: 2;
        border-radius: 8;
    }

    .designer-avatar {
        width: 168;
        height: 168;
        border-radius: 84;
    }

    .designer-name {
        margin-top: 28;
        font-size: 32;
        color: #212121;
    }

    .designer-title {
        margin: 12 0;
        font-size: 24;
        color: #555;
    }

    .tags-box {
        justify-content: center;
        align-items: center;
        flex-direction: row;
    }

    .designer-label {
        margin-right: 10;
        padding: 5 8;
        font-size: 22;
        color: #fff;
        background-color: #353535;
        border-radius: 4;
    }

    .designer-bar {
        width: 212;
        height: 12;
        margin-top: 6;
        background-color: #fff;
        border-top-style: solid;
        border-top-color: #eee;
        border-top-width: 2;
        border-left-style: solid;
        border-left-color: #eee;
        border-left-width: 2;
        border-bottom-style: solid;
        border-bottom-color: #eee;
        border-bottom-width: 2;
        border-right-style: solid;
        border-right-color: #eee;
        border-right-width: 2;
        border-radius: 4;
    }
</style>
