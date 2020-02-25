import Jackpot_PIXI_Container from "../../../game/Jackpot_PIXI_Container.js";
import Jackpot_PIXI_Graphics from "../../../game/Jackpot_PIXI_Graphics.js";
import TransformHelper from "../../../utils/helpers/Jackpot_TransformHelper.js";

export default class Jackpot_Gizmo_RectTransform extends Jackpot_PIXI_Container {
    constructor(renderer, stage) {
        super();
        this.parts = [];
        this.sceneRenderer = renderer;
        this.stage = stage;
        this.selectedNode = null;
        this.interactive = true;
        this.rectangleHitAreaOffset = 20;

        this.parts["rectangle_core"] = new Jackpot_PIXI_Graphics();
        this.addChild(this.parts["rectangle_core"]);
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
    _init() {

        const keys = Object.keys(this.parts);
        for (let key of keys) {
            const object = this.parts[key];
            object.interactive = true;
            if (key.includes("pinpoint")) {
                switch (key) {
                    case "pinpoint_uL":
                        object.mouseover = (e) => {
                            object.cursor = 'nwse-resize';
                        };
                        object.mousedown = (e) => {
                            const pixiObj = this.selectedNode.pixiObj;
                            const globalTransform = TransformHelper.getGlobalTransform(pixiObj);
                            const parentScale = [globalTransform[2][0]/pixiObj.scale.x, globalTransform[2][1]/pixiObj.scale.y];
                            this._rectangleMouseDown(e, object,pixiObj.width / pixiObj.scale.x, pixiObj.height / pixiObj.scale.y);
                            object.mousemove = (e) => {
                                let posDiff = this._rectangleMouseMove(e);
                                let landa = Math.atan2(-posDiff[0], -posDiff[1]);
                                landa+=globalTransform[1];
                                let dist = this._calculateMagnitude(posDiff);
                                pixiObj._setSize(pixiObj.width+Math.sin(landa)*dist/parentScale[0]
                                    ,pixiObj.height+Math.cos(landa)*dist/parentScale[1],"gizmo");
                                this.update();
                            };
                        };
                        break;
                    case "pinpoint_dR":
                        object.mouseover = (e) => {
                            object.cursor = 'nwse-resize';
                        };
                        object.mousedown = (e) => {
                            const pixiObj = this.selectedNode.pixiObj;
                            const globalTransform = TransformHelper.getGlobalTransform(pixiObj);
                            const parentScale = [globalTransform[2][0]/pixiObj.scale.x, globalTransform[2][1]/pixiObj.scale.y];
                            this._rectangleMouseDown(e, object,0, 0);
                            object.mousemove = (e) => {
                                let posDiff = this._rectangleMouseMove(e);
                                let landa = Math.atan2(posDiff[0], posDiff[1]);
                                landa+=globalTransform[1];
                                let dist = this._calculateMagnitude(posDiff);
                                pixiObj._setSize(pixiObj.width+Math.sin(landa)*dist/parentScale[0]
                                    ,pixiObj.height+Math.cos(landa)*dist/parentScale[1],"gizmo");
                                this.update();
                            };
                        };
                        break;
                    case "pinpoint_uR":
                        object.mouseover = (e) => {
                            object.cursor = 'nesw-resize';
                        };
                        object.mousedown = (e) => {
                            const pixiObj = this.selectedNode.pixiObj;
                            const globalTransform = TransformHelper.getGlobalTransform(pixiObj);
                            const parentScale = [globalTransform[2][0]/pixiObj.scale.x, globalTransform[2][1]/pixiObj.scale.y];
                            this._rectangleMouseDown(e, object,0, pixiObj.height / pixiObj.scale.y);
                            object.mousemove = (e) => {
                                let posDiff = this._rectangleMouseMove(e);
                                let landa = Math.atan2(-posDiff[1], posDiff[0]);
                                landa+=globalTransform[1];
                                let dist = this._calculateMagnitude(posDiff);
                                pixiObj._setSize(pixiObj.width+Math.cos(landa)*dist/parentScale[0]
                                    ,pixiObj.height+Math.sin(landa)*dist/parentScale[1],"gizmo");
                                this.update();
                            };
                        };
                        break;
                    case "pinpoint_dL":
                        object.mouseover = (e) => {
                            object.cursor = 'nesw-resize';
                        };
                        object.mousedown = (e) => {
                            const pixiObj = this.selectedNode.pixiObj;
                            const globalTransform = TransformHelper.getGlobalTransform(pixiObj);
                            const parentScale = [globalTransform[2][0]/pixiObj.scale.x, globalTransform[2][1]/pixiObj.scale.y];
                            this._rectangleMouseDown(e, object,pixiObj.width / pixiObj.scale.x, 0);
                            object.mousemove = (e) => {
                                let posDiff = this._rectangleMouseMove(e);
                                let landa = Math.atan2(posDiff[1], -posDiff[0]);
                                landa+=globalTransform[1];
                                let dist = this._calculateMagnitude(posDiff);
                                pixiObj._setSize(pixiObj.width+Math.cos(landa)*dist / parentScale[0]
                                    ,pixiObj.height+Math.sin(landa)*dist / parentScale[1],"gizmo");
                                this.update();
                            };
                        };
                        break;
                }
            } else if (key.includes("rectangle")) {
                switch (key) {
                    case"rectangle_core":
                        object.mousedown = (e)=>{
                            const pixiObj = this.selectedNode.pixiObj;
                            const globalTransform = TransformHelper.getGlobalTransform(pixiObj);
                            const parentScale = [globalTransform[2][0]/pixiObj.scale.x, globalTransform[2][1]/pixiObj.scale.y];
                            this._rectangleMouseDown(e, object);
                            object.mousemove = (e)=>{
                                let posDiff = this._rectangleMouseMove(e);
                                let localYPosition = posDiff[1];
                                let localXPosition = posDiff[0];
                                let cos = Math.cos(globalTransform[1] - pixiObj.rotation);
                                let sin = Math.sin(globalTransform[1] - pixiObj.rotation);
                                pixiObj._setPosition(
                                     pixiObj.position.x + (localXPosition * cos + localYPosition * sin) / parentScale[0]
                                    ,pixiObj.position.y + (localYPosition * cos - localXPosition * sin) / parentScale[1],"gizmo");
                                this.update();
                            };
                        };
                        break;
                    case "rectangle_up":
                        object.mouseover = (e) => {
                            object.cursor = 'ns-resize';
                        };
                        object.mousedown = (e) => {
                            const pixiObj = this.selectedNode.pixiObj;
                            const globalTransform = TransformHelper.getGlobalTransform(pixiObj);
                            const parentScale = [globalTransform[2][0]/pixiObj.scale.x, globalTransform[2][1]/pixiObj.scale.y];
                            this._rectangleMouseDown(e, object,pixiObj.width/(2*pixiObj.scale.x), pixiObj.height/pixiObj.scale.y);
                            object.mousemove = (e) => {
                                let posDiff = this._rectangleMouseMove(e);
                                pixiObj._setSize(pixiObj.width,pixiObj.height+(posDiff[0]*Math.sin(globalTransform[1])-posDiff[1]*Math.cos(globalTransform[1]))/parentScale[1],"gizmo");
                                this.update();
                            };
                        };
                        break;
                    case "rectangle_down":
                        object.mouseover = (e) => {
                            object.cursor = 'ns-resize';
                        };
                        object.mousedown = (e) => {
                            const pixiObj = this.selectedNode.pixiObj;
                            const globalTransform = TransformHelper.getGlobalTransform(pixiObj);
                            const parentScale = [globalTransform[2][0]/pixiObj.scale.x, globalTransform[2][1]/pixiObj.scale.y];
                            this._rectangleMouseDown(e, object,pixiObj.width / (2 * pixiObj.scale.x), 0);
                            object.mousemove = (e) => {
                                let posDiff = this._rectangleMouseMove(e);
                                pixiObj._setSize(pixiObj.width,pixiObj.height+(-posDiff[0]*Math.sin(globalTransform[1])+posDiff[1]*Math.cos(globalTransform[1]))/parentScale[1],"gizmo");
                                this.update();
                            };
                        };
                        break;
                    case "rectangle_left":
                        object.mouseover = (e) => {
                            object.cursor = 'ew-resize';
                        };
                        object.mousedown = (e) => {
                            const pixiObj = this.selectedNode.pixiObj;
                            const globalTransform = TransformHelper.getGlobalTransform(pixiObj);
                            const parentScale = [globalTransform[2][0]/pixiObj.scale.x, globalTransform[2][1]/pixiObj.scale.y];
                            this._rectangleMouseDown(e, object,pixiObj.width / pixiObj.scale.x, pixiObj.height / (2 * pixiObj.scale.y));
                            object.mousemove = (e) => {
                                let posDiff = this._rectangleMouseMove(e);
                                pixiObj._setSize(pixiObj.width - (posDiff[0]*Math.cos(globalTransform[1])+posDiff[1]*Math.cos(Math.PI/2 - globalTransform[1]))/parentScale[0],pixiObj.height,"gizmo");
                                this.update();
                            };
                        };
                        break;
                    case "rectangle_right":
                        object.mouseover = (e) => {
                            object.cursor = 'ew-resize';
                        };
                        object.mousedown = (e) => {
                            const pixiObj = this.selectedNode.pixiObj;
                            const globalTransform = TransformHelper.getGlobalTransform(pixiObj);
                            const parentScale = [globalTransform[2][0]/pixiObj.scale.x, globalTransform[2][1]/pixiObj.scale.y];
                            this._rectangleMouseDown(e,object ,0, pixiObj.height/(2*pixiObj.scale.y));
                            object.mousemove = (e) => {
                                let posDiff = this._rectangleMouseMove(e);
                                pixiObj._setSize(
                                    pixiObj.width + (posDiff[0]*Math.cos(globalTransform[1])+posDiff[1]*Math.sin(globalTransform[1]))/parentScale[0]
                                    ,pixiObj.height
                                    ,"gizmo");
                                this.update();
                            };
                        };
                        break;
                }
            }
         //Pivot
            else{
                object.buttonMode = true;
            }
        }
        this.sceneRenderer.view.addEventListener("mouseup",(e) =>{
            if(this.busy){
                this.busy = false;
                this.focusedPart.mousemove = null;
                if (this.pivotChanged) {
                    TransformHelper.setPivotAndKeepPosition(this.selectedNode.pixiObj, this.objPiv[0], this.objPiv[1],"gizmo");
                    this.update();
                }
            }
        });

        this.debugging  = new PIXI.Graphics();
        this.addChild(this.debugging);
    }
    _calculateMagnitude(posDiff){
        return Math.sqrt(Math.pow(posDiff[0],2)+ Math.pow(posDiff[1],2));
    }

    _rectangleMouseDown(e, object, pivX, pivY){
        this.busy = true; //Here gizmo is busy
        this.focusedPart = object;
        if(pivX!==undefined && pivY!==undefined){
            this.objPiv = [this.selectedNode.pixiObj.pivot.x, this.selectedNode.pixiObj.pivot.y];
            TransformHelper.setPivotAndKeepPosition(this.selectedNode.pixiObj,pivX, pivY,"gizmo");
            this.pivotChanged = true;
        }
        this.mouseInitPos = e.data.getLocalPosition(this.stage);
    }
    _rectangleMouseMove(e){
        this.mouseCurrentPos = e.data.getLocalPosition(this.stage);
        //let distance = Math.sqrt(Math.pow((this.mouseCurrentPos.x-this.mouseInitPos.x),2)+ Math.pow((this.mouseCurrentPos.y-this.mouseInitPos.y),2));
        let posDiff = [
            (this.mouseCurrentPos.x - this.mouseInitPos.x),
            (this.mouseCurrentPos.y - this.mouseInitPos.y)];
        this.mouseInitPos = this.mouseCurrentPos;
        return posDiff;
    }

    draw(node){

        if(this.busy && node.id!==this.selectedNode.id)
            return;

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
        //this.hitArea = new PIXI.Rectangle(30, 30, size[0]-60, size[1]-60);

        //this.debugging.clear();
        //this.debugging.lineStyle(3, 0xFFF);
        //this.debugging.drawRect( 20, 20, size[0]-40, size[1]-40);


        //Rectangle
        parts["rectangle_core"].hitArea = new PIXI.Rectangle(20, 20, size[0]-40, size[1]-40);

        this._setGraphicsLineStyle(parts["rectangle_up"],1,0xA0A0A0);
        parts["rectangle_up"].position.set(0,0);
        parts["rectangle_up"].lineTo(size[0],0);
        parts["rectangle_up"].hitArea = new PIXI.Rectangle(offsetHorizontal,-10,size[0] - 2 * offsetHorizontal ,20);

        this._setGraphicsLineStyle(parts["rectangle_down"],1,0xA0A0A0);
        parts["rectangle_down"].position.set(0,size[1]);
        parts["rectangle_down"].lineTo(size[0],0);
        parts["rectangle_down"].hitArea = new PIXI.Rectangle(offsetHorizontal,-10,size[0]- 2 * offsetHorizontal,20);

        this._setGraphicsLineStyle(parts["rectangle_left"],1,0xA0A0A0);
        parts["rectangle_left"].position.set(0,0);
        parts["rectangle_left"].lineTo(0,size[1]);
        parts["rectangle_left"].hitArea = new PIXI.Rectangle(-10,offsetVertical,20,size[1]-  2 * offsetVertical);

        this._setGraphicsLineStyle(parts["rectangle_right"],1,0xA0A0A0);
        parts["rectangle_right"].position.set(size[0],0);
        parts["rectangle_right"].lineTo(0,size[1]);
        parts["rectangle_right"].hitArea = new PIXI.Rectangle(-10,offsetVertical,20,size[1]- 2 * offsetVertical);

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

    erase(){
        const keys = Object.keys(this.parts);
        for (const key of keys){
            this.parts[key].clear();
        }
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