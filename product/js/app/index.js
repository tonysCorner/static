require(['common/ajax'], function(Ajax) {
    var module = {
        $btn:$('#btn'),
        $mask:$('#mask'),
        $main:$('#main'),
        $turn:$('#turn')
    };
    $.extend(module, {
        init: function() {
            module.initEvent();
            module.testAjax();
        },

        initEvent: function() {
            module.$btn.on("tap",function(){
                //$('body').css({"overflow":"hidden"});
              module.$main.addClass('remove');
                module.$mask.show();

            });
            module.$turn.on("tap",function(){
                //$('body').css({"overflow":"auto"});
               // module.$main.css({"display":"block"});
                module.$main.removeClass('remove');
                module.$mask.hide();

            })

        },

        testAjax : function() {
            Ajax.SYCAjax({
                url: "http://101.37.18.181:8080/api-framework/api/test.xhtml",
                type: 'GET',
                data: {},
                success: function (res) {
                    console.log(res);
                }

            });
        }



    });

    module.init();

});
