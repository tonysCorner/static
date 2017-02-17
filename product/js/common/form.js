define([
    'common/toast',
    'common/ajax',
    'common/util',
    'common/validator',
    'common/dialog',
    'common/urls'
], function(Toast, Ajax, Util, Validator, Dialog, urls) {
    //投保城市 by xingjian
    var CITY_MAP = {
        "上海": 1,
        "北京": 5,
        "广州": 2,
        "杭州": 3,
        "深圳": 13,
        "武汉": 33,
        "其他": -1
    };

    function sendCode($sendCodeBtn, $phone) {
        //发送验证码
        var can_send = true;

        $sendCodeBtn.on('click', function (e) {
            e.preventDefault();

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

            Dialog.dialog({ okCallback : function(picCaptcha) {
                //ajax 发送
                $.ajax({
                    url: urls.r('captcha.html?phone=' + phone + '&picCaptcha=' + picCaptcha),
                    type: 'GET',
                    dataType: 'json',
                    success: function(response) {
                        if(response.ret.code == 0){
                            Toast.toast({content: '发送成功!'});
                            $phone.attr('readonly',true);
                            Util.countDown($sendCodeBtn, 60, function($element, second){
                                $element.html( second+'s');
                            }, function ($element) {
                                $phone.removeAttr('readonly');
                                can_send = true;
                                $element.html('发送');
                            });
                        }else {
                            Toast.toast({content: response.ret.msg});
                            can_send = true;
                        }
                    },
                    complete:function(){
                        //$phone.attr('readonly',true);
                        //Util.countDown($sendCodeBtn, 10, function($element, second){
                        //    $element.html( second+'s');
                        //}, function ($element) {
                        //    $phone.removeAttr('readonly');
                        //    can_send = true;
                        //    $element.html('发送');
                        //});
                    }
                });
            },
                cancelCallback : function () {
                    can_send = true;
                }});
        });
    }

    var SYCForm = function (options) {
        this.init(options);
    };

    SYCForm.prototype.init = function(options) {
        var $obj = this.createDom(options);

        this.initData($obj);

        this.bindEvent($obj, options);
    };

    SYCForm.prototype.createDom = function(options) {
        var $container = options.container,
            SYCFormHtml = options.SYCFormHtml;
        SYCFormHtml = SYCFormHtml.replace(/\{\{btnName\}\}/ig, options.btnName);
        $container.html(SYCFormHtml);
        return {
            $insureCity : $('#insure-city'),
            $insureCityShow : $('#insure-city-show'),
            $insureCityId : $('#insure-city-id'),
            $expireDate : $('#expire-date-show'),
            $pro : $('#pro'),
            $proShow : $('#pro-show'),
            $carNumber : $('#car-number'),
            $phone : $('#phone'),
            $sendCode : $('#send-code'),
            $captcha : $('#captcha'),
            $agreement : $('#agreement'),
            $submit : $('#submit')
        }

    };

    SYCForm.prototype.initData = function($obj) {
        //var date = new Date(),
        //    currentMonth = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1) ;
        //$obj.$expireDateYearShow.html(date.getFullYear());
        ////$obj.$expireDateMonthShow.html(currentMonth);
        //$obj.$expireDate.val(date.getFullYear() + '-' + currentMonth)
    };

    SYCForm.prototype.bindEvent = function($obj, options) {
        //投保城市event
        $obj.$insureCity.on('change', function(e) {
            e.preventDefault();
            $obj.$insureCityShow.html($(this).val());
            $obj.$insureCityId.val(CITY_MAP[$(this).val()]);
            console.log($obj.$insureCityId.val());
        });
        ////保险到期月event
        //$obj.$expireDateYear.on('change', function(e) {
        //    e.preventDefault();
        //    var expireDate = $(this).val() + '-' + $obj.$expireDateMonthShow.html();
        //    $obj.$expireDateYearShow.html($(this).val());
        //    $obj.$expireDate.val(expireDate);
        //    console.log(expireDate);
        //});
        //$obj.$expireDateMonth.on('change', function(e) {
        //    e.preventDefault();
        //    var expireDate = $obj.$expireDateYearShow.html() + '-' + $(this).val();
        //    $obj.$expireDateMonthShow.html($(this).val());
        //    $obj.$expireDate.val(expireDate);
        //    console.log(expireDate);
        //});
        //投保城市event
        $obj.$pro.on('change', function(e) {
            e.preventDefault();
            $obj.$proShow.html($(this).val());
            console.log($(this).val());
        });
        //发送验证码
        sendCode($obj.$sendCode, $obj.$phone);
        //
        $('input').on('input', function(e){
            e.preventDefault();
            var inputValues = {
                cid : $obj.$insureCityId.val(),
                expire : $obj.$expireDate.val(),
                carNumber : $obj.$carNumber.val(),
                phone : $obj.$phone.val(),
                captcha : $obj.$captcha.val()
            };
            if (Util.inputNotNull(inputValues)){
                if (!$obj.$submit.hasClass('active')) {
                    $obj.$submit.addClass('active')
                }
            } else {
                if ($obj.$submit.hasClass('active')) {
                    $obj.$submit.removeClass('active');
                }
            }
        });
        //表单提交
        $obj.$submit.on('click', function(e) {
            e.preventDefault();
            var params = {
                insure_city : $obj.$insureCityId.val(),
                expire_date : $obj.$expireDate.html(),
                car_number : $obj.$proShow.html() + Util.trim($obj.$carNumber.val().toUpperCase(), 'g'),
                phone : $obj.$phone.val(),
                captcha : $obj.$captcha.val(),
                reg_source : options.sourceType
            };

            if(Validator.space(params.insure_city)){
                Toast.toast({content: '请选择投保城市'});
                return false;
            }
            if(!Validator.isCarNumber(params.car_number)){
                Toast.toast({content: '车牌号码格式不正确'});
                return false;
            }
            if($obj.$expireDate.html().trim() == '请选择'){
                Toast.toast({content: '请选择保险到期月'});
                return false;
            }
            if(!Validator.isMobilephone(params.phone)){
                Toast.toast({content: '手机号格式错误,请输入11位手机号码'});
                return false;
            }
            if(!Validator.isCaptcha(params.captcha)){
                Toast.toast({content: '请输入正确的验证码'});
                return false;
            }
            //协议勾选
            if (!$obj.$agreement.is(':checked')) {
                Toast.toast({content: '请勾选四叶草用户协议'});
                return false;
            }
            //
            _hmt.push(['_trackEvent', 'channel-' + options.templateId, 'click', 'submitBtn', 1]);

            Ajax.SYCAjax({
                type:"POST",
                url: urls.r('customerLogin.html'),
                data: params,
                success: function(data){
                    document.body.scrollTop =0;
                    if(data.code == 0){
                        options.sucCallback();
                    } else if (data.code == 1006 || data.code == 1007){
                        options.errCallback();
                    } else {
                        Toast.toast({content: data.msg});
                    }
                }
            });


        })
    };

    return {
        sycForm : SYCForm
    }
});


