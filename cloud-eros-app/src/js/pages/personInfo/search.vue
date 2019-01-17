<template>
    <div>
        <div class="search">
            <status-bar></status-bar>

            <div slot="middle" class="minibar-middle">
                <div class="middle-wrapper">
                    <input :value="searchValue"
                           @change="onchange"
                           @input="onchange"
                           @return="search"
                           class="input" type="text" return-key-type="search" placeholder="请输入关键字"
                           @focus="state.isFocus = true"
                           @blur="state.isFocus = false" />
                    <text class="icon" v-if="state.isFocus" :style="{fontSize: 28}" @click="searchValue = ''">&#xe76c;</text>
                    <text class="icon" v-else :style="{fontSize: 28}">&#xe7d4;</text>
                </div>
                <text slot="right" class="minibar-right" @click="search">取消</text>
            </div>

            <!--<wxc-popover ref="wxc-popover"-->
            <!--:buttons="btns"-->
            <!--:position="{x: 20,y:100}"-->
            <!--:arrowPosition="{pos:'top',x: 80}"-->
            <!--@wxcPopoverButtonClicked="popoverButtonClicked">-->
            <!--</wxc-popover>-->
        </div>
    </div>
</template>

<script>
    import { WxcMinibar, WxcPopover } from 'weex-ui'
    import StatusBar from '../../components/statusBar'
    import mixins from '../../common/mixins'

    export default {
        name: 'search',
        components: { WxcMinibar, WxcPopover, StatusBar },
        mixins: [mixins],
        data () {
            return {
                state: {
                    isFocus: false
                },
                selectIndex: 0,
                searchValue: ''
            }
        },
        methods: {
            showTypeMenu () {
                this.$refs['wxc-popover'].wxcPopoverShow()
            },
            popoverButtonClicked (obj) {
                this.searchType = obj.key
            },
            search (e) {
            },
            onchange (e) {
                this.searchValue = e.value
            }
        }
    }
</script>

<style lang="scss" scoped>
    .search {
        width: 750;
        height: 2000;
        background-color: #fff;
    }

    .minibar-left {
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .minibar-middle {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 750;
        height: 120;
        line-height: 120;
        text-align: center;
        font-family: iconfont;
        color: #888;
        background-color: red;

    }

    .middle-wrapper {
        margin-left: 20px;
        flex-direction: row;
        align-items: center;
        width: 600;
        background-color: #e9e9e9;
        border-radius: 4;
    }

    .minibar-right {
        width: 100;
        text-align: center;
        color: #ffffff;
        margin-right: 30px;

    }

    .icon {
        font-family: iconfont;
        font-size: 42;
        color: #555;
        font-weight: 600;
        margin-left: 150px;
        flex-direction: row;
        align-items: center;
    }

    .input {
        width: 380;
        height: 60;
        padding: 0 20;
        font-size: 28;
        tint-color: #e60012;
    }
</style>
