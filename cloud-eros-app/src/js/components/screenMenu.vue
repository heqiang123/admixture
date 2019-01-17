<template>
    <div @click="state.isShow = true" class="down-menu">
        <text>{{item.id.name.trim()}}</text>
        <text class="down-icon">&#xe605;</text>
        <menu-check-box @reset="reset" @checked="chooseName" :name="item.id.name.trim()" :id="item.id.id" @hide="state.isShow = false" :isShow="state.isShow" :height="800" :data="item.arry"></menu-check-box>
    </div>
</template>

<script>
    import Menu from './menu'
    import menuCheckBox from './menuCheckBox'
    import MulMenu from './mulMenu'

    export default {
        name: 'screenMenu',
        props: {
            item: {
                type: Object
            }
        },
        components: { Menu, MulMenu, menuCheckBox },
        data () {
            return {
                state: {
                    isShow: false
                },
                selecttags: {
                    key: null,
                    tags: []
                }
            }
        },
        watch: {
            type (val) {
                this.type = val
            },
            item (val) {
                this.item = val
            },
            'item.arry': {
                handler (arr) {
                    const array = []
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i].selected) {
                            array.push(arr[i])
                        }
                    }
                    this.selecttags.tags = array
                    this.selecttags.key = this.item.id.id
                },
                deep: true
            }

        },
        methods: {
            chooseName (e) {
                const list = this.item.arry
                for (let i = 0; i < list.length; i++) {
                    if (e.value === list[i].code) {
                        list[i].selected = e.checked
                    }
                }
                this.item.arry = list
                this.$emit('chooseValue', { item: this.item, key: this.item.id.id })
            },
            reset (e) {
                this.$emit('reset', e)
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
