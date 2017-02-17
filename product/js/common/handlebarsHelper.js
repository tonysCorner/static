define(['handlebars'], function() {
    (function() {
        //比较是否相等的if
        Handlebars.registerHelper("ifEqual", function(v1,v2,options){
            if(v1==v2){
                //满足添加继续执行
                return options.fn(this);
            }else{
                return options.inverse(this);
            }
        });
        //比较是否不相等的if
        Handlebars.registerHelper("ifNotEqual", function(v1,v2,options){
            if(v1!=v2){
                //满足添加继续执行
                return options.fn(this);
            }else{
                return options.inverse(this);
            }
        });
        //比较是否大
        Handlebars.registerHelper("ifGT", function(v1,v2,options){
            if(v1 > v2){
                //满足添加继续执行
                return options.fn(this);
            }else{
                return options.inverse(this);
            }
        });
        //比较是否不大于
        Handlebars.registerHelper("ifNotGT", function(v1,v2,options){
            if(v1 <= v2){
                //满足添加继续执行
                return options.fn(this);
            }else{
                return options.inverse(this);
            }
        });
        //比较是否小于
        Handlebars.registerHelper("ifLT", function(v1,v2,options){
            if(v1 < v2){
                //满足添加继续执行
                return options.fn(this);
            }else{
                return options.inverse(this);
            }
        });
        //比较是否不小于
        Handlebars.registerHelper("ifNotLT", function(v1,v2,options){
            if(v1 >= v2){
                //满足添加继续执行
                return options.fn(this);
            }else{
                return options.inverse(this);
            }
        });
        // parseInt
        Handlebars.registerHelper('parseInt', function(num) {
            return parseInt(num) || 0;
        });
        // 保留一位小数
        Handlebars.registerHelper('toFixed', function(num) {
            return (parseFloat(num) || 0).toFixed(1);
        });
        // 保留两位小数
        Handlebars.registerHelper('toFixed2', function(num) {
            return (parseFloat(num) || 0).toFixed(2);
        });

        // 获取字符串首字母
        Handlebars.registerHelper('getInitial', function(str) {
            if(str){
                return str.charAt(0);
            }
        });
        // 去掉名字里面的测试
        Handlebars.registerHelper('changeTesterName', function(str) {
            if(str){
                return util.handleTesterName(str);
            }
        });
    })();
    return {}
});
