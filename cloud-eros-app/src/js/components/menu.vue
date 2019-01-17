<template>
    <div>
        <wxc-popup :show="isShow"
                   @wxcPopupOverlayClicked="popupOverlayBottomClick"
                   pos="bottom"
                   :height="height">
            <scroller class="demo-content">
                <wxc-radio :list="data || list"
                           :config="{ checkedColor: '#e60012',
                                checkedIcon: 'bmlocal://assets/images/circle_red.png',
                                disabledIcon:'bmlocal://assets/images/circle.png' }"
                           @wxcRadioListChecked="wxcRadioListChecked"></wxc-radio>
            </scroller>
        </wxc-popup>
    </div>
</template>

<script>
    import { WxcPopup, WxcRadio } from 'weex-ui'

    export default {
        name: 'menu',
        props: {
            isShow: {
                type: Boolean,
                default: false
            },
            id: {
                type: Number
            },
            height: {
                type: Number,
                default: 200
            },
            data: {
                type: Array
            }
        },
        components: { WxcPopup, WxcRadio },
        data () {
            return {
                list: [
                    { title: '现代风格', value: 1 },
                    { title: '田园风格', value: 2 },
                    { title: '新中式风格', value: 3 },
                    { title: '地中海风格', value: 4 },
                    { title: '混搭风格', value: 5 },
                    { title: '美式乡村风格', value: 6 }
                ]
            }
        },
        methods: {
            wxcRadioListChecked (e) {
                this.$emit('checked', e)
            },
            popupOverlayBottomClick () {
                this.$emit('hide')
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
