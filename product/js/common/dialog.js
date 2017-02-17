define(['common/urls'], function(Urls) {
    
    var url = Urls.r('captchaCode.html?');
    
    return {
        dialog : function(option){
            var captcha =url + Math.random();
            var _option = {
                id: "util-dialog",
                type: "confirm",
                content : '验证码:<input type="text" class="util-mask-share-input" maxlength="6" id="chapchaValue">' +
                '<img src=' + captcha + ' class="util-mask-share-img" id="changeCaptcha">',
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
                    html += '<div class="up">';
                    //html += '<div class="title">!</div>';
                    html += '<div class="content">'+opt.content+'</div>';
                    html += '<div class="submit">';
                    if (opt.type === 'confirm'){
                        html += '<a class="cancel" href="javascript:;">'+opt.cancelBtn+'</a>';
                    }
                    html += '<a class="ok" href="javascript:;">'+opt.okBtn+'</a>';
                    html += '</div>';
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
                        var picChapcha = $('#chapchaValue').val();
                        module.hide();
                        opt.okCallback(picChapcha);
                    });
                    //
                    $('#changeCaptcha').on('click', function(e) {
                        e.preventDefault();
                        module.refresh($(this));
                    })

                },
                hide: function(){
                    $("#"+dialog_id).remove();
                },
                show: function(){
                    $("#"+dialog_id).show();
                },
                refresh : function($img) {
                    $img.attr('src', url + Math.random())
                }
            };
            module.init();
        }
    }
});