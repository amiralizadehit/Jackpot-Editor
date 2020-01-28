import Jackpot_Canvas from "./helpers/Jackpot_Canvas.js";


export default class Jackpot_SceneCanvas extends Jackpot_Canvas{
    constructor(treeManager){
        super({width:100, height:100, antialias:true , strokeText:"Scene", strokeColor:"#AAF"});
        this.treeManager = treeManager;
        this.renderTree();
    }

    renderTree(){
        this.treeManager.getGameArrayObj()["0"].children.forEach(stageChild=>{
            this.stage.addChild(stageChild.pixiObj);
        });
    }
}
