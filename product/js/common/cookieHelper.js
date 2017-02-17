define([], function() {
    var A_MONTH = 2592000000;

    return {
        setCookie : function(a, b, c) {
            var d = new Date();
            if (!c) {
                d.setTime(d.getTime() + A_MONTH);
            } else {
                d.setTime(d.getTime() + c);
            }
            document.cookie = a + "=" + escape(b) + ";expires=" + d.toGMTString() + ";path=/;domain=1234ye.com";
        },

        getCookie : function(b) {
            var a, c = new RegExp("(^| )" + b + "=([^;]*)(;|$)");
            a = document.cookie.match(c);
            if (a) {
                return unescape(a[2]);
            } else {
                return null;
            }
        },

        delCookie : function(a) {
            var b, c = new RegExp("(^| )" + a + "=([^;]*)(;|$)");
            b = document.cookie.match(c);
            if (b) {
                document.cookie = a + "="  + ";expires=-1"+";path=/;domain=1234ye.com";
            } else {}
        },

        clearCookies : function() {
            var b = document.cookie.match(/[^ =;]+(?=\=)/g);
            if (b) {
                for (var a = b.length; a--;) {
                    document.cookie = b[a] + "=0;expires=" + new Date(0).toGMTString();
                }
            }
        }
    }
});