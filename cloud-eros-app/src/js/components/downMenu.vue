<template>
    <div @click="state.isShow = true" class="down-menu">
        <text>{{name}}</text>
        <text class="down-icon">&#xe605;</text>
        <mul-menu v-if="multiple" @hide="state.isShow = false" :isShow="state.isShow" :height="500" :data="data"></mul-menu>
        <menu v-else @checked="chooseName" @hide="state.isShow = false" :isShow="state.isShow" :height="400" :data="data"></menu>
    </div>
</template>

<script>
    import Menu from './menu'
    import MulMenu from './mulMenu'

    export default {
        name: 'downMenu',
        props: {
            multiple: {
                type: Boolean,
                default: false
            },
            name: {
                type: String,
                default: ''
            },
            data: {
                type: Array,
                default: []
            }
        },
        components: { Menu, MulMenu },
        data () {
            return {
                state: {
                    isShow: false
                }
            }
        },
        methods: {
            chooseName (e) {
                this.name = e.title
                this.$emit('chooseValue', e.value)
                setTimeout(() => {
                    this.state.isShow = false
                }, 500)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .down-menu {
        flex-direction: row;
        align-items: center;
        margin: 0 6;
        padding: 0 12;
        height: 56;
        color: '#212121';
        border-top-style: solid;
        border-top-color: #e0e0e0;
        border-top-width: 2;
        border-left-style: solid;
        border-left-color: #e0e0e0;
        border-left-width: 2;
        border-bottom-style: solid;
        border-bottom-color: #e0e0e0;
        border-bottom-width: 2;
        border-right-style: solid;
        border-right-color: #e0e0e0;
        border-right-width: 2;
    }

    .down-icon {
        font-family: iconfont;
        font-size: 36;
    }
</style>
