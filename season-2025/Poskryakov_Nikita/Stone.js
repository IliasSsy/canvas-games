class Stone{
    type = "stone";
    xStart = null;
    yStart = null;
    lastMovingTime = 0;
    xNow = null;
    yNow = null; 
    flagFirstObj = true;   
    xClear = 0;
    //Коэффициенты уравнения
    a = -0.05
    b = null;
    
    constructor(xStart, yStart){
        this.xStart = xStart;
        this.yStart = yStart;
        this.xNow = xStart;
        this.yNow = yStart;
        if(GAME.level == 0){
            this.a = -0.05;
            this.b = 1 + Math.random() * 0.25;
        }if(GAME.level == 1){
            this.a = -0.05;
            this.b = 1 + Math.random() * 0.3;
        }if(GAME.level == 2){
            this.a = -0.05;
            this.b = 1 + Math.random() * 0.5;
        }
        
        
    }
    countMoving(){//Мат. просчитывание каждого момента полёта
        this.xClear++;
        this.xNow +=1;
        this.yNow = this.yStart - Math.floor(this.a * this.xClear**2 + this.b * this.xClear);
        
        
    }
    destroyObject(xDestroy, yDestroy){
        if(xDestroy < TERRAIN.rows && yDestroy < TERRAIN.columns){
            if(TERRAIN.array[yDestroy][xDestroy].type == "gold"){
                HOME.countFlower += 2;
                HOME.countGold -= 1;
            }
    
            TERRAIN.array[yDestroy][xDestroy] = 0;
        }
        

    }
    renderingStone(){
        canvasContext.fillStyle = 'rgb(44, 44, 44)';
        canvasContext.fillRect(this.xNow * TERRAIN.ratio, this.yNow * TERRAIN.ratio, TERRAIN.ratio, TERRAIN.ratio);
        if(this.xNow + 1 < TERRAIN.rows && this.yNow - 1 > 0){
            if(TERRAIN.array[this.yNow][this.xNow + 1].type == "wall" || TERRAIN.array[this.yNow][this.xNow + 1].type == "gold"){
                
                this.destroyObject(this.xNow - 1, this.yNow - 1);
                this.destroyObject(this.xNow, this.yNow - 1);
                this.destroyObject(this.xNow + 1, this.yNow - 1);
    
                this.destroyObject(this.xNow - 1, this.yNow);
                this.destroyObject(this.xNow, this.yNow);
                this.destroyObject(this.xNow + 1, this.yNow);
    
                this.destroyObject(this.xNow - 1, this.yNow + 1);
                this.destroyObject(this.xNow, this.yNow + 1);
                this.destroyObject(this.xNow + 1, this.yNow + 1);
               
            }else if(TERRAIN.array[this.yNow+1][this.xNow].type == "wall" || TERRAIN.array[this.yNow+1][this.xNow + 1].type == "gold"){
                
                this.destroyObject(this.xNow - 1, this.yNow - 1);
                this.destroyObject(this.xNow, this.yNow - 1);
                this.destroyObject(this.xNow + 1, this.yNow - 1);
    
                this.destroyObject(this.xNow - 1, this.yNow);
                this.destroyObject(this.xNow, this.yNow);
                this.destroyObject(this.xNow + 1, this.yNow);
    
                this.destroyObject(this.xNow - 1, this.yNow + 1);
                this.destroyObject(this.xNow, this.yNow + 1);
                this.destroyObject(this.xNow + 1, this.yNow + 1);
               
            }else if(TERRAIN.array[this.yNow-1][this.xNow].type == "wall" || TERRAIN.array[this.yNow-1][this.xNow + 1].type == "gold"){
                
                this.destroyObject(this.xNow - 1, this.yNow - 1);
                this.destroyObject(this.xNow, this.yNow - 1);
                this.destroyObject(this.xNow + 1, this.yNow - 1);
    
                this.destroyObject(this.xNow - 1, this.yNow);
                this.destroyObject(this.xNow, this.yNow);
                this.destroyObject(this.xNow + 1, this.yNow);
    
                this.destroyObject(this.xNow - 1, this.yNow + 1);
                this.destroyObject(this.xNow, this.yNow + 1);
                this.destroyObject(this.xNow + 1, this.yNow + 1);
                
                
            }
            
        }else{
            TERRAIN.array[this.yNow][this.xNow] = 0;
            
        }
        
        if(Date.now() - this.lastMovingTime > 0){//Передвижение
            if(this.xNow + 1 < TERRAIN.rows && this.yNow - 1 > 0){
                if(this.yNow < this.yStart + 5 && this.yNow > 0 && this.xNow < TERRAIN.rows){
                    if(this.flagFirstObj){
                        var tempObj = TERRAIN.array[this.yStart][this.xStart];
                        this.flagFirstObj = false;
                        TERRAIN.array[this.yStart][this.xStart] = 0;
                    }else{
                        var tempObj = TERRAIN.array[this.yNow][this.xNow];
                        TERRAIN.array[this.yNow][this.xNow] = 0;
                    }
                    this.countMoving();
                    TERRAIN.array[this.yNow][this.xNow] = tempObj;
                    this.lastMovingTime = Date.now();
                }else{
                    TERRAIN.array[this.yNow][this.xNow] = 0;
                    //HOME.countLifeFlower--;
                }
            }else{
                TERRAIN.array[this.yNow][this.xNow] = 0;
                //HOME.countLifeFlower--;
            }
            
        }
    }
}