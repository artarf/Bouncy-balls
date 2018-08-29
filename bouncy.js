		window.onload = function() {
			canvas = document.getElementById("canvas");
			ctx = canvas.getContext("2d");
			setInterval(update, 1000/60);
			setInterval(refresh, 1000/260);
			lastRefresh = performance.now()
		}


// Now setting the width and height of the canvas
	var W = 500,
		H = 500;

// Applying these to the canvas element
canvas.height = H; canvas.width = W;

// First of all we'll create a ball object which will contain all the methods and variables specific to the ball.
// Lets define some variables first

var lastRefresh = null;
var gravity = 0,
	bounceFactor = 1;

// The ball object
// It will contain the following details
// 1) Its x and y position
// 2) Radius and color
// 3) Velocity vectors
// 4) the method to draw or paint it on the canvas

var audio = new Audio('Trance - 009 Sound System Dreamscape (HD).mp4');
//var bounce = new Audio('ping_pong_8bit_plop.wav');

var k = 4;
var p;

balls = []

function ballSpeed(x = .3) {
	return Math.random() * 2 * x - x
}

function addBall(){
	if (k == 4) {
		p = 'red';
		k += 1;
	} else {
		p = 'blue';
		k -= 1;
	}
	console.log('Hello world')
	console.log(k)
    balls.push(
    {
        x: Math.floor(Math.random() * W) + 0,
        y: Math.floor(Math.random() * H) + 0,

        radius: 15,
        color: p,

        // Velocity components
        vx: ballSpeed(),
        vy: ballSpeed()
    })
}


function draw(ctx,ball) {
	// Here, we'll first begin drawing the path and then use the arc() function to draw the circle. The arc function accepts 6 parameters, x position, y position, radius, start angle, end angle and a boolean for anti-clockwise direction.
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, false);
	ctx.fillStyle = ball.color;
	ctx.fill();
	ctx.closePath();
}

// When we do animations in canvas, we have to repaint the whole canvas in each frame. Either clear the whole area or paint it with some color. This helps in keeping the area clean without any repetition mess.
// So, lets create a function that will do it for us.
function clearCanvas() {
	ctx.clearRect(0, 0, W, H);
}

// A function that will update the position of the ball is also needed. Lets create one

function update() {
	clearCanvas();
	balls.map( ball => draw(ctx, ball) )
}

function refresh() {
	x = performance.now()
	delta = x - lastRefresh
	lastRefresh = x
	balls.map( ball => moveBall(ball, delta) )
	checkIfBallsHaveCollided()
}

function checkIfBallsHaveCollided() {
	for (i = 0; i < balls.length; i++) {
		for (j = i + 1; j < balls.length; j++) {
			index = balls[i];
			jay = balls[j];
			var newVelX1 = (index.vx * (index.radius - jay.radius) + (2 * jay.radius * jay.vx) / (index.radius + jay.radius));
			var newVelY1 = (index.vy * (index.radius - jay.radius) + (2 * jay.radius * jay.vy) / (index.radius + jay.radius));
			var newVelX2 = (jay.vx * (jay.radius - index.radius) + (2 * index.radius * index.vx) / (index.radius + jay.radius));
			var newVelY2 = (jay.vy * (jay.radius - index.radius) + (2 * index.radius * index.vy) / (index.radius + jay.radius));
			var dist = Math.sqrt((index.x - jay.x) * (index.x - jay.x) + (index.y - jay.y) * (index.y - jay.y))
			console.log(jay);
			console.log(index);
			//console.log(dist);
			if(dist < index.radius + jay.radius) {
				index.x = index.x;
				index.y = index.y;
				jay.x = jay.x;
				jay.y = jay.y;
				index.vx = newVelX1;
				index.vy = newVelY1;
				jay.vx = newVelX2;
				jay.vy = newVelY2;
			}
		}

	}
}

function moveBall(ball, delta) {
		// Now, lets make the ball move by adding the velocity vectors to its position
		ball.y += ball.vy * delta;
		ball.x += ball.vx * delta;
		// Ohh! The ball is moving!
		// Lets add some acceleration
		ball.vy += gravity;

		//Perfect! Now, lets make it rebound when it touches the floor
		if(ball.y + ball.radius > H) {
			// First, reposition the ball on top of the floor and then bounce it!
			ball.y = H - ball.radius;
			ball.vy *= -bounceFactor;
            //bounce.play();
			// The bounceFactor variable that we created decides the elasticity or how elastic the collision will be. If it's 1, then the collision will be perfectly elastic. If 0, then it will be inelastic.
		}
		if(ball.x + ball.radius > W) {
			ball.x = W - ball.radius;
			ball.vx *= -bounceFactor;
            //bounce.play();
		}
		if(ball.x < ball.radius) {
			ball.x = ball.radius;
			ball.vx *= -bounceFactor;
            //bounce.play();
		}
        if(ball.y < ball.radius) {
			ball.y = ball.radius;
			ball.vy *= -bounceFactor;
			//bounce.play();
		}
}



// Now, the animation time!
// in setInterval, 1000/x depicts x fps! So, in this casse, we are aiming for 60fps for smoother animations.

// This completes the tutorial here. Try experimenting with different values to get a better understanding.

// Also, try playing with the x-component of velocity ;)
