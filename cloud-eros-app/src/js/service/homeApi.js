// 工程端接口地址
import $fetch from './fetch'
import { baseUrl } from '../config/urls'

// 获取轮播图
export const getAdvertisement = (method) => {
    const data = { 'state': '1', 'terminal': '0' }
    return $fetch({
        url: `${baseUrl}/api_cms/busiContentCarousel/getContentCarouselByCodeAndStateAndTerminal`,
        data: data,
        method: method
    })
}

// 获取城市列表
export const getAvaliableRegion = (method) => {
    return $fetch({
        url: `${baseUrl}/api/region/getAvaliableRegion`,
        method: method
    })
}
// 根据登陆者id,获取楼盘详情
export const getHouse = (id, method) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getHouse/${id}`,
        method: method
    })
}
// 根据服务单id获取报价单详情
export const getMaterialDetails = (id, method) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getOfferDetail/${id}`,
        method: method
    })
}
// 创建需求订单

export const addBizOrder = (data, method) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/addBizOrder`,
        data: data,
        method: method
    })
}

// 编辑订单
export const editBizOrder = (orderId, data, method) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/editBizOrder/${orderId}`,
        data: data,
        method: method
    })
}

export const getGoodDetailInfo = (id, type) => {
    return $fetch({
        method: 'GET',
        url: `${baseUrl}/api_busi/bizOrderOfferGoodsDetail/getGoodDetailInfo/${id}/${type}`
    })
}

// 通过id查看 二级/三级 分类 1:主材 2:定加工 3:软装
export const itemcat = (id = 1266) => {
    return $fetch({
        method: 'GET',
        url: `${baseUrl}/api_ec/prana/itemcat/list?id=${id}`
    })
}

export const confirmOffer = (data) => {
    return $fetch({
        url: `${baseUrl}/api_busi/bizOrderOfferGoodsDetail/appCustomerConfirm`,
        data
    })
}
