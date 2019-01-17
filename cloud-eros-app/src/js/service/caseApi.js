import $fetch from './fetch'
import { baseUrl } from '../config/urls'

export const BusiContentCase = (data, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/wap/BusiContentCaseWapAction/queryByParmsDesign`,
        data: data,
        method: method
    })
}
export const getBusiContentCaseById = (id, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiContentCase/getBusiContentCase/${id}`,
        method: method
    })
}
export const getBusiContentHouseByCaseId = (id, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiProject/getBusiContentHouseByCaseId/${id}`,
        method: method
    })
}
// 设计师信息的接口
export const getBusiContentDesignerById = (id, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiContentDesigner/getBusiContentDesignerByCaseId/${id}`,
        method: method
    })
}
// 只能案例推送
export const getgroomCase = (id, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiContentCase/groomCase/${id}`,
        method: method
    })
}
// export const getBusiContentCaseById = (id, method) => {
//     return $fetch({
//         url: `${baseUrl}/api_file/getFiles.do?actionMethod=getFiles&businessIds/${id}`,
//         method: method
//     })
// }
// 设计师的详细
export const getBusiContentDesignerFrontAction = (data, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/app/BusiContentDesignerFrontAction/queryByParms`,
        data: data,
        method: method
    })
}
// wap设计师的详细
export const newGetBusiContentDesignerFrontAction = (data, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/wap/BusiContentDesignerWapAction/queryByParms`,
        data: data,
        method: method
    })
}
// 设计师详情部分接口
// 1.详情
export const getDesignerDetail = (id, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/app/BusiContentDesignerFrontAction/getDesigner/${id}`,
        method: method
    })
}
// 得到下面类似标签的数据
export const findTagsByTypeAndBusinessId = (data, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/app/busiPraiseCommentMobileAction/findTagsByTypeAndBusinessId`,
        data: data,
        method: method
    })
}

// 获取设计师的作品
export const getCaseBydesignerId = (data, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/app/BusiContentDesignerFrontAction/getCaseBydesignerId`,
        data: data,
        method: method
    })
}
// 获取设计师的动态
export const getDesingerStateBydesignerId = (id, data, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/app/BusiContentDesignerFrontAction/getDesingerStateBydesignerId/${id}`,
        data: data,
        method: method
    })
}
// 关注
export const setFollow = (id, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCusotmerFavors/follow/DESIGN/${id}`,
        method: method
    })
}

// 首页精选案例
export const getChoiceCase = (method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiContentCase/choiceCase`,
        method: method
    })
}

