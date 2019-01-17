import $fetch from './fetch'
import { baseUrl } from '../config/urls'
// 获取评论
export const getDesignerDetail = (id, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiContentCase/getBusiContentCase/${id}`,
        method: method
    })
}
// 获取评论的数量

export const findPraiseCommentByBusinessIdAndType = (data) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiPraiseComment/findPraiseCommentByBusinessIdAndType`,
        data: data
    })
}
// 工地详情评论

export const getWorkSite = (id, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiContentWorksite/getWorkSite/${id}`,
        method: method
    })
}
// 门店评论
export const getById = (id, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiContentStore/getById/${id}`,
        method: method
    })
}
// 评论成功
export const addApp = (data, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/app/busiPraiseCommentMobileAction/addApp`,
        method: method,
        data: data
    })
}

// 得到评论的内容
export const findTagsByTypeAndBusinessId = (data, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/app/busiPraiseCommentMobileAction/findTagsByTypeAndBusinessId`,
        method: method,
        data: data
    })
}

//
// export const getWorkSite = (id, method) => {
//     return $fetch({
//         url: `${baseUrl}/api_cms/busiContentWorksite/getWorkSite/${id}`,
//         method: method,
//     })
// }
