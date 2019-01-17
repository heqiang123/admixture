// 工程端接口地址
import $fetch from './fetch'
import { baseUrl } from '../config/urls'
// 获取楼盘列表
export const loginApi = (data) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCustomerRegister/LoginByPwd`,
        data: data
    })
}

export const loginByCodeApi = (data) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCustomerRegister/LoginByCode`,
        data: data
    })
}

// 生成验证码接口 type类型0为注册，1为登录,2为忘记密码
export const sendCode = (type, mobilePhone, data) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCustomerRegister/getCodeByPhone/${type}/${mobilePhone}`,
        data: data
    })
}
// 注册用户
export const registerUser = (data) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCustomerRegister/register`,
        data: data
    })
}
// 绑定用户
export const bindUser = (data) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCustomerRegister/thirdBindHas`,
        data: data
    })
}
// 绑定密码
export const bindPassword = (data) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCustomerRegister/thirdRegister`,
        data: data
    })
}
// 修改密码
export const updateUserInfo = (data) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCustomerRegister/password`,
        data: data,
        method: 'PUT'
    })
}

// 获取消息
export const getNews = (id) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getNewsByRegisterId/${id}`,
        method: 'GET'
    })
}

// 获取消息读取状态
export const updateNews = (id) => {
    return $fetch({
        url: `${baseUrl}/api_cms/cmsMyHome/updateNews/${id}`,
        method: 'GET'
    })
}

// 通过id查询用户信息
export const getUserInfoById = (id) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCustomerRegister/memberDisplay/${id}`,
        method: 'GET'
    })
}
// 保存用户信息
export const saveUserInfo = (id, type, data) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCustomerRegister/memberEdit/${id}/${type}`,
        data: data,
        method: 'PUT'
    })
}

// 查询我的收藏、关注、点赞
export const favorsQuery = (page, value) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCusotmerFavors/query?pageNum=${page}&pageSize=6&type=${value}&sort=`,
        method: 'GET'
    })
}
// 取消收藏
export const deleteSave = (value, id) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCusotmerFavors/deleteSave/${value}/${id}`,
        method: 'DELETE'
    })
}
// 取消点赞
export const deleteUp = (value, id) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCusotmerFavors/deleteUp/${value}/${id}`,
        // data: data,
        method: 'DELETE'

    })
}
// 关注
export const see = (id) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCusotmerFavors/follow/DESIGN/${id}`

    })
}
// 取消关注
export const deleteSee = (value, id) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCusotmerFavors/deleteFollow/${value}/${id}`,
        // data: data,
        method: 'DELETE'

    })
}
// 点赞
export const upItem = (sort, targetId) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCusotmerFavors/up/${sort}/${targetId}`
    })
}
// 绑定cid
export const bindCid = (data) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCustomerClient/bind`,
        data: data
    })
}
// 第三方登录
export const wxLogin = (openid, type, cid) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCustomerRegister/thirdLoginApp/${openid}/${type}/${cid}`
    })
}
export const getUserWxPhone = () => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCustomerRegister/getPhoneAndWeChatByZhangkaixuan`,
        method: 'GET'
    })
}
