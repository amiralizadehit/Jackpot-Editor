import Jackpot_Panel from "./helpers/Jackpot_Panel.js";
import Jackpot_Inspector from "./helpers/Jackpot_Inspector.js";
import {NodeTypes} from "../utils/Jackpot_EditorConfiguration.js";
import Jackpot_AssetLoader from "../utils/Jackpot_AssetLoader.js";
import Jackpot_EventEmitter from "../utils/Jackpot_EventEmitter.js";


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
        this.eventEmitter.on(Jackpot_EventEmitter.NODE_SELECTED,e=>{
            this._nodeSelected(e.detail);
        });
        this.eventEmitter.on(Jackpot_EventEmitter.NODE_PROPERTY_UPDATED, e=>{
            if(e.detail.emitter!=="inspector") //we don't want to catch the event we've emitted
                this._updateValues();
        });
        this.eventEmitter.on(Jackpot_EventEmitter.NEW_OBJECT_CREATED, e=>{
            this._createInspectorFor(e.detail);
        });
        this.eventEmitter.on(Jackpot_EventEmitter.DELETE_OBJECTS, e=>{
            this.clear();
        })
    }

    _nodeSelected(node){
        this.clear();
        this.selectedNode = node;
        this.content.appendChild(node.inspector.root);
    }

    _updateValues(){

        let inspector = this.selectedNode.inspector;
        let pixiObj = this.selectedNode.pixiObj;
        inspector.positionWidget.setValue(
            [pixiObj.position.x,
            pixiObj.position.y],true
            );
        inspector.scaleWidget.setValue(
            [pixiObj.scale.x,
                pixiObj.scale.y],true
        );
        inspector.sizeWidget.setValue(
            [pixiObj.width,
                pixiObj.height],true
        );
        inspector.rotationWidget.setValue(
            pixiObj.rotation,true
        );

    }

    _createInspectorWidgets(){
        this.treeManager.getGameTreeObj().traverse(node=>{
            this._createInspectorFor(node);
        })
        //this.content.appendChild(_inspectorList["0"].root);
    }

    _createInspectorFor(node){
        let inspector = new Jackpot_Inspector();
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
            let size = {
                width: node.pixiObj.width,
                height: node.pixiObj.height
            };

            let rotation = node.pixiObj.rotation;
            let visibility = node.pixiObj.visible;

            inspector.nameWidget = inspector.addString("Name",node.content);
            inspector.visibilityWidget = inspector.addCheckbox("Visibility",visibility, {callback:(e)=>{
                    this.selectedNode.pixiObj.visible = e;
                }});
            inspector.rectTransformSection = inspector.addSection("Rect Transform");
            inspector.positionWidget = inspector.addVector2("Position",[position.x, position.y],{precision: 3, step:1, callback:(e)=>{
                    this.selectedNode.pixiObj._setPosition(e[0], e[1],"inspector");
                }});
            //widgets.addSeparator();
            inspector.scaleWidget = inspector.addVector2("Scale",[scale.x, scale.y],{precision: 2,callback:(e)=>{
                    this.selectedNode.pixiObj._setScale(e[0], e[1],"inspector");
                }});
            inspector.sizeWidget = inspector.addVector2("Size",[size.width, size.height],{precision: 2,callback:(e)=>{
                    this.selectedNode.pixiObj._setSize(e[0], e[1],"inspector");
                }});
            //widgets.addSeparator();
            inspector.rotationWidget = inspector.addSlider("Rotation",rotation,{min:0,max:359,step:1, callback:(e)=>{
                    this.selectedNode.pixiObj._setRotation(e*Math.PI/180,"inspector");
                }});
            inspector.pivotWidget = inspector.addVector2("Pivot ",[pivot.x/size.width, pivot.y/size.height],{ step:0.1, precision: 1,callback:(e)=>{
                    this.selectedNode.pixiObj._setPivot(
                        e[0]*this.selectedNode.pixiObj.width/this.selectedNode.pixiObj.scale.x,
                        e[1]*this.selectedNode.pixiObj.height/this.selectedNode.pixiObj.scale.y);
                }});
        }
        switch (node.type) {
            case NodeTypes.SPRITE:
                let resourceURL = Jackpot_AssetLoader.getTextureURL(node.id);
                let anchor = {
                    x:node.pixiObj.anchor.x,
                    y:node.pixiObj.anchor.y,
                };
                inspector.spriteSection = inspector.addSection("Sprite");
                inspector.anchorSection = inspector.addVector2("Anchor ",[anchor.x, anchor.y],{step:0.05, precision: 2,min: 0, max:1,callback:(e)=>{
                        //let updatedPos = this.selectedNode.pixiObj.setAnchorAndUpdatePosition(e[0],e[1]);
                        //widgets.positionWidget.setValue(updatedPos, true);
                        this.selectedNode.pixiObj.anchor.set(e[0], e[1]);
                    }});

                inspector.imageSection = inspector.addFile("Image", {name:resourceURL});
                break;

        }
        node.inspector = inspector;
    }

}