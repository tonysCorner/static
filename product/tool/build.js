({
    appDir: '../',
    baseUrl: './js',
    dir: '../app',
    modules: [
        {
            name: 'app/index',
            include : [
                   'common/cityDropDown',
                    'common/urls',
                    'common/util',
                    'common/ajax',
                    'common/trialBox',
                    'common/validator',
                    'common/toast',
                    'common/dialog',
                    'common/iosDate',
                    'common/cookieHelper',
                    'common/weixin',
                    'common/handlebarsHelper',
                    '_hmt'
            ]
        },
        {
            name: 'main',
            include : ['zepto']
        }
    ],
    fileExclusionRegExp: /^(r|build|fis-conf)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true,
    paths: {
        'zepto': 'lib/zepto.min',
        'handlebars': 'lib/handlebars',
        '_hmt': '//hm.baidu.com/hm.js?d6c9b917aaa9ca26fa3ddcbd286f1d4a',
        'template': 'lib/template',
        'wx':'http://res.wx.qq.com/open/js/jweixin-1.0.0'
    }
})