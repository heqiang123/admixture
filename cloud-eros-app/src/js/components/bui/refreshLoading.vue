<template>
    <refresh class="bui-refresh" @refresh="onRefresh" @pullingdown="onPullingdown($event)"
             :display="display ? 'show' : 'hide'">
        <bui-icon :name="refreshIcon" size="40px" style="margin-right: 5px;"></bui-icon>
        <text class="bui-refresh-indicator">{{refreshText}}</text>
    </refresh>
</template>

<script>
    export default {
        name: 'refreshLoading',
        props: {
            display: {
                type: Boolean
            },
            refreshText: {
                type: String
            },
            refreshIcon: {
                type: String
            }
        },
        methods: {
            onPullingdown (e) {
                this.$emit('onPullingdown', e)
            },
            onRefresh () {
                this.$emit('onRefresh')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bui-refresh {
        //position: absolute;
        //left: 0px;
        //right: 0px;
        //height: 100px;
        justify-content: center;
        flex-direction: row;
        width: 750px;
        height: 100px;
        display: -ms-flex;
        display: -webkit-flex;
        display: flex;
        -ms-flex-align: center;
        -webkit-align-items: center;
        -webkit-box-align: center;
        align-items: center;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .bui-refresh-indicator {
        font-size: 30px;
        text-align: center;
        color: #9ea7b4;
    }
</style>
