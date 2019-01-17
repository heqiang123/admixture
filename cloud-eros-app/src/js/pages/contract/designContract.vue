<template>
    <div>
        <scroller :style="{height:`${pageHeight}px`}">
            <div class="center"  v-for="(items,index) of contractBusId" :key="index">
                <image :style="{height:`${pageHeight}px`}" class="img" :src="items.ossUrl"></image>
            </div>
        </scroller>
    </div>
</template>

<script>
    import mixins from '../../common/mixins'
    // import { getImgUrls } from '../../service/baseApi'

    export default {
        mixins: [mixins],
        data () {
            return {
                // 我的合同跳过来的businessId
                contractBusId: [],
                imgUrlArray: [],
                urls: []
            }
        },
        methods: {

        },
        async created () {
            const params = await this.$router.getParams()
            this.contractBusId = params.id
        }
    }
</script>

<style lang="scss" scoped>
    .center{
        width: 750px;
    }
    .img {
        width: 750px;
    }
</style>


