define([], function() {

    var CityDropDown = function(options) {
        this.init(options);
    };

    CityDropDown.prototype.init = function(options) {
        var $obj = this.createDom(options);

        this.bindEvent($obj);
    };

    CityDropDown.prototype.createDom = function(options) {

        var $pro_box = $('<div class="downMask"> <div class="pro-box"><div class="title"><div class="cancel">取消</div><div class="confirm">确定</div></div><div class="con" id="pro-box-con"></div></div><div></div>');
        $('body').append($pro_box);

        var pro_arr = [
            '沪',
            '苏',
            '浙',
            '京',
            '津',
            '冀',
            '晋',
            '蒙',
            '辽',
            '吉',
            '黑',
            '皖',
            '闽',
            '赣',
            '鲁',
            '豫',
            '鄂',
            '湘',
            '粤',
            '桂',
            '琼',
            '渝',
            '川',
            '贵',
            '云',
            '藏',
            '陕',
            '甘',
            '青',
            '宁'
        ];
        var $pro_box_con = $('#pro-box-con');
        var pro_box_con_str = '';
        pro_arr.forEach(function (v,i) {
            if(i > 0){
                pro_box_con_str += '<span class="con-span">'+v+'</span>';
            } else {
                pro_box_con_str += '<span class="con-span active">'+v+'</span>';
            }
        });
        $pro_box_con.html(pro_box_con_str);

        return {
            $proBox : $('.pro-box'),
            $confirm : $('.pro-box .confirm'),
            $cancel : $('.pro-box .cancel'),
            $downMask : $('.downMask'),
            $proBoxCon : $pro_box_con,
            $proShow : options.$proShow
        }
    };

    CityDropDown.prototype.bindEvent = function($obj) {

        $obj.$proShow.on('tap', function(e) {
            $obj.$proBox.show();
            $obj.$downMask.show();
        });

        $obj.$confirm.on('tap', function(e) {
            e.preventDefault();
            var pro = $obj.$proBoxCon.find('.active').html();
            $obj.$proShow.html(pro);
            //$obj.$proBox.hide();
            $obj.$downMask.hide();
        });
        $obj.$downMask.on('tap', function(e) {
            e.preventDefault();
            var pro = $obj.$proBoxCon.find('.active').html();
            $obj.$proShow.html(pro);
            //$obj.$proBox.hide();
            $obj.$downMask.hide();
        });
        $obj.$cancel.on('tap', function(e) {
            e.preventDefault();
            //var pro = $obj.$proBoxCon.find('.active').html();
            //$obj.$proShow.html(pro);
            $obj.$proBox.hide();
        });
        $obj.$proBoxCon.find('.con-span').on('tap', function(e) {
            $obj.$proBoxCon.find('.active').removeClass('active');
            $(e.target).addClass('active');
        })

    };



    return {
        cityDropDown : CityDropDown
    }
});