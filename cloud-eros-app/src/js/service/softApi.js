// 工程端接口地址
import $fetch from './fetch'
import { baseUrl } from '../config/urls'
// 获取软装列表
export const getSoftList = (data, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/jcContent/contentOss/AppAndPc/list`,
        data: data,
        method: method
    })
}

// 获取软文详情
export const getContentById = (id, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/jcContent/content/getOss?id=${id}`,
        method: 'GET'
    })
}

export const getChannelList = (id, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/front/channelFront/channel/list`,
        method: method
    })
}
