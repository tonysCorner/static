define(['common/util', 'common/validator', 'common/toast'], function( Util, Validator, Toast) {

    return {
        sendCode : function($sendCodeBtn, $phone) {
            //发送验证码
            var can_send = true;

            $sendCodeBtn.on('click', function () {

                var phone = $phone.val();

                if(!can_send)return;

                if(Validator.space(phone)){
                    Toast.toast({content: '手机号不能为空!'});
                    return false;
                }
                if(!Validator.isMobilephone(phone)){
                    Toast.toast({content: '手机号格式错误,请输入11位手机号码'});
                    return false;
                }
                can_send=false;

                //ajax 发送
                $.ajax({
                    url: '/ditui/captcha.xhtml?phone=' + phone,
                    type: 'GET',
                    dataType: 'json',
                    success: function(response) {
                        if(response.ret.code == 0){
                            Toast.toast({content: '发送成功!'});
                        }else {
                            Toast.toast({content: response.ret.msg});
                        }
                    },
                    complete:function(){
                        $phone.attr('readonly',true);
                        Util.countDown($sendCodeBtn, 60, function($element, second){
                            $element.html( second+'s');
                        }, function ($element) {
                            $phone.removeAttr('readonly');
                            can_send = true;
                            $element.html('发送');
                        });
                    }
                });
            });
        }
    };
});
