<template>
    <div>
        <div class="feedBack">
            <div class="feedBack-type">
                <text class="label">反馈类型</text>
                <div class="style" @click="state.isShow = true">
                    <text class="text">{{style}}</text>
                    <text class="icon">&#xe605;</text>
                </div>
            </div>
            <textarea placeholder="请输入您的建议或反馈！" class="textarea" v-model="textareaVal"></textarea>
            <wxc-button text="提交"
                        :btnStyle="{'background-color': '#e60012', 'border-radius': 6, width: 710, height: 80, 'margin-left': 20, 'margin-right': 20}"
                        :textStyle="{'font-size': 28}"
                        @wxcButtonClicked="sendForm"
            ></wxc-button>
        </div>
        <menu @checked="chooseStyle" :isShow="state.isShow" :height="400" :data=typeList></menu>
    </div>
</template>

<script>
    import { WxcButton } from 'weex-ui'
    import Menu from '../../components/menu'
    import mixins from '../../common/mixins'
    import { getDictionaryCache, addBusiShareSuggestion } from '../../service/baseApi'

    export default {
        name: 'feedBack',
        components: { WxcButton, Menu },
        mixins: [mixins],
        data () {
            return {
                state: {
                    isShow: false
                },
                style: '请选择',
                code: '',
                typeList: [],
                textareaVal: ''
            }
        },
        methods: {
            chooseStyle (e) {
                this.style = e.title
                this.code = e.value
                setTimeout(() => {
                    this.state.isShow = false
                }, 500)
            },

            async getTypeList () {
                const result = await getDictionaryCache()
                if (result.length > 0) {
                    const list = result.map(obj => {
                        return { title: obj.name, value: obj.code }
                    })
                    this.typeList = list
                }
            },
            async sendForm () {
                if (this.code === '') {
                    this.toast('请选择反馈类型')
                    return false
                }
                if (this.textareaVal === '') {
                    this.toast('内容不能为空')
                    return false
                }
                const params = {
                    type: this.code,
                    content: this.textareaVal,
                    registerId: this.userId,
                    terminal: '0'
                }
                const result = await addBusiShareSuggestion(params)
                if (result.type === 'success') {
                    this.toast('反馈成功')
                    this.goBack()
                } else {
                    this.toast(result.text)
                }
            }
        },
        async created () {
            await this.getTypeList()
        }
    }
</script>

<style lang="scss" scoped>
    .feedBack {
        width: 750;
        height: 2000;
        background-color: #fff;
    }

    .feedBack-type {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 20;
    }

    .label {
        color: #353535;
        font-size: 28;
    }

    .style {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 570;
        height: 72;
        padding: 0 20;
        border-top-style: solid;
        border-top-color: #dbd6d6;
        border-top-width: 2;
        border-left-style: solid;
        border-left-color: #dbd6d6;
        border-left-width: 2;
        border-bottom-style: solid;
        border-bottom-color: #dbd6d6;
        border-bottom-width: 2;
        border-right-style: solid;
        border-right-color: #dbd6d6;
        border-right-width: 2;
        border-radius: 8;
    }

    .text {
        font-size: 28;
        color: #555;
    }

    .icon {
        font-family: iconfont;
        font-size: 48;
        color: #dbd6d6;
    }

    .textarea {
        width: 750;
        height: 400;
        padding: 32 24;
        margin-bottom: 50;
        color: #555;
        tint-color: #e60012;
    }
</style>
