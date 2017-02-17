'use strict';
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 320) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
function GetQueryString(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r !=null ) return unescape(r[2]);
    return null;
}
var oldUser=GetQueryString("oldUser");
var hasChance=GetQueryString("hasChance");
var ditui_sid=GetQueryString("sid");

if(oldUser=="true"){
    oldUser=true;
}else{
    oldUser=false;
}
if(hasChance=="false"){
    hasChance=false;
}else{
    hasChance=true;
}
