define([], function() {
    function removeElement(_element){
        var _parentElement = _element.parentNode;
        if(_parentElement){
            _parentElement.removeChild(_element);
        }
    }

    var Mask = function(option) {
        //options 配资背景图,class等
        var _option = {
            bgUrl: '__url("img/common/intro_pic_guide.png")',
            class: 'mask-guide-pic'
        };
        var opt = $.extend(_option, option);
        console.log(opt);

        var body = document.getElementsByTagName('body')[0];
        var divContainer = document.createElement('div'),
            div = document.createElement('div');
        divContainer.setAttribute('class', 'mask');
        div.setAttribute('class', opt.class);
        div.style.background = 'url("' + opt.bgUrl + '") no-repeat center center';
        divContainer.appendChild(div);
        body.appendChild(divContainer);
        return this;
    };

    Mask.prototype.show = function(){

    };
    Mask.prototype.hide = function(){
        var mask = document.getElementsByClassName('mask')[0];
        removeElement(mask);
    };

    return {
        mask: Mask
    }
});