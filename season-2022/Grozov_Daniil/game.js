const UPDATE_TIME = 1000 / 60;
var timer = null;
var canvas = document.getElementById("canvas"); 
var ctx = canvas.getContext("2d"); 
var scale = 0.1; 
Resize(); 
window.addEventListener("resize", Resize); 
canvas.addEventListener("contextmenu", function (e) { e.preventDefault(); return false; }); 
window.addEventListener("keydown", function (e) { KeyDown(e); }); 

function Draw() 
{
	ctx.clearRect(0, 0, canvas.width, canvas.height); 
	for(var i = 0; i < roads.length; i++)
	{
		ctx.drawImage
		(
			roads[i].image, 
			0, 
			0, 
			roads[i].image.width, 
			roads[i].image.height, 
			roads[i].x, 
			roads[i].y, 
			canvas.width, 
			canvas.width 
		);
	}
	DrawCar(player);
	for(var i = 0; i < objects.length; i++)
	{
		DrawCar(objects[i]);
	}
}
function DrawCar(car)
{
	ctx.drawImage
	(
		car.image, 
		0, 
		0, 
		car.image.width, 
		car.image.height, 
		car.x, 
		car.y, 
		car.image.width * scale, 
		car.image.height * scale 
	);
}

function Update() 
{
	
	if(RandomInteger(0, 10000) > 9700) 
	{
		objects.push(new Car("images/rac.png", RandomInteger(30, canvas.width - 50), RandomInteger(250, 400) * -1, false));
	}
	player.Update();
	if(player.dead)
	{
		alert("Врезался!");
	}
	var isDead = false; 
	for(var i = 0; i < objects.length; i++)
	{
		objects[i].Update();
		if(objects[i].dead)
		{
			isDead = true;
		}
	}
	if(isDead)
	{
		objects.shift();
	}
	var hit = false;
	for(var i = 0; i < objects.length; i++)
	{
		hit = player.Collide(objects[i]);
		if(hit)
		{
			alert("Врезался!"),
			player.dead = true;
			break;
		}
	}
	Draw();
}


class Road
{
	constructor(image, y)
	{
		this.x = 0;
		this.y = y;
		this.loaded = false;
		this.image = new Image();
		
		var obj = this;
		this.image.addEventListener("load", function () { obj.loaded = true; });
		this.image.src = image;
	}
	Update(road) 
	{
		this.y += speed; 

		if(this.y > window.innerHeight) 
		{
			this.y = road.y - this.image.height + speed; 
			this.y = road.y - canvas.width + speed; 
		}
	}
}
class Car
{
	constructor(image, x, y, isPlayer)
	{
		this.x = x;
		this.y = y;
		this.loaded = false;
		this.dead = false;
		this.isPlayer = isPlayer;
		this.image = new Image();
		var obj = this;
		this.image.addEventListener("load", function () { obj.loaded = true; });
		this.image.src = image;
	}
	Update()
	{
		if(!this.isPlayer)
		{
			this.y += speed;
		}
		if(this.y > canvas.height + 50)
		{
			this.dead = true;
		}
	}
	Collide(car)
	{
		var hit = false;
		if(this.y < car.y + car.image.height * scale && this.y + this.image.height * scale > car.y) 
		{
			if(this.x + this.image.width * scale > car.x && this.x < car.x + car.image.width * scale) 
			{
				hit = true;
			}
		}
		return hit;
	}
	Move(v, d) 
	{
		if(v == "x") 
		{
			d *= 5;
			this.x += d; 
			
			if(this.x + this.image.width * scale > canvas.width)
			{
				this.x -= d; 
			}
	
			if(this.x < 0)
			{
				this.x = 0;
			}
		}
		
		}
		
	}

	var objects = []; 
	var roads = 
	[
		new Road("images/road.jpg", 0, canvas.width),
	]; 

var player = new Car("images/car.png", canvas.width / 2, canvas.height / 2, true); 
var speed = 5;
Start();
function Start()
{
	if(!player.dead)
	{
		timer = setInterval(Update, UPDATE_TIME); 
	}
	
}


function KeyDown(e)
{
	switch(e.keyCode)
	{
		case 37: 
			player.Move("x", -speed);
			break;
		case 39: 
			player.Move("x", speed);
			break;
		case 27: 
			if(timer == null)
			{
				Start();
			}
	}
}
function Resize()
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
function RandomInteger(min, max) 
{
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand);
}