<template>
    <div class="smart">
        <div class="smart-header">
            <text class="smart-title" :style="!state.fastActive ? nomalStyle : selectedStyle" @click="state.fastActive = !state.fastActive">快速</text>
            <text class="smart-title" :style="state.fastActive ? nomalStyle : selectedStyle" @click="state.fastActive = !state.fastActive">精准</text>
        </div>
        <fast-budget v-if="state.fastActive"></fast-budget>
        <precise-budget v-else></precise-budget>
    </div>
</template>

<script>
    import FastBudget from './fastBudget'
    import PreciseBudget from './preciseBudget'

    export default {
        name: 'smartBudget',
        components: { FastBudget, PreciseBudget },
        data () {
            return {
                state: {
                    fastActive: false
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
        beforeCreate () {
            this.$navigator.setNavigationInfo({
                title: '',
                navShow: false,
                statusBarStyle: 'Default'
            })
        },
        created () {
            this.$event.on('changeCase', status => {
                this.state.fastActive = status
            })
        }
    }
</script>

<style lang="scss" scoped>
    .smart {
        width: 750px;
        background-color: #fff;
    }

    .smart-header {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 750;
        height: 110;
        background-color: #fff;
    }

    .smart-title {
        width: 180;
        height: 80;
        line-height: 80;
        text-align: center;
        font-size: 36;
    }
</style>
