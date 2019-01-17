import $fetch from './fetch'
import { baseUrl } from '../config/urls'
// 通知的接口
export const getNotice = (userCode, data) => {
    return $fetch({
        url: `${baseUrl}/api_cms/app/busiContentPushFront/myNotice/${userCode}`,
        data: data
    })
}
// 评论的接口
export const getAllPraiseByCusId = (data) => {
    return $fetch({
        url: `${baseUrl}/api_cms/front/busiPraiseComment/getAllPraiseByCusId`,
        data: data
    })
}
