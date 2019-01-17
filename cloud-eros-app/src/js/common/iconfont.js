export default function () {
    const domModule = weex.requireModule('dom')
    domModule.addRule('fontFace', {
        'fontFamily': 'iconfont',
        'src': 'url(\'bmlocal://iconfont/iconfont.ttf\')'
    })
    domModule.addRule('fontFace', {
        'fontFamily': 'iconfont2',
        'src': 'url(\'https://at.alicdn.com/t/font_823945_6mhjy5cp0ss.ttf\')'
    })
    domModule.addRule('fontFace', {
        'fontFamily': 'icon',
        'src': 'url(\'https://at.alicdn.com/t/font_693584_xc8n6425ooh.ttf\')'
    })
}

