<template>
    <div class="container">
        <wxc-cell label="账号ID" title="" :has-arrow="true" @wxcCellClicked="wxcCellClicked" :has-top-border="false">
            <text>1354945277</text>
        </wxc-cell>
        <wxc-cell label="更改密码" title="" :has-arrow="true" @wxcCellClicked="wxcCellClicked" :has-top-border="false">
            <text>已设置</text>
        </wxc-cell>
        <wxc-cell label="安全设置" title="" :has-arrow="true" @wxcCellClicked="wxcCellClicked" :has-top-border="false">
            <text @click="goTo('setIndex.index')">微信28399848</text>
        </wxc-cell>
    </div>
</template>

<script>
    // var navigator = weex.requireModule('navigator')
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
                text: '设置',
                fontSize: '30',
                width: '600'
            })
        }
    }
</script>
<style lang="scss">
    .container {
        margin-top: 20px;
    }

</style>
