<template>
    <loading class="bui-loading" @loading="onLoading" :display="display ? 'show' : 'hide'">
        <text class="bui-loading-indicator" v-if="display">{{loadingText}}</text>
        <loading-indicator class="bui-indicator"></loading-indicator>
    </loading>
</template>

<script>
    export default {
        props: {
            display: {
                type: Boolean
            },
            loadingText: {
                type: String
            }
        },
        name: 'downLoading',
        methods: {
            onLoading () {
                this.$emit('onLoading')
            }
        }
    }
</script>
<style lang="scss" scoped>
    .bui-loading {
        width: 750px;
        height: 150px;
        flex-direction: column;
        display: -ms-flex;
        display: -webkit-flex;
        display: flex;
        -ms-flex-align: center;
        -webkit-align-items: center;
        -webkit-box-align: center;
        align-items: center;
        justify-content: center;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .bui-loading-indicator {
        font-size: 30px;
        text-align: center;
        color: #9ea7b4;
    }

    .bui-indicator {
        height: 60px;
        width: 60px;
        color: #ff4e24;
    }

    .bgRed {
        background-color: #fa3300;
    }

</style>
