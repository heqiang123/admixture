<template>
    <div>
        <status-bar></status-bar>
        <div class="allorder">
            <image class="allorder-back" src="bmlocal://assets/images/sliceBack@2x.png" @click="$router.back()"></image>
            <text class="allorder-font">全部订单</text>
        </div>
        <wxc-tab-page ref="wxc-tab-page"
                      :tab-titles="tabTitles"
                      :tab-styles="tabStyles"
                      title-type="icon"
                      :tab-page-height="tabPageHeight"
                      @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
            <list :style="{height:`${pageHeight-120}px`}" class="alllorder-content">
                <cell></cell>
            </list>
        </wxc-tab-page>
    </div>
</template>

<script>
    import mixins from '../../common/mixins'
    import StatusBar from '../../components/statusBar'
    import { WxcTabPage } from 'weex-ui'
    export default {
        name: 'allorder',
        components: { StatusBar, WxcTabPage, mixins },
        data () {
            return {
                tabTitles: [
                    {
                        title: '报价中'
                    },
                    {
                        title: '已下单'
                    },
                    {
                        title: '已退货'
                    }
                ],
                tabStyles: {
                    bgColor: '#FFFFFF',
                    titleColor: '#666666',
                    activeTitleColor: '#E60012',
                    activeBgColor: '#FFFFFF',
                    isActiveTitleBold: true,
                    iconWidth: 70,
                    width: 250,
                    height: 80,
                    fontSize: 36,
                    hasActiveBottom: true,
                    activeBottomColor: '#E60012',
                    activeBottomHeight: 6,
                    activeBottomWidth: 120,
                    textPaddingTop: 20,
                    textPaddingBottom: 20
                }
            }
        }
    }
</script>

<style scoped>
    .allorder {
        width: 750px;
        height: 90px;
        background-color: #FFFFFF;
        align-items: center;
        justify-content: center;
        flex-direction: row;
    }

    .allorder-back {
        height: 60px;
        width: 60px;
        position: absolute;
        top: 14px;
        left: 20px
    }

    .allorder-font {
        font-size: 36px;
    }

    .alllorder-content {
        background-color: #FFFFFF;
        margin-top: 10px;
    }
</style>
