<template>
    <div>
        <list :style="{height:`${pageHeight-50}`}">
            <cell v-for="(refulItem, index) in refullDetailList" :key="index">
                <refund-item :item="redefundItem" :items="refulItem"></refund-item>
            </cell>
            <cell class="list-none" :style="{height:`${pageHeight-50}`}" v-if="state.isEmpty">
                <text>暂无数据</text>
            </cell>
        </list>
    </div>
</template>

<script>
    import refundItem from '../../components/refundItem'
    import { getRefullDetail } from '../../service/meatirChangeApi'
    import mixins from '../../common/mixins'

    export default {
        data () {
            return {
                // 页面传过来的退货单内容
                redefundItem: '',
                refullDetailList: [],
                state: {
                    isEmpty: false
                }
            }
        },
        components: { refundItem },
        mixins: [mixins],
        methods: {
            async getRefullDetail (id) {
                const result = await getRefullDetail(id)
                if (result.length) {
                    this.refullDetailList = result
                } else {
                    this.state.isEmpty = true
                }
            }
        },
        async created () {
            const params = await this.$router.getParams()
            this.redefundItem = params.items
            await this.getRefullDetail(this.redefundItem.id)
        }
    }
</script>

<style scoped>
    .list-none {
        align-items: center;
        justify-content: center;
        width: 750px;
    }
</style>
