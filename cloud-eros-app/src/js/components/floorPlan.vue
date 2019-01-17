<template>
    <div class="draw-box">
        <div class="draw-title">
            <!--<text class="icon-index">{{index}}</text>-->
            <!--<text class="title-name">一楼楼层平面图</text>-->
        </div>
        <div class="draw" v-for="(items,index) in imgUrlArray" :key="index">
            <image class="draw-img" :src="getImageUrl(items.thumUrl)"></image>
            <!--</div>-->
            <!--<div class="draw-desc">-->
            <text class="draw-desc-label">设计说明</text>
            <text class="draw-desc-text">{{items.fileRemark}}</text>
        </div>
    </div>
</template>

<script>
    import mixins from '../common/mixins'
    import { getImgUrls } from '../service/baseApi'

export default ({
        data () {
            return {
                imgUrlArray: []
            }
        },
        props: {
            item: {
                type: Object
            },
            index: {
                type: Number
            }
        },
        mixins: [mixins],
        methods: {
            async getImgUrl (id) {
                if (!id) return
                const result = await getImgUrls(id)
                this.imgUrlArray = result.data
            }
        },
        async created () {
            await this.getImgUrl(this.item[0].businessId)
        }

    })
</script>
<style lang="scss" scoped>
    .content {
        width: 750px;
        height: 300px;
        border-bottom-width: 1px;
        align-items: center;
        justify-content: center;
    }

    .line {
        width: 750;
        height: 20;
        border-width: 1px;
        border-style: solid;
        border-color: rgba(219, 214, 214, 0.5);
    }

    .item-box {
        background-color: #ffffff;
        border-top-width: 1;
        border-top-color: #DBD6D6;
        border-top-style: solid;
    }

    .draw-box {
        padding: 20;
    }

    .draw-title {
        flex-direction: row;
        align-items: center;
        align-content: center;
    }

    .icon-index {
        width: 40;
        height: 40;
        line-height: 40;
        font-size: 26;
        border-radius: 50%;
        background-color: #E60012;
        color: #ffffff;
        text-align: center;
    }

    .title-name {
        margin-left: 20;
        color: #333333;
        font-size: 28;
    }

    .draw {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20 0;
    }

    .draw-img {
        width: 562;
        height: 392;
        object-fit: cover;
        overflow: hidden;
    }

    .draw-desc {
        background-color: #f2f2f2;
        padding: 20 32;
    }

    .draw-desc-label {
        /*justify-content: flex-start;*/
        font-size: 30;
        color: #444444;
    }

    .draw-desc-text {
        font-size: 28;
        color: #555555;
        padding-top: 6;
    }
</style>
