define([], function() {

    //格式化参数
    function formatParams(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace(".",""));
        return arr.join("&");
    }

    return {
        //该ajax依赖与zepto或jquery
        SYCAjax : function(param) {
            var _id = 'util-ajax-bg';
            var id = '#' + _id;
            if (!param.hidden) {
                var len = $(id).length;
                if (len < 1) {
                    $("body").append('<div id="' + _id + '" class="util-ajax-bg"><div class="icon"></div></div>');
                }
                $(id).show();
            }
            // 默认参数
            var _param = {
                url : "",
                data : {},
                type : "POST",
                timeout: 30000,
                jsonp : 'callback',
                jsonpCallback : 'callback',
                dataType : "json",
                async : true,
                success : function(data, param) {
                },
                error : function(data, param) {
                },
                param : {}
            };
            // 合并参数
            var newParam = $.extend(_param, param);

            $.ajax({
                url : newParam.url,
                type : newParam.type,
                data : newParam.data,
                timeout: newParam.timeout,
                async : newParam.async,
                jsonp : newParam.jsonp,
                jsonpCallback : newParam.jsonpCallback,
                xhrFields: {withCredentials: true},
                beforeSend: function(request) {
                    request.setRequestHeader("Last-Modified", "");
                    request.setRequestHeader("If-Modified-Since", "");
                },
                success : function(data) {

                    newParam.success(data, newParam.param);
                    if (!newParam.hidden) {
                        $(id).hide();
                    }
                },
                error : function(data) {
                    newParam.error(data, newParam.param);
                    if (!newParam.hidden) {
                        $(id).hide();
                    }
                },
                dataType : newParam.dataType
            });
        },
        //该ajax为原生ajax
        //ajax({
        //        url: "./TestXHR.aspx",              //请求地址
        //        type: "POST",                       //请求方式
        //        data: { name: "super", age: 20 },        //请求参数
        //        dataType: "json",
        //        success: function (response, xml) {
        //        // 此处放成功后执行的代码
        //    },
        //    fail: function (status) {
        //        // 此处放失败后执行的代码
        //    }
        //});
        NativeAjax : function(options) {
            options = options || {};
            options.type = (options.type || "GET").toUpperCase();
            options.dataType = options.dataType || "json";
            var params = formatParams(options.data);

            //创建 - 非IE6 - 第一步
            if (window.XMLHttpRequest) {
                var xhr = new XMLHttpRequest();
            } else { //IE6及其以下版本浏览器
                var xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }

            //接收 - 第三步
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    var status = xhr.status;
                    if (status >= 200 && status < 300) {
                        options.success && options.success(xhr.responseText, xhr.responseXML);
                    } else {
                        options.fail && options.fail(status);
                    }
                }
            }

            //连接 和 发送 - 第二步
            if (options.type == "GET") {
                xhr.open("GET", options.url + "?" + params, true);
                xhr.send(null);
            } else if (options.type == "POST") {
                xhr.open("POST", options.url, true);
                //设置表单提交时的内容类型
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send(params);
            }
        },
        //native JSONP
        NativeJSONP : function(options){
            options = options || {};
            if (!options.url || !options.callback) {
                throw new Error("参数不合法");
            }

            //创建 script 标签并加入到页面中
            var callbackName = ('jsonp_' + Math.random()).replace(".", "");
            var oHead = document.getElementsByTagName('head')[0];
            options.data[options.callback] = callbackName;
            var params = formatParams(options.data);
            var oS = document.createElement('script');
            oHead.appendChild(oS);

            //创建jsonp回调函数
            window[callbackName] = function (json) {
                oHead.removeChild(oS);
                clearTimeout(oS.timer);
                window[callbackName] = null;
                options.success && options.success(json);
            };

            //发送请求
            oS.src = options.url + '?' + params;

            //超时处理
            if (options.time) {
                oS.timer = setTimeout(function () {
                    window[callbackName] = null;
                    oHead.removeChild(oS);
                    options.fail && options.fail({ message: "超时" });
                }, time);
            }
        }
    }
});