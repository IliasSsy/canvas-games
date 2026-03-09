var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

var foodImg = new Image();
foodImg.src = "food1.png";

var box = 32;

var score = 0;

var food = {
	x: Math.floor((Math.random() * 19)) * box,
	y: Math.floor((Math.random() * 19)) * box,
};

var snake = [];
snake[0] = {
	x: Math.floor((Math.random() * 19)) * box,
	y: Math.floor((Math.random() * 19)) * box,
};

document.addEventListener("keydown", direction);

var dir;

function direction(event) {
	if(event.keyCode == 37 && dir != "right")
		dir = "left";
	else if(event.keyCode == 38 && dir != "down")
		dir = "up";
	else if(event.keyCode == 39 && dir != "left")
		dir = "right";
	else if(event.keyCode == 40 && dir != "up")
		dir = "down";
}

function eatTail(head, arr) {
	for(var i = 0; i < arr.length; i++) {
		if(head.x == arr[i].x && head.y == arr[i].y)
			clearInterval(game);
	}
}

function drawGame() {

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(foodImg, food.x, food.y);

	for(var i = 0; i < snake.length; i++) {
		ctx.fillStyle = i == 0 ? "#FFFF00" : "#FFD700";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
	}

	ctx.fillStyle = "white";
	ctx.font = "30px Arial";
	ctx.fillText("Score: " + score, 30, 30);

	var snakeX = snake[0].x;
	var snakeY = snake[0].y;

	if(snakeX == food.x && snakeY == food.y) {
		score++;
		food = {
			x: Math.floor((Math.random() * 19)) * box,
			y: Math.floor((Math.random() * 19)) * box,
		};
	} else
		snake.pop();

	
	if (snakeX < box) {
		snakeX = canvas.width - box;
	}
	else if (snakeX > box * 19) {
		snakeX = 0;
	}
	if (snakeY < box) {
		snakeY = canvas.height - box;
	}
	else if (snakeY > box * 19) {
		snakeY = 0;
	}

	if(dir == "left") snakeX -= box;
	if(dir == "right") snakeX += box;
	if(dir == "up") snakeY -= box;
	if(dir == "down") snakeY += box;

	var newHead = {
		x: snakeX,
		y: snakeY
	};

	eatTail(newHead, snake);

	snake.unshift(newHead);
}

var game = setInterval(drawGame, 100);
