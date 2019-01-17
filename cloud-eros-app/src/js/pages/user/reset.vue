<template>
    <div>
        <div class="reset" :style="{height: pageHeight}">
            <div class="main-content">
                <input-item type="text" @inputValue="inputPhone" placeholder="手机号"></input-item>
                <input-item type="text" :codeText="codeText" @inputValue="inputCode" @getCode="getCode" :isCode="isCode" placeholder="验证码"></input-item>
                <input-item type="password" @inputValue="inputPwd" placeholder="新密码(长度不小于6位)"></input-item>
                <wxc-button text="重置密码"
                            @wxcButtonClicked="upDatePassWord"
                            :btnStyle="{'background-color': '#e60012', 'border-radius': 6, width: 600, height: 88, 'margin-top': 52}"
                            :textStyle="{'font-size': 34, 'font-weight': 700}"
                ></wxc-button>
            </div>
        </div>
    </div>
</template>

<script>
    import inputItem from '../../components/input'
    import { WxcButton } from 'weex-ui'
    import mixins from '../../common/mixins'
    import { sendCode, updateUserInfo } from '../../service/userApi'

    export default {
        name: 'reset',
        components: { inputItem, WxcButton },
        mixins: [mixins],
        data () {
            return {
                codeEnable: false,
                codeText: '获取验证码',
                code: null,
                count: 60,
                isCode: true,
                user: {
                    mobilePhone: '',
                    passWord: ''
                }
            }
        },
        methods: {
            inputPhone (value) {
                this.user.mobilePhone = value
            },
            inputCode (value) {
                this.code = value
            },
            inputPwd (value) {
                this.user.passWord = value
            },
            // 重置密码
            async upDatePassWord () {
                const data = {
                    mobilePhone: this.user.mobilePhone,
                    phoneCode: this.code,
                    newPassword: this.user.passWord
                }
                const result = await updateUserInfo(data)
                this.toast(result.text)
                if (result.type === 'success') {
                    this.goTo('user.login')
                }
            },
            // 获取验证码
            async getCode () {
                if (this.user.mobilePhone.length < 11) {
                    return false
                }
                if (!this.codeEnable) {
                    const result = await sendCode(2, this.user.mobilePhone, {})
                    this.toast(result.text)
                    if (result.type === 'success') {
                        this.timedCount()
                    }
                }
            },
            timedCount () {
                this.count = this.count - 1
                if (this.count > 0) {
                    this.t = setTimeout(() => {
                        this.timedCount()
                    }, 1000)
                    this.codeText = '' + this.count + 's'
                    this.codeEnable = true
                } else {
                    this.count = 60
                    this.codeText = '发送验证码'
                    this.codeEnable = false
                }
            }

        }
    }
</script>

<style lang="scss" scoped>
    .reset {
        padding: 60 75 0;
        background-color: #fff;
    }

    .reset-bottom {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 160;
    }
</style>
