module.exports = {
    'appName': 'atjia',
    'appBoard': '/config/index.js',
    // android 监听全局事件homeBack 如果为true 安卓端需要自行调用router.finish方法来关闭应用
    'androidIsListenHomeBack': 'true',
    'version': {
        'android': '1.0.0',
        'iOS': '1.0.0'
    },
    'page': {
        'homePage': '/pages/index.js',
        'mediatorPage': '/mediator/index.js',
        'navBarColor': '#ffffff',
        'navItemColor': '#212121'
    },
    'url': {
        // 'image': 'https://lev-inf.benmu-health.com/test/xxx',
        'bundleUpdate': 'http://localhosts:3001/app/check'
    },
    'zipFolder': {
        'iOS': '/ios/Atjia/Atjia',
        'android': '/android/WeexFrameworkWrapper/app/src/main/assets'
    },
    'getui': {
        'enabled': 'false',
        'appId': '',
        'appKey': '',
        'appSecret': ''
    },
    'umeng': {
        'enabled': 'false',
        'iOSAppKey': '',
        'androidAppKey': ''
    },
    'wechat': {
        'enabled': 'false',
        'appId': '',
        'appSecret': ''
    },
    'amap': {
        'enabled': 'true',
        'iOSAppKey': 'f56d0e195551705ad5c15b897cfcc4c7',
        'androidAppKey': '800dfa2414f10f1092f9d53112c3295a'
    }
}
