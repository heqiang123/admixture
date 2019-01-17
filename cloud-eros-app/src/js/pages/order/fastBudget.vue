<template>
    <scroller>
        <div v-if="indexs==10">
            <status-bar></status-bar>
            <div class="title-bar" :style="{height: height}">
                <text class="title-bar-left" @click="$router.back()">&#xe601;</text>
                <div class="title-bar-right">
                <text> 预约设计师</text>
                </div>
            </div>
        </div>
        <div class="fast-budget" :style="{height: pageHeight}">
            <wxc-cell class="wxcHeaght">
                <div slot="label" class="label">
                    <text class="label-content">您的姓名</text>
                    <text class="label-postfix"> *</text>
                </div>
                <input class="input" v-model="customerName"  slot="value" type="text" placeholder="请输入..." />
            </wxc-cell>
            <wxc-cell class="wxcHeaght">
                <div slot="label" class="label">
                    <text class="label-content">手机号码</text>
                    <text class="label-postfix"> *</text>
                </div>
                <input class="input" v-model="customerPhone" slot="value" type="text" placeholder="请输入..." />
            </wxc-cell>
            <wxc-cell class="wxcHeaght">
                <div slot="label" class="label">
                    <text class="label-content">楼盘</text>
                    <text class="label-postfix"> *</text>
                </div>
                <input class="input" v-model="estateName" slot="value" type="text" placeholder="请输入..." />
            </wxc-cell>
            <wxc-cell class="wxcHeaght">
                <div slot="label" class="label">
                    <text class="label-content">面积</text>
                    <text class="label-postfix"> *</text>
                </div>
                <input class="input" v-model="houseSize" slot="value" type="text" placeholder="请输入..." />
            </wxc-cell>
            <text class="title">选择风格</text>
            <div class="style" @click="state.isShow = true">
                <text class="text">{{style}}</text>
                <text class="icon">&#xe605;</text>
            </div>
            <city-picker @areCode="binAreCode"></city-picker>
            <text class="title ssq">省、市、区</text>
            <text class="title">特殊需求</text>
            <textarea placeholder="特殊需求如：停机坪，整木，大理石等等" class="style textarea" v-model="specialDemand"></textarea>
          <div v-if="indexs!=10">
              <wxc-button text="预约工地" :btnStyle="{'background-color': '#e60012', 'border-radius': 6, width: 675, height: 80}" :textStyle="{'font-size': 28}" v-if="index === 0" @wxcButtonClicked="subData"></wxc-button>
              <wxc-button text="免费预约量房" :btnStyle="{'background-color': '#e60012', 'border-radius': 6, width: 675, height: 80}" :textStyle="{'font-size': 28}" v-if="index === 2" @wxcButtonClicked="subData"></wxc-button>
              <wxc-button text="预约门店" :btnStyle="{'background-color': '#e60012', 'border-radius': 6, width: 675, height: 80}" :textStyle="{'font-size': 28}" v-if="index !== 0 && index !== 2" @wxcButtonClicked="subData"></wxc-button>
          </div>
            <div v-else>
                <wxc-button text="预约设计师" :btnStyle="{'background-color': '#e60012', 'border-radius': 6, width: 675, height: 80}" :textStyle="{'font-size': 28}" @wxcButtonClicked="subData"></wxc-button>
            </div>
            <div class="extra-wrapper" v-if="indexs!=10">
                    <text class="extra-text">已有</text>
                    <text class="extra-text strong">{{count.count}}</text>
                    <text class="extra-text" v-if="index === 0">{{CountDic[9]}}</text>
                    <text class="extra-text" v-if="index !== 0 && index !== 2">{{CountDic[8]}}</text>
                    <text class="extra-text" v-if="index === 2">{{CountDic[11]}}</text>
            </div>
            <div class="extra-wrapper" v-else>
                <text class="extra-text">已有</text>
                <text class="extra-text strong">{{count.count}}</text>
                <text class="extra-text">{{CountDic[10]}}</text>
            </div>
            <menu @checked="chooseStyle" :isShow="state.isShow" :height="400"></menu>
        </div>
        <div class="padding">
            <wxc-city ref="wxcCity"
                      currentLocation="西安"
                      cityStyleType="list"
                      @wxcCityItemSelected="citySelect">
            </wxc-city>
        </div>
    </scroller>
</template>
<script>
    import StatusBar from './../../components/statusBar'
    import { WxcCell, WxcCity, WxcButton } from 'weex-ui'
    import Menu from '../../components/menu'
    import cityPicker from '../../components/cityPicker'
    import { makeWorkSize, newGetNums } from '../../service/estateApi'
    import mixins from '../../common/mixins'
    import titleBar from '../../components/titleBar'

    export default {
        name: 'fastBudget',
        props: {
            index: {
                type: Number
            },
            resType: {
                type: Number
            }
        },
        mixins: [mixins],
        components: { WxcCell, WxcCity, WxcButton, Menu, cityPicker, titleBar, StatusBar },
        data () {
            return {
                state: {
                    isShow: false
                },
                btnDic: {
                    '8': '预约门店',
                    '9': '预约工地',
                    '10': '预约设计师',
                    '11': '预约免费上门量房',
                    '12': '快速报价',
                    '13': '精准报价'
                },
                CountDic: {
                    '8': '人成功预约门店',
                    '9': '人成功预约工地',
                    '10': '人成功预约设计师',
                    '11': '人成功获取免费量房服务',
                    '12': '人成功获取装修报价',
                    '13': '人成功获取装修报价'
                },
                count: 0,
                type: 11,
                siteId: '',
                siteName: '',
                customerName: '', // 客户姓名
                customerPhone: '', // 客户手机
                estateName: '', // 楼盘名称
                houseSize: '', // 楼盘面积
                specialDemand: '', // 特殊需求
                styleCode: '', // 风格code
                placeCity: '请选择省、市、区',
                city: '',
                style: '请选择偏好风格',
                areaCode: null, // 选择城市的区域编码
                indexs: ''
            }
        },
        watch: {
            siteId (val) {
                this.siteId = val
            },
            siteName (val) {
                this.siteName = val
            },
            resType (val) {
                this.type = val
            },
            type (val) {
                this.resType = val
            },
            index () {
                this.getNum()
            }
        },
        computed: {
            height () {
                return weex.config.eros.navBarHeight
            },
            type () {
                if (this.index === 0) {
                    return 9
                } else if (this.index !== 0 && this.index !== 2) {
                    return 8
                } else if (this.index === 2) {
                    return 11
                }
            }
        },
        methods: {
            chooseStyle (e) {
                this.style = e.title
                this.styleCode = e.value
                setTimeout(() => {
                    this.state.isShow = false
                }, 500)
            },
            citySelect (e) {
                this.city = e.item.name
            },
            customerNameInput (e) {
                this.customerName = e.value
            },
            customerPhoneInput (e) {
                this.customerPhone = e.value
            },
            customerName (e) {
                this.name = e.value
            },
            customerPhone (e) {
                this.phone = e.value
            },
            binAreCode (params) {
                this.areaCode = params.code
            },
            async getNum () {
                if (this.index === 0) {
                    this.type = 9
                } else if (this.index !== 0 && this.index !== 2) {
                    this.type = 8
                } else if (this.index === 2) {
                    this.type = 11
                }
                const result = await newGetNums(this.type)
                this.count = result
            },
            async subData () {
                if (this.customerName === '') {
                    this.toast('请输入您的姓名')
                    return
                }
                if (this.customerPhone === '') {
                    this.toast('请输入手机号码')
                    return
                }

                if (this.estateName === '') {
                    this.toast('请输入楼盘名称')
                    return
                }

                if (this.houseSize === '') {
                    this.toast('请输入户型面积')
                    return
                }

                if (this.area === '') {
                    this.toast('请选择地址')
                }
                const currentRegion = this.$storage.getSync('defaultValue')
                let siteValue = '31000'
                if (currentRegion) {
                    siteValue = currentRegion.defaultValue
                }
                const subDataed = {
                    orderSource: this.type,
                    areaCode: this.areaCode || '',
                    houseDesignSize: this.houseSize,
                    name: this.customerName,
                    mobilePhone: this.customerPhone,
                    houseDesignRemark: this.specialDemand, // 特殊需求
                    unitCode: this.estateName,
                    houseDesignStyle: this.styleCode,
                    targetName: this.siteName || '',
                    targetId: this.siteId || '',
                    site: siteValue
                }
                const result = await makeWorkSize(subDataed)
                if (result.text === 'mobilePhone手机号码不正确') {
                    this.toast('手机号码不正确')
                }
                if (result.type === 'success') {
                    this.goTo('others.success', { type: 1 })
                }
            }
        },
        async created () {
            const params = await this.$router.getParams()
            this.indexs = params.indexs
            if (params && params.type) {
                this.type = params.resType
            }
            if (params && params.id) {
                this.siteId = params.id
                this.index = params.index
            }
            if (params && params.name) {
                this.siteName = params.name
            }
            await this.getNum()
        }
    }
</script>

<style lang="scss" scoped>
    .fast-budget {
        padding: 20 40 0;
        background-color: #fff;
        margin-top: 20;
    }

    .padding {
        padding-top: -80;
    }

    .label {
        flex-direction: row;
        align-items: center;
        margin-left: -20;
    }

    .wxcHeaght {
        height: 90px;
    }

    .label-content {
        font-size: 28;
        color: #353535;
    }

    .label-postfix {
        font-size: 28;
        color: #e60012
    }

    .input {
        width: 450;
        height: 60;
        font-size: 28;
        tint-color: #e60012;
    }

    .title {
        margin: 30 0 20;
        font-size: 28;
        color: #999;
        /*height: 20px;*/
    }

    .style {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 670;
        height: 70;
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
        height: 150;
        padding: 32 24;
        margin-bottom: 50;
        color: #333333;
        tint-color: #333333;
        font-size: 28px;
    }

    .extra-wrapper {
        margin: 20 0;
        flex-direction: row;
        justify-content: center;
    }

    .extra-text {
        font-size: 24;
        color: #999;
    }

    .strong {
        color: #e60012;
    }

    .am-list-content-text {
        font-size: 28px;
        color: #000000;
    }


    .title-bar {
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding: 0 20;
        width: 750;
        background-color: #fff;
    }

    .title-bar-left {
        font-family: iconfont;
        font-size: 50;
        font-weight: 800;
        color: #212121;
    }

    .title-bar-right {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 600;
        text-align: center;
    }

    .title-bar-icon {
        font-family: iconfont;
        color: #999;
    }

    .praise {
        font-size: 40;
    }

    .follows {
        font-size: 36;
    }

    .star {
        font-size: 42;
    }

    .share {
        font-size: 42;
    }

    .title-bar-text {
        font-size: 36;
        color: #999;
    }

    .iconfont-text-2 {
        font-family: iconfont2;
        font-size: 26px;
        color: #999999;
    }

    .active {
        color: #E60012;
    }

    .ssq{
        position: absolute;
        top: 538;
        left: 40px;
    }
</style>
