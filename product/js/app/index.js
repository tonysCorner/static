require([
    ], function() {
    var module = {
        $btn:$('#btn'),
        $mask:$('#mask'),
        $main:$('#main'),
        $turn:$('#turn')
    };
    $.extend(module, {
        init: function() {
            module.initEvent();
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

        }

    });

    module.init();

});
