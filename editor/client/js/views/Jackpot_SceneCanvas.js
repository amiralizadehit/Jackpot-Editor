import Jackpot_Canvas from "./helpers/Jackpot_Canvas.js";
import Jackpot_PIXI_Container from "../game/Jackpot_PIXI_Container.js";
import Jackpot_PIXI_Graphics from "../game/Jackpot_PIXI_Graphics.js";
import Jackpot_EventEmitter from "../utils/Jackpot_EventEmitter.js";
import TransformHelper from "../utils/helpers/Jackpot_TransformHelper.js";
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
        this.eventEmitter.on(Jackpot_EventEmitter.NODE_SELECTED,(e)=>{
            this._gameObjectNodeSelected(e.detail);
        });
        this.eventEmitter.on(Jackpot_EventEmitter.NODE_PROPERTY_UPDATED,()=>{
            this.rectTransformGizmos.update();
        });
    }

    _gameObjectNodeSelected(node){
        if(this.selectedNode!==node){
            this.selectedNode = node;
            this.rectTransformGizmos.draw(node);
        }
    }

    renderTree(){
        this.treeManager.getGameArrayObj()["0"].children.forEach(stageChild=>{
            this.stage.addChild(stageChild.pixiObj);
        });
        this.stage.addChild(this.gizmoz);
    }
    createGizmos(){
        this.rectTransformGizmos = new Jackpot_Gizmo_RectTransform(this.stage);
        this.gizmoz.addChild(this.rectTransformGizmos);
    }

}
