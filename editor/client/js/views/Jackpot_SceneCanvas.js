import Jackpot_Canvas from "./helpers/Jackpot_Canvas.js";
import Jackpot_PIXI_Container from "../game/Jackpot_PIXI_Container.js";
import Jackpot_PIXI_Graphics from "../game/Jackpot_PIXI_Graphics.js";
import Jackpot_PIXI_Sprite from "../game/Jackpot_PIXI_Sprite.js";
import Jackpot_EventEmitter from "../utils/Jackpot_EventEmitter.js";


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
        this.gizmoz = new Jackpot_PIXI_Container();
    }
    _addListeners() {
        super._addListeners();
        this.eventEmitter.on(Jackpot_EventEmitter.NODE_SELECTED,(e)=>{
            this._gameObjectNodeSelected(e.detail);
        });
        this.eventEmitter.on(Jackpot_EventEmitter.NODE_PROPERTY_UPDATED,()=>{
            this.redrawRectTransformGizmo();
        });
    }

    _gameObjectNodeSelected(node){
        this.selectedNode = node;
        this.redrawRectTransformGizmo();
    }

    _graphicsCashClearAnsSetLineStyle(graphics, thickness, color, filled){
        graphics.clear();
        graphics.lineStyle(thickness, color);
        if(filled)
            graphics.beginFill(color);
    }

    renderTree(){
        this.treeManager.getGameArrayObj()["0"].children.forEach(stageChild=>{
            this.stage.addChild(stageChild.pixiObj);
        });
        this.stage.addChild(this.gizmoz);
    }
    createGizmos(){
        this.rectTransformGizmos = new Jackpot_PIXI_Container();
        this.rectTransformGizmos.parts = [];
        this.rectTransformGizmos.rectangleHitAreaOffset = 20;
        this.rectTransformGizmos.parts["rectangle_up"] = new Jackpot_PIXI_Graphics();
        this.rectTransformGizmos.addChild(this.rectTransformGizmos.parts["rectangle_up"]);
        this.rectTransformGizmos.parts["rectangle_down"] = new Jackpot_PIXI_Graphics();
        this.rectTransformGizmos.addChild(this.rectTransformGizmos.parts["rectangle_down"]);
        this.rectTransformGizmos.parts["rectangle_left"] = new Jackpot_PIXI_Graphics();
        this.rectTransformGizmos.addChild(this.rectTransformGizmos.parts["rectangle_left"]);
        this.rectTransformGizmos.parts["rectangle_right"] = new Jackpot_PIXI_Graphics();
        this.rectTransformGizmos.addChild(this.rectTransformGizmos.parts["rectangle_right"]);
        this.rectTransformGizmos.parts["uL"] = new Jackpot_PIXI_Graphics();
        this.rectTransformGizmos.addChild(this.rectTransformGizmos.parts["uL"]);
        this.rectTransformGizmos.parts["uR"] = new Jackpot_PIXI_Graphics();
        this.rectTransformGizmos.addChild(this.rectTransformGizmos.parts["uR"]);
        this.rectTransformGizmos.parts["dL"] = new Jackpot_PIXI_Graphics();
        this.rectTransformGizmos.addChild(this.rectTransformGizmos.parts["dL"]);
        this.rectTransformGizmos.parts["dR"] = new Jackpot_PIXI_Graphics();
        this.rectTransformGizmos.addChild(this.rectTransformGizmos.parts["dR"]);
        const keys = Object.keys(this.rectTransformGizmos.parts);

        for(let key of keys){
            const object = this.rectTransformGizmos.parts[key];
            object.interactive = true;
            if(!key.includes("rectangle")){
                if(key==="uL" || key==="dR"){
                    object.mouseover = (e)=>{
                        object.cursor = 'nwse-resize';
                    }
                }
                else{
                    object.mouseover = (e)=>{
                        object.cursor = 'nesw-resize';
                    }
                }
            }
            else{
                object.mouseover = (e)=>{
                    console.log(key);
                };
            }
        }
        this.gizmoz.addChild(this.rectTransformGizmos);
    }

    redrawRectTransformGizmo(){
        // size = [W, H]
        const position = [this.selectedNode.pixiObj.position.x, this.selectedNode.pixiObj.position.y];
        const size = [this.selectedNode.pixiObj.width, this.selectedNode.pixiObj.height];
        const parts = this.rectTransformGizmos.parts;
        const offsetHorizontal = size[0]/10;
        const offsetVertical = size[1]/10;
        this.rectTransformGizmos.position.set(position[0],position[1]);


        //Rectangle
        this._graphicsCashClearAnsSetLineStyle(parts["rectangle_up"],1,0xA0A0A0);
        parts["rectangle_up"].position.set(-size[0]/2,-size[1]/2);
        parts["rectangle_up"].lineTo(size[0],0);
        parts["rectangle_up"].hitArea = new PIXI.Rectangle(offsetHorizontal,0,size[0] - 2 * offsetHorizontal ,7);

        this._graphicsCashClearAnsSetLineStyle(parts["rectangle_down"],1,0xA0A0A0);
        parts["rectangle_down"].position.set(-size[0]/2,size[1]/2);
        parts["rectangle_down"].lineTo(size[0],0);
        parts["rectangle_down"].hitArea = new PIXI.Rectangle(offsetHorizontal,0,size[0]- 2 * offsetHorizontal,7);

        this._graphicsCashClearAnsSetLineStyle(parts["rectangle_left"],1,0xA0A0A0);
        parts["rectangle_left"].position.set(-size[0]/2,-size[1]/2);
        parts["rectangle_left"].lineTo(0,size[1]);
        parts["rectangle_left"].hitArea = new PIXI.Rectangle(0,offsetVertical,7,size[1]-  2 * offsetVertical);

        this._graphicsCashClearAnsSetLineStyle(parts["rectangle_right"],1,0xA0A0A0);
        parts["rectangle_right"].position.set(size[0]/2,-size[1]/2);
        parts["rectangle_right"].lineTo(0,size[1]);
        parts["rectangle_right"].hitArea = new PIXI.Rectangle(0,offsetVertical,7,size[1]- 2 * offsetVertical);

        // Pin Points
        this._graphicsCashClearAnsSetLineStyle(parts["uL"],1,0x0066ff,true);
        parts["uL"].position.set(-size[0]/2,-size[1]/2);
        parts["uL"].drawCircle(0, 0, 7);

        this._graphicsCashClearAnsSetLineStyle(parts["uR"],1,0x0066ff,true);
        parts["uR"].position.set(size[0]/2,-size[1]/2);
        parts["uR"].drawCircle(0, 0, 7);

        this._graphicsCashClearAnsSetLineStyle(parts["dL"],1,0x0066ff,true);
        parts["dL"].position.set(-size[0]/2,size[1]/2);
        parts["dL"].drawCircle(0, 0, 7);

        this._graphicsCashClearAnsSetLineStyle(parts["dR"],1,0x0066ff,true);
        parts["dR"].position.set(size[0]/2,size[1]/2);
        parts["dR"].drawCircle(0, 0, 7);

    }

}
