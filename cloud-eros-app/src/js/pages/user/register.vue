<template>
    <div>
        <div class="register" :style="{height: pageHeight}">
            <div class="main-content">
                <input-item type="text" @inputValue="inputPhone" placeholder="手机号"></input-item>
                <input-item type="test" :codeText="codeText" :isCode="isCode" @inputValue="inputCode" @getCode="getCode"
                            placeholder="验证码"></input-item>
                <input-item type="password" @inputValue="inputPwd" placeholder="密码(长度不小于6位)"></input-item>
                <wxc-button text="立即注册"
                            @wxcButtonClicked="regSubmission"
                            :btnStyle="{'background-color': '#e60012', 'border-radius': 6, width: 600, height: 88, 'margin-top': 52}"
                            :textStyle="{'font-size': 34, 'font-weight': 700}"
                ></wxc-button>
            </div>
            <div class="register-bottom">
                <image class="check-box" @click="state.isCheck = false" v-if="state.isCheck" src="bmlocal://assets/images/yes.png"></image>
                <image class="check-box" @click="state.isCheck = true" v-else src="bmlocal://assets/images/none2.png"></image>
                <text class="content">我已阅读和同意Atjia</text>
                <text class="protocol" @click="jumpToWeb('协议', 'https://app.atjia.com/protocol')">用户协议</text>
                <text class="content">与</text>
                <text class="protocol" @click="jumpToWeb('隐私协议', 'https://app.atjia.com/secret')">隐私政策</text>
            </div>
        </div>
    </div>
</template>

<script>
    import inputItem from '../../components/input'
    import { WxcButton } from 'weex-ui'
    import mixins from '../../common/mixins'

    import { sendCode, registerUser } from '../../service/userApi'

    export default {
        name: 'register',
        components: { inputItem, WxcButton },
        mixins: [mixins],
        data () {
            return {
                state: {
                    isCheck: true
                },
                codeText: '获取验证码',
                code: null,
                isCode: true,
                count: 60,
                user: {
                    mobilePhone: '',
                    passWord: ''
                }
            }
        },
        methods: {
            jumpToWeb (title, url) {
                this.$router.toWebView({
                    url,
                    title: 123,
                    navshow: true
                })
            },
            inputPhone (value) {
                this.user.mobilePhone = value
            },
            inputCode (value) {
                this.code = value
            },
            inputPwd (value) {
                this.user.passWord = value
            },
            // 注册用户
            async regSubmission () {
                const data = {
                    mobilePhone: this.user.mobilePhone,
                    phoneCode: this.code,
                    password: this.user.passWord,
                    username: '',
                    method: '6'
                }
                if (this.state.isCheck) {
                    const result = await registerUser(data)
                    this.toast(result.text)
                    if (result.type === 'success') {
                        return this.goTo('user.login')
                    }
                } else {
                    this.toast('请选阅读协议')
                }
            },
            // 获取验证码
            async getCode () {
                if (this.user.mobilePhone.length < 11) {
                    return false
                }
                if (!this.codeEnable) {
                    const result = await sendCode(0, this.user.mobilePhone, {})
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
    .register {
        justify-content: space-between;
        padding: 60 75 0;
        background-color: #fff;
    }

    .register-bottom {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 160;
    }

    .checkbox {
        width: 40;
        height: 40;
        background-color: #e60012;
    }

    .content {
        font-size: 28;
        color: #999;
    }

    .protocol {
        text-decoration: underline;
        color: #666;
        font-size: 28;
    }

    .check-box {
        width: 40;
        height: 40;
        margin-right: 20;
    }
</style>
