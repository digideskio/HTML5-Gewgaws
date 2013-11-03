var twopi = Math.PI * 2;
var degrees = twopi / 360;
var fib = [1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597,2584,4181,6765,10946];

var triangle = function(low, high, span, v) {
    var k = v / span;
    var phase = Math.floor(k);
    var residue = k - phase;
    if (phase % 2 === 0) {
        return low + (residue * (high - low));
    } else {
        return high - (residue * (high - low));
    }
};

FibonacciSpiral = function() {
    var info = undefined;
    var ctx = undefined;
    var canvas = undefined;
    var factor = 10; // 0;
    var rate = 0; // 0.001
    var counter = 0;

    this.init = function(c) {
        canvas = c;
        ctx = canvas.getContext("2d");
        info = document.getElementById('info');
        var $this = this;

        var animFrame = function(time) {
            $this.draw();
            requestAnimationFrame(animFrame);
        };

        requestAnimationFrame(animFrame);
    };

    this.draw = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var sign = -1;
        var x = canvas.width / 2;
        var y = canvas.height / 2;
        //var alpha = (Math.sin(counter / 10) + 1) * 0.05;
        //alpha = Math.floor(alpha * 1000) / 1000;
        var alpha = 0.05;
        var colours = [
            '255,0,0',
            '0,255,0',
            '0,0,255'
        ];
        var linecolours = [
            '#000000',
            '#800000',
            '#707070'
        ];

        ctx.save();
        ctx.translate(x, y + 1);
        ctx.scale(factor, factor);
        ctx.translate(-x, -y - 1);
        ctx.lineWidth = 2 / factor;
        for (var i = 0; i < 20; i++) {
            var f = fib[i];

            ctx.beginPath();
            var a1; var a2;
            if (sign > 0) {
                a1 = Math.PI * 0.5;
                a2 = Math.PI * 1.5;
                ctx.fillStyle = "rgba(" + colours[i % colours.length] + "," + alpha + ")";
            } else {
                a1 = Math.PI * 1.5;
                a2 = Math.PI * 2.5;
                ctx.fillStyle = "rgba(" + colours[i % colours.length] + "," + alpha + ")";
            }
            ctx.strokeStyle = linecolours[i % linecolours.length];
            var radius = f; // * factor;
            y -= sign * radius;  // remove for different effect
            ctx.arc(x, y, Math.abs(radius), a1, a2, false);
            ctx.fill();
            ctx.stroke();

            sign *= -1;
            y += sign * radius;
        }
        ctx.restore();

        factor -= 0.01; // rate;
        //rate += 0.0001;

        info.innerHTML = "Factor: " + factor + ", alpha=" + alpha;
  
        //factor = triangle(1, 10, 100, counter);
        factor = 20 * (Math.cos(counter / 100) + 1.001);
        counter += 0.3;
        //counter += factor < 2 ? 0.3 : 1;
    };
};
