import $fetch from './fetch'
import { baseUrl } from '../config/urls'
// 工地详情的接口
export const getWorkSite = (id, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiContentWorksite/getWorkSite/${id}`,
        method: method
    })
}
// 相关工地的设计师
export const getGdDesinger = (code, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiContentWorksite/findDesignerByWorkId/${code}`,
        method: method
    })
}
