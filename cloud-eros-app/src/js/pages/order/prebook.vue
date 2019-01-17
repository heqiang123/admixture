<template>
    <div class="prebook">
        <status-bar></status-bar>
        <div class="prebook-header">
            <text class="prebook-back" @click="$router.back()">&#xe601;</text>
            <text class="prebook-title" :style="state.type !== 0 ? nomalStyle : selectedStyle" @click="checkPage(0,9)">约工地</text>
            <text class="prebook-title" :style="state.type !== 1 ? nomalStyle : selectedStyle" @click="state.type = 1">约门店</text>
            <text class="prebook-title" :style="state.type !== 2 ? nomalStyle : selectedStyle" @click="checkPage(2,11)">约量房</text>
            <text v-if="state.type === 1" class="prebook-search" @click="goTo('search.index',{type:'store'})">&#xe7d4;</text>
        </div>
        <store v-if="state.type === 1" :isShowBar="false" :homePhone="homePhone"></store>
        <fast-budget :resType="resType" v-if="state.type !== 1" :index="state.type"></fast-budget>
    </div>
</template>

<script>
    import Construction from '../construction/index'
    import Store from '../store/index'
    import FastBudget from './fastBudget'
    import StatusBar from '../../components/statusBar'
    import mixins from '../../common/mixins'

    export default {
        name: 'prebook',
        mixins: [mixins],
        components: {
            Construction,
            Store,
            FastBudget,
            StatusBar
        },
        data () {
            return {
                homePhone: null,
                state: {
                    type: 2,
                    resType: 11
                },
                nomalStyle: {
                    color: '#999',
                    'border-bottom-color': 'transparent',
                    'border-bottom-style': 'solid',
                    'border-bottom-width': 4
                },
                selectedStyle: {
                    color: 'red',
                    'border-bottom-color': '#e60012',
                    'border-bottom-style': 'solid',
                    'border-bottom-width': 4
                }
            }
        },
        methods: {
            checkPage (pageIndex, type) {
                this.state.type = pageIndex
                this.resType = type
            }
        },
        beforeCreate () {
            this.$navigator.setNavigationInfo({
                title: '',
                navShow: false,
                statusBarStyle: 'Default'
            })
        },
        async created () {
            const params = await this.$router.getParams()
            this.homePhone = params.homePhone
        }
    }
</script>

<style lang="scss" scoped>
    .prebook {
        width: 750px;
        background-color: #fff;
    }

    .prebook-back {
        position: absolute;
        top: 20;
        left: 20;
        font-family: iconfont;
        font-size: 48;
        font-weight: 600;
    }

    .prebook-header {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 750;
        height: 92;
        background-color: #fff;
    }

    .prebook-title {
        width: 150;
        height: 80;
        line-height: 80;
        text-align: center;
        font-size: 36;
    }

    .prebook-search {
        position: absolute;
        top: 20;
        right: 40;
        font-family: iconfont;
        font-size: 48;
    }
</style>
