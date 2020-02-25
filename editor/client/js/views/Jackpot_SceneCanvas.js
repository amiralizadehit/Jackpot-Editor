import Jackpot_Canvas from "./helpers/Jackpot_Canvas.js";
import Jackpot_PIXI_Container from "../game/Jackpot_PIXI_Container.js";
import Jackpot_EventEmitter from "../utils/Jackpot_EventEmitter.js";
import Jackpot_Gizmo_RectTransform from "./helpers/Gizmos/Jackpot_Gizmo_RectTransform.js";


export default class Jackpot_SceneCanvas extends Jackpot_Canvas{
    constructor(treeManager){
        super({width:100, height:100, antialias:true , strokeText:"Scene", strokeColor:"#AAF"});
        this.treeManager = treeManager;
        this.eventEmitter = new Jackpot_EventEmitter();
        this.selectedNode = null;
        this.renderTree();
        this.createGizmos();
    }

    _init(){
        super._init();
        this.stage.interactive = true;
        this.gizmoz = new Jackpot_PIXI_Container();
    }
    _addListeners() {
        super._addListeners();
        this.eventEmitter.on(Jackpot_EventEmitter.NODE_SELECTED,e=>{
            this._gameObjectNodeSelected(e.detail);
        });
        this.eventEmitter.on(Jackpot_EventEmitter.NODE_PROPERTY_UPDATED,e=>{
            if(e.detail.emitter!=="gizmo")
                this.rectTransformGizmos.update();
        });
        this.eventEmitter.on(Jackpot_EventEmitter.DELETE_OBJECTS, e =>{
            this._gameObjectNodeDeleted();
        });
    }

    _gameObjectNodeSelected(node){
        if(this.selectedNode!==node){
            this.selectedNode = node;
            this.rectTransformGizmos.draw(node);
        }
    }
    _gameObjectNodeDeleted(){
        this.rectTransformGizmos.erase();
    }

    renderTree(){
        this.stage.removeChildren();
        this.stage = this.treeManager.getGameArrayObj()["0"].pixiObj;
        /*this.treeManager.getGameArrayObj()["0"].children.forEach(stageChild=>{
            this.stage.addChild(stageChild.pixiObj);
        });*/
        this.stage.addChild(this.gizmoz);
    }
    createGizmos(){
        this.rectTransformGizmos = new Jackpot_Gizmo_RectTransform(this.renderer, this.stage);
        this.gizmoz.addChild(this.rectTransformGizmos);
    }

}
