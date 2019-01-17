<template>
    <div>
        <status-bar></status-bar>

        <div class="moduel" @click="goTo('atjia.index')">
            <text>我的家首页</text>
        </div>
        <div class="moduel" @click="goTo('quotation.list')">
            <text>基装合同</text>
        </div>
        <div class="moduel" @click="goTo('others.report')">
            <text>验收报告</text>
        </div>
        <div class="moduel" @click="goTo('others.draw')">
            <text>设计图纸</text>
        </div>
        <div class="model" @click="goTo('setIndex.index')">
            <text>安全设置</text>
        </div>
        <div class="model" @click="goTo('quotation.list')">
            <text>报价单列表</text>
        </div>
        <div class="model" @click="goTo('project.modification')">
            <text>项目变更</text>
        </div>
        <div class="model" @click="goTo('dataLi.index')">
            <text>日历测试</text>
        </div>
        <div class="model" @click="goTo('personInfo.index')">
            <text>个人信息</text>
        </div>
        <div class="model" @click="goTo('personInfo.index')">
            <text>个人基本信息</text>
        </div>
        <div class="model" @click="goTo('personalInfor.index')">
            <text>个人信息我的家</text>
        </div>
        <!--<div class="model" @click="goTo('designer.index')">-->
        <!--<text>设计师</text>-->
        <!--</div>-->
        <wxc-cell title="项目经理" @wxcCellClicked="state.isShow = true"
        >
        </wxc-cell>
        <wxc-mask height="400"
                  width="600"
                  border-radius="20"
                  duration="200"
                  mask-bg-color="#FFFFFF"
                  :show-close="true"
                  :show="state.isShow"
                  @wxcMaskSetHidden="state.isShow = false">
            <text class="abstract">星杰云家居科技（上海）有限公司以家装产业链为主线，公装，软装产业链为两翼融合发展，致力于构建起中国具有核心价值的装饰品牌，迄今已为上万个客户提供专业解决方案。总部电话：021-50333012</text>
        </wxc-mask>
    </div>
</template>

<script>
    import { WxcMinibar, WxcMask, WxcCell } from 'weex-ui'
    import StatusBar from '../../components/statusBar'
    import mixins from '../../common/mixins'

    export default {
        name: 'test',
        mixins: [mixins],
        components: { WxcMinibar, StatusBar, WxcMask, WxcCell },
        data () {
            return {
                state: {
                    isShow: false
                }
            }
        }
    }
</script>

<style scoped>

</style>
