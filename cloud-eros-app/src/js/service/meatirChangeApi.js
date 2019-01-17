import $fetch from './fetch'
import { baseUrl } from '../config/urls'

export const getBaseChange = (id, method) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getProjectChangeBase/${id}`,
        method: method
    })
}
// 根据服务单id查询个各种数据
export const getOrder = (id, data, method) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/queryService/${id}`,
        data: data,
        method: method
    })
}
// 根据id查询需求信息
export const getqueryOrders = (id, method) => {
    return $fetch({
        url: `${baseUrl}/api_busi/cmsMyHome/getCaseByDesignerId/${id}`,
        method: method
    })
}
// 报价单列表的请求接口
export const getMaterialList = (id, method) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getMateriaList/${id}`,
        method: method
    })
}
// 根据合同ID查询报价单列表
export const getMateriaListByContractId = (id, method) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getMateriaListByContractId/${id}`,
        method: method
    })
}
// 退货单的列表

export const getReturnList = (id, type) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getReturnList/${id}/${type}`,
        method: 'GET'
    })
}
// 根据服务订单获取量房的数据
export const getRoom = (serviceIds, method) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getRoom`,
        method: method
    })
}
// 根据服务订单查询退化单
export const getBackList = (id) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getBackList/${id}`,
        method: 'GET'
    })
}

// 根据退货单ID查询退货单详情
export const getRefullDetail = (id) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getBackDetail/${id}`,
        method: 'GET'
    })
}
