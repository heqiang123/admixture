<template>
    <div class="imgDiv">
        <div class="draw" v-for="(itemImg,index) in imgUrlArray" :key="index" v-if="index<6 && state.show">
            <div class="geshi">
                <image class="tags-image" resize="cover" :src="itemImg" @click="getBig(index)"></image>
            </div>
        </div>
        <div class="drawClick" v-for="(itemImg,index) in imgUrlArray" :key="index" v-if="index > 5 && state.show" @click="expand">
            <image class="drawPicture" src="bmlocal://assets/images/Group@2x.png"></image>
            <div class="textHeight">
                <text class="textColor">{{imgUrlArray.length}}</text>
            </div>
        </div>
        <div class="draw" v-for="(itemImg,index) in imgUrlArray" :key="index" v-if="!state.show">
            <div class="geshi">
                <image class="tags-image" resize="cover" :src="itemImg" @click="getBig(index)"></image>
            </div>
        </div>
    </div>
</template>
<script>
    import mixins from '../common/mixins'
    import { getImgUrls } from '../service/baseApi'

export default {
        data () {
            return {
                imgUrlArray: [],
                state: {
                    show: true
                }
            }
        },
        mixins: [mixins],
        props: {
            items: {
                type: Object
            },
            itemsBusiness: {
                type: Object
            }
        },
        methods: {
            async getImgsUrl (id) {
                if (!id) return
                const result = await getImgUrls(id)
                if (result.data && result.data.length) {
                    for (const item of result.data) {
                        this.imgUrlArray.push(item.ossUrl)
                    }
                }
            },
            getBig (index) {
                this.$image.preview({
                    index: index,
                    images: this.imgUrlArray
                })
            },
            expand () {
                this.state.show = false
            }
        },
        async mounted () {
            await this.getImgsUrl(this.items)
        }
    }
</script>
<style lang="scss" scoped>
    .draw {
        margin-right: 20px;
    }

    .drawClick {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 410px;
        top:300px;
        width: 100px;
        background-color: #000000;
        opacity: 0.8;
        border-radius: 15px;
    }

    .textHeight {
        margin-left:6px;
    }

    .textColor {
        color: #FFFFFF;
    }

    .drawPicture {
        height: 28px;
        width: 28px;
    }

    .imgDiv {
        flex-direction: row;
        flex-wrap: wrap;
        width: 600px;
    }

    .tags-image {
        width: 160px;
        height: 160px;
        margin-top: 20px;
    }

    .draw-desc-label {
        align-items: flex-start;
        font-size: 30px;
        color: #444444;
    }

    .geshi {
        flex-direction: row;
        position: relative;
    }
</style>
