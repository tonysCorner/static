define([], function() {
    (function() {
        var body = document.getElementsByTagName('body')[0];
        var loadindDiv = document.createElement('div'),
            canvas_2 = document.createElement('canvas'),
            canvas_3 = document.createElement('canvas'),
            canvas_4 = document.createElement('canvas');

        loadindDiv.setAttribute('class', 'loading');
        canvas_2.setAttribute('id', 'canvas_2');
        canvas_3.setAttribute('id', 'canvas_3');
        canvas_4.setAttribute('id', 'canvas_4');

        loadindDiv.appendChild(canvas_2);
        loadindDiv.appendChild(canvas_3);
        loadindDiv.appendChild(canvas_4);
        body.appendChild(loadindDiv);
    })();

   return {
        SYCLoading : function() {
            var loading = document.querySelector('.loading');
            var canvas = document.createElement('canvas');

            var canvas_2 = document.getElementById('canvas_2');
            var ctx_2 = canvas_2.getContext('2d');

            var canvas_3 = document.getElementById('canvas_3');
            var ctx_3 = canvas_3.getContext('2d');

            var canvas_4 = document.getElementById('canvas_4');
            var ctx_4 = canvas_4.getContext('2d');

            canvas.setAttribute('width','100px');
            canvas.setAttribute('height','100px');
            loading.appendChild(canvas);
            var ctx = canvas.getContext('2d');

            function leaf(context,sub) {
                context.beginPath();
                context.strokeStyle='#1ed760';
                context.lineWidth =6;
                sub();
                context.stroke();
            }

            function leaf1() {
                ctx.arc(35,35,7,0.5*Math.PI,2*Math.PI,false);
                ctx.lineTo(42, 42);
                ctx.lineTo(35, 42);
            }

            function leaf2() {
                ctx_2.arc(65,35,7,0.5*Math.PI,Math.PI,true);
                ctx_2.lineTo(59, 42);
                ctx_2.lineTo(68, 42);
            }

            function leaf3() {
                ctx_3.arc(66,65,7,Math.PI,1.5*Math.PI,true);
                ctx_3.lineTo(59, 58);
                ctx_3.lineTo(59, 65);
            }

            function leaf4() {
                ctx_4.beginPath();
                ctx_4.strokeStyle='#1ed760';
                ctx_4.lineWidth =6;
                ctx_4.arc(35,65,7,0.25*Math.PI,1.25*Math.PI,false);
                ctx_4.lineCap="round";
                ctx_4.lineTo(35, 56);
                ctx_4.moveTo(41, 69);
                ctx_4.lineTo(43, 67);
                ctx_4.stroke();
            }

            leaf(ctx,leaf1);
            leaf(ctx_2,leaf2);
            leaf(ctx_3,leaf3);
            leaf4(ctx_4,leaf4);
            loading.style.opacity = 1;

            return loading;
        }
   }
});