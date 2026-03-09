var canvas = document.getElementById("canvas")
	var ctx = canvas.getContext("2d")
	
	var lives = 3
	var okLeft = false		
	var okRight = false	
	
	
	
	
	
	var myCar = new Image()
	myCar.src = "rocket-gdb8efb106_640.png"
	myCar.X = 50
	myCar.Y = 400
	
	var enemyCar1 = new Image()
	enemyCar1.src = "Broken-Asteroid-PNG-Photos.png"
	enemyCar1.X = 50
	enemyCar1.Y = -150
	
	var enemyCar2 = new Image()
	enemyCar2.src = "Broken-Asteroid-PNG-Photos.png"
	enemyCar2.X = 250
	enemyCar2.Y = -450

	function drawRect(){
		ctx.fillStyle = "Black"
		ctx.fillRect(0, 0, 400, 500)
	}
	
	function drawLives(){
		ctx.font = "30px Arial"
		ctx.fillStyle = "White"
		ctx.fillText("Lives: "+lives, 235, 48)
	}
	
	
	
	
	function stop(){
		cancelAnimationFrame(myReq)
		ctx.font = "60px Arial"
		ctx.fillStyle = "Red"
		ctx.fillText("Game over", 40, 200)
		stop = true
	}
	
	function drawMyCar(){
		if(okLeft === true && myCar.X > 0) {myCar.X -=5}
		if(okRight === true && myCar.X < 335) {myCar.X +=5}
	
		ctx.drawImage(myCar, myCar.X, myCar.Y)
	}
	
	function drawEnemyCar1(){
	
		if (enemyCar1.Y+100 > myCar.Y && enemyCar1.X+65 > myCar.X && enemyCar1.X < myCar.X+65){
			crash = true
			enemyCar1.Y = enemyCar2.Y - 300
			lives--
			if(lives <1){
				stop()
			}		
		}else{
			crash = false
		}	
	
		if (!crash){
			ctx.drawImage(enemyCar1, enemyCar1.X, enemyCar1.Y)
			enemyCar1.Y +=2
			if (enemyCar1.Y > 500){
				enemyCar1.Y = -100
				enemyCar1.X = Math.floor(Math.random()*335)
			}
		}
	}
	
	function drawEnemyCar2(){
	
		if (enemyCar2.Y+100 > myCar.Y && enemyCar2.X+65 > myCar.X && enemyCar2.X < myCar.X+65){
			crash = true
			enemyCar2.Y = enemyCar1.Y - 300
			lives--
			if(lives <1){
				stop()
			}		
		}else{
			crash = false
		}	
	
		if (!crash){
			ctx.drawImage(enemyCar2, enemyCar2.X, enemyCar2.Y)
			enemyCar2.Y +=2
			if (enemyCar2.Y > 500){
				enemyCar2.Y = -100
				enemyCar2.X = Math.floor(Math.random()*335)
			}
		}
	}   
	
	function render(){
		if (stop === true){return}
	
		drawRect()
		drawLives()
		drawMyCar()
		drawEnemyCar1()
		drawEnemyCar2()		
		
		myReq = requestAnimationFrame(render)
	}
	render()	
	
	addEventListener("keydown", function(event){
		var newDirect = event.keyCode
		if (newDirect === 37){
			okLeft = true
		}
		
		if (newDirect === 39){
			okRight = true
		}
	})
	
	addEventListener("keyup", function(event){
		var newDirect = event.keyCode
		if (newDirect === 37){
			okLeft = false
		}
		
		if (newDirect === 39){
			okRight = false
		}
	})