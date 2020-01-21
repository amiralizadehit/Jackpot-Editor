import Jackpot_Canvas from "./helpers/Jackpot_Canvas.js";
import Jackpot_EventEmitter from "../utils/Jackpot_EventEmitter.js";

export default class Jackpot_GameCanvas extends Jackpot_Canvas{
    constructor(){
        super({width:100, height:100, antialias:true, strokeText:"Game", strokeColor:"#e91e63"});

    }
    renderTree(treeStructure){

    }
}
