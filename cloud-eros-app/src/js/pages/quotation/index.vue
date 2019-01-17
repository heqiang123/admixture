<template>
    <wxc-tab-page ref="wxc-tab-page" :tab-titles="tabTitles" :tab-styles="tabStyles" @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
        <div class="bg0" v-for="(detail,index) of details" :key="index">
            <list class="w1" :style="{height:pageHeight-80}" >
                <cell v-for="item of detail.list"  >
                    <div class="w1" style="height: 20px;background-color: #F5F5F5"></div>
                    <div class="fdr w1 aic pl30 bb bt" style="height: 100px" v-if="item.isPurchase=='是'">
                        <text class="f32" style="width: 160px">{{item.stuffName}}</text>
                        <text class="f36 c1" style="width: 474px">￥0.00</text>
                        <text class="f28 c1">自购</text>
                    </div>
                    <div class="fdr bg0 w1 aic jcb pl30 pr30 bb bt" style="height: 100px" v-else>
                        <text class="f32" style="width: 500px">{{item.stuffName}}</text>
                        <text class="f36 c1">￥{{item.money}}</text>
                    </div>
                    <div v-for="good in item.children" v-if="item.isPurchase=='否'">
                        <div class="fdr jcb bgc7">
                            <div class="fdr pl30 pt20 pb20">
                                <image class="wh140" :src="good.itemImage"></image>
                                <div class="pl20" style="width: 550px">
                                    <text class="f28">{{good.name}}</text>
                                    <text class="c9 f26 pt10">区域:{{good.floorName}}</text>
                                    <text class="c9 f26 pt10">规格:{{good.skuName}}</text>
                                </div>
                            </div>
                        </div>
                        <div class="bg0 fdr jcb aic pr30" style="height: 68px">
                            <text></text>
                            <text class="f28">共{{good.amount}}件商品 金额：¥ {{good.totalPrice}}</text>
                        </div>
                    </div>
                </cell>
            </list>
        </div>
    </wxc-tab-page>
</template>

<script>
    import mixins from '../../common/mixins'
    import { WxcTabPage } from 'weex-ui'
    import { getGoodDetailInfo, itemcat } from '../../service/homeApi'

    export default {
        components: { WxcTabPage },
        mixins: [mixins],
        data () {
            return {
                tabTitles: [],
                tabStyles: {
                    bgColor: '#FFFFFF',
                    titleColor: '#666666',
                    activeTitleColor: '#E60012',
                    isActiveTitleBold: true,
                    width: 150,
                    height: 80,
                    fontSize: 28,
                    hasActiveBottom: true,
                    activeBottomColor: '#E60012',
                    activeBottomHeight: 4,
                    activeBottomWidth: 112,
                    textPaddingLeft: 10,
                    textPaddingRight: 10
                },
                details: [],
                flags: [],
                offerId: '',
                index: 0
            }
        },
        methods: {
            async getInfo (index) {
                const result = await getGoodDetailInfo(this.offerId, this.details[index].type)
                this.$set(this.details[index], 'list', result)
                this.$set(this.flags, index, true)
                this.index = index
            },
            wxcTabPageCurrentTabSelected ({ page }) {
                if (!this.flags[page]) {
                    this.getInfo(page)
                }
            }
        },
        created () {
            this.$router.getParams(async ({ id }) => {
                this.offerId = id
                const mList = await itemcat()
                this.tabStyles.width = (750 - mList.length * 35) / (mList.length)
                for (const mat of mList) {
                    this.details.push({ type: mat.id, name: mat.name, list: [] })
                    this.tabTitles.push({ title: mat.name })
                    this.flags.push(false)
                }
                this.getInfo(0)
            })
        }
    }
</script>

<style src="../../../assets/css/basebase.css"></style>

<style lang="scss" scoped>
    @import "../../../assets/css/base";

    .wh140 {
        width: 140px;
        height: 140px;
    }

    .pt10 {
        padding-top: 10px;
    }

    .pl20 {
        padding-left: 20px;
    }

    .pr30 {
        padding-right: 30px;
    }

    .bgc7{
        background-color: #F7F7F7;
    }
</style>
