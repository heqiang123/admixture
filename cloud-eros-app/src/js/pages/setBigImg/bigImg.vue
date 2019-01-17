<template>
    <!--<div class="boxImg" :style="{height:pageHeight}">-->
    <!--<div class="btn" @click="openLightBox">-->
    <!--<text class="btn-txt">点击按钮弹出全屏图片</text>-->
    <!--</div>-->
    <wxc-lightbox
            ref="wxc-lightbox"
            height="800"
            width="750"
            :show="showImg"
            show-indicator="false"
            indicator-color="{'item-color': 'rgba(255, 195, 0, .5)','item-selected-color': 'red','item-size': '20px'}"
            :image-list="imageList"
            @wxcLightboxOverlayClicked="wxcLightboxOverlayClicked">
    </wxc-lightbox>
    <!--</div>-->
</template>
<script>
    import { WxcLightbox } from 'weex-ui'

    export default ({
        data () {
            return {
                imageList: [],
                showImg: false,
                urls: [],
                pageHeight: 0
            }
        },
        component: { WxcLightbox },
        methods: {
            openLightBox () {
                this.showImg = true
            }
        },
        async created () {
            const params = await this.$router.getParams()
            this.urls = params.imgs
            const bigImgs = []
            const bigUrls = JSON.parse(JSON.stringify(this.urls))
            for (const i in bigUrls) {
                bigUrls[i].imageUrl += '&level=1'
                bigImgs.push({ src: bigUrls[i].imageUrl })
            }
            this.imageList = bigImgs
            this.showImg = true
        }
    })

</script>
<style lang="scss" scoped>
    .boxImg {
        width: 750;
        margin-top: 40px;
        background-color: #3B3F44;
        position: absolute;
    }
</style>
