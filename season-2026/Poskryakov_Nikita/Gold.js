class Gold{
    x = null;
    y = null;
    type = "gold";

    constructor(y, x){
        this.x = x;
        this.y = y;
        HOME.countGold += 1;
    }
    renderingGold(){
        canvasContext.fillStyle = 'rgb(217, 233, 0)';
        canvasContext.fillRect(this.x * TERRAIN.ratio, this.y * TERRAIN.ratio, TERRAIN.ratio, TERRAIN.ratio);
    }
}