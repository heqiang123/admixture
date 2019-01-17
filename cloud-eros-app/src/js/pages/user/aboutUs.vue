<template>
    <div>
        <div class="setting">
            <div class="header">
                <image class="logo" src="bmlocal://assets/images/logo-title@3x.ed5d3a0.png"></image>
                <text class="title">Atjia</text>
                <text class="version">V1.0.2版本</text>
            </div>
            <div class="main">
                <wxc-cell title="官方微信">
                    <text class="text" slot="value">星杰云家居</text>
                </wxc-cell>
                <wxc-cell title="官方网站">
                    <text class="text" slot="value">www.atjia.com</text>
                </wxc-cell>
                <wxc-cell title="官方电话">
                    <text class="text" slot="value">400-680-2550</text>
                </wxc-cell>
                <wxc-cell title="公司简介" @wxcCellClicked="state.isShow = true">
                    <text class="icon" slot="value">&#xe60a;</text>
                </wxc-cell>
            </div>
            <text class="footer">Copyright@2017-2018 星杰云家居科技(上海)有限公司保留所有权利</text>
        </div>
        <wxc-mask height="400" width="600" border-radius="20" duration="200" mask-bg-color="#FFFFFF" :show-close="true" :show="state.isShow" @wxcMaskSetHidden="state.isShow = false">
            <text class="abstract" :style="{marginTop:30}">星杰云家居科技（上海）有限公司以家装产业链为主线，公装，软装产业链为两翼融合发展，致力于构建起中国具有核心价值的装饰品牌，迄今已为上万个客户提供专业解决方案。</text>
            <text class="abstract">总部电话：021-50333012</text>
        </wxc-mask>
    </div>
</template>

<script>
    import { WxcCell, WxcMask } from 'weex-ui'

    export default {
        name: 'aboutUs',
        components: { WxcCell, WxcMask },
        data () {
            return {
                state: {
                    isShow: false
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .setting {
        width: 750;
        height: 2000;
        background-color: #fff;
    }

    .header {
        width: 750;
        height: 600;
        justify-content: center;
        align-items: center;
    }

    .logo {
        width: 140;
        height: 140;
        border-radius: 20;
    }

    .title {
        margin-top: 10px;
        color: #353535;
        font-size: 32;
        font-weight: 700;
    }

    .version {
        margin-top: 20;
        font-size: 30;
        color: #bbb;
    }

    .text {
        color: #999;
        font-size: 28;
    }

    .icon {
        font-family: iconfont;
        font-size: 42;
        color: #999;
        font-weight: 600;
    }

    .footer {
        padding: 50;
        text-align: center;
        color: #ddd;
        font-size: 24;
        line-height: 40;
    }

    .abstract {
        margin-top: 10;
        padding: 0 24;
        font-size: 32;
        color: #555;
        line-height: 48;
    }
</style>
