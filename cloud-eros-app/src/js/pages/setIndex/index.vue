<template>
<div>
    <status-bar></status-bar>
    <wxc-minibar :show="isShowBar" background-color="#fff" @wxcMinibarLeftButtonClicked="minibarLeftButtonClick" @wxcMinibarRightButtonClicked="minibarRightButtonClick">
        <!--<span slot="left" style="width: 300px;align-items: center;flex-direction: row;"><text> < </text><text  style="font-size:24px" class="title">账号与安全</text></span>-->
        <text slot="middle" class="title">安全设置</text>
    </wxc-minibar>
    <div class="container">
        <div class="demo">
            <wxc-cell label="微信" title="" :has-arrow="true" @wxcCellClicked="wxcCellClicked" :has-top-border="false">
                <text>{{this.WxId}}</text>
            </wxc-cell>
            <wxc-cell label="QQ" title="" :has-arrow="true" @wxcCellClicked="wxcCellClicked" :has-top-border="false">
                <text>未绑定</text>
            </wxc-cell>
            <wxc-cell label="微博" title="" :has-arrow="true" @wxcCellClicked="wxcCellClicked" :has-top-border="false">
                <text>未绑定</text>
            </wxc-cell>
            <wxc-cell label="手机号" title="" :has-arrow="true" @wxcCellClicked="wxcCellClicked" :has-top-border="false">
                <text @click="goTo('phone')">{{this.userInfo.mobilePhone}}</text>
            </wxc-cell>
        </div>
    </div>
</div>
</template>

<script>
    import StatusBar from '../../components/statusBar'
    import { WxcMinibar } from 'weex-ui'
    import mixins from '../../common/mixins'
    import { WxcCell } from 'weex-ui'
    import { getUserWxPhone } from '../../service/userApi'

    export default {
        components: { WxcCell, WxcMinibar, StatusBar },
        mixins: [mixins],
        data () {
            return {
                WxId: ''
            }
        },
        methods: {
            wxcCellClicked (e) {
                console.log(e)
            }
        },
        async mounted () {
            this.userInfo = await getUserWxPhone()
            if (this.userInfo) {
                if (!this.userInfo.weixinNickname) {
                    this.WxId = '未绑定'
                } else {
                    this.WxId = this.userInfo.weixinNickname
                }
            }
            // this.$navigator.setLeftItem({
            //     text: '账号与安全',
            //     fontSize: '30',
            //     width: '600'
            // }, () => {
            //     this.goBack()
            // })
        }
    }
</script>
<style lang="scss">
    .demo {
        margin-top: 10px;
    }
</style>
