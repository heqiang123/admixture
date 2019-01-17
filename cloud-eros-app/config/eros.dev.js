// appBoard，mediator 不建议进行修改 如果修改了 也请对应修改
module.exports = {
    'eslint': false,
    'webpackWarnings': false,
    'exports': [
        // appBoard
        'js/config/index.js',
        // mediator
        'js/mediator/index.vue',
        // index
        'js/pages/index.vue',
        'js/pages/noLogin/noLogin.vue',
        // home
        'js/pages/home/index.vue',
        'js/pages/home/newsList.vue',
        'js/pages/home/newsDetails.vue',
        'js/pages/home/softList.vue',
        'js/pages/home/scan.vue',
        // construction
        'js/pages/construction/index.vue',
        'js/pages/construction/constructionDetails.vue',
        'js/pages/construction/activeImage.vue',
        // estate
        'js/pages/estate/index.vue',
        'js/pages/estate/estateDetails.vue',
        // store
        'js/pages/store/index.vue',
        'js/pages/store/storeDetails.vue',
        // design
        'js/pages/design/index.vue',
        'js/pages/design/designer.vue',
        'js/pages/design/designerInfo.vue',
        'js/pages/design/case.vue',
        'js/pages/design/caseList.vue',
        'js/pages/design/caseInfo.vue',
        'js/pages/design/storeDesigner.vue',
        // service
        'js/pages/service/index.vue',
        // user
        'js/pages/user/index.vue',
        'js/pages/user/myInspiration.vue',
        'js/pages/user/myMessage.vue',
        'js/pages/user/aboutUs.vue',
        'js/pages/user/personal.vue',
        'js/pages/user/setting.vue',
        'js/pages/user/binding.vue',
        'js/pages/user/feedBack.vue',
        'js/pages/user/login.vue',
        'js/pages/user/reset.vue',
        'js/pages/user/register.vue',
        'js/pages/user/signInWithLogin.vue',
        'js/pages/user/changePassword.vue',
        // search
        'js/pages/search/index.vue',
        // order
        'js/pages/order/fastBudget.vue',
        'js/pages/order/prebook.vue',
        'js/pages/order/preciseBudget.vue',
        'js/pages/order/smartBudget.vue',
        // comments
        'js/pages/others/writeComments.vue',
        'js/pages/others/allComments.vue',
        // map
        'js/pages/others/map.vue',
        'js/pages/others/housemap.vue',
        'js/pages/others/success.vue',
        // atjia
        'js/pages/atjia/index.vue',
        'js/pages/newAtJia/index.vue',
        'js/pages/newAtJia/allorder.vue',
        // contract
        'js/pages/contract/contractList.vue',
        'js/pages/contract/contractDetail.vue',
        'js/pages/contract/baseContract.vue',
        'js/pages/contract/designContract.vue',
        'js/pages/contract/coatDetail.vue',
        'js/pages/others/receivingReport.vue',
        'js/pages/others/designDrawings.vue',
        // quotation
        'js/pages/quotation/index.vue',
        'js/pages/quotation/list.vue',
        // receiving
        'js/pages/receiving/index.vue',
        // refund
        'js/pages/refund/refundDetails.vue',
        'js/pages/refund/refundList.vue',
        // project
        'js/pages/project/modification.vue',
        // setIndex
        'js/pages/setIndex/index.vue',
        'js/pages/setIndex/phone.vue',
        'js/pages/setIndex/changePhone.vue',
        'js/pages/setIndex/newPhone.vue',
        // person
        'js/pages/personInfo/index.vue',
        'js/pages/test/test.vue',
        'js/pages/personInfo/add.vue',
        'js/pages/personInfo/addDetails.vue',
        'js/pages/personInfo/search.vue',
        'js/pages/personInfo/chooseCity.vue',
        // code
        'js/pages/code/index.vue',
        // dataLi
        'js/pages/dataLi/index.vue',
        'js/pages/dataLi/addnote.vue',
        // dataTest
        'js/pages/dataTest/index.vue',
        'js/pages/personalInfor/index.vue',
        'js/pages/desig/index.vue',
        'js/pages/comment/index.vue',
        'js/pages/noLogin/noLogin.vue',
        'js/pages/myHome/myHome.vue',
        'js/pages/feeDetails/feeDetails.vue',
        'js/pages/costSummary/costSummary.vue',
        'js/pages/allOrders/allOrders.vue',
        'js/pages/feeDetails/allFees.vue'
    ],
    'alias': {
        'Components': 'js/components',
        'Common': 'js/common',
        'Config': 'js/config',
        'Widget': 'js/widget',
        'Pages': 'js/pages',
        'Utils': 'js/utils'
    },
    'server': {
        'path': './',
        'port': 8889
    },
    'mockServer': {
        'port': 52077
    },
    'socketServer': {
        'port': 8890,
        'switch': true
    }
}
