<template>
    <div>
        <div class="login" :style="{height: pageHeight}">
            <div class="main-content">
                <input-item type="text" @inputValue="inputPhone" placeholder="手机号"></input-item>
                <input-item @inputValue="inputPwd" :isCode="isCode" v-if="!isCode" :key="0" type="password" placeholder="密码"></input-item>
                <input-item @getCode="getCode" :width="440" :codeText="codeText" :isCode="isCode" :key="1" v-else type="text" @inputValue="inputPwd" placeholder="验证码"></input-item>
                <wxc-button text="登录" @wxcButtonClicked="login" :btnStyle="{'background-color': '#e60012', 'border-radius': 6, width: 600, height: 88, 'margin-top': 52}"
                            :textStyle="{'font-size': 34, 'font-weight': 700}"></wxc-button>
                <div class="login-handdle">
                    <text class="reset" @click="goTo('user.reset')">忘记密码</text>
                    <text class="register" @click="goTo('user.register')">注册用户</text>
                </div>
            </div>
            <div class="login-bottom">
                <div class="line"></div>
                <div class="title">其他登录方式</div>
                <div class="foot-login">
                    <div class="captcha" @click="toggoleLogin">
                        <image :src="type === 'check' ? 'bmlocal://assets/images/password.png' : 'bmlocal://assets/images/captcha.png'" class="captcha-cover"></image>
                        <text class="captcha-content">{{type === 'check' ? '密码登录' : '验证码登录'}}</text>
                    </div>
                    <div class="captcha" @click="wxLogin">
                        <image :src=" 'bmlocal://assets/images/captcha.png'" class="captcha-cover"></image>
                        <text class="captcha-content">微信登录</text>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import inputItem from '../../components/input'
    import { WxcButton } from 'weex-ui'
    import mixins from '../../common/mixins'
    import { loginApi, loginByCodeApi, sendCode, wxLogin, bindCid } from '../../service/userApi'
    const bmWXShare = weex.requireModule('bmWXShare')
    export default {
        name: 'login',
        mixins: [mixins],
        components: { inputItem, WxcButton },
        data: () => ({
            user: {
                mobilePhone: '',
                passWord: ''
            },
            codeText: '获取验证码',
            count: 60,
            codeEnable: false,
            type: 'pwdLogin',
            isCode: false,
            cid: '',
            platform: '',
            site: ''
        }),
        watch: {
            type (val) {
                if (val === 'check') {
                    this.isCode = true
                } else {
                    this.isCode = false
                }
            }
        },
        created () {
            this.site = this.$storage.getSync('currentValue').currentValue
            if (weex.config.env.platform === 'iOS') {
                this.platform = 'ios'
                bmWXShare.initUM('5bc180cef1f5568df60006d3')// 友盟平台的ios appkey
            } else {
                this.platform = 'android'
                bmWXShare.initUM('5bc18170f1f55653fa000309')// 友盟平台的android appkey
            }
            bmWXShare.initWX({
                appKey: 'wx6b97854effaee8d3', // 微信开发平台申请的appkey
                appSecret: '61ae8f237d2dbd8bc091e1636470d799', // appKey对应的appSecret，
                redirectURL: '' // 授权回调页面
            })
            const bmPush = weex.requireModule('bmPush')
            bmPush.initPush({
                appId: 'B9CChnBOStAcSvwIltBXL8', // appId、appKey、appSecret 需要到个推后台获取
                appKey: 'l42vfCr8Ia5c8eIDgs0FH',
                appSecret: 'TySnpAaJ8O73ha5Nsnoes5'
            })
            bmPush.getCid(result => {
                if (result.data && result.data.cid) {
                    this.cid = result.data.cid
                }
            })
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
                const _this = this
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
                        const dataCid = {
                            cid: _this.cid,
                            site: _this.site,
                            client: _this.platform
                        }
                        this.$storage.setSync('token', result.token)
                        this.$storage.setSync('userId', result.id)
                        await bindCid(dataCid)
                        this.$router.setBackParams({ name: 'refresh' })
                        this.hideLoading()
                        this.$router.back()
                        // this.$router.setHomePage('/pages/index.js')
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
            wxLogin () {
                const _this = this
                console.log(bmWXShare.authLogin)
                bmWXShare.authLogin(async function (resData) {
                    // 授权结果，成功的话会将所有的userInfo返回

                    if (resData.data.unionId ||resData.data.unionid) {
                        if (weex.config.env.platform === 'iOS') {
                            var result = await wxLogin(resData.data.unionId, 1, _this.cid)
                        } else {
                            var result = await wxLogin(resData.data.unionid, 1, _this.cid)
                            console.log(result)
                        }
                        if (result.code == 201) {
                            // 路由跳转至绑定手机号页面
                            if (weex.config.env.platform === 'iOS') {
                                _this.goTo('user.signInWithLogin', { unionid: resData.data.unionId,
                                    photo: resData.data.iconurl, name: resData.data.name })
                            } else {
                                _this.goTo('user.signInWithLogin', { unionid: resData.data.unionid,
                                    photo: resData.data.iconurl, name: resData.data.name })
                            }
                        } else {
                            console.log(result)
                            if (result.token) {
                                const data = {
                                    cid: _this.cid,
                                    site: _this.site,
                                    client: _this.platform
                                }
                                const res = await bindCid(data)
                                _this.$storage.setSync('token', result.token)
                                _this.$storage.setSync('userId', result.id)
                                _this.hideLoading()
                                _this.$router.setBackParams({
                                    name: 'refresh'
                                })
                                _this.goTo('index')
                            }
                        }
                    }
                })
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
        width: 450;
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
    .foot-login{
        flex-direction: row;
        justify-content: space-between;
    }
</style>
