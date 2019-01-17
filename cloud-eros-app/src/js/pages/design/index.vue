<template>
    <div>
        <status-bar></status-bar>
        <div class="design">
            <div class="design-header">
                <text class="design-title" :style="!state.caseActive ? nomalStyle : selectedStyle" @click="changeCase">案例</text>
                <text class="design-title" :style="state.caseActive ? nomalStyle : selectedStyle" @click="changeDesigner">设计师</text>
                <text class="design-search" @click="goTo('search.index',{ type: 'case'})" v-if="index === 1">&#xe7d4;</text>
                <text class="design-search" @click="goTo('search.index',{ type: 'designer'})" v-else>&#xe7d4;</text>
            </div>
            <case v-if="state.caseActive" isTabBar="true"></case>
            <designer isTabBar="true" v-else></designer>
        </div>
    </div>
</template>

<script>
    import Designer from './designer'
    import Case from './case'
    import StatusBar from '../../components/statusBar'
    import mixins from '../../common/mixins'

    export default {
        name: 'design',
        mixins: [mixins],
        components: { Designer, Case, StatusBar },
        data () {
            return {
                index: 1,
                state: {
                    caseActive: true
                },
                nomalStyle: {
                    color: '#999',
                    'border-bottom-color': 'transparent',
                    'border-bottom-style': 'solid',
                    'border-bottom-width': 4
                },
                selectedStyle: {
                    'border-bottom-color': '#e60012',
                    'border-bottom-style': 'solid',
                    'border-bottom-width': 4
                }
            }
        },
        methods: {
            changeCase () {
                this.state.caseActive = !this.state.caseActive
                this.index = 1
            },
            changeDesigner () {
                this.state.caseActive = !this.state.caseActive
                this.index = 2
            }
        }
    }
</script>

<style lang="scss" scoped>
    .design {
        width: 750px;
    }

    .design-header {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
        width: 750;
        height: 110;
    }

    .design-title {
        width: 180;
        height: 80;
        line-height: 80;
        text-align: center;
        font-size: 36;
    }

    .design-search {
        position: absolute;
        top: 42;
        right: 60;
        font-family: iconfont;
        font-size: 36;
    }
</style>
