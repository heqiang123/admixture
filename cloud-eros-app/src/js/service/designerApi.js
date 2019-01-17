import $fetch from './fetch'
import { baseUrl } from '../config/urls'

// 推荐到首页状态的设计师
export const getChoiceDesigner = () => {
    return $fetch({
        url: `${baseUrl}/api_cms/wap/BusiContentDesignerWapAction/findDesignerIsOk`,
        method: 'GET'
    })
}
export const getDesingerStateApi = (id, data) => {
    return $fetch({
        url: `${baseUrl}/api_cms/busiContentMyHome/getDesingerStateBydesignerId/` + id,
        data: data
    })
}
