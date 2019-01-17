import { baseUrl, baseImageUrl, idImg, bizIdImg, imgUrl, uploadUrl, imgParams } from '../config/urls'
import { getFileInfo } from '../service/baseApi'
// 日期处理库day.js和插件
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
// 载入weex消息提示模块
const modal = weex.requireModule('modal')

export default {
    data () {
        return {
            baseUrl: baseUrl,
            baseImageUrl: baseImageUrl,
            idImg: idImg,
            bizIdImg: bizIdImg,
            imgUrl: imgUrl,
            uploadUrl: uploadUrl,
            imgParams: imgParams,
            token: '',
            userId: '',
            tabStyles: {
                leftOffset: 80,
                bgColor: '#FFFFFF',
                titleColor: '#666666',
                isActiveTitleBold: true,
                hasActiveBottom: true,
                activeBottomHeight: 6,
                activeBottomWidth: 160,
                textPaddingLeft: 10,
                textPaddingRight: 10
            },
            // 退出APP所需次数
            maxHomeBackTriggerTimes: 1,
            // 退出APP时已按次数
            curHomeBackTriggerTimes: 0,
            state: {
                isLoading: false,
                canClick: true,
                canRequest: true
            },
            appState: {
                isLoading: false,
                isRefreshing: false
            }
        }
    },
    computed: {
        pageHeight () {
            const { deviceWidth, deviceHeight, navBarHeight, statusBarHeight } = weex.config.eros
            return deviceHeight * 750 / deviceWidth - navBarHeight - statusBarHeight
        },
        pageAllHeight () {
            const { deviceWidth, deviceHeight, navBarHeight, statusBarHeight } = weex.config.eros
            return deviceHeight * 750 / deviceWidth
        }
    },
    methods: {
        // loading载入提示
        appShowLoading (type, text = '载入中，请稍后') {
            if (type === 'more') {
                this.appState.isLoading = true
            }
            if (type === 'refresh') {
                this.appState.isRefreshing = true
            }
            // this.$notice.loading.show(text)
            setTimeout(() => {
                // this.$notice.loading.hide()
                this.appState.isLoading = false
                this.appState.isRefreshing = false
            }, 5000)
        },
        // 关闭loading
        appHideLoading (type) {
            if (type === 'more') {
                ++this.appPage
            }
            if (type === 'refresh') {
                this.appPage = 2
            }
            // this.$notice.loading.hide()
            this.appState.isLoading = false
            this.appState.isRefreshing = false
        },
        // 连续点击
        xClick () {
            if (this.state.canClick) {
                this.state.canClick = false
                this.showLoading('正在提交，请稍后')
                setTimeout(() => {
                    this.state.canClick = true
                }, 3000)
                return true
            } else {
                this.toast('正在提交中，请稍后')
                return false
            }
        },
        // 连续请求控制，专门用于eros生命周期运行两次的bug
        xRequest () {
            if (this.state.canRequest) {
                this.state.canRequest = false
                setTimeout(() => {
                    this.state.canRequest = true
                }, 1000)
                return true
            } else {
                return false
            }
        },
        // 图片相关
        getImageUrl (string) {
            if (string) {
                if (string.includes('level')) {
                    return `${this.baseImageUrl}/${string}`
                } else if (string.includes('api_file/view.do')) {
                    const params = string.split('=')[1]
                    if (params.length === 32) {
                        return `${this.baseImageUrl}/api_file/view.do?businessId=${params}`
                    } else {
                        return `${this.baseImageUrl}/api_file/view.do?id=${params}`
                    }
                } else if (string.length === 32) {
                    return `${this.baseImageUrl}/api_file/view.do?businessId=${string}`
                } else if (string.includes('https')) {
                    return string
                } else {
                    return `${this.baseImageUrl}/api_file/view.do?id=${string}`
                }
            } else {
                return ''
            }
        },
        async getImageUrls (string) {
            function getUrls (result) {
                const array = []
                if (Object.keys(result).length && result.data && result.data.length) {
                    for (const item of result.data) {
                        if (item.viewUrl) {
                            array.push(`${baseImageUrl}/${item.viewUrl}`)
                        } else if (`${baseImageUrl}/${item.thumUrl}`) {
                            array.push(`${baseImageUrl}/${item.thumUrl}`)
                        } else if (item.ossUrl) {
                            array.push(`${baseImageUrl}/${item.ossUrl}`)
                        }
                    }
                    return array
                } else {
                    return array
                }
            }
            if (string) {
                if (string.includes('level')) {
                    const params = string.split('=')[1].split('&')[0]
                    const result = await getFileInfo(params)
                    return getUrls(result)
                } else if (string.length === 32) {
                    const result = await getFileInfo(string)
                    return getUrls(result)
                } else if (string.includes('api_file/view.do')) {
                    const params = string.split('=')[1]
                    const result = await getFileInfo(params)
                    return getUrls(result)
                } else {
                    return []
                }
            } else {
                return []
            }
        },
        showBigPic (item) {
            if (Array.isArray(item)) {
                this.$image.preview({
                    index: 1,
                    images: item
                })
            } else {
                this.$image.preview({
                    index: 1,
                    images: [item]
                })
            }
        },
        async getImageInfoData (id) {
            let urls = []
            const data = await getFileInfo(id)
            if (!data.success) return urls
            const images = data.data
            urls = images.map((value) => {
                value.imageUrl = this.baseImageUrl + '/' + value.viewUrl
                return value
            })
            return urls
        },
        // 提示框
        toast (text, time = 3) {
            modal.toast({
                message: text,
                duration: time
            })
        },
        confirm (msg, callback) {
            modal.confirm({
                message: msg,
                duration: 3,
                okTitle: '确认',
                cancelTitle: '取消'
            }, (value) => {
                callback(value)
            })
        },
        // loading载入提示
        showLoading (text = '载入中，请稍后') {
            this.state.isLoading = true
            this.$notice.loading.show(text)
            setTimeout(() => {
                if (this.state.isLoading) {
                    this.hideLoading()
                }
            }, 3000)
        },
        // 关闭loading
        hideLoading () {
            this.state.isLoading = false
            this.$notice.loading.hide()
        },
        // 使用eros路由系统的返回功能
        goBack (params) {
            if (params) {
                this.$router.setBackParams(params)
            }
            this.$router.back()
        },
        // 使用eros路由系统的跳转功能
        goTo (url, params, isLogin, navTitle) {
            if (isLogin === 'needLogin') {
                if (this.userId || url === 'user.reset' || url === 'user.register') {
                    this.$router.open({ name: url, params, navTitle: navTitle, backgroundColor: '#fff' })
                } else {
                    this.$router.open({ name: 'user.login' })
                }
            } else {
                this.$router.open({ name: url, params, navTitle: navTitle, backgroundColor: '#fff' })
            }
        },
        // 获取用户信息
        async getUser () {
            this.token = this.$storage.getSync('token')
            this.userId = this.$storage.getSync('userId')
            if (!this.token && !this.userId) {
                setTimeout(() => {
                    this.getUser()
                }, 500)
            }
        },
        // 工具类
        isEmpty  (obj) {
            return undefined === obj || obj === '' || obj === null || typeof (obj) === undefined || obj === 'undefined'
        },
        delHtmlTags (str) {
            if (str && str !== '') {
                return str.replace(/<[^>]+>/g, '')
            } else {
                return ''
            }
        },
        checkUrL (url) {
            const reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/
            if (!reg.test(url)) {
                return true
            } else {
                // return false
                return true
            }
        },
        getUUID  (num = 32, digits = 32) {
            // num为所需的随机字符长度，digits为进制数
            let guid = ''
            for (let i = 0; i < num; i++) {
                guid += Math.floor(Math.random() * digits).toString(digits)
            }
            return guid.toUpperCase()
        },
        dataURItoBlob  (dataURI) { // 图片转成Buffer
            const byteString = atob(dataURI.split(',')[1])
            const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
            const ab = new ArrayBuffer(byteString.length)
            const ia = new Uint8Array(ab)
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i)
            }
            return new Blob([ia], { type: mimeString, fileName: 'a.png' })
        },
        isEmail  (val) {
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(val)
        },
        // 安卓自定义退出APP
        androidFinishApp () {
            const globalEvent = weex.requireModule('globalEvent')
            globalEvent.addEventListener('homeBack', options => {
                this.curHomeBackTriggerTimes === this.maxHomeBackTriggerTimes && this.$router.finish()
                this.toast('再按一次退出程序')
                this.curHomeBackTriggerTimes++
                setTimeout(() => {
                    this.curHomeBackTriggerTimes = 0
                }, 3000)
            })
        }
    },
    beforeCreate () {
        // 使用dayjs插件
        dayjs.locale('zh-cn')
        dayjs.extend(relativeTime)
        // 挂载dayjs到vue实例中，以便在<template>中使用dayjs的方法
        this.$dayjs = dayjs
    },
    created () {
        // 获取用户基础信息
        this.getUser()
        // 运行安卓自定义退出程序
        this.androidFinishApp()
    }
}
