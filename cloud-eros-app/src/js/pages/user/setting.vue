<template>
    <div>
        <div class="setting" :style="{height: pageHeight}">
            <div class="setting-header">
                <wxc-cell title="账号与安全"
                          @wxcCellClicked="goTo('setIndex.index')"
                          :has-margin="true">
                    <text class="icon" slot="value">&#xe60a;</text>
                </wxc-cell>
                <wxc-cell title="建议与反馈"
                          @wxcCellClicked="goTo('user.feedBack')"
                          :has-top-border="false">
                    <text class="icon" slot="value">&#xe60a;</text>
                </wxc-cell>
            </div>
            <div class="footer">
                <wxc-button text="退出当前账号"
                            type="white"
                            @wxcButtonClicked="signOut"
                            :btnStyle="{'background-color': '#fff', 'border-color': '#fff', width: 750, height: 100}"
                            :textStyle="{'font-size': 32, color: '#e60012'}"
                ></wxc-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { WxcCell, WxcButton } from 'weex-ui'
    import mixins from '../../common/mixins'

    export default {
        name: 'setting',
        mixins: [mixins],
        components: { WxcCell, WxcButton },
        methods: {
            async signOut () {
                const isFrist = await this.$storage.getSync('oneGet')
                await this.$storage.removeAll()
                this.$storage.setSync('oneGet', isFrist)
                this.goTo('index')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .setting {
        justify-content: space-between;
        width: 750;
        height: 2000;
        background-color: #fff;
    }

    .icon {
        font-family: iconfont;
        font-size: 42;
        color: #999;
        font-weight: 600;
    }
</style>
