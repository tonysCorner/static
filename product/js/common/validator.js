
define([], function() {

    return {
        isInteger: function(i) {
            return /^\d+$/.test(i);
        },
        isUrl: function(url) {
            var reg = new RegExp(
                /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/);
            return reg.test(url);
        },
        isPhone: function(phone) {
            return isMobilephone(phone) || isTelphone(phone);
        },
        isTelphone: function(phone) {
            var reg = new RegExp(/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/);
            return reg.test(phone);
        },
        isMobilephone: function(phone) {
            return /^1\d{10}$/.test(phone);
            //return /^((13[0-9])|(15[^4,\D])|(18[0,5-9]))\d{8}$/.test(phone);
        },
        isPostcode: function(postcode) {
            var reg = new RegExp(/^[0-9]{6}$/);
            return reg.test(postcode);
        },
        isEmail: function(email) {
            var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
            return reg.test(email);
        },
        isDate: function(str) {
            var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
            if (r == null) {
                return false;
            }

            var d = new Date(r[1], r[3] - 1, r[4]);

            return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
        },
        isCaptcha: function(str){
            var reg = /^[0-9]{4}$/;
            return reg.test(str);
        },
        isIdentifyCardNumber: function(str) {
            // refer to http://blog.csdn.net/foart/article/details/6873622, 更完整的请看 http://heavenslv.iteye.com/blog/939300
            //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
            var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            return reg.test(str);
        },
        isCarNumber : function(str){
            // refer to http://www.blogjava.net/weiwei/articles/401703.html
            // http://xn792474.iteye.com/blog/830695
            return /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/i.test(str);
        },
        isBankNumber : function(bankno){
            // refer to  http://blog.163.com/wang_jb@yeah/blog/static/169544390201332231336518/
            //Description:  银行卡号Luhm校验

            //Luhm校验规则：16位银行卡号（19位通用）:

            // 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
            // 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
            // 3.将加法和加上校验位能被 10 整除。
            
            if (bankno.length < 16 || bankno.length > 19) {
                //$("#banknoInfo").html("银行卡号长度必须在16到19之间");
                return false;
            }
            var num = /^\d*$/; //全数字
            if (!num.exec(bankno)) {
                //$("#banknoInfo").html("银行卡号必须全为数字");
                return false;
            }
            //开头6位
            var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
            if (strBin.indexOf(bankno.substring(0, 2)) == -1) {
                //$("#banknoInfo").html("银行卡号开头6位不符合规范");
                return false;
            }
            var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhm进行比较）

            var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
            var newArr = new Array();
            for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
                newArr.push(first15Num.substr(i, 1));
            }
            var arrJiShu = new Array(); //奇数位*2的积 <9
            var arrJiShu2 = new Array(); //奇数位*2的积 >9

            var arrOuShu = new Array(); //偶数位数组
            for (var j = 0; j < newArr.length; j++) {
                if ((j + 1) % 2 == 1) { //奇数位
                    if (parseInt(newArr[j]) * 2 < 9)
                        arrJiShu.push(parseInt(newArr[j]) * 2);
                    else
                        arrJiShu2.push(parseInt(newArr[j]) * 2);
                } else //偶数位
                    arrOuShu.push(newArr[j]);
            }

            var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
            var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
            for (var h = 0; h < arrJiShu2.length; h++) {
                jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
                jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
            }

            var sumJiShu = 0; //奇数位*2 < 9 的数组之和
            var sumOuShu = 0; //偶数位数组之和
            var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
            var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
            var sumTotal = 0;
            for (var m = 0; m < arrJiShu.length; m++) {
                sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
            }

            for (var n = 0; n < arrOuShu.length; n++) {
                sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
            }

            for (var p = 0; p < jishu_child1.length; p++) {
                sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
                sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
            }
            //计算总和
            sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

            //计算Luhm值
            var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
            var luhm = 10 - k;

            if (lastNum == luhm) {
                // $("#banknoInfo").html("Luhm验证通过");
                return true;
            } else {
                // $("#banknoInfo").html("银行卡号必须符合Luhm校验");
                return false;
            }
        },
        isWeixin : function(){
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return true;
            } else {
                return false;
            }
        },
        space: function (str) {
            return !str.replace(/^\s*$/, '');
        }

    };
});
