<template>
    <div class="fdc jcs main w1">
        <text class="content c4">{{content}}</text>
        <div class="mt20 mb20 fdr aic" v-if="tags && tags.length">
            <text class="c9 f26">标签：</text>
            <text class="tag f24" v-for="(item, index) in tags" :key="index">{{item.name}}</text>
        </div>
        <div class="hd-image w1 fdr">
            <image :class="[type === 1 ? 'image-4' : type === 2 ? 'image-9': 'image-1']"  v-for="(item, index) of commentPics" :key="index" resize="cover" :src="item" @click="showBigPic(item)"></image>
        </div>
    </div>
</template>

<script>
    import { WxcRichText, WxcTag } from 'weex-ui'
    import mixins from '../../common/mixins'

export default {
        components: { WxcRichText, WxcTag },
        mixins: [mixins],
        data () {
            return {
                commentPics: []
            }
        },
        computed: {
            type: function () {
                const len = this.commentPics.length || 0
                if (len > 4) {
                    return 2
                } else if (len > 1) {
                    return 1
                }
                return 0
            }
        },
        props: {
            content: {
                type: String
            },
            images: {
                type: String
            },
            tags: {
                type: Array
            }
        },
        methods: {
            async getPics () {
                if (this.images) {
                    this.commentPics = await this.getImageUrls(this.images)
                }
            }
        },
        mounted () {
            this.getPics()
        }
    }
</script>

<style src="../../../assets/css/basebase.css"></style>

<style scoped lang="scss">
    .main {
        margin-top: 20px;
        margin-bottom: 28px;
    }

    .content {
        padding-right: 30px;
        font-size: 32px;
        line-height: 40px;
    }

    .hd-image {
        flex-wrap: wrap;
        margin-bottom: 10px;
    }

    .image-1 {
        border-radius: 4px;
        height: 690px;
        width: 690px;
        margin-top: 20px;
    }

    .image-4 {
        border-radius: 4px;
        height: 256px;
        width: 256px;
        margin-top: 20px;
        margin-right: 20px;
    }

    .image-9 {
        border-radius: 4px;
        height: 216px;
        width: 216px;
        margin-top: 20px;
        margin-right: 20px;
    }

    .tag {
        color: #bbbbbb;
        border-color: #bbbbbb;
        border-style: solid;
        border-width: 1px;
        margin-left: 12px;
        padding-left: 6px;
        padding-right: 6px;
        height: 34px;
        line-height: 34px;
    }

</style>

