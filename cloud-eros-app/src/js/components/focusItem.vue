<template>
    <div class="focus-item">
        <div class="focus-title">
            <div class="focus-brand-wrapper">
                <text class="icon">&#xe658;</text>
                <text class="focus-brand">设计师</text>
            </div>
            <text class="focus-time">{{item.createTime}}</text>
            <text class="focus-cancel" @click="deleteFouces(index)">取消关注</text>
        </div>
        <div class="focus-designer">
            <image class="designer-avatar" :src="`${getImageUrl(item.profile.avatar)}&level=4`" @click="goToDesigner(item)"></image>
            <div class="designer-wrapper">
                <text class="designer-name">{{item.profile.title}}</text>
                <div class="title-wrapper">
                    <text class="title"></text>
                    <div class="follower-wrapper">
                        <text class="title">粉丝</text>
                        <text class="follower-strong">{{item.profile.follows}}</text>
                        <text class="title">人</text>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { deleteSee } from '../service/userApi'
    import mixins from '../common/mixins'

    export default {
        name: 'focusItem',
        props: {
            item: {
                type: Object,
                required: true
            },
            index: {
                type: Number
            }
        },
        mixins: [mixins],
        methods: {
            async deleteFouces (index) {
                const result = await deleteSee(this.item.sort, this.item.targetId)
                if (result.type === 'success') {
                    this.toast('取消关注成功')
                    this.$emit('deleteFouce', index)
                }
            },
            goToDesigner (item) {
                if (item.profile.accountId) {
                    this.goTo('design.designer', { id: item.targetId })
                } else {
                    this.goTo('desig.index', { id: item.targetId })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .focus-item {
        padding: 28 20;
    }

    .focus-title {
        padding: 28 0;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .focus-brand-wrapper {
        flex-direction: row;
        align-items: center;
    }

    .icon {
        font-family: iconfont;
        font-size: 48;
        color: #999;
    }

    .focus-brand {
        font-size: 32;
        font-weight: 700;
        color: #000;
    }

    .focus-time {
        font-size: 24;
        color: #999;
    }

    .focus-cancel {
        width: 144;
        height: 60;
        line-height: 60;
        font-size: 24;
        text-align: center;
        color: #353535;
        background-color: #f5f5f5;
        border-top-color: #dbd6d6;
        border-top-style: solid;
        border-top-width: 2;
        border-bottom-color: #dbd6d6;
        border-bottom-style: solid;
        border-bottom-width: 2;
        border-left-color: #dbd6d6;
        border-left-style: solid;
        border-left-width: 2;
        border-right-color: #dbd6d6;
        border-right-style: solid;
        border-right-width: 2;
        border-radius: 8;
    }

    .focus-designer {
        flex-direction: row;
        margin-bottom: 40;
    }

    .designer-avatar {
        width: 92;
        height: 92;
        margin-right: 28;
        border-radius: 46;
    }

    .designer-wrapper {
        height: 92;
        justify-content: space-between;
    }

    .designer-name {
        font-size: 32;
        color: #353535;
    }

    .title-wrapper {
        width: 580;
        flex-direction: row;
        justify-content: space-between;
    }

    .follower-wrapper {
        flex-direction: row;
    }

    .title {
        font-size: 24;
        color: #555;
    }

    .follower-strong {
        font-size: 24;
        color: #e60012;
    }
</style>
