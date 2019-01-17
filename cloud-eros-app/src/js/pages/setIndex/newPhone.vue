<template>
    <div class="changePhone">
        <wxc-cell title="原手机号" :has-arrow="false" @wxcCellClicked="wxcCellClicked" :has-top-border="true">
            <text>15324875719</text>
        </wxc-cell>
        <div class="inputement">
            <input type="text" placeholder="输入验证码" class="input">
            <text class="text-btn btn-red" v-if="showCode" @click="getCode">{{getCodeText}}</text>
            <div class="poa codebtn fdr aic" v-else>
                <wxc-countdown
                        :timeBoxStyle="{ height: '60px',backgroundColor:'transparent'}"
                        :timeTextStyle="{fontSize: '24px', color: '#E60012'}"
                        :dotTextStyle="{color: '#E60012', fontSize: '26px'}"
                        :dotBoxStyle="{width: '0px'}"
                        tpl="{s}" :time="TIME"
                        @wxcOnComplete="onComplete"></wxc-countdown>
                <text class="f28 c1">秒重发</text>
            </div>
        </div>
        <div class="btn">
            <wxc-button text="确定"
                        @wxcButtonClicked="wxcButtonClicked"></wxc-button>
        </div>
    </div>
</template>
<script>
    import mixins from '../../common/mixins'
    import { WxcCell, WxcButton, WxcCountdown } from 'weex-ui'

    export default ({
        components: { WxcCell, WxcButton, WxcCountdown },
        mixins: [mixins],
        data () {
            return {
                showCode: true,
                TIME: new Date().getTime() + 60000 + '',
                getCodeText: '获取验证码'
            }
        },
        methods: {
            getCode () {
                this.showCode = false
            },
            onComplete (e) {
                this.showCode = true
                this.getCodeText = '重新获取验证码'
                this.TIME = new Date().getTime() + 61000 + ''
            },
            wxcButtonClicked (e) {
                console.log(e)
            }
        }

    })
</script>
<style>
    .inputement {
        border-top-style: solid;
        border-top-width: 1px;
        border-top-color: rgba(219, 214, 214, 0.5);
        background-color: #ffffff;
        height: 100px;
        width: 750px;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    .input {
        width: 450px;
    }

    .text-btn {
        padding: 10 24;
        font-size: 26;
        color: #353535;
        border-radius: 4;
        border-width: 1px;
        border-style: solid;
        border-color: #353535;
        margin-left: 20;
    }

    .btn-red {
        color: #E60012;
        border-width: 1px;
        border-style: solid;
        border-color: #E60012;
    }

    .btn {
        text-align: center;
        margin-top: 30px;
        flex-direction: row;
        justify-content: center;
    }

    .codebtn {
        padding-left: 10px;
        padding-right: 10px;
        height: 52px;
        line-height: 52px;
        border-style: solid;
        border-color: #E60012;
        border-width: 1px;
        flex-direction: row;
        justify-content: center;
        /*right: 0px;*/
        border-radius: 8px;
        align-items: center;
        /*top: 30px;*/
    }

    .f28 {
        font-size: 28px;
    }

    .c1 {
        color: #E60012;
    }
</style>

