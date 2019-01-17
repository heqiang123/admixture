// 这里的后缀都是 .js 因为打包出来的都是js文件，而不是.vue文件，我们要告诉客户端跳转那个js

//  这里的路径和dev.json路径的区别
//  pages里面配置的是路由跳转的地址，也就是dev生成的 dist文件夹下的js bundle路径 从dist/js开始
//  dev.json 的 exports 需要打包的js地址，填入src的需要被打包成js bundle的地址   从src开始

export default {
    'index': {
        title: '',
        url: '/pages/index.js'
    },
    'noLogin.noLogin': {
        title: '',
        url: '/pages/noLogin/noLogin.js'
    },
    'service.index': {
        title: '服务咨询',
        url: '/pages/service/index.js'
    },
    'home.newsList': {
        title: '',
        url: '/pages/home/newsList.js'
    },
    'home.newsDetails': {
        title: '',
        url: '/pages/home/newsDetails.js'
    },
    'home.softList': {
        title: '',
        url: '/pages/home/softList.js'
    },
    'home.scan': {
        title: '',
        url: '/pages/home/scan.js'
    },
    'design.index': {
        title: '',
        url: '/pages/design/index.js'
    },
    'designer.index': {
        title: '设计师',
        url: '/pages/design/designer.js'
    },
    'design.storeDesigner': {
        title: '门店设计师',
        url: '/pages/design/storeDesigner.js'
    },
    'case.index': {
        // title: '案例',
        url: '/pages/design/case.js'
    },
    'design.designer': {
        title: '',
        url: '/pages/design/designerInfo.js'
    },
    'design.case': {
        title: '',
        url: '/pages/design/caseInfo.js'
    },
    'case.list': {
        title: '案例',
        url: '/pages/design/caseList.js'
    },
    'estate.index': {
        title: '',
        url: '/pages/estate/index.js'
    },
    'estate.details': {
        title: '',
        url: '/pages/estate/estateDetails.js'
    },
    'store.index': {
        title: '',
        url: '/pages/store/index.js'
    },
    'store.details': {
        title: '',
        url: '/pages/store/storeDetails.js'
    },
    'con.index': {
        title: '',
        url: '/pages/construction/index.js'
    },
    'con.details': {
        title: '',
        url: '/pages/construction/constructionDetails.js'
    },
    'con.image': {
        title: '实景图片',
        url: '/pages/construction/activeImage.js'
    },
    'search.index': {
        title: '',
        url: '/pages/search/index.js'
    },
    'order.fastBudget': {
        title: '',
        url: '/pages/order/fastBudget.js'
    },
    'order.con': {
        title: '预约工地',
        url: '/pages/order/fastBudget.js'
    },
    'order.store': {
        title: '预约门店',
        url: '/pages/order/fastBudget.js'
    },
    'noLogin': {
        title: '',
        url: '/pages/noLogin.js'
    },
    'order.prebook': {
        title: '',
        url: '/pages/order/prebook.js'
    },
    'order.preciseBudget': {
        title: '精准预算',
        url: '/pages/order/preciseBudget.js'
    },
    'order.smartBudget': {
        title: '智能预算',
        url: '/pages/order/smartBudget.js'
    },
    'user.inspiration': {
        title: '我的灵感',
        url: '/pages/user/myInspiration.js'
    },
    'user.message': {
        title: '',
        url: '/pages/user/myMessage.js'
    },
    'user.aboutUs': {
        title: '关于我们',
        url: '/pages/user/aboutUs.js'
    },
    'user.personal': {
        title: '个人信息',
        url: '/pages/user/personal.js'
    },
    'user.setting': {
        title: '设置',
        url: '/pages/user/setting.js'
    },
    'user.binding': {
        title: '绑定',
        url: '/pages/user/binding.js'
    },
    'user.feedBack': {
        title: '建议与反馈',
        url: '/pages/user/feedBack.js'
    },
    'user.signInWithLogin': {
        title: '第三方登录',
        url: '/pages/user/signInWithLogin.js'
    },
    'user.changePassword': {
        title: '第三方注册',
        url: '/pages/user/changePassword.js'
    },
    'others.comments': {
        title: '评论',
        url: '/pages/others/writeComments.js'
    },
    'others.map': {
        title: '地图',
        url: '/pages/others/map.js'
    },
    'others.success': {
        title: '',
        url: '/pages/others/success.js'
    },
    'others.allComments': {
        title: '所有评论',
        url: '/pages/others/allComments.js'
    },
    'comment.index': {
        title: '评论',
        url: '/pages/comment/index.js'
    },
    'user.login': {
        title: '登录',
        url: '/pages/user/login.js'
    },
    'user.reset': {
        title: '忘记密码',
        url: '/pages/user/reset.js'
    },
    'user.register': {
        title: '注册',
        url: '/pages/user/register.js'
    },
    'atjia.index': {
        // title: '',
        url: '/pages/atjia/index.js'
    },
    'newAtJia.index': {
        title: '',
        url: '/pages/newAtJia/index.js'
    },
    'newAtJia.allorder': {
        title: '',
        url: '/pages/newAtJia/allorder.js'
    },
    'contract.list': {
        // title: '我的合同',
        url: '/pages/contract/contractList.js'
    },
    'contract.detail': {
        title: '材料合同',
        url: '/pages/contract/contractDetail.js'
    },
    'contract.baseContract': {
        title: '基装合同',
        url: '/pages/contract/baseContract.js'
    },
    'contract.designContract': {
        title: '设计合同',
        url: '/pages/contract/designContract.js'
    },
    'contract.coatDetail': {
        title: '费用详情',
        url: '/pages/contract/coatDetail.js'
    },
    'others.report': {
        title: '验收报告',
        url: '/pages/others/receivingReport.js'
    },
    'others.draw': {
        // title: '设计图纸',
        url: '/pages/others/designDrawings.js'
    },
    'others.mapList': {
        title: '地图',
        url: '/pages/others/housemap.js'
    },
    'quotation.index': {
        title: '合同报价单',
        url: '/pages/quotation/index.js'
    },
    'quotation.list': {
        title: '报价单',
        url: '/pages/quotation/list.js'
    },
    'refund.details': {
        title: '退货单列表',
        url: '/pages/refund/refundDetails.js'
    },
    'refund.list': {
        title: '退货单详情',
        url: '/pages/refund/refundList.js'
    },
    'project.modification': {
        title: '项目变更',
        url: '/pages/project/modification.js'
    },
    'setIndex.index': {
        // title: '安全设置',
        url: '/pages/setIndex/index.js'
    },
    'phone': {
        title: '手机号',
        url: '/pages/setIndex/phone.js'
    },
    'setIndex.changePhone': {
        title: '更改手机号',
        url: '/pages/setIndex/changePhone.js'
    },
    'test.index': {
        title: '测试页面',
        url: '/pages/test/test.js'
    },
    'desig.index': {
        title: '',
        url: '/pages/desig/index.js'
    },
    'personInfo.index': {
        title: '我的家',
        url: '/pages/personInfo/index.js'
    },
    'personalInfor.index': {
        title: '个人信息 我的家',
        url: '/pages/personalInfor/index.js'
    },
    'setIndex.newPhone': {
        title: '新手机号',
        url: '/pages/setIndex/newPhone.js'
    },
    'personInfo.add': {
        title: '房屋信息详情',
        url: '/pages/personInfo/add.js'
    },
    'personInfo.chooseCity': {
        title: '',
        url: '/pages/personInfo/chooseCity.js'
    },
    // 'designer.index': {
    //     title: '设计师',
    //     url: '/pages/designer/index.js'
    // },
    'personInfo.addDetails': {
        title: '',
        url: '/pages/personInfo/addDetails.js'
    },
    'personInfo.search': {
        title: '',
        url: '/pages/personInfo/search.js'
    },
    'code': {
        title: '',
        url: '/pages/code/index.js'
    },
    'dataLi.index': {
        title: '日历',
        url: '/pages/dataLi/index.js'
    },
    'dataLi.addnote': {
        title: '添加笔记',
        url: '/pages/dataLi/addnote.js'
    },
    'dataTest.index': {
        title: '',
        url: '/pages/dataTest/index.js'
    },
    'myHome.myHome': {
        url: '/pages/myHome/myHome.js'
    },
    'feeDetails.feeDetails': {
        url: '/pages/feeDetails/feeDetails.js'
    },
    'costSummary.costSummary': {
        url: '/pages/costSummary/costSummary.js'
    },
    'allOrders.allOrders': {
        // title: '全部订单',
        url: '/pages/allOrders/allOrders.js'
    },
    'feeDetails.allFees': {
        title: '全部费用',
        url: '/pages/feeDetails/allFees.js'
    }
}
