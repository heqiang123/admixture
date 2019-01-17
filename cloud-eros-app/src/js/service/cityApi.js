import $fetch from './fetch'
import { baseUrl } from '../config/urls'
// 获取所有 的城市
export const busiContentHouse = (data, method) => {
    return $fetch({
        url: `${baseUrl}/api/region/getAllCity`,
        data: data,
        method: method
    })
}
export const getBusiContentHouse = (data, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiContentHouse/query`,
        data: data,
        method: method
    })
}

