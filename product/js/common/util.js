define([], function() {
    var _goTopInit = function(mainWidth){
            var winWide = $(window).width();
            if($(window).scrollTop()==0){
                if(!$("#goTop").is(":hidden")){
                    $("#goTop").hide();
                }
            }else{
                if($("#goTop").is(":hidden")){
                    $("#goTop").show();
                }
            }
            $("#goTop").css({
                "left":(winWide-mainWidth)/2+mainWidth
            });
        };

    return {
        getQuerySting : function() {
            var h = (location.search.length) ? location.search.substring(1) : "";
            var d = {};
            var b = h.split("&");
            var f = null,
                c = null,
                g = null;
            if (b) {
                for (var e = 0,
                         a = b.length; e < a; e++) {
                    f = b[e].split("=");
                    c = decodeURIComponent(f[0]);
                    g = decodeURIComponent(f[1]);
                    d[c] = g;
                }
            } else {}
            return d;
        },

        replaceParamVal : function(paramName, replaceWith) {
            var oUrl = location.href.toString();
            var re = eval('/('+ paramName+'=)([^&]*)/gi');
            var nUrl = oUrl.replace(re , paramName+'='+replaceWith);
            return nUrl;
        },
        //文档加载
        ready : {
            /**
             * DOM加载完成
             * @param fn
             */
            dom: function (fn) {
                document.addEventListener('DOMContentLoaded', function (e) {
                    fn();
                }, false);
            },
            /**
             * 页面加载完成
             * @param fn
             */
            load: function (fn) {
                window.addEventListener('load', function (e) {
                    fn();
                }, false);
            }
        },

        getOs : function () {
            var OsObject = "";
            if(navigator.userAgent.indexOf("MSIE")>0) {
                return "MSIE";
            }
            if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){
                return "Firefox";
            }
            if(isSafari=navigator.userAgent.indexOf("Safari")>0) {
                return "Safari";
            }
            if(isCamino=navigator.userAgent.indexOf("Camino")>0){
                return "Camino";
            }
            if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){
                return "Gecko";
            }
        },

        changeWxPicTo64 : function(url){
            return url.replace(/\/0/ig, '/64');
        },
        /**
         * 倒计时，一般用在验证码60s倒计时
         * @param seconds
         * @param callback
         */
        countDown: function (element, seconds, everyCall, callback) {
            everyCall&&everyCall(element,seconds);
            var interval = setInterval(function () {
                seconds--;
                if (seconds >= 0) {
                    //element.innerText = seconds;
                    everyCall&&everyCall(element,seconds);
                } else {
                    clearInterval(interval);
                    interval = null;
                    callback && callback(element);
                }
            }, 1000);
            return interval;
        },

        inputNotNull : function(params){
            if (params && typeof params == typeof a == 'object') {
                for (var i in params) {
                    if(!params[i].replace(/^\s*$/, '')) {
                        return false;
                    }
                }
            }
            return false
        },

        trim : function (str,is_global) {
            var result;
            result = str.replace(/(^\s+)|(\s+$)/g,"");
            if(is_global.toLowerCase()=="g"){
                result = result.replace(/\s/g,"");
            }
            return result;
        },

        showHoverQRCode : function() {
            /*******************************二维码*******************************/
            $('.wei').hover(function() {
                $('.erweima').stop().fadeIn("fast")
            }, function() {
                $('.erweima').stop().fadeOut("fast")
            });
        },

        showHoverMenuAboutUs : function() {
            /*******************************车险*******************************/
            $('.nav1').hover(function(){
                $(this).children('.list').stop().slideDown("fast");
            },function(){
                $(this).children('.list').stop().slideUp("fast");
            });

        },

        goToTop : function() {
            var wideScreen = false;
            var mainWidth = 1084;
            if(wideScreen){
                mainWidth = 1084;
            }else{
                mainWidth = 1084;
            }

            _goTopInit(mainWidth);
            $(window).resize(function(){_goTopInit(mainWidth)});
            $(window).scroll(function(){_goTopInit(mainWidth)});

            $('.goTop').click(function(event) {

                $('html,body').stop().animate({
                    'scrollTop':0
                }, 500);

            });
        },

        showErrorMsg : function(option){
            var _option = {
                id: "util-toast",
                content: "内容",
                time: 3000,
                callback: function(){}
            };
            var opt = $.extend(_option, option);
            var dialog_id = opt.id;
            var module = {
                init: function(){
                    this.show();
                    setTimeout(function(){
                        this.hide();
                        opt.callback();
                    }.bind(this), opt.time);
                },
                hide: function(){
                    $("#"+dialog_id).html('');
                },
                show: function(){
                    $("#"+dialog_id).html(opt.content);
                }
            };
            module.init();
        }

    }
});

