define([], function() {

    var utilities = {};
    //date操作
    utilities.date = {
        /**
         * 获取当前毫秒值
         */
        now: function () {
            return +new Date;
        },
        /**
         * 是否到达指定日期
         * @param str 2016/02/15
         */
        overDate:function(str){
            var toDate= (new Date(str+" 00:00:00")).getTime();
            return this.now()>=toDate;
        },
        getDate: function () {
            var date=new Date();
            var month=date.getMonth()+1;
            var day=date.getDate();
            return {
                y:date.getFullYear(),
                m:month<10?'0'+month:month,
                d:day<10?'0'+day:day
            };
        },
        getDaysOfCurMonth: function (year,month) {
            return (new Date(year, month,0)).getDate();
        }
    };
    utilities.dom = {
        /**
         * 查找数组中的指定索引的元素
         * @param arr
         * @param i
         * @returns {*}
         */
        eq: function (arr, i) {
            return arr[i];
        },
        remove:function(dom){
            dom.parentNode.removeChild(dom);
        },
        removeChildNodes:function(parent,callback){
            while(parent.hasChildNodes()) //当div下还存在子节点时 循环继续
            {
                parent.removeChild(parent.firstChild);
            }
            callback&&callback();
        },
        addClass:function(dom,class_str){
            var class_arr=class_str.split(' ');
            class_arr.forEach(function (v) {
                dom.classList.add(v);
            })
        },
        /**
         * 添加样式到内嵌样式<style></style>
         * @param css
         */
        addStyle: function (css) {
            var doc = document, head = doc.head;

            var styles = head.getElementsByTagName("style"), style;
            if (styles.length == 0) {//如果不存在style元素则创建
                style = doc.createElement('style');
                head.appendChild(style);
            }
            style = styles[0];
            style.appendChild(doc.createTextNode(css))
        },
        addEvent: function (element,type,fun) {
            element.addEventListener(type, function (e) {
                fun(e);
            },false);
        },
        /**
         * 事件委托
         * @param parent
         * @param className
         * @param type
         * @param fun
         */
        addDelegateEvent: function (parent,className,type,fun) {
            this.addEvent(parent,type,function(e){
                if(e.target.classList.contains(className)){
                    fun(e);
                }
            });
        }
    };
    //视窗viewport
    utilities.view = {
        /**
         * 页面缩放比例，可以解决rem不精确
         * @param psd_width
         * @returns {number}
         */
        ratio:function(psd_width){
            var max_ratio=window.innerWidth/psd_width;
            return max_ratio<1?max_ratio:1;
        },
        /**
         * 初始化视窗
         * @param page_width psd页面的尺寸
         */
        init: function (page_width) {
            utilities.ready.dom(function () {
                page_width = page_width ? page_width : 750;
                document.getElementsByClassName('page')[0].style.maxWidth = page_width + 'px';
                var _self = {};
                _self.width = page_width;//设置默认最大宽度
                _self.fontSize = 100;//默认字体大小
                _self.ratio = 320 / page_width;
                _self.widthProportion = function () {
                    var p = window.innerWidth / _self.width;
                    if (p > 1) {
                        return 1;
                    }

                    if (p < _self.ratio) {
                        return _self.ratio;
                    }
                    return p;
                };
                _self.changePage = function () {
                    document.documentElement.style.fontSize = _self.widthProportion() * _self.fontSize + 'px';
                };
                _self.changePage();
                window.addEventListener("resize", function () {
                    _self.changePage();
                }, false);
            });
            return this;
        },
        /**
         * 兼容ipad
         * @param page_width
         */
        initIpad: function (page_width) {
            utilities.ready.dom(function () {
                var _self = {};
                _self.fontSize = 100;//默认字体大小
                page_width = page_width ? page_width : 750;
                //_self.ratio = 320 / page_width;
                _self.widthProportion = function () {
                    _self.width = window.innerWidth;//设置默认最大宽度
                    document.getElementsByClassName('page')[0].style.maxWidth = _self.width + 'px';
                    var p = _self.width / page_width;
                    /*if (p > 1) {
                     return 1;
                     }*/

                    /*if (p < _self.ratio) {
                     return _self.ratio;
                     }*/
                    return p;
                };
                _self.changePage = function () {
                    document.documentElement.style.fontSize = _self.widthProportion() * _self.fontSize + 'px';
                };
                _self.changePage();
                window.addEventListener("resize", function () {
                    _self.changePage();
                }, false);
            });
            return this;
        },
        /**
         * 阻止浏览器touchmove默认行为
         */
        preDefault: function () {
            document.addEventListener('touchmove', function (e) {
                e.preventDefault();
            },false);
            return this;
        }
    };
    //自动加css前缀
    utilities.prefix = {
        /**
         * transform
         * @param element
         * @param value
         */
        transform: function (element,value) {
            element.style.webkitTransform=value;
            element.style.transform=value;
        },
        /**
         * transform
         * @param element
         * @param value
         */
        transition: function (element,value) {
            element.style.webkitTransition=value.replace(/transform/,'-webkit-transform');
            element.style.transition=value;
        }
    };
    /**
     * touch 方向，触发回调
     * @param options
     * @constructor
     */
    var TouchPage = function (options) {
        options = options || {};
        //左页回调
        this.leftPage=options.leftPage|| function () {
            };
        //右页回调
        this.rightPage=options.rightPage|| function () {
            };
        //上页回调
        this.upPage=options.upPage|| function () {
            };
        //下页回调
        this.downPage=options.downPage|| function () {
            };

        //start
        this.startCall=options.startCall|| function () {
            };

        //move
        this.moveCall=options.moveCall|| function () {
            };

        //end
        this.endCall=options.endCall|| function () {
            };

        //touch开始位置
        this.start = {
            x: 0,
            y: 0,
            t: 0
        };
        //touch move位置
        this.move = {
            x: 0,
            y: 0
        };
        //touch结束位置
        this.end = {
            x: 0,
            y: 0,
            t: 0
        };
        //垂直滑动有效值
        this.pass = {
            //running: false,//当前翻页动画是否在运行，默认false
            v_distance: 20,
            time: 300
        };

        this.dom_container=options.dom_container||document;

        this.init();
    };
    TouchPage.prototype = {
        init: function () {
            this.initEvent();
        },
        initEvent: function () {
            //console.log('初始化事件');
            var self = this;
            this.dom_container.addEventListener('touchstart', function (e) {
                //console.log('初始化touchstart事件');
                //console.log(e);
                self.start.x = e.touches[0].pageX;
                self.start.y = e.touches[0].pageY;
                self.start.t = new Date().getTime();
                self.startCall(e,self.start.x,self.start.y);

                e.stopPropagation();
                //e.preventDefault();
            }, false);
            this.dom_container.addEventListener('touchmove', function (e) {
                //console.log('初始化touchstart事件');
                //console.log(e);
                self.move.x = e.touches[0].pageX;
                self.move.y = e.touches[0].pageY;

                self.moveCall(e,self.move.x-self.start.x,self.move.y-self.start.y);
                e.preventDefault();

                e.stopPropagation();
            }, false);
            this.dom_container.addEventListener('touchend', function (e) {
                //console.log('初始touchend化事件');
                //console.log(e);
                //if (self.pass.running)return;
                self.end.x = e.changedTouches[0].pageX;
                self.end.y = e.changedTouches[0].pageY;
                self.end.t = new Date().getTime();
                var y = self.end.y - self.start.y;
                var x = self.end.x - self.start.x;
                if (Math.abs(y) > Math.abs(x)) {//垂直
                    if (Math.abs(y) > self.pass.v_distance) {//大于有效距离
                        if (self.end.t - self.start.t < self.pass.time) {//在有效时间范围内
                            //console.log('可滑动');
                            if (self.end.y > self.start.y) {
                                //console.log('上');
                                self.upPage();
                            } else {
                                //console.log('下');
                                self.downPage();
                            }
                        }
                    }
                }else if(Math.abs(x) > Math.abs(y)){//水平
                    if (Math.abs(x) > self.pass.v_distance) {//大于有效距离
                        if (self.end.t - self.start.t < self.pass.time){//在有效时间范围内
                            if (self.end.x > self.start.x) {
                                //console.log('左');
                                self.leftPage();
                            } else {//下页
                                //console.log('右');
                                self.rightPage();
                            }
                        }
                    }
                }
                self.endCall(e,x,y);

                e.stopPropagation();
            }, false);
        }
    };
    /**
     * 模拟ios日期控件
     * @constructor
     */
    var IosDate = function (opts) {
        opts=opts||{};
        this.element=opts.element;

        this.years = [];
        this.months = [];
        this.days = [];

        this.day_show=false;

        this.item_height = 45;

        this.dom = {};

        this.duration={
            y:0,
            m:0,
            d:0
        };

        /*this.active = {
         y: 2016,
         m: 1,
         d: 25
         };*/

        this.active_index = {
            y: 0,
            m: 0,
            d: 0
        };

        this.position = {
            y: 0,
            m: 0,
            d: 0
        };

        this.date = utilities.date.getDate();
        this.init();
    };

    IosDate.prototype = {
        init: function () {
            //utilities.view.preDefault();
            this.initDom();
            this.createDate();
            this.updatePosition();
            this.initEvent();
        },
        initEvent: function () {
            var self = this;
            var layer;
            new TouchPage({
                dom_container: this.dom.ios_date_con,
                startCall: function (e, x, y) {
                    //console.log(e.target.className )
                    layer = e.target;
                    e.preventDefault();
                },
                moveCall: function (e, x, y) {
                    //console.log(x)
                    //console.log(y + ':y');

                    if (layer.classList.contains('ios-date-year-layer')) {
                        //console.log('year');
                        utilities.prefix.transform(self.dom.ios_date_year, 'translate(0,' + (self.position.y + y) + 'px)');
                    } else if (layer.classList.contains('ios-date-month-layer')) {
                        //console.log('month');
                        utilities.prefix.transform(self.dom.ios_date_month, 'translate(0,' + (self.position.m + y) + 'px)');
                    } else if (layer.classList.contains('ios-date-day-layer')) {
                        //console.log('day');
                        utilities.prefix.transform(self.dom.ios_date_day, 'translate(0,' + (self.position.d + y) + 'px)');
                    }

                    //e.preventDefault();
                },
                endCall: function (e, x, y) {
                    if (layer.classList.contains('ios-date-year-layer')) {
                        //console.log('year');
                        self.getActiveIndex('y', y, self.years);
                        if(self.day_show)
                            self.removeDays();
                    } else if (layer.classList.contains('ios-date-month-layer')) {
                        //console.log('month');
                        self.getActiveIndex('m', y, self.months);
                        if(self.day_show)
                            self.removeDays();
                    } else if (layer.classList.contains('ios-date-day-layer')) {
                        //console.log('day');
                        self.getActiveIndex('d', y, self.days);
                    }


                    self.updatePosition();
                    //e.preventDefault();
                }
            });


            this.element.setAttribute('readonly',true);
            //self.element.value=self.date.y+'年'+self.date.m+'月';

            utilities.dom.addEvent(this.dom.ios_date_mask, 'click', function () {
                self.hide();
            });

            utilities.dom.addEvent(this.element, 'click', function () {
                self.show();
            });

            utilities.dom.addEvent(document.getElementById('ios-date-confirm'), 'touchstart', function (e) {
                self.element.value=self.date.y+'年'+self.date.m+'月';
                self.hide();
            });

            utilities.dom.addEvent(document.getElementById('ios-date-cancel'), 'touchstart', function (e) {
                self.hide();
            });
        },
        getActiveIndex: function (key, value, arr) {
            var self = this;
            self.position[key] += value;
            //console.log(value);
            self.duration[key]=Math.abs(value/5)*0.01;
            var count = Math.round(Math.abs(self.position[key] / self.item_height));
            if (self.position[key] > 0 && count >= 1) {
                self.active_index[key] = 0;
            } else if (self.position[key] < 0 && count >= arr.length - 1) {
                self.active_index[key] = arr.length - 1;
            } else {
                self.active_index[key] = count + 1;
            }
            //self.active[key]=self.date[key]=arr[self.active_index[key]];
            self.date[key]=arr[self.active_index[key]];
        },
        show:function(){
            this.showMask();
            this.showDate();
        },
        hide:function(){
            this.hideMask();
            this.hideDate();
        },
        updatePosition: function () {
            this.position = {
                y: -this.item_height * (this.active_index.y - 1),
                m: -this.item_height * (this.active_index.m - 1)

            };

            if(this.day_show){
                this.position.d=-this.item_height * (this.active_index.d - 1);
                utilities.prefix.transition(this.dom.ios_date_day,'all '+this.duration.d+'s ease-out');
                utilities.prefix.transform(this.dom.ios_date_day, 'translate(0,' + this.position.d + 'px)');
            }

            utilities.prefix.transition(this.dom.ios_date_year,'all '+this.duration.y+'s ease-out');
            utilities.prefix.transition(this.dom.ios_date_month,'all '+this.duration.m+'s ease-out');
            utilities.prefix.transform(this.dom.ios_date_year, 'translate(0,' + this.position.y + 'px)');
            utilities.prefix.transform(this.dom.ios_date_month, 'translate(0,' + this.position.m + 'px)');
        },
        addMask:function(){
            this.dom.ios_date_mask = document.createElement('div');
            this.dom.ios_date_mask.classList.add('ios-date-mask');
            document.body.appendChild(this.dom.ios_date_mask);
        },
        showMask:function(){
            this.dom.ios_date_mask.style.display='block';
        },
        hideMask:function(){
            this.dom.ios_date_mask.style.display='none';
        },
        showDate:function(){
            this.dom.ios_date_con.style.display='block';
        },
        hideDate:function(){
            this.dom.ios_date_con.style.display='none';
        },
        addTitle:function(){

            this.dom.ios_date_title = document.createElement('div');
            this.dom.ios_date_title.classList.add('ios-date-title');
            this.dom.ios_date_title.innerHTML='<div id="ios-date-cancel">取消</div>' +
                '<div id="ios-date-confirm">确定</div>';

            this.dom.ios_date_con.appendChild(this.dom.ios_date_title);
        },
        initDom: function () {
            this.addMask();
            this.dom.ios_date_con = document.createElement('div');
            this.dom.ios_date_con.classList.add('ios-date-con');

            this.addTitle();

            this.dom.ios_date = document.createElement('div');
            this.dom.ios_date.classList.add('ios-date');

            this.dom.ios_date_con.appendChild(this.dom.ios_date);

            /*this.dom.ios_date_inner = document.createElement('div');
             this.dom.ios_date_inner.classList.add('ios-date-inner');
             this.dom.ios_date.appendChild(this.dom.ios_date_inner);*/

            //this.dom.ios_date.innerHTML='<div class="ios-date-column"></div>';

            //year
            this.dom.ios_date_year_column = document.createElement('div');
            utilities.dom.addClass(this.dom.ios_date_year_column, 'ios-date-column');
            this.dom.ios_date_year_layer = document.createElement('div');
            this.dom.ios_date_year_column.appendChild(this.dom.ios_date_year_layer);

            this.dom.ios_date_year = document.createElement('div');
            utilities.dom.addClass(this.dom.ios_date_year, 'ios-date-year ios-date-inner');
            this.dom.ios_date_year_column.appendChild(this.dom.ios_date_year);


            this.dom.ios_date_month_column = this.dom.ios_date_year_column.cloneNode(false);
            this.dom.ios_date_month_layer = this.dom.ios_date_year_layer.cloneNode(false);
            this.dom.ios_date_month_column.appendChild(this.dom.ios_date_month_layer);
            this.dom.ios_date_month = document.createElement('div');
            utilities.dom.addClass(this.dom.ios_date_month, 'ios-date-month ios-date-inner');
            this.dom.ios_date_month_column.appendChild(this.dom.ios_date_month);

            if(this.day_show){
                this.dom.ios_date_day_column = this.dom.ios_date_year_column.cloneNode(false);
                this.dom.ios_date_day_layer = this.dom.ios_date_year_layer.cloneNode(false);
                this.dom.ios_date_day_column.appendChild(this.dom.ios_date_day_layer);
                this.dom.ios_date_day = document.createElement('div');
                utilities.dom.addClass(this.dom.ios_date_day, 'ios-date-day ios-date-inner');
                this.dom.ios_date_day_column.appendChild(this.dom.ios_date_day);
                utilities.dom.addClass(this.dom.ios_date_day_layer, 'ios-date-layer ios-date-day-layer');
                this.dom.ios_date.appendChild(this.dom.ios_date_day_column);


            }else{
                this.dom.ios_date_year_column.style.width='50%';
                this.dom.ios_date_month_column.style.width='50%';
                //this.dom.ios_date_year.style.textAlign='center';
            }


            utilities.dom.addClass(this.dom.ios_date_year_layer, 'ios-date-layer ios-date-year-layer');
            utilities.dom.addClass(this.dom.ios_date_month_layer, 'ios-date-layer ios-date-month-layer');

            this.dom.ios_date.appendChild(this.dom.ios_date_year_column);
            this.dom.ios_date.appendChild(this.dom.ios_date_month_column);
            //this.dom.ios_date.appendChild(this.dom.ios_date_month);
            //this.dom.ios_date.appendChild(this.dom.ios_date_day);

            document.body.appendChild(this.dom.ios_date_con);
        },
        /**
         * 创建日期
         */
        createDate: function () {
            //this.dom.layer = document.createElement('div');
            //this.dom.layer.classList.add('ios-date-layer');
            //this.dom.ios_date.appendChild(this.dom.layer);
            this.createYears();
            this.createMonths();
            if(this.day_show){
                this.createDays();
            }
        },
        /**
         * 创建年份
         */
        createYears: function () {
            for (var i = this.date.y; i <= this.date.y+5; i++) {
                this.years.push(i);
            }
            var create_dom = this.createTemplate(this.years, '年', this.date.y);
            this.dom.ios_date_year.appendChild(create_dom.seg);
            this.active_index.y = create_dom.active_i;
        },
        /**
         * 创建月份
         */
        createMonths: function () {
            for (var i = 1; i <= 12; i++) {
                if (i < 10)
                    i = '0' + i;
                this.months.push(i);
            }
            var create_dom = this.createTemplate(this.months, '月', this.date.m);
            this.dom.ios_date_month.appendChild(create_dom.seg);
            this.active_index.m = create_dom.active_i;
        },
        /**
         * 创建天
         */
        createDays: function () {
            var month_days = utilities.date.getDaysOfCurMonth(this.date.y, this.date.m);
            //console.log(month_days);
            for (var i = 1; i <= month_days; i++) {
                if (i < 10)
                    i = '0' + i;
                this.days.push(i);
            }
            var len=this.days.length;
            if(this.date.d>len){
                this.date.d=this.days[len-1];
            }
            var create_dom = this.createTemplate(this.days, '日', this.date.d);
            this.dom.ios_date_day.appendChild(create_dom.seg);
            this.active_index.d = create_dom.active_i;
        },
        removeDays:function(){
            var self=this;
            this.days=[];
            utilities.dom.removeChildNodes(this.dom.ios_date_day, function () {
                self.createDays();
            });
        },
        createTemplate: function (arr, text, active_value) {
            var item;
            var unit;
            var seg = document.createDocumentFragment();
            var active_i = 0;
            arr.forEach(function (v, i) {
                item = document.createElement('div');
                item.classList.add('ios-date-item');

                if (v == active_value) {
                    item.classList.add('ios-date-item-active');
                    active_i = i;
                } else if (v - 1 == active_value) {
                    item.classList.add('ios-date-next');
                } else if (v + 1 == active_value) {
                    item.classList.add('ios-date-prev');
                }

                unit = document.createElement('div');
                unit.classList.add('ios-date-unit');
                unit.appendChild(document.createTextNode(text));

                item.appendChild(document.createTextNode(v));
                item.appendChild(unit);

                seg.appendChild(item);
            });
            return {
                seg: seg,
                active_i: active_i
            };
        }
    };

    return {
        iosDate : IosDate
    }
});