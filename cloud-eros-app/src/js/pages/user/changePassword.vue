<template>
    <div>
        <div class="login" :style="{height: pageHeight}">
            <div class="main-content">
                <input-item @inputValue="inputPwd" :isCode="isCode" v-if="!isCode" :key="0" type="password" placeholder="新密码"></input-item>
                <input-item @inputValue="inputPwd" :isCode="isCode" v-if="!isCode" :key="0" type="password" placeholder="确认密码"></input-item>
                <wxc-button text="绑定" @wxcButtonClicked="bindPassword" :btnStyle="{'background-color': '#e60012', 'border-radius': 6, width: 600, height: 88, 'margin-top': 52}"
                            :textStyle="{'font-size': 34, 'font-weight': 700}"></wxc-button>
            </div>
        </div>
    </div>
</template>

<script>
    import inputItem from '../../components/input'
    import { WxcButton } from 'weex-ui'
    import mixins from '../../common/mixins'
    import { loginApi, loginByCodeApi, sendCode , bindPassword } from '../../service/userApi'

    export default {
        name: 'login',
        mixins: [mixins],
        components: { inputItem, WxcButton },
        data () {
            return {
                user: {
                    mobilePhone: '',
                    passWord: ''
                },
                count: 60,
                codeEnable: false,
                type: 'pwdLogin',
                isCode: false
            }
        },
        watch: {
            type (val) {
                if (val === 'check') {
                    this.isCode = true
                } else {
                    this.isCode = false
                }
            }
        },
        methods: {
            toggoleLogin () {
                if (this.type === 'pwdLogin') {
                    this.type = 'check'
                } else {
                    this.type = 'pwdLogin'
                }
            },
            inputPhone (value) {
                this.user.mobilePhone = value
            },
            inputPwd (value) {
                this.user.passWord = value
            },
            async login () {
        if (this.user.mobilePhone === '') {
            return this.toast('请输入手机号')
        }
        if (this.user.mobilePhone.length !== 11) {
            return this.toast('手机号格式有误,请重新输入!')
        }
        if (this.type === 'pwdLogin') {
            // 密码登录 校验
            if (this.user.passWord === '') {
                return this.toast('请输入密码')
            }
            if (this.user.passWord.length < 6) {
                return this.toast('密码长度不能小于6位!')
            }
            const data = {
                username: this.user.mobilePhone,
                password: this.user.passWord
            }
            this.showLoading('登录中...')
            const result = await loginApi(data)
            if (result.type === 'danger') {
                this.hideLoading()
                this.toast(result.text)
            }
            if (result.token) {
                this.$storage.setSync('token', result.token)
                this.$storage.setSync('userId', result.id)
                this.$router.setBackParams({ name: 'refresh' })
                this.hideLoading()
                this.$router.setHomePage('/pages/index.js')
            }
        }
        if (this.type === 'check') {
            if (this.user.passWord === '') {
                return this.toast('请输入密码')
            }
            if (this.user.passWord.length < 6) {
                return this.toast('密码长度不能小于6位!')
            }
            const data = {
                mobilePhone: this.user.mobilePhone,
                phoneCode: this.user.passWord
            }
            const result = await loginByCodeApi(data)
            if (result.type === 'danger') {
                this.toast(result.text)
            }
            if (result.token) {
                this.$storage.setSync('token', result.token)
                this.$storage.setSync('userId', result.id)
                this.hideLoading()
                this.$router.setBackParams({
                    name: 'refresh'
                })
                this.$router.setHomePage('/pages/index.js')
            }
        }
    },
    async getCode () {
        if (this.user.mobilePhone.length < 11) {
            return false
        }
        if (!this.codeEnable) {
            const result = await sendCode(1, this.user.mobilePhone, {})
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
    },
    async  bindPassword () {
        const params = await this.$router.getParams()
        const data = params.data
        data.password = this.user.passWord
        const result = await bindPassword(data)
        console.log(result)
        if (result.token) {
            this.$storage.setSync('token', result.token)
            this.$storage.setSync('userId', result.id)
            this.hideLoading()
            this.$router.setBackParams({
                name: 'refresh'
            })
            this.goTo('index')
        }
    }

    }
    }
</script>

<style lang="scss" scoped>
    .login {
        justify-content: space-between;
        padding: 150 75 0;
        background-color: #fff;
    }

    .login-handdle {
        flex-direction: row;
        justify-content: space-between;
        margin-top: 40;
    }

    .reset {
        font-size: 28;
        color: #666;
    }

    .register {
        font-size: 28;
        color: #666;
    }

    .login-bottom {
        position: relative;
        align-items: center;
        height: 240;
    }

    .line {
        position: absolute;
        top: 16;
        width: 600;
        height: 1;
        background-color: #dbd6d6;
    }

    .title {
        padding: 0 20;
        font-size: 28;
        color: #999;
        background-color: #fff;
    }

    .captcha {
        width: 600;
        align-items: center;
    }

    .captcha-cover {
        margin: 30 0 10;
        width: 100;
        height: 100;
        border-radius: 50;
    }

    .captcha-content {
        font-size: 24;
        color: #666;
    }
</style>
