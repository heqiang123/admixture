<template>
    <div>
        <status-bar></status-bar>
        <div class="message">
            <div class="message-header">
                <text class="back" @click="$router.back">&#xe601;</text>
                <text class="message-title" :style="!state.noticeActive ? nomalStyle : selectedStyle" @click="state.noticeActive=!state.noticeActive">通知</text>
                <text class="message-title" :style="state.noticeActive ? nomalStyle : selectedStyle" @click="state.noticeActive=!state.noticeActive">评论</text>
            </div>
            <div>
                <notice-comment v-if="state.noticeActive"></notice-comment>
                <all-comment v-else></all-comment>
            </div>
        </div>
    </div>
</template>

<script>
    import StatusBar from '../../components/statusBar'
    import allComment from '../../components/allComment'
    import noticeComment from '../../components/noticeComment'
    import mixins from '../../common/mixins'

    export default {
        name: 'myMessage',
        mixins: [mixins],
        components: { StatusBar, allComment, noticeComment },
        data () {
            return {
                state: {
                    noticeActive: true
                },
                refreshing: false,
                isShowLoading: false,
                isShowData: false,
                page: 1,
                totalPage: 999,
                tags: [],
                refreshIcon: 'icon-todown',
                refreshText: '下拉刷新...',
                loadingText: '加载更多数据...',
                dataComment: [],
                newsArray: [],
                userInfo: {},
                nomalStyle: {
                    color: '#999',
                    'border-bottom-color': 'transparent',
                    'border-bottom-style': 'solid',
                    'border-bottom-width': 4
                },
                selectedStyle: {
                    color: 'red',
                    'border-bottom-color': '#e60012',
                    'border-bottom-style': 'solid',
                    'border-bottom-width': 4
                },
                notice: []
            }
        },
        beforeCreate () {
            this.$navigator.setNavigationInfo({
                title: '',
                navShow: false,
                statusBarStyle: 'Default'
            })
        },
        created () {
            this.$event.on('changeCase', status => {
                this.state.noticeActive = status
            })
        }
    }
</script>

<style lang="scss" scoped>
    .message {
        width: 750px;
        height: 2000px;
        background-color: #fff;
    }

    .message-header {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 750;
    }

    .back {
        width: 50;
        height: 50;
        position: absolute;
        top: 20;
        left: 20;
        font-family: iconfont;
        font-size: 48;
        font-weight: 600;
    }

    .message-title {
        width: 180;
        height: 80;
        line-height: 80;
        text-align: center;
        font-size: 36;
    }
</style>
