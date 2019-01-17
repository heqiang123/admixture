import $fetch from './fetch'
import { baseUrl } from '../config/urls'

/**
 * 根据服务订单ID查询项目信息
 * @param serviceId
 */
export const getProjectByServiceId = (orderId) => {
    return $fetch({
        url: `${baseUrl}/api_proj/projMyHomeAction/getProjectByOrder/${orderId}`,
        method: 'GET'
    })
}

/**
 * 根据服务订单和类型查询合同信息
 * @param serviceId
 * @param type
 */
export const getContractList = (serviceId, type) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getContract/${serviceId}/${type}`,
        method: 'GET'
    })
}

/**
 * 根据id查询费用详情
 * @param id
 */
export const getCostDetailById = (id, type) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getCostDetailById/${id}/${type}`
    })
}
/**
 * 获取动态数据
 * @param id
 * @param stage
 * @param data
 */
export const getDynamicDtoServiceId = (id, stage, type, data) => {
    return $fetch({
        url: `${baseUrl}/api_proj/projMyHomeAction/getDynamicDtoServiceId/${id}/${stage}/${type}`,
        data: data
    })
}
/**
 * 获取量房、初步设计、深化设计等动态数据
 * @param id
 * @param stage
 * @param data
 */
export const getBizDynamicDto = (id, stage, data) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getBizDynamicDto/${id}/${stage}`,
        data: data
    })
}
/**
 * 获取全部动态数据
 * @param serviceId
 */
export const getAllDynamicDto = (serviceId, method) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getBizDynamicDto/${serviceId}`,
        method: 'GET'
    })
}
/**
 * 添加随手笔记
 * @param data
 */
export const addProjectNote = (data) => {
    return $fetch({
        url: `${baseUrl}/api_proj/projMyHomeAction/addProjectNote`,
        data: data
    })
}
/**
 *  随手笔记继续编辑
 * @param data
 */
export const editNote = (id, data) => {
    return $fetch({
        url: `${baseUrl}/api_proj/projMyHomeAction/editNote/${id}`,
        data: data
    })
}

/**
 * 查询日记
 * @param proId
 * @param time
 */
export const getDiaryList = (proId, time) => {
    return $fetch({
        url: `${baseUrl}/api_proj/projMyHomeAction/findProjectNote/${proId}/${time}`,
        method: 'GET'
    })
}
/**
 * 删除日历
 * @param noteId
 */
export const deleteNoteById = (noteId) => {
    return $fetch({
        url: `${baseUrl}/api_proj/projMyHomeAction/deleteProjectNote/${noteId}`
    })
}
