var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		var ballRadius = 10;
		var x = canvas.width/2;
		var y = canvas.height-30;
		var dx = 2;
		var dy = -2;
		var paddleHeight = 10;
		var paddleWidth = 75;
		var paddleX = (canvas.width-paddleWidth)/2;
		var rightPressed = false;
		var leftPressed = false;
		var count = 0;
		
		var brickRowCount = 3;
		var brickColumnCount = 6;
		var brickWidth = 75;
		var brickHeight = 20;
		var brickPadding = 10;
		var brickOffsetTop = 30;
		var brickOffsetLeft = 30;		
		var bricks = [];
		var color = 90;
		var hue = 0;
		var saturation = 0;
		var div1 = document.getElementById("start");
		var interval;	
		var score = 0;
		
		for(var c=0; c<brickColumnCount; c++) {
			bricks[c] = [];
			for(var r=0; r<brickRowCount; r++) {
				bricks[c][r] = { x: 0, y: 0, status: 1 };
			}
		}

		document.addEventListener("keydown", keyDownHandler, false);
		document.addEventListener("keyup", keyUpHandler, false);
		
		function randomColor(){
			saturation = 70;
			hue = (Math.ceil(Math.random()*(360)+1));
			var color = "hsl("+hue+","+saturation+"%,50%)";
			return color;
			
		}
		function fadeColor(){
			saturation=saturation-1;
			var color = "hsl("+hue+","+saturation+"%,50%)";
			return color;
			
		}
		var barvaCegla = randomColor();
		function drawBricks() {
			count++;
			if(count%50==0){
				barvaCegla = randomColor();			
				count=0;
			}else{
				barvaCegla = fadeColor();
			}
			for(var c=0; c<brickColumnCount; c++) {
				for(var r=0; r<brickRowCount; r++) {
					if(bricks[c][r].status == 1) {
						
						var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
						var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
						bricks[c][r].x = brickX;
						bricks[c][r].y = brickY;
						ctx.beginPath();
						ctx.rect(brickX, brickY, brickWidth, brickHeight);						
						ctx.fillStyle = barvaCegla;
						ctx.fill();
						ctx.closePath();
					}
				}
			}
		}
		function drawScore() {
			ctx.font = "16px Arial";
			ctx.fillStyle = "#0095DD";
			ctx.fillText("Score: "+score, 8, 20);
		}
		function keyDownHandler(e) {
			if(e.key == "Right" || e.key == "ArrowRight") {
				rightPressed = true;
			}
			else if(e.key == "Left" || e.key == "ArrowLeft") {
				leftPressed = true;
			}
		}

		function keyUpHandler(e) {
			if(e.key == "Right" || e.key == "ArrowRight") {
				rightPressed = false;
			}
			else if(e.key == "Left" || e.key == "ArrowLeft") {
				leftPressed = false;
			}
		}

		function drawBall() {
			ctx.beginPath();
			ctx.arc(x, y, ballRadius, 0, Math.PI*2);
			ctx.fillStyle = "#0095DD";
			ctx.fill();
			ctx.closePath();
		}
		function drawPaddle() {
			ctx.beginPath();
			ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
			ctx.fillStyle = "#0095DD";
			ctx.fill();
			ctx.closePath();
		}
			function collisionDetection() {
			for(var c=0; c<brickColumnCount; c++) {
				for(var r=0; r<brickRowCount; r++) {
					var b = bricks[c][r];
					if(b.status == 1) {
						if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
							dy = -dy;
							b.status = 0;
							score++;
							if(score == brickRowCount*brickColumnCount) {
								alert("Good Job Pro Gamer");
								document.location.reload();
								clearInterval(interval);
							}
						}
					}
				}
			}
		}
		function start(){
			interval = setInterval(draw, 10);		
			div1.style.visibility = 'hidden';
			canvas.style.visibility = 'visible';			
		}

		function draw() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			drawBall();
			drawPaddle();
			drawBricks();
			collisionDetection();
			drawScore();
			
			if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
				dx = -dx;
			}
			if(y + dy < ballRadius) {
				dy = -dy;
			} else if(y + dy > canvas.height-ballRadius) {
				if(x > paddleX && x < paddleX + paddleWidth) {
					dy = -dy;
				}
				else {				
					div1.style.visibility = 'visible';
					x = canvas.width/2;
					y = canvas.height-30;
					paddleX = (canvas.width-paddleWidth)/2;
					rightPressed = false;
					leftPressed = false;
					score = 0;
					
						
					for(var c=0; c<brickColumnCount; c++) {
						for(var r=0; r<brickRowCount; r++) {						
							bricks[c][r].status = 1;
						}
					}
					
					clearInterval(interval);
					canvas.style.visibility = 'hidden';
				}
			}
			
			if(rightPressed) {
				paddleX += 7;
				if (paddleX + paddleWidth > canvas.width){
					paddleX = canvas.width - paddleWidth;
				}
			}
			else if(leftPressed) {
				paddleX -= 7;
				if (paddleX < 0){
					paddleX = 0;
				}
			}
			
			x += dx;
			y += dy;
		}

		