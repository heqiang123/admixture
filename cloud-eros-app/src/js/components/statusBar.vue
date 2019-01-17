<template>
    <div>
        <div class="status-bar" :style="{height: height,backgroundColor:bgColor}"></div>
    </div>
</template>

<script>
    export default {
        name: 'statusBar',
        props: {
            bgColor: {
                type: String,
                default: '#fff'
            }
        },
        computed: {
            height () {
                return weex.config.eros.statusBarHeight
            }
        }
    }
</script>

<style lang="scss" scoped>
    /*.status-bar {*/
    /*background-color: #fff;*/
    /*}*/
</style>
