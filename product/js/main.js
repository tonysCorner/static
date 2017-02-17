var __env = (function() {
    var mode = 'dev';
    var ctxs = {
        'dev': {
            'mode': 'dev',
            'api': '//activity.api.dev.1234ye.com/activity/',
            'static': 'js',
            'needSetCookie' : false,
            '_hmt' : '//hm.baidu.com/hm.js?d6c9b917aaa9ca26fa3ddcbd286f1d4a'
        },
        'staging': {
            'mode': 'staging',
            'api': '/',
            'static': '../assets/js',
            'needSetCookie' : false,
            '_hmt' : '//hm.baidu.com/hm.js?d6c9b917aaa9ca26fa3ddcbd286f1d4a'
        },
        'test': {
            'mode': 'test',
           'api': 'http://wx.test.1234ye.com',
            'static': 'js',
            'needSetCookie' : false,
            '_hmt' : '//hm.baidu.com/hm.js?d6c9b917aaa9ca26fa3ddcbd286f1d4a'
        },
        'production': {
            'mode': 'production',
            'api': 'http://wxdt.1234ye.com/',
            'static': 'js',
            'needSetCookie' : false,
            '_hmt' : '//hm.baidu.com/hm.js?a7874be441e518875913b318a8791e6d'
        }
    };
    return ctxs[mode];
})();

require.config({
    config: {
            'common/urls': {
            'mode': __env['mode'],
            'ctx': __env['api']
        }
    },
    baseUrl: __env['static'],
    paths: {
        'zepto': 'lib/zepto.min',
        'handlebars': 'lib/handlebars',
        '_hmt': __env['_hmt'],
        'template': 'lib/template',
        'wx':'http://res.wx.qq.com/open/js/jweixin-1.0.0'
    },
    shim: {
        'zepto': {
            exports: '$'
        }
    }
});

require(['zepto'], function() {
    var scripts = $('#require').data('start');
    scripts = scripts.split(',');
    require(scripts);
});
