import Jackpot_Canvas from "./helpers/Jackpot_Canvas.js";
import {NodeTypes} from "../utils/Jackpot_EditorConfiguration.js";
import Jackpot_PIXI_Container from "../game/Jackpot_PIXI_Container.js";


let projectPrefixURL = "../../../../projects/";

export default class Jackpot_SceneCanvas extends Jackpot_Canvas{
    constructor(gameTree, game){
        super({width:100, height:100, antialias:true , strokeText:"Scene", strokeColor:"#AAF"});
        this.gameTree = gameTree;
        this.game = game;
        this.projectURL = projectPrefixURL + game.name;
        this.renderTree();
    }

    _drawNode(node){
        if(node.id==="0"){
            //This is the root node (stage)
        }
        else{
            switch (node.type) {
                case NodeTypes.CONTAINER :
                        this._addContainer(node);
                    break;
                case NodeTypes.SPRITE :
                        this._addSprite(node);
                    break;
            }
        }
    }

    _addContainer(node){

        new Jackpot_PIXI_Container();
    }

    _addSprite(node){


    }

    renderTree(){
        this.gameTree.getInnerTree().children.forEach(stageChild=>{
            this.stage.addChild(stageChild.pixiObj);
        })
        console.log(this.stage.children);
    }
}
