<template>
    <div>
        <wxc-popup :show="isShow"
                   @wxcPopupOverlayClicked="popupOverlayBottomClick"
                   pos="bottom"
                   :height="height">
            <scroller class="demo-content">
                <wxc-checkbox v-for="check of data" :key="check.value" :title="check.title"
                              :config="{ checkedColor: '#e60012', checkedIcon: 'bmlocal://assets/images/tick.png',disabledIcon:'bmlocal://assets/images/tick_hui.png',checkedDisabledIcon:'bmlocal://assets/images/tick_hui.png',unCheckedDisabledIcon:'bmlocal://assets/images/tick_hui.png' }"
                              :value="check.value"
                              :checked="check.checked"
                              @wxcCheckBoxItemChecked="wxcCheckBoxItemChecked"></wxc-checkbox>
            </scroller>
            <text class="reset" @click="reset">重置</text>
        </wxc-popup>
    </div>
</template>

<script>
    import { WxcCheckbox, WxcCheckboxList, WxcPopup } from 'weex-ui'

    export default {
        name: 'menu',
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
                default: [],
                type: Array
            }
        },
        components: { WxcPopup, WxcCheckbox, WxcCheckboxList },
        methods: {
            wxcCheckBoxItemChecked (e) {
                this.$set(this.data[e.value], 'checked', e.checked)
            },
            popupOverlayBottomClick () {
                this.$emit('hide')
            },
            reset () {
                this.data.map(dt => {
                    this.$set(dt, 'checked', false)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .reset {
        width: 750;
        height: 100;
        line-height: 100;
        text-align: center;
        font-size: 32;
        color: #555;
        background-color: #f5f5f5;
    }
</style>
