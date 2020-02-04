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
        this.stage.interactive = true;
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
        if(this.selectedNode!==node){
            this.selectedNode = node;
            this.redrawRectTransformGizmo();
        }
    }

    _setGraphicsLineStyle(graphics, thickness, color, filled){
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
        this.rectTransformGizmos.parts["pinpoint_uL"] = new Jackpot_PIXI_Graphics();
        this.rectTransformGizmos.addChild(this.rectTransformGizmos.parts["pinpoint_uL"]);
        this.rectTransformGizmos.parts["pinpoint_uR"] = new Jackpot_PIXI_Graphics();
        this.rectTransformGizmos.addChild(this.rectTransformGizmos.parts["pinpoint_uR"]);
        this.rectTransformGizmos.parts["pinpoint_dL"] = new Jackpot_PIXI_Graphics();
        this.rectTransformGizmos.addChild(this.rectTransformGizmos.parts["pinpoint_dL"]);
        this.rectTransformGizmos.parts["pinpoint_dR"] = new Jackpot_PIXI_Graphics();
        this.rectTransformGizmos.addChild(this.rectTransformGizmos.parts["pinpoint_dR"]);
        this.rectTransformGizmos.parts["pivot"] = new Jackpot_PIXI_Graphics();
        this.rectTransformGizmos.addChild(this.rectTransformGizmos.parts["pivot"]);
        const keys = Object.keys(this.rectTransformGizmos.parts);

        for(let key of keys){
            const object = this.rectTransformGizmos.parts[key];
            object.interactive = true;
            if(key.includes("pinpoint")){
                if(key==="pinpoint_uL" || key==="pinpoint_dR"){
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
            else if(key.includes("rectangle")){
                object.mouseover = (e)=>{
                    if(key==="rectangle_up" || key==="rectangle_down"){
                        object.mouseover = (e)=>{
                            object.cursor = 'ns-resize';
                        }
                    }
                    else{
                        object.mouseover = (e)=>{
                            object.cursor = 'ew-resize';
                        };
                    }
                };
                object.mousedown = (e)=>{
                    const pixiObj = this.selectedNode.pixiObj;
                    let mouseInitPos = e.data.getLocalPosition(this.stage);
                    switch (key) {
                        case "rectangle_right":
                            pixiObj.setAnchorAndUpdatePosition(0,0.5);
                            object.mousemove = (e)=>{
                                const mouseCurrentPos = e.data.getLocalPosition(this.stage);
                                const posDiff = [mouseCurrentPos.x - mouseInitPos.x, mouseCurrentPos.y - mouseInitPos.y];
                                pixiObj.width+=posDiff[0];
                                mouseInitPos = mouseCurrentPos;
                            };
                            break;
                    }
                };
                object.mouseup = (e)=>{
                    this.selectedNode.pixiObj.mousemove = null;
                }
            } //Pivot point
            else{
                object.buttonMode = true;
            }
        }
        this.gizmoz.addChild(this.rectTransformGizmos);
    }

    redrawRectTransformGizmo(){
        // size = [W, H]

        //console.log(this.selectedNode.pixiObj.transform);

        this.selectedNode.pixiObj.updateTransform(); //update the object world transform
        const position = [this.selectedNode.pixiObj.transform.worldTransform.tx, this.selectedNode.pixiObj.transform.worldTransform.ty];

        const pivot = [this.selectedNode.pixiObj.pivot.x, this.selectedNode.pixiObj.pivot.y];
        const size = [this.selectedNode.pixiObj.width, this.selectedNode.pixiObj.height];
        const scale = [this.selectedNode.pixiObj.scale.x, this.selectedNode.pixiObj.scale.y];
        const parts = this.rectTransformGizmos.parts;
        const offsetHorizontal = size[0]/10;
        const offsetVertical = size[1]/10;
        const centerPoint = [
            position[0]+(size[0]/2 * Math.sign(scale[0])) - pivot[0],
            position[1]+ (size[1]/2 * Math.sign(scale[1])) - pivot[1]];

        this.rectTransformGizmos.pivot.set(pivot[0], pivot[1]);
        this.rectTransformGizmos.position.set(position[0],position[1]);

        parts.forEach(item=>{
            item.clear();
        });

        //Rectangle
        this._setGraphicsLineStyle(parts["rectangle_up"],1,0xA0A0A0);
        parts["rectangle_up"].position.set(-size[0]/2,-size[1]/2);
        parts["rectangle_up"].lineTo(size[0],0);
        parts["rectangle_up"].hitArea = new PIXI.Rectangle(offsetHorizontal,-5,size[0] - 2 * offsetHorizontal ,10);

        this._setGraphicsLineStyle(parts["rectangle_down"],1,0xA0A0A0);
        parts["rectangle_down"].position.set(-size[0]/2,size[1]/2);
        parts["rectangle_down"].lineTo(size[0],0);
        parts["rectangle_down"].hitArea = new PIXI.Rectangle(offsetHorizontal,-5,size[0]- 2 * offsetHorizontal,10);

        this._setGraphicsLineStyle(parts["rectangle_left"],1,0xA0A0A0);
        parts["rectangle_left"].position.set(-size[0]/2,-size[1]/2);
        parts["rectangle_left"].lineTo(0,size[1]);
        parts["rectangle_left"].hitArea = new PIXI.Rectangle(-5,offsetVertical,10,size[1]-  2 * offsetVertical);

        this._setGraphicsLineStyle(parts["rectangle_right"],1,0xA0A0A0);
        parts["rectangle_right"].position.set(size[0]/2,-size[1]/2);
        parts["rectangle_right"].lineTo(0,size[1]);
        parts["rectangle_right"].hitArea = new PIXI.Rectangle(-5,offsetVertical,10,size[1]- 2 * offsetVertical);

        // Pin Points
        this._setGraphicsLineStyle(parts["pinpoint_uL"],1,0x0066ff,true);
        parts["pinpoint_uL"].position.set(-size[0]/2,-size[1]/2);
        parts["pinpoint_uL"].drawCircle(0, 0, 7);

        this._setGraphicsLineStyle(parts["pinpoint_uR"],1,0x0066ff,true);
        parts["pinpoint_uR"].position.set(size[0]/2,-size[1]/2);
        parts["pinpoint_uR"].drawCircle(0, 0, 7);

        this._setGraphicsLineStyle(parts["pinpoint_dL"],1,0x0066ff,true);
        parts["pinpoint_dL"].position.set(-size[0]/2,size[1]/2);
        parts["pinpoint_dL"].drawCircle(0, 0, 7);

        this._setGraphicsLineStyle(parts["pinpoint_dR"],1,0x0066ff,true);
        parts["pinpoint_dR"].position.set(size[0]/2,size[1]/2);
        parts["pinpoint_dR"].drawCircle(0, 0, 7);

        this._setGraphicsLineStyle(parts["pivot"],2,0x0066ff,false);
        parts["pivot"].position.set(0,0);
        parts["pivot"].drawCircle(0, 0, 15);
    }

}
