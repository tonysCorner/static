define([], function() {
    return {
     dialog : function(option){
               var _option = {
                   id: "util-dialog",
                   type: "confirm",
                   content :'验证码: <input type="text" class="util-mask-share-input" placeholder="请输入验证码">' +
                   '<img src="http://sso.dev.api.1234ye.com:8082/api-sso/sso/captcha.html"   onclick = ' + captcha + '>',
                   okBtn: "确定",
                   cancelBtn: "取消",
                   okCallback: function(){},
                   cancelCallback: function(){}
               };
               var opt = $.extend(_option, option);
               var dialog_id = opt.id;

               var module = {
                   init: function(){
                       this.initDom();
                       this.initEvent();
                   },
                   initDom: function(){
                       var html = '';
                       html += '<div class="util-mask-layer" id="'+ dialog_id +'">';
                        html += '<div class="util-mask-layer-box">';
                       html += '<div class="up">'+'请填写验证码,"确定"后请注意查收短信.'+'</div>';
                       html += '<div class="content">'+opt.content+'</div>';
                       html += '<div class="submit">';
                       if (opt.type === 'confirm'){
                           html += '<a class="cancel" href="javascript:;">'+opt.cancelBtn+'</a>';
                       }
                       html += '<a class="ok" href="javascript:;">'+opt.okBtn+'</a>';
                       html += '</div>';
                       html += '</div>';
                       html += '</div>';
                       $("body").append(html);

                       this.show();
                   },
                   //初始化事件
                   initEvent: function(){
                       // 清除原先事件
                       $(document).off("."+opt.id);
                       // 取消按钮
                       $(document).on("click" + "." + opt.id, "#" + dialog_id + " .cancel", function (e) {
                           module.hide();
                           opt.cancelCallback();
                       });
                       // 确定按钮
                       $(document).on("click" + "." + opt.id, "#" + dialog_id + " .ok", function (e) {
                           module.hide();
                           opt.okCallback();
                       });
                   },
                   hide: function(){
                       $("#"+dialog_id).remove();
                   },
                   show: function(){
                       $("#"+dialog_id).show();
                   }
               };
               module.init();
           },
        toast : function(option){
            var _option = {
                id: "util-toast",
                content: "内容",
                time: 1500,
                callback: function(){}
            };
            var opt = $.extend(_option, option);
            var dialog_id = opt.id;

            var module = {
                init: function(){
                    this.initDom();
                    setTimeout(function(){
                        this.hide();
                        opt.callback();
                    }.bind(this), opt.time);
                },
                initDom: function(){
                    var html = '';
                    html += '<div class="util-toast" id="'+ dialog_id +'">';
                    html += '<div class="util-toast-content">';
                    html += opt.content;
                    html += '</div>';
                    html += '</div>';
                    $("body").append(html);

                    this.show();
                },
                hide: function(){
                    $("#"+dialog_id).remove();
                },
                show: function(){
                    $("#"+dialog_id).show();
                }
            };
            module.init();
        }

    }
});