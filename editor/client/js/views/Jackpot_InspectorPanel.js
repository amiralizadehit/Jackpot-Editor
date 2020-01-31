import Jackpot_Panel from "./helpers/Jackpot_Panel.js";
import Jackpot_Inspector from "./helpers/Jackpot_Inspector.js";
import {NodeTypes} from "../utils/Jackpot_EditorConfiguration.js";
import Jackpot_AssetLoader from "../utils/Jackpot_AssetLoader.js";
import Jackpot_EventEmitter from "../utils/Jackpot_EventEmitter.js";

let _inspectorList = {};

export default class Jackpot_InspectorPanel extends Jackpot_Panel{
    constructor(treeManager) {
        let options = {
            id:"right_panel",
            title:"Inspector",
            close:true
        };
        super(options);
        this.treeManager = treeManager;
        this.eventEmitter = new Jackpot_EventEmitter();
        this.selectedNode= "0";
        this._init();
    }
    _init(){
        this._createInspectorWidgets();
        this._addListeners();
    }
    _addListeners(){
        this.eventEmitter.on(Jackpot_EventEmitter.NODE_SELECTED,(e)=>{
            this._nodeSelected(e.detail);
        });
    }

    _nodeSelected(id){
        this.clear();
        this.selectedNode = this.treeManager.getGameArrayObj()[id];
        this.content.appendChild(_inspectorList[id].root);
    }


    _createInspectorWidgets(){
        //this.content.appendChild(widgets.root);
        this.treeManager.getGameArrayObj().forEach(node =>{
            let widgets = new Jackpot_Inspector();
            if(node.pixiObj instanceof PIXI.DisplayObject || node.isRoot){
                let position = {
                    x:node.pixiObj.position.x,
                    y:node.pixiObj.position.y,
                };
                let scale = {
                    x:node.pixiObj.scale.x,
                    y:node.pixiObj.scale.y,
                };
                let pivot = {
                    x:node.pixiObj.pivot.x,
                    y:node.pixiObj.pivot.y,
                };
                let rotation = node.pixiObj.rotation;
                let visibility = node.pixiObj.visible;

                widgets.nameWidget = widgets.addString("Name",node.content);
                widgets.addCheckbox("Visibility",visibility, {callback:(e)=>{
                        this.selectedNode.pixiObj.visible = e;
                    }});
                widgets.addSection("Rect Transform");
                widgets.positionWidget = widgets.addVector2("Position",[position.x, position.y],{precision: 3, step:1, callback:(e)=>{
                        this.selectedNode.pixiObj.position.set(e[0], e[1]);
                    }});
                //widgets.addSeparator();
                widgets.scaleWidget = widgets.addVector2("Scale",[scale.x, scale.y],{precision: 2,callback:(e)=>{
                        this.selectedNode.pixiObj.scale.set(e[0], e[1]);
                    }});
                //widgets.addSeparator();
                widgets.rotationWidget = widgets.addSlider("Rotation",rotation,{min:0,max:359,step:1, callback:(e)=>{
                        this.selectedNode.pixiObj.rotation = e*Math.PI/180;
                    }});
                widgets.addVector2("Pivot ",[pivot.x, pivot.y],{precision: 2,callback:(e)=>{
                        this.selectedNode.pixiObj.pivot.set(e[0],e[1]);
                    }});
            }
            switch (node.type) {
                case NodeTypes.SPRITE:
                    let resourceURL = Jackpot_AssetLoader.getResource(node.id).url;
                    let anchor = {
                        x:node.pixiObj.anchor.x,
                        y:node.pixiObj.anchor.y,
                    };
                    widgets.addSection("Sprite");
                    widgets.addVector2("Anchor ",[anchor.x, anchor.y],{precision: 2,min: 0, max:1,callback:(e)=>{
                            let xDiff = (e[0]-this.selectedNode.pixiObj.anchor.x) * this.selectedNode.pixiObj.width;
                            let yDiff = (e[1]-this.selectedNode.pixiObj.anchor.y) * this.selectedNode.pixiObj.height;
                            let currentXPos = this.selectedNode.pixiObj.position.x;
                            let currentYPos = this.selectedNode.pixiObj.position.y;
                            let newXPos = currentXPos+xDiff;
                            let newYPos = currentYPos+yDiff;
                            this.selectedNode.pixiObj.anchor.set(e[0],e[1]);
                            this.selectedNode.pixiObj.position.set(newXPos, newYPos);
                            widgets.positionWidget.setValue([newXPos, newYPos], false);
                        }});

                    widgets.addFile("Image", {name:resourceURL});
                    break;

            }
            _inspectorList[node.id] = widgets;
        });

        this.content.appendChild(_inspectorList["0"].root);
    }


}