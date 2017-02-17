define(['common/ajax','common/urls',"wx"], function(ajax,Urls,wx) {
    (function() {
        $.ajax({
            type: "POST",
            url: Urls.r('createJsapiSignature.html'),
            data: {
                url: location.href,
                type: '1'
            },
            success: function(da) {
                var data = JSON.parse(da.data);
                data = $.extend(data, {
                    debug: false, // true为开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

                wx.config(data);
            }
        });

        wx.ready(function(){

        });

        wx.error(function(res) {
            //alert("error")
        });
    })();

    return {
        onMenuShareTimeline: function(config, successCallback) {
            wx.ready(function() {
                wx.onMenuShareTimeline({
                    title: config.title,
                    link: config.link, // 分享链接
                    imgUrl: config.imgUrl, // 分享图标
                    success: function() {
                        //setLog(conf)
                    }
                });
            })
        },

        onMenuShareAppMessage: function(config, successCallback) {
            wx.ready(function() {
                wx.onMenuShareAppMessage({
                    title: config.title, // 分享标题
                    desc: config.desc, // 分享描述
                    link: config.link, // 分享链接
                    imgUrl: config.imgUrl, // 分享图标
                    success: function() {
                        //setLog(conf)
                    }
                });
            })
        },

        hideShareMenu: function() {
            wx.ready(function() {
                wx.hideMenuItems({
                    menuList: ['menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:email', 'menuItem:openWithSafari'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                });
            });
        }
    };
});
