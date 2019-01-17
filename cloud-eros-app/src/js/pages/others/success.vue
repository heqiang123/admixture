<template>
    <div>
        <status-bar></status-bar>
        <div class="container" :style="{ height: `${boxheight}px`}">
            <div class="icon-state">
                <text class="icon-success">&#xe617;</text>
            </div>
            <div class="title">
                <text class="title-text">{{centerTip}}</text>
            </div>
            <div class="content">
                <text class="content-text">{{finishTip}}</text>
            </div>
            <div class="backbtn">
                <text class="backbtn-text" @click="goTo('index')">返回</text>
            </div>
        </div>
    </div>
</template>

<script>
    import StatusBar from '../../components/statusBar'
    import mixins from '../../common/mixins'
    export default {
        name: 'success',
        components: { StatusBar },
        mixins: [mixins],
        data () {
            return {
                finishTip: '',
                titleStr: '',
                centerTip: ''
            }
        },
        computed: {
            boxheight () {
                const hh = this.$getConfig().eros.deviceHeight - this.$getConfig().eros.navBarHeight
                return hh
            }
        },
        methods: {
            test () {
                this.$event.emit('refresh', { id: 6666 })
            }
        },
        async created () {
            const result = await this.$router.getParams()
            if (result && result.type === 0) {
                this.finishTip = '您的装修报价会在24小时内给到您请保持手机畅通'
                this.titleStr = '智能报价申请情况'
                this.centerTip = '提交成功'
            }
            if (result && result.type === 1) {
                this.finishTip = '客服会在24小时内联系您请保持手机畅通'
                this.titleStr = '预约成功'
                this.centerTip = '预约提交成功'
            }
        }
    }
</script>

<style scoped>
    .container {
        width: 750px;
        background-color: #ffffff;
    }

    .icon-state {
        margin-top: 160px;
        width: 750px;
        height: 160px;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: center;
    }

    .icon-success {
        font-family: iconfont2;
        font-size: 144px;
        color: #E60012;
    }

    .title {
        width: 750px;
        height: 90px;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: center;
    }

    .title-text {
        font-size: 36px;
        color: #555555;
        font-weight: 700;
    }

    .content {
        width: 750px;
        height: 60px;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: center;
    }

    .content-text {
        font-size: 28px;
        color: #999999;
    }

    .backbtn {
        width: 750px;
        height: 120px;
        margin-top: 30px;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: center;
    }

    .backbtn-text {
        width: 660px;
        height: 90px;
        line-height: 90px;
        border-radius: 8px;
        background-color: #E60012;
        font-size: 32px;
        color: #ffffff;
        text-align: center;
    }
</style>
