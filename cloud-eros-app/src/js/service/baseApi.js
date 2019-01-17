// 工程端接口地址
import $fetch from './fetch'
import { baseUrl, imgUrl } from '../config/urls'
// 获取楼盘列表
export const getFileInfo = (businessIds) => {
    return $fetch({
        url: `${baseUrl}/api_file/getFiles.do?actionMethod=getFiles&businessIds=${businessIds}`,
        method: 'GET'
    })
}
export const getBusiContentHouseByMap = () => {
    return $fetch({
        url: `${baseUrl}/api_cms/app/busiContentHouseFrontAPP/findHouseFrontByMap`
    })
}

export const uploadFile = (businessId, data, method) => {
    return $fetch({
        url: `/api_file/upload.do?actionMethod=process&&systemHeader=/cms/content/comment&&busiType=comment&&businessId=${businessId}`,
        data: data,
        method: method
    })
}

// 上传头像
export const uploadAvatar = (businessId, data, method) => {
    return $fetch({
        url: `${baseUrl}/api_file/upload.do?actionMethod=process&systemHeader=/cms/user&busiType=USER&businessId=${businessId}`,
        data: data,
        method: method
    })
}

// 获取筛选标签
export const getTags = (type) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiOprationTag/getListByRelationObjectAndRealUse/${type}`,
        method: 'GET'
    })
}

// 服务、立即预约
export const postServer = (data) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCustomerOrder/quickOrder`,
        data: data
    })
}

// 获取客服电话
export const serverPhone = () => {
    return $fetch({
        url: `${baseUrl}/api/org/findOrg`,
        method: 'GET'
    })
}

// 用户点赞
export const userSetUp = (sort, targetId) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCusotmerFavors/up/${sort}/${targetId}`
    })
}
// 动态点赞统计
export const userUpCount = (id) => {
    return $fetch({
        url: `${baseUrl}/api_cms/bizdesingerstateaction/insertUp/${id}`,
        method: 'GET'
    })
}
// 用户收藏
export const userSetSave = (sort, targetId) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCusotmerFavors/save/${sort}/${targetId}`
    })
}

// 用户关注
export const userSetFollow = (sort, targetId) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiCusotmerFavors/follow/${sort}/${targetId}`
    })
}

// 0、案例评论 1、楼盘评论2、门店评论3、工地评论4、设计师评论5、软文评论

export const getCommentList = (data) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiPraiseComment/findPraiseCommentByBusinessIdAndType`,
        data: data
    })
}

// 发送评论
export const sendComment = (data) => {
    return $fetch({
        url: `${baseUrl}/api_cms/app/busiPraiseCommentMobileAction/addApp`,
        data: data
    })
}
// 问卷调查
export const saveQuestionDetai = (data) => {
    return $fetch({
        url: `${baseUrl}/api_cms/questionAnswerDetail/saveQuestionDetail`,
        data: data
    })
}

// 获取问卷
export const getIssueQuestionList = () => {
    return $fetch({
        url: `${baseUrl}/api_cms/question/getIssueQuestion`
    })
}

// 获取门店列表
export const getStoreList = (data) => {
    return $fetch({
        url: `${baseUrl}/api_cms/wap/BusiContentStoreWapAction/getIssueStorePage`,
        data: data
    })
}

// 获取反馈类型
export const getDictionaryCache = () => {
    return $fetch({
        url: `${baseUrl}/api/property/getDictionaryCache/carousel_content`,
        method: 'GET'
    })
}

export const addBusiShareSuggestion = (data) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiShareSuggestion/add`,
        data: data
    })
}
// 请求集装合同
export const getBase = (id, method) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getMaterialList/${id}`,
        method: method
    })
}

// 根据服务订单查询量房数据
export const getMeasure = (id) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getRoom/${id}`,
        method: 'GET'
    })
}

// 根据服务订单查询初步设计信息
export const getDesigner = (data) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getChart`,
        data: data
    })
}

// 获取设计图纸(平面图)[我的家—设计图纸]
export const getDesignDrawing = (data) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getGraphicDesignPaperByServiceId`,
        data: data
    })
}

// 根据设计师id查询设计图纸（效果图）
export const getIdDesignDrawing = (data) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getDepthDesignPaperByServiceId`,
        data: data
    })
}

// 通过设计师名称获取设计图纸(平面图)[我的家—设计师名称—设计图纸]
export const getNameDesignDrawing = (designerName, method) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getGraphicDesignPaperByDesignerName/${designerName}`,
        method: method
    })
}

// 根据项目变更（材料）
export const getProjectMaterial = (projectId) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getOrderOfferChange/${projectId}`,
        method: 'GET'
    })
}

// 根据项目变更(基装)
export const getProjectBase = (id) => {
    return $fetch({
        url: `${baseUrl}/api_proj/projMyHomeAction/getProjectChangeBase/${id}`,
        method: 'GET'
    })
}
// GET /projMyHomeAction/getNote/{projectId}/{type}
// 根据项目id,项目阶段查询随手笔记
export const getTakeNotes = (id, type) => {
    return $fetch({
        url: `${baseUrl}/api_proj/projMyHomeAction/getNote/${id}/${type}`,
        method: 'GET'
    })
}
// GET /projMyHomeAction/getQuality/{projectId}/{type}
// 根据项目id和项目阶段查询质检报告
export const getQuality = (id, type) => {
    return $fetch({
        url: `${baseUrl}/api_proj/projMyHomeAction/getQuality/${id}/${type}`,
        method: 'GET'
    })
}
// 根据服务单查询初步设计信息
export const getChart = (data) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getChart`,
        data: data
    })
}
// 根据服务单查询深化设计设计信息
export const getDeepChart = (data) => {
    return $fetch({
        url: `${baseUrl}/api_busi/BizMyHome/getDeepen`,
        data: data
    })
}

export const getImgUrls = (id) => {
    return $fetch({
        url: `${baseUrl}${imgUrl}${id}`,
        method: 'GET'
    })
}
