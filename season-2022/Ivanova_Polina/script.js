
//подготовка инструментов
 const canvas = document.getElementById("canvas");
 const canvasContext = canvas.getContext("2d");
 canvas.width = 800;
 canvas.height = 500;

 let score = 0;
 let gameFrame = 0;
 canvasContext.font = "50px Georgia"

 //mouse
 let canvasPosition = canvas.getBoundingClientRect();

 const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click:false
 }
 canvas.addEventListener("mousedown", function(event){
     mouse.click = true;
     mouse.x = event.x - canvasPosition.left;
     mouse.y = event.y - canvasPosition.top;
 });
   canvas.addEventListener("mouseup", function(){
         mouse.click = false;
  });


 //Player
 class Player {
     constructor(){
         this.x = canvas.width;
         this.y = canvas.height/2;
         this.radius = 50;
         this.angle = 0;
         this.FrameX = 0;
         this.FrameY = 0;
         this.Frame = 0;
         this.spriteWidth = 498;
         this.spriteHeight = 327;
     }
     update() {
         const dx = this.x - mouse.x;
         const dy = this.y - mouse.y;
         if (mouse.x != this.x) {
             this.x -= dx/1;
         }
         if(mouse.y != this.y) {
             this.y -= dy/1;
         }
     }
    
     draw(){
         if(mouse.click) {
             canvasContext.lineWidth = 0.2;
             canvasContext.beginPath();
             canvasContext.moveTo(this.x, this.y);
             canvasContext.lineTo(mouse.x, mouse.y);
             canvasContext.stroke();
            
         }
         canvasContext.fillStyle = "#800000";
         canvasContext.beginPath();
         canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
         canvasContext.fill();
         canvasContext.closePath();
             function fillRect() {
                 canvasContext.fillrect(this.x, this.y, this.radius, 10);
             }
            
                    
            
         }
      }
     const player = new Player();


 //Bubbles
  const bubblesArray = [];
  class Bubble {
      constructor(){
          this.x = Math.random() * canvas.width;
          this.y = canvas.height + 100 + Math.random() * canvas.height;
          this.radius = 50;
          this.speed = Math.random() * 5 + 1;
          this.distance;
          this.counted = false;

      }
      update() {
          this.y -= this.speed;
          const dx = this.x - player.x;
          const dy = this.y - player.y;
          this.distance = Math.sqrt(dx*dx + dy*dy);
      }
      draw () {
          canvasContext.fillStyle = "#9932CC";
          canvasContext.beginPath();
          canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          canvasContext.fill();
          canvasContext.closePath();
          canvasContext.stroke();
      }
  }


  function handleBubbles(){
      if (gameFrame % 50 == 0){
          bubblesArray.push(new Bubble());
      }
      for (let i = 0; i < bubblesArray.length; i++) {
          bubblesArray[i].update();
          bubblesArray[i].draw();
      }
      for (let i = 0; i < bubblesArray.length; i++) {
          if (bubblesArray[i].y < 0 - bubblesArray[i].radius * 2) {
              bubblesArray.splice(i, 1); 
          }
          if (bubblesArray[i].distance < bubblesArray[i].radius + player.radius) {
              if(!bubblesArray[i].counted) {
                  score++;
                  bubblesArray[i].counted = true;
                  bubblesArray.splice(i, 1);
              }
          }
      }
  }

 //Animation 
 function animate(){
     canvasContext.clearRect(0, 0, canvas.width, canvas.height);
     handleBubbles();
     player.update();
     player.draw();
     canvasContext.fillStyle = 'black';
     canvasContext.fillText('score: ' + score, 10, 50)
     gameFrame++,
     requestAnimationFrame(animate);
 }
 animate();

