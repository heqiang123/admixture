<template>
    <div>
        <wxc-popup :show="isShow"
                   @wxcPopupOverlayClicked="popupOverlayBottomClick"
                   pos="bottom"
                   :height="height">
            <scroller class="demo-content">
                <city-radio :list="data"
                            :config="{ checkedColor: '#e60012',
                                checkedIcon: 'bmlocal://assets/images/circle_red.png',
                                disabledIcon:'bmlocal://assets/images/circle.png' }"
                            @wxcRadioListChecked="wxcRadioListChecked">
                </city-radio>
            </scroller>
        </wxc-popup>
    </div>
</template>

<script>
    import { WxcPopup, WxcRadio } from 'weex-ui'
    import cityRadio from './cityRadio'

    export default {
        name: 'cityPopup',
        props: {
            isShow: {
                type: Boolean,
                default: false
            },
            height: {
                type: Number,
                default: 200
            },
            data: {
                type: Array
            }
        },
        watch: {
            data (val) {
                this.data = val
            }
        },
        components: { WxcPopup, WxcRadio, cityRadio },
        methods: {
            wxcRadioListChecked (e) {
                this.$emit('checked', { name: e.name, code: e.code })
            },
            popupOverlayBottomClick () {
                this.$emit('hide')
            }
        },
        created () {
        }

    }
</script>

<style scoped>

</style>
