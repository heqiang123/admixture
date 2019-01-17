// 工程端接口地址
import $fetch from './fetch'
import { baseUrl } from '../config/urls'

// 获取热门楼盘列表
export const getHotEstateList = (method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/app/busiContentHouseFrontAPP/findHouseIsOk`,
        method: method
    })
}

// 获取楼盘列表
export const getEstateList = (data, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/app/busiContentHouseFrontAPP/query`,
        method: method,
        data: data
    })
}
// 获取楼盘列表
export const newGetEstateList = (data, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/wap/BusiContentHouseWapAction/query`,
        method: method,
        data: data
    })
}

// 根据id获取楼盘详情
export const getEstateById = (id, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/app/busiContentHouseFrontAPP/getBusiContentHouseByIdApp/${id}`,
        method: method
    })
}

// 根据id获取楼盘工地
export const getWorkSiteByEstate = (data, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/app/busiContentHouseFrontAPP/getBusiContentWorksiteDtoByHouseIdAPP`,
        method: method,
        data: data
    })
}

// 根据id获取楼盘设计师

export const getDesignesByEstate = (data, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/app/busiContentHouseFrontAPP/getBusiContentDesignerDtoByHouseIdAPP`,
        method: method,
        data: data
    })
}

// 根据id获取楼盘案例

export const getCaseByEstate = (data, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/app/BusiContentCaseFrontAction/queryByParms`,
        method: method,
        data: data
    })
}

// 预约工地
export const makeWorkSize = (data, method) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCustomerOrder/quickOrder`,
        method: method,
        data: data
    })
}

// 预约次数
export const getNums = (data) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCustomerBook/get/${data}`,
        method: 'GET'
    })
}

// 修改预约次数
export const newGetNums = (data) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCustomerBook/getCount/${data}`,
        method: 'GET'
    })
}
