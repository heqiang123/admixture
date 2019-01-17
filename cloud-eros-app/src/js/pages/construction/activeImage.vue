<template>
    <div>
        <waterfall class="waterfall" :column-count="2" :column-gap="0">
            <cell class="l" v-for="(item, index) in imgList" :key="index">
                <image class="active-image" resize="cover" :src="item"></image>
            </cell>
        </waterfall>
    </div>
</template>

<script>
    export default {
        name: 'activeImage',
        data () {
            return {
                // 传过来的图片
                imgList: [],
                isCase: true
            }
        },
        async created () {
            const params = await this.$router.getParams()
            this.imgList = params.imgPathArrs
        }
    }
</script>

<style lang="scss" scoped>
    .waterfall {
        width: 750;
        height: 2000;
        background-color: #fff;
    }

    .active-image {
        width: 370;
        height: 370;
        margin-top: 4;
    }
</style>
