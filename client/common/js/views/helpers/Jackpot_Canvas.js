class Jackpot_Canvas extends PIXI.Application{
    constructor(options){
        super({width:options.width, height:options.height, antialias:options.antialias});
        this.options = options;
        this._init();
    }
    getElement(){
        return this.view;
    }

    _init(){

        this.renderer.autoDensity = true;
        this.graphics = new PIXI.Graphics();
        this.stage.addChild(this.graphics);
        this.graphics.lineStyle(2, 0xFF0000);
        this.graphics.drawRect(10.5, 10.5, this.renderer.width-20, this.renderer.height-20);
    }

    redraw(){
        if(this.view.parentNode){
            let parent = this.view.parentNode;
            if (parent) {
                this.renderer.resize(parent.clientWidth, parent.clientHeight);

            }
        }
    }
}