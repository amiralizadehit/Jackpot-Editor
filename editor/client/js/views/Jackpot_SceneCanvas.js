import Jackpot_Canvas from "./helpers/Jackpot_Canvas.js";


export default class Jackpot_SceneCanvas extends Jackpot_Canvas{
    constructor(gameTree){
        super({width:100, height:100, antialias:true , strokeText:"Scene", strokeColor:"#AAF"});
        this.gameTree = gameTree;
        this.renderTree();
    }

    renderTree(){
        this.gameTree.getInnerTree().children.forEach(stageChild=>{
            this.stage.addChild(stageChild.pixiObj);
        });
    }
}
