<template>
    <div class="code">
        <web class="webView" :src="`bmlocal://assets/web/qrcode.html?esatename=${esatename}&address=${address}&code=${code}`" :style="{height:webViewHieght}"></web>
    </div>
</template>
<script>
    import mixins from '../../common/mixins'

    export default ({
        data () {
            return {
                esatename: '绿地世界城',
                address: '上海市奉贤区海马路5888弄88号东街名庭别墅小区23栋A座',
                code: 'S201805180001'
            }
        },
        computed: {
            webViewHieght () {
                const { deviceWidth, deviceHeight } = weex.config.eros
                return deviceHeight * 750 / deviceWidth
            }
        },
        mixins: [mixins]
    })
</script>
<style>
    .img {
        height: 1454;
        width: 750px;
    }

    .status-bar {
        height: 36;
        background-color: #fff;
    }
</style>
