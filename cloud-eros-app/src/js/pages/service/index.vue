<template>
    <scroller :style="{height: pageHeight + 22}">
        <div class="service">
            <image class="bg-image" resize="cover" src="bmlocal://assets/images/server_pic.jpg"></image>
            <div class="service-call">
                <div class="wrapper" @click="jumpToWeb">
                    <text class="service-icon"> &#xe61e;</text>
                    <text class="service-text">客服</text>
                </div>
                <div class="wrapper" @click="$coms.call(customerPhone, false)">
                    <text class="service-icon"> &#xe607;</text>
                    <text class="service-text">电话</text>
                </div>
            </div>
            <div class="service-handdle">
                <input class="input" type="text" placeholder="姓名(必填):" v-model="name">
                <input class="input" type="tel" placeholder="电话(必填):" v-model="phone">
                <wxc-button text="立即预约" :btnStyle="{'background-color': '#e60012', 'border-radius': 6, width: 675, height: 80}" :textStyle="{'font-size': 32, 'font-weight': 600}" @wxcButtonClicked="submisSion"></wxc-button>
            </div>
        </div>
    </scroller>
</template>

<script>
    import { WxcButton } from 'weex-ui'
    import mixins from '../../common/mixins'
    import { postServer, serverPhone } from '../../service/baseApi'
    import { getUserInfoById } from '../../service/userApi'

    export default {
        name: 'service',
        components: { WxcButton },
        mixins: [mixins],
        data () {
            return {
                name: '',
                phone: '',
                customerPhone: null,
                oldPhone: null,
                userInfo: {
                    name: ''
                }
            }
        },
        computed: {
            username () {
                if (this.userInfo && this.userInfo.name) {
                    return this.userInfo.name
                } else {
                    return '星杰用户'
                }
            },
            id () {
                if (this.userId) {
                    return this.userId
                } else {
                    return 123456
                }
            },
            url () {
                if (this.userInfo) {
                    return `https://webchat.singohome.com/pageinfo.jsp?version=vip&admiuin=9371445&ltype=1&iscallback=0&page_templete_id=40364&is_message_sms=0&is_send_mail=0&action=acd&acd=1&type_code=21&clientname=${this.username}&clientid=${this.id}&&auto_msg=星杰国际设计`
                } else {
                    return 'https://webchat.singohome.com/pageinfo.jsp?version=vip&admiuin=9371445&ltype=1&iscallback=0&page_templete_id=40364&is_message_sms=0&is_send_mail=0&action=acd&acd=1&type_code=21&&auto_msg=星杰国际设计'
                }
            }
        },
        methods: {
            jumpToWeb (index) {
                this.$router.toWebView({
                    url: this.url,
                    title: '联系客服',
                    navshow: true
                })
            },
            async getPhoneNum () {
                const result = await serverPhone()
                if (result && result.storePhone) {
                    this.customerPhone = result.storePhone.replace(/-/g, '')
                }
            },
            async submisSion () {
                if (this.name && this.phone) {
                    if (this.oldPhone === this.phone) {
                        this.toast('请勿重复预约！')
                        return false
                    }
                    if (this.phone.length !== 11) {
                        this.toast('请填写正确电话号码！')
                        return false
                    }
                    this.oldPhone = this.phone

                    const data = {
                        name: this.name,
                        mobilePhone: this.phone,
                        orderSource: 14
                    }
                    const result = await postServer(data)
                    if (result.type === 'success') {
                        this.goTo('others.success', { type: 1 })
                    }
                } else {
                    this.toast('请填写预约信息')
                }
            }
        },
        async created () {
            await this.getPhoneNum()
        },
        async mounted () {
            if (this.userId) {
                this.userInfo = await getUserInfoById(this.userId)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .service {
        width: 750px;
        background-color: #fff;
    }

    .bg-image {
        width: 750;
        height: 709;
    }

    .service-call {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 750;
        padding: 0 112;
        height: 100;
        background-color: #ddd;
    }

    .wrapper {
        flex-direction: row;
        align-items: center;
    }

    .service-icon {
        margin-right: 20;
        font-family: iconfont;
        font-size: 60;
        color: #555;
    }

    .service-text {
        font-size: 36;
        color: #555;
        font-weight: 500;
    }

    .service-handdle {
        width: 750;
        height: 440;
        padding: 20 0;
        background-color: #fff;
        align-items: center;
        justify-content: space-around;
    }

    .input {
        width: 675;
        height: 80;
        padding: 0 16;
        border-top-style: solid;
        border-top-color: #98999a;
        border-top-width: 2;
        border-left-style: solid;
        border-left-color: #98999a;
        border-left-width: 2;
        border-bottom-style: solid;
        border-bottom-color: #98999a;
        border-bottom-width: 2;
        border-right-style: solid;
        border-right-color: #98999a;
        border-right-width: 2;
        border-radius: 6;
    }
</style>
