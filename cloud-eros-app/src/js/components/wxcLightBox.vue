<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->

<template>
    <div>
        <wxc-mask :width="width"
                  :height="height"
                  aria-hidden="true"
                  overlay-opacity="1"
                  :show="show"
                  :show-close="false"
                  @wxcMaskSetHidden="maskOverlayClick">
            <slider @scroll="end" auto-play="false" v-if="show" :style="{ height: height  + 'px'}">
                <div v-if="imageList&&imageList.length>1" v-for="(v,index) in imageList" :style="{ height: height  + 'px'}" :key="index">
                    <image resize="cover"
                           @touchstart="start(index)"
                           @touchend="end"
                           :src="v.src" :style="{ height: height + 'px', width: width  + 'px'}">
                    </image>
                </div>
                <image v-if="imageList&&imageList.length>1" ref="img" :src="imageList[index].src"></image>
                <image v-else @touchstart="start(index)"
                       @touchend="end" ref="img" :src="imageList[index].src"></image>
                <indicator class="indicator" :style="indicatorStyle"></indicator>
            </slider>
        </wxc-mask>
        <wxc-dialog title="保存图片"
                    content="是否保存图片"
                    :show="imageshow"
                    :single="false"
                    :is-checked="isChecked"
                    :show-no-prompt="flase"
                    @wxcDialogCancelBtnClicked="wxcDialogCancelBtnClicked"
                    @wxcDialogConfirmBtnClicked="wxcDialogConfirmBtnClicked"
                    @wxcDialogNoPromptClicked="wxcDialogNoPromptClicked">
        </wxc-dialog>
    </div>
</template>

<style scoped>
    .indicator {
        position: absolute;
        item-color: rgba(255, 195, 0, .5);
        item-selected-color: #ffc300;
        item-size: 20px;
        height: 20px;
        bottom: 24px;
    }
</style>

<script>
    import WxcMask from '../components/wxcMask'
    import { WxcDialog } from 'weex-ui';
    const modal = weex.requireModule('modal')
    const navigator = weex.requireModule('bmNavigator')
    export default {
        components: {
            WxcMask,
            WxcDialog
        },
        data: () => ({
        isShow: '',
        index: 0,
        imageshow: false,
        isChecked: false,
    }),
    props: {
        width: {
            type: [Number, String],
        default: 750
        },
        height: {
            type: [Number, String],
        default: 750
        },
        show: {
            type: Boolean,
        default: false
        },
        imageList: Array,
            indicatorColor: {
            type: Object,
        default: () => ({
                // 'item-color': 'rgba(255, 195, 0, .5)',
                // 'item-selected-color': '#ffc300',
                // 'item-size': '20px'
            })
        }
    },
    computed: {
        indicatorStyle () {
            return {
                // width: this.width + 'px',
                // ...this.indicatorColor
            }
        }
    },
    methods: {
        openDialog () {
            this.imageshow = true;
        },
        //点击取消事件
        wxcDialogCancelBtnClicked () {
            //此处必须设置，组件为无状态组件，自己管理
            this.imageshow = false;
        },
        // 点击确定事件
        wxcDialogConfirmBtnClicked () {
            this.$refs['img'].save(function(result) {
                if(result.success ==true){
                    modal.toast({
                        message: `保存成功`,
                        duration: 0.3
                    })
                }
            });
            //此处必须设置，组件为无状态组件，自己管理
            this.imageshow = false;
        },
        wxcDialogNoPromptClicked (e) {
            //此处必须设置，组件为无状态组件，自己管理
            this.isChecked = e.isChecked;
        },
        maskOverlayClick () {
            this.$emit('wxcLightboxOverlayClicked', {})
        },
        start (index) {
            const self = this
            this.index  = index
            self.isShow = setTimeout(() => {
                self.imageshow = true
        }, 1000);
        },
        end () {
            clearTimeout(this.isShow)
        }
    },
    watch: {
        show (val) {
            navigator.statusBarHidden(val)
        }
    }
    }
</script>
