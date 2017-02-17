define([], function() {
    (function(){
        var WebViewJavascriptBridge;
        function setupWebViewJavascriptBridge(callback) {
            if (window.WebViewJavascriptBridge) {
                return callback(WebViewJavascriptBridge);
            }
            if (window.WVJBCallbacks) {
                return window.WVJBCallbacks.push(callback);
            }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function() {
                document.documentElement.removeChild(WVJBIframe)
            }, 0)
        }
        setupWebViewJavascriptBridge(function(bridge) {
            WebViewJavascriptBridge = bridge;
        });
    })();

    return {
        isInApp: function() {
            return !!WebViewJavascriptBridge;
        },
        /**
         * GET 方式请求数据
         * @param {Object} url 请求地址
         * @param {Object} params 请求参数
         * @param {Object} callback(data) 回调函数
         * data.response		返回结果
         * data.errorMsg		错误信息
         */
        get: function(url, params, callback) {
            this.ajax({
                url: url,
                type: "GET",
                params: params
            }, callback);
        },

        /**
         * POST 方式请求数据
         * @param {Object} url 请求地址
         * @param {Object} params 请求参数
         * @param {Object} callback(data) 回调函数
         * data.response		返回结果
         * data.errorMsg		错误信息
         */
        post: function(url, params, callback) {
            this.ajax({
                url: url,
                type: "POST",
                params: params
            }, callback);
        },

        /**
         *  AJAX 请求数据
         * @param {Object} options
         * 	url:请求地址, 必须 ---
         * 	type:POST|GET(默认POST,可选) ---
         * 	params:请求参数(默认空,可选)  ---
         *
         * @param {Object} callback(data) 回调函数
         * data.response		返回结果
         * data.errorMsg		错误信息
         */
        ajax: function(options, callback) {
            if (!options.type) {
                options.type = "POST";
            }
            WebViewJavascriptBridge.callHandler("nativeAjax", options, callback);
        },

        /**
         * 通用回调函数名
         * @param {Object} callHanderName Native方法名
         * @param {Object} options	参数
         */
        generalCallback:function(callHanderName,options){
            WebViewJavascriptBridge.callHandler(callHanderName, options, function(data){
                if(data.error) {
                    if(options.fail)
                        options.fail(data.error);
                } else {
                    if(options.success)
                        options.success(data.data);
                }
            });
        },

        /**
         * 调用原生弹框
         * @param {Object} options
         * options.title		标题
         * options.okTitle	确认按钮名字 (默认OK)
         * options.cancelTitle 取消按钮名字, (可为空)
         *
         * options.success(int index)	回调函数
         * 0 okButton		确认按钮
         * 1 cancelButton	取消按钮
         */
        nativeAlertView:function(options) {
            this.generalCallback("nativeAlertView", options);
        },

        /**
         * 调用系统选择联系人
         * @param {Object} options
         *
         * options.success(data)
         * data.name		姓名
         * data.phone	电话
         *
         * options.fail(errorMsg)
         */
        nativeSelectContact: function(options) {
            this.generalCallback("nativeSelectContact",options);
        },

        /**
         * 获得当前经纬度
         * @param {Object} options
         * options.model	获取模式,0 不能调整, 1 可以微调, 2可以任意定位搜索, 默认0不能调整
         *
         * options.success(data)
         * data.long			经度
         * data.lat			纬度
         * data.province		省份
         * data.city			城市
         * data.county		县区
         * data.street		街道
         *
         * options.fail(errorMsg)
         */
        nativeGetCurrentGPS: function(options) {
            if(!options.model)
                options.model = 0;//设置默认为false

            this.generalCallback("nativeGetCurrentGPS", options);
        },

        /**
         * 显示经纬度地址到原生地图
         * @param {Object} options
         * options.long		经度
         * options.lat		纬度
         * options.name		位置名
         * options.address	地址详情说明
         */
        nativeShowGPSPoint:function(options){
            this.generalCallback("nativeShowGPSPoint", options);
        },

        /**
         * 计算两点之间距离
         * @param {Object} options
         * options.gps1.long
         * options.gps1.lat
         *
         * options.gps2.lat
         * options.gps2.lat
         *
         * options.success(data)
         * data.distance (单位:米)
         *
         * options.fail(errorMsg)
         */
        nativeDistanceGPS: function(options) {
            this.generalCallback("nativeDistanceGPS", options);
        },

        /**
         * 调用图片压缩
         * @param {Object} options
         * options.compressSize	压缩级别(kb)	默认100k
         *
         * options.success(data)
         * data.base64
         *
         * options.fail(errorMsg)
         */
        nativeSelectImageAndCompressBase64Image: function(options){
            if(!options.compressSize)
                compressSize = 100;
            this.generalCallback("nativeSelectImageAndCompressBase64Image", options);
        },

        /**
         * 发短信
         * @param {Object} options
         * options.body
         * options.recipients
         *
         * options.success()
         *
         * options.fail(int type)	回调函数
         * 0 	发送失败
         * 1 	取消发送
         */
        nativeSendSMS: function(options) {
            this.generalCallback("nativeSendSMS", options);
        },

        /**
         * 发信息到微信
         * @param {Object} options
         * options.body
         * options.scene  //0 聊天界面, 1 朋友圈, 2 收藏
         *
         * options.success()
         *
         * options.fail(int type)	回调函数
         * -1   普通错误类型
         * -2   用户点击取消并返回
         * -3   发送失败
         * -4   授权失败
         * -5   微信不支持
         */
        nativeSendWeixinMessage: function(options) {
            this.generalCallback("nativeSendWeixinMessage", options);
        },

        /**
         * 跳转到微信公众号
         * @param {Object} options
         * options.bizProfileId  //公众号原始id  不传就跳四叶草车险专家
         */
        nativeJumpToWeixinBizProfile: function(options) {
            this.generalCallback("nativeJumpToWeixinBizProfile", options);
        },

        /**
         * 跳转到原生页面
         * @param {Object} options
         * options.nativePageMapingType  //0  home,   1  menu
         *
         * options.success()
         *
         * options.fail()
         *
         */
        nativeJumpNativePage: function(options) {
            this.generalCallback("nativeJumpNativePage", options);
        },

        /**
         * 跳转到指定web页面
         * @param {Object} options
         * options.modelName  	//modelName
         * options.pageName  	//pageName
         *
         * options.success()
         *
         * options.fail()
         *
         */
        nativeJumpNewWebView: function(options) {
            this.generalCallback("nativeJumpNewWebView", options);
        },

        /**
         * 获取用户信息
         * @param {Object} options
         *
         * options.success(data)
         * data.token 		//token
         * data.mobile 		//mobile
         */
        nativeUserInfo: function(options) {
            this.generalCallback("nativeUserInfo", options);
        },

        /**
         * 获取设备信息
         * @param {Object} options
         *
         * options.success(data)
         * data.appBundleId 		//app 唯一标识符
         * data.appVersion 		//app 版本号
         * data.appPlatform 		//app 来源  iOS/Android
         * data.deviceID 		//设备唯一码
         * data.channelID 		//app 渠道来源

         */
        nativeDeviceInfo: function(options) {
            this.generalCallback("nativeDeviceInfo", options);
        },

        /**
         * toast
         * @param {Object} options
         * options.title    //可以不传
         * options.message
         */
        nativeToast: function(options) {
            this.generalCallback("nativeToast", options);
        },

        /**
         * hud
         * @param {Object} options
         * options.event  //0:loading  	1:hide
         */
        nativeHud: function(options) {
            this.generalCallback("nativeHud", options);
        },

        /**
         * picker view
         * @param {Object} options
         * options.dataSource	//数据源
         * options.selectedItem	//已经选中的数据
         *
         * options.success(selectedItem)  //native 选择的数据
         *
         */
        nativePicker: function(options){
            this.generalCallback("nativePicker", options);
        }
    };

});