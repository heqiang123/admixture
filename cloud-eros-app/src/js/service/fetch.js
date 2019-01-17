// 简单版封装请求，目前不封装短方法，默认post请求

const bmAxios = weex.requireModule('bmAxios')
const storage = weex.requireModule('bmStorage')
const modal = weex.requireModule('modal')
const router = weex.requireModule('bmRouter')

const $fetch = (options = {}) => {
    const {
        method = 'POST',
        url,
        header = {
            'Content-type': 'application/json',
            appId: 'client_app'
        },
        data = {}
    } = options

    // 判断是否有token
    const token = storage.getDataSync('token').data
    if (token) {
        header['token'] = token.toString().replace(/\"/g, '')
    }

    const currentRegion = storage.getDataSync('currentValue').data
    if (currentRegion) {
        header['currentRegion'] = JSON.parse(currentRegion).currentValue
    }

    console.log(`Send: ${url} ${JSON.stringify(header)} ${JSON.stringify(data)} ${method}`)

    return new Promise((resolve, reject) => {
        return bmAxios.fetch({
            method,
            url,
            header,
            data,
            timeout: 50000
        }, (resData) => {
            // console.log(resData)
            // 统一拦截器
            const { status, errorMsg, data } = resData
            if (Number(status) === 200 || Number(status) === 201) {
                resolve(data)
                console.log(`Request: ${url} ${JSON.stringify(data)}`)
            } else {
                // console.log(`Error: ${url} status: ${status} message: ${errorMsg}`)
                // 统一超时拦截处理
                if (Number(status) === 9) {
                    modal.toast({
                        message: '网络超时，请重试'
                    })
                } else if (Number(status) === 401) { // token过期
                    storage.removeDataSync()
                    router.open('/pages/user/login.js')
                } else {
                    modal.toast({
                        message: `错误码${status}，错误信息：${errorMsg}`
                    })
                }
                reject(resData)
            }
        })
    })
}

export default $fetch
