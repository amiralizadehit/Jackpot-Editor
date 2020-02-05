import Jackpot_PIXI_Container from "../../../game/Jackpot_PIXI_Container.js";
import Jackpot_PIXI_Graphics from "../../../game/Jackpot_PIXI_Graphics.js";
import TransformHelper from "../../../utils/helpers/Jackpot_TransformHelper.js";

export default class Jackpot_Gizmo_RectTransform extends Jackpot_PIXI_Container {
    constructor(stage) {
        super();
        this.parts = [];
        this.stage = stage;
        this.selectedNode = null;
        this.rectangleHitAreaOffset = 20;
        this.parts["rectangle_up"] = new Jackpot_PIXI_Graphics();
        this.addChild(this.parts["rectangle_up"]);
        this.parts["rectangle_down"] = new Jackpot_PIXI_Graphics();
        this.addChild(this.parts["rectangle_down"]);
        this.parts["rectangle_left"] = new Jackpot_PIXI_Graphics();
        this.addChild(this.parts["rectangle_left"]);
        this.parts["rectangle_right"] = new Jackpot_PIXI_Graphics();
        this.addChild(this.parts["rectangle_right"]);
        this.parts["pinpoint_uL"] = new Jackpot_PIXI_Graphics();
        this.addChild(this.parts["pinpoint_uL"]);
        this.parts["pinpoint_uR"] = new Jackpot_PIXI_Graphics();
        this.addChild(this.parts["pinpoint_uR"]);
        this.parts["pinpoint_dL"] = new Jackpot_PIXI_Graphics();
        this.addChild(this.parts["pinpoint_dL"]);
        this.parts["pinpoint_dR"] = new Jackpot_PIXI_Graphics();
        this.addChild(this.parts["pinpoint_dR"]);
        this.parts["pivot"] = new Jackpot_PIXI_Graphics();
        this.addChild(this.parts["pivot"]);
        this._init();
    }
    _init(){
        const keys = Object.keys(this.parts);
        for(let key of keys){
            const object = this.parts[key];
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
                            //pixiObj.setAnchorAndUpdatePosition(0,0.5);
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
    }

    draw(node){
        this.selectedNode = node;
        const globalTransform = TransformHelper.getGlobalTransform(node.pixiObj);
        const position = [globalTransform[0].x, globalTransform[0].y];
        const scale = [node.pixiObj.scale.x, node.pixiObj.scale.y];
        const pivot = [node.pixiObj.pivot.x * globalTransform[2][0], node.pixiObj.pivot.y * globalTransform[2][1]];
        const size = [node.pixiObj.width * globalTransform[2][0]/scale[0], node.pixiObj.height* globalTransform[2][1]/scale[1]];
        const parts = this.parts;
        const offsetHorizontal = size[0]/10;
        const offsetVertical = size[1]/10;

        this.position.set(position[0],position[1]);
        this.pivot.set(pivot[0] , pivot[1]);
        this.rotation = globalTransform[1];

        parts.forEach(item=>{
            item.clear();
        });

        //Rectangle
        this._setGraphicsLineStyle(parts["rectangle_up"],1,0xA0A0A0);
        parts["rectangle_up"].position.set(0,0);
        parts["rectangle_up"].lineTo(size[0],0);
        parts["rectangle_up"].hitArea = new PIXI.Rectangle(offsetHorizontal,-5,size[0] - 2 * offsetHorizontal ,10);

        this._setGraphicsLineStyle(parts["rectangle_down"],1,0xA0A0A0);
        parts["rectangle_down"].position.set(0,size[1]);
        parts["rectangle_down"].lineTo(size[0],0);
        parts["rectangle_down"].hitArea = new PIXI.Rectangle(offsetHorizontal,-5,size[0]- 2 * offsetHorizontal,10);

        this._setGraphicsLineStyle(parts["rectangle_left"],1,0xA0A0A0);
        parts["rectangle_left"].position.set(0,0);
        parts["rectangle_left"].lineTo(0,size[1]);
        parts["rectangle_left"].hitArea = new PIXI.Rectangle(-5,offsetVertical,10,size[1]-  2 * offsetVertical);

        this._setGraphicsLineStyle(parts["rectangle_right"],1,0xA0A0A0);
        parts["rectangle_right"].position.set(size[0],0);
        parts["rectangle_right"].lineTo(0,size[1]);
        parts["rectangle_right"].hitArea = new PIXI.Rectangle(-5,offsetVertical,10,size[1]- 2 * offsetVertical);

        // Pin Points
        this._setGraphicsLineStyle(parts["pinpoint_uL"],1,0x0066ff,true);
        parts["pinpoint_uL"].position.set(0,0);
        parts["pinpoint_uL"].drawCircle(0, 0, 7);

        this._setGraphicsLineStyle(parts["pinpoint_uR"],1,0x0066ff,true);
        parts["pinpoint_uR"].position.set(size[0],0);
        parts["pinpoint_uR"].drawCircle(0, 0, 7);

        this._setGraphicsLineStyle(parts["pinpoint_dL"],1,0x0066ff,true);
        parts["pinpoint_dL"].position.set(0,size[1]);
        parts["pinpoint_dL"].drawCircle(0, 0, 7);

        this._setGraphicsLineStyle(parts["pinpoint_dR"],1,0x0066ff,true);
        parts["pinpoint_dR"].position.set(size[0],size[1]);
        parts["pinpoint_dR"].drawCircle(0, 0, 7);

        //this.rectTransformGizmos.pivot.set(pivot[0], pivot[1]);

        this._setGraphicsLineStyle(parts["pivot"],3,0x0066ff,false);
        parts["pivot"].position.set(pivot[0],pivot[1]);
        parts["pivot"].drawCircle(0,0, 11);
    }

    update(){
        this.draw(this.selectedNode);
    }


    _setGraphicsLineStyle(graphics, thickness, color, filled){
        graphics.clear();
        graphics.lineStyle(thickness, color);
        if(filled)
            graphics.beginFill(color);
    }
}