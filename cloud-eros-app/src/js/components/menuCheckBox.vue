<template>
    <div>
        <wxc-popup :show="isShow"
                   @wxcPopupOverlayClicked="popupOverlayBottomClick"
                   pos="bottom"
                   :height="height">
            <div class="title-tag">
                <text class="tag-left">{{name}}</text>
                <image class="icon" @click="closeSelect" src="bmlocal://assets/images/close.png"></image>
            </div>
            <scroller class="demo-content">
                <wxc-checkbox v-for="(item,index) of data"
                              :key="index"
                              :title="item.name"
                              :checked="item.selected"
                              :value="item.code"
                              @wxcCheckBoxItemChecked="wxcCheckBoxItemChecked"
                              :config="{ checkedColor: '#e60012',
                                    checkedIcon: 'bmlocal://assets/images/circle_red.png',
                                    disabledIcon:'bmlocal://assets/images/circle.png' }">

                </wxc-checkbox>
            </scroller>
            <text class="reset" @click="reset">重置</text>
        </wxc-popup>
    </div>
</template>

<script>
    import { WxcPopup, WxcButton, WxcCheckboxList, WxcCheckbox } from 'weex-ui'

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
            id: {
                type: Number
            },
            data: {
                type: Array
            },
            name: {
                type: String
            }
        },
        components: { WxcPopup, WxcCheckboxList, WxcButton, WxcCheckbox },
        data () {
            return {
                selectList: []
            }
        },
        methods: {
            closeSelect () {
                this.isShow = false
                this.$emit('hide')
            },
            wxcCheckBoxItemChecked (e) {
                this.$emit('checked', e)
            },
            popupOverlayBottomClick () {
                this.$emit('hide')
            },
            reset () {
                this.$emit('reset', { parentId: this.id })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .title-tag {
        width: 750px;
        height: 100px;
        align-items: center;
        flex-direction: row;
        background-color: #F9F9F9;
        justify-content: space-between;
        padding: 0 32px 0 24px
    }

    .tag-right {
        margin-right: 0;
    }

    .wxc-btn-sure {
        width: 750;
        border-radius: 0;
        background-color: #f5f5f5;
        color: #555555
    }

    .reset {
        width: 750;
        height: 100;
        line-height: 100;
        text-align: center;
        font-size: 32;
        color: #555;
        background-color: #f5f5f5;
    }

    .icon {
        height: 30px;
        width: 30px;
        font-family: iconfont;
        font-size: 36;
        font-weight: 600;
        color: #212121;
        margin-left: 350px;
    }
</style>
