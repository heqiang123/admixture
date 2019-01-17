const globalEvent = weex.requireModule('globalEvent')
var modal = weex.requireModule('modal')
var router = weex.requireModule('bmRouter')

/**
 * 消息推送
 * options 客户端个推推送的所有消息
 */
let time = ''
globalEvent.addEventListener('pushMessage', function (options) {
    //通过message 赖判断跳转页面
    let message = options.message
    //判断用户点击推送
    let click  = options.click
    console.log(options, 31789273917391237)
    // console.log('》》》》》》》》'+JSON.stringify(options));
    //click 为true被点击  后面mesage 为跳转与后台规定页面
    if (click=='true'&& message == 1) {
        clearTimeout(time)
        time = setTimeout(() => {
            router.open({url:'/pages/user/login.js'})
        }, 200);
    }
})


