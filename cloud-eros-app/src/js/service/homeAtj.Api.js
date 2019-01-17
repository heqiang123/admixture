import $fetch from './fetch'
import { baseUrl } from '../config/urls'
// 根据登陆者id,获取设计师
export const getDesigner = (id, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/cmsMyHome/getDesigner/${id}`,
        method: method
    })
}
// 根据登陆者id,获取登录者详情
export const getMessage = (id, method) => {
    return $fetch({
        url: `${baseUrl}/api/fwAccountMyHome/getMessage/${id}`,
        method: method
    })
}
// 获取材料管家，客户经理，项目经理信息
export const getFwAccount = (id) => {
    return $fetch({
        url: `${baseUrl}/api/fwAccountMyHome/getFwAccount/${id}`,
        method: 'GET'
    })
}

export const getReport = (projectId, type, data) => {
    return $fetch({
        url: `${baseUrl}/api_proj/projMyHomeAction/getReport/${projectId}/${type}`,
        data: data
    })
}
// 根据项目id,项目阶段查询待办提醒
export const getDealtWith = (projectId, type, data) => {
    return $fetch({
        url: `${baseUrl}/api_cms/cmsMyHome/getDealtWith/${projectId}/${type}`,
        data: data
    })
}
/**
 * 根据登录者ID查询我的家楼盘信息
 * @param id
 */
export const getHouseByCustomerId = (registerId) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getHouse/${registerId}`,
        method: 'GET'
    })
}
// 根据合同id查询合同费用详情
export const getContractCost = (id, type) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getContractCost/${id}/${type}`,
        method: 'GET'
    })
}
// 根据服务订单查询各个信息

export const queryServices = (id) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/queryServices/${id}`,
        method: 'GET'
    })
}

// 根据任务角色的ID查询各个人物信息
// export const findById = (data) => {
//     return $fetch({
//         url: `${baseUrl}/api/findById`,
//         data: data
//     })
// }

// 根据登录着的id获取需求订单
export const getQueryOrder = (id) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/queryOrder/${id}`,
        method: 'GET'
    })
}
// 根据需求订单id查询服务订单
export const getServiceByOrder = (id) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getServiceByOrder/${id}`,
        method: 'GET'
    })
}
// 删除团队的接口
export const deleteByServiceId = (id) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/deleteByServiceId/${id}`
    })
}
// 终止服务团队的接口
export const shutDownByServiceId = (id) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/shutDownByServiceId/${id}`
    })
}
// 全部订单新需求接口
export const newAllOrders = (id, data) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getOfferDataPage/${id}`,
        data: data,
        method: 'POST'
    })
}
export const orderPlaced = (id, data) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getMaterialOrderDataPage/${id}`,
        data: data,
        method: 'POST'
    })
}
export const returned = (id, data) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getBackOrderDataPage/${id}`,
        data: data,
        method: 'POST'
    })
}
export const confirmButton = (id) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/affirmOfferOrderByCustomer/${id}`,
        method: 'GET'
    })
}
export const myHomeData = (id) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getProjectInfoByRegisterId/${id}`,
        method: 'GET'
    })
}
export const costSummary = (id) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getContractDataPage/${id}`,
        method: 'GET'
    })
}
export const allFees = (id) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getContractMaterialInfoById/${id}`,
        method: 'GET'
    })
}
export const deleteMessage = (id) => {
    return $fetch({
        url: `${baseUrl}/api_cms/cmsMyHome/deleteNewsById/${id}`,
        method: 'GET'
    })
}
export const deleteComment = (id) => {
    return $fetch({
        url: `${baseUrl}/api_cms/app//busiPraiseCommentMobileAction/deleteAppToParker/${id}`,
        method: 'GET'
    })
}
export const oldAllOrders = (id, type) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/setIsRead/${id}/${type}`,
        method: 'GET'
    })
}

