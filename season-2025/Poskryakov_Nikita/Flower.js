class Flower {
    type = "flower"
    x = null;
    y = null;
    startTimeLife = null;
    health = 5;

    stateEvolution = 0;
    shoot = false;
    lastTimeShoot = null;
    

    
    constructor(x, y, startTimeLife) {
        HOME.countFlower--;
        this.x = x;
        this.y = y;
        this.startTimeLife = startTimeLife;
        this.lastTimeShoot = startTimeLife;
        
    }
    renderingHeshMap(){
        if(this.stateEvolution == 2 && Date.now() - this.lastTimeShoot > 2500 && !this.shoot){//Первая стадия, вылет камня и разрядка катапульты
            this.lastTimeShoot = Date.now();
            this.shoot = true;
            this.stateEvolution = 3;
            heshMapRendering(this.y, this.x, this.stateEvolution);
            TERRAIN.array[this.y][this.x + 7] = new Stone(this.x + 7, this.y);
            this.health -= 1;
            if(this.health == 0){
                TERRAIN.array[this.y][this.x] = 0;
                
            }
            
            
            //ВЫЛЕТ КАМНЯ
        }
        if(this.stateEvolution == 3 && Date.now() - this.lastTimeShoot > 500){//Вторая стадия выстрела, зарядка катапульты
            this.stateEvolution = 4;
            heshMapRendering(this.y, this.x, this.stateEvolution);
        }
        if(this.stateEvolution == 4 && Date.now() - this.lastTimeShoot > 1000){//Третья стадия выстрела, возвращение в исходное положение
            this.stateEvolution = 2;
            heshMapRendering(this.y, this.x, this.stateEvolution);
            this.shoot = false;
        }

        if(!this.shoot){
            heshMapRendering(this.y, this.x, this.stateEvolution);
            if(this.stateEvolution == 0){
                if((Date.now() - this.startTimeLife) > 1000) this.stateEvolution = 1;
                
            }
            if(this.stateEvolution == 1){
                if(Date.now() - this.startTimeLife > 2000) this.stateEvolution = 2;
            }
        }
        
    } 
}