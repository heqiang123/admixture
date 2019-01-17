import $fetch from './fetch'
import { baseUrl } from '../config/urls'
// 获取工地列表
export const getConstList = (data, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/app/busiContentWorkSiteMobileAction/query`,
        method: method,
        data: data
    })
}
// 通过id获取楼盘的工地
export const getConstListByestateId = (data, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/app/busiContentHouseFrontAPP/getBusiContentWorksiteDtoByHouseIdAPP`,
        method: method,
        data: data
    })
}
// 获取门店案例的列表
export const getAllCaseByStoreIdPage = (data, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/app/BusiContentStoreFrontAction/getAllCaseByStoreIdPage`,
        methos: method,
        data: data
    })
}
// 获取门店对应的设计师
export const getDesignerByStoreIdPage = (data, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/app/BusiContentStoreFrontAction/getDesignerByStoreIdPage`,
        methos: method,
        data: data
    })
}
// 获取门店的详情
export const getById = (id, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiContentStore/getById/${id}`,
        method: method
    })
}
