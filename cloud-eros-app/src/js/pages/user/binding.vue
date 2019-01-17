<template>
    <div>
        <div class="binding" :style="contentStyle">
            <wxc-cell title="微信"
                      :has-margin="true" @wxcCellClicked="bindInfo(1)">
                <div class="vlue-wrapper" slot="value">
                    <text class="text">未绑定</text>
                    <text class="icon" slot="value">&#xe60a;</text>
                </div>
            </wxc-cell>
            <wxc-cell title="QQ "
                      :has-margin="true" @wxcCellClicked="bindInfo(0)">
                <div class="vlue-wrapper" slot="value">
                    <text class="text">未绑定</text>
                    <text class="icon" slot="value">&#xe60a;</text>
                </div>
            </wxc-cell>
            <wxc-cell title="微博"
                      :has-margin="true" @wxcCellClicked="bindInfo(2)">
                <div class="vlue-wrapper" slot="value">
                    <text class="text">未绑定</text>
                    <text class="icon" slot="value">&#xe60a;</text>
                </div>
            </wxc-cell>
        </div>
    </div>
</template>

<script>
    import { WxcCell } from 'weex-ui'

    export default {
        name: 'binding',
        components: { WxcCell },
        methods: {
            bind (index) {
                if (index === 0) {
                    // QQ登录
                    window.location.href = 'xe://thirdlogin?type=qq'
                    return
                }
                if (index === 1) {
                    // 微信登录
                    window.location.href = 'xe://thirdlogin?type=wechat'
                    return
                }
                if (index === 2) {
                    // 微博登录
                    window.location.href = 'xe://thirdlogin?type=weibo'
                    return
                }
            },
            bindInfo (index) {
                this.bind(index)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .binding {
        width: 750;
        height: 2000;
        background-color: #fff;
    }

    .vlue-wrapper {
        flex-direction: row;
        align-items: center;
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
</style>
