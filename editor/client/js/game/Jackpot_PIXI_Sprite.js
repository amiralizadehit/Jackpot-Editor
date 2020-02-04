export default class Jackpot_PIXI_Sprite extends PIXI.Sprite{
    constructor(spriteData){
        super(spriteData);
    }


    setAnchorAndUpdatePosition(x, y){
        let xDiff = (x-this.anchor.x) * this.width;
        let yDiff = (y-this.anchor.y) * this.height;
        let currentXPos = this.position.x;
        let currentYPos = this.position.y;
        let newXPos = currentXPos+xDiff;
        let newYPos = currentYPos+yDiff;
        this.anchor.set(x,y);
        this.position.set(newXPos, newYPos);
        return [newXPos, newYPos];
    }
}