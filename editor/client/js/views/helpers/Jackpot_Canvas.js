import Jackpot_EventEmitter from "../../utils/Jackpot_EventEmitter.js";

export default class Jackpot_Canvas extends PIXI.Application{
    constructor(options){
        super({width:options.width, height:options.height, antialias:options.antialias});
        this.options = options;
        this.eventEmitter = new Jackpot_EventEmitter();
        this._init();
    }
    getElement(){
        return this.view;
    }

    _init(){
        this.renderer.autoDensity = true;
        this._addListeners();
    }
    _addListeners(){
        this.eventEmitter.on(Jackpot_EventEmitter.RENDER_TREE, this.renderTree.bind(this));
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