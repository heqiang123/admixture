<template>
    <div class="draw-box">
        <div class="draw" v-for="(items,index) in imgUrlArray" :key="index">
            <image class="draw-img" :src="getImageUrl(items.thumUrl)" @click="getBig(getImageUrl(items.thumUrl))"></image>
            <div class="draw-desc">
                <text class="draw-desc-label">设计说明</text>
                <text class="draw-desc-text">{{items.fileRemark}}</text>
            </div>
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
            async getImgUrls (id) {
                if (!id) return
                const result = await getImgUrls(id)
                this.imgUrlArray = result.data
            },
            getBig (url) {
                this.$emit('getBig', url)
            }
        },
        async created () {
            await this.getImgUrls(this.item[0].businessId)
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
        border-top-width: 1px;
        border-top-color: #DBD6D6;
        border-top-style: solid;
    }

    .draw-box {
        padding: 20;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
        border-bottom-style: solid;
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
        padding-bottom: 40px;
        padding-top: 30px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-bottom-width: 1px;
        border-bottom-color: #DBD6D6;
        border-bottom-style: solid;
    }

    .draw-img {
        /*flex-direction: cloumn;*/
        /*flex-wrap: wrap;*/
        width: 710;
        height: 500;
        object-fit: cover;
        overflow: hidden;
    }

    .draw-desc {
        width: 710px;
        margin-top: 10px;
        padding: 20px 32px;
        background-color: #f2f2f2;
        border-radius: 4px;
    }

    .draw-desc-label {
        flex-direction: row;
        font-size: 30;
        color: #444444;
        font-weight: bold;
    }

    .draw-desc-text {
        flex-direction: row;
        justify-content: flex-start;
        /*flex-wrap: wrap;*/
        /*width: 100px;*/
        font-size: 28;
        color: #555555;
        padding-top: 10;
    }
</style>
