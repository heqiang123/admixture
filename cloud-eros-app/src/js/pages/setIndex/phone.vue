<template>
    <div class="container">
        <div class="demo">
            <wxc-cell label="手机号" title="" :has-arrow="true" @wxcCellClicked="wxcCellClicked" :has-top-border="false">
                <text>156897323782</text>
            </wxc-cell>
        </div>
        <div class="bottom">
            <text class="changePhone" @click="goTo('setIndex.changePhone')">更改手机号</text>
        </div>
    </div>
</template>

<script>
    import mixins from '../../common/mixins'
    import { WxcCell } from 'weex-ui'

    export default {
        components: { WxcCell },
        mixins: [mixins],
        methods: {
            wxcCellClicked (e) {
                console.log(e)
            }
        },
        mounted () {
            this.$navigator.setLeftItem({
                text: '安全设置',
                fontSize: '20',
                width: '400px'
            }, () => {
                this.goBack()
            })
        }
    }
</script>
<style lang="scss">
    .demo {
        margin-top: 10px;
    }

    .bottom {
        width: 750px;
        position: fixed;
        bottom: 0;
        height: 90px;
        background-color: #ffffff;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .changePhone {
        text-align: center;
        color: #ff0000;
    }
</style>
