<template>
    <div class="wxc-demo">
        <scroller class="scroller">
            <wxc-simple-flow :list="testData"></wxc-simple-flow>
        </scroller>
    </div>
</template>
<script>
    import { WxcSimpleFlow } from 'weex-ui'

    export default {
        data () {
            return {
                themeColor1: {
                    lineColor: '#bf280b',
                    pointInnerColor: '#b95048',
                    pointBorderColor: '#bf280b',
                    highlightTitleColor: '#bf280b',
                    highlightPointInnerColor: '#bf280b',
                    highlightPointBorderColor: '#d46262'
                },
                testData: [
                    {
                        'date': '2017-05-24 21:10:29',
                        'desc': '',
                        'highlight': true,
                        'title': '方案已确认'
                    },
                    {
                        'date': '2017-05-24 19:54:28',
                        'desc': '',
                        'title': '方案已更新'
                    },
                    {
                        'date': '2017-05-24 19:50:21',
                        'desc': '您以确定了方案',
                        'title': '方案已上传'
                    },
                    {
                        'date': '2017-05-24 19:49:03',
                        'desc': '商家会在2个工作小时内电话或旺旺联系您',
                        'title': '商家已接单'
                    }
                ]
            }
        },
        components: { WxcSimpleFlow },
        created () {

        }

    }
</script>
<style lang="scss" scoped>
    .wxc-demo {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #ffffff;
    }

    .scroller {
        flex: 1;
    }

    .title {
        padding-top: 20px;
        padding-bottom: 20px;
        text-align: center;
        font-size: 26px;
        color: #333333;
        background-color: #eeeeee;
        font-weight: bold;
    }
</style>
