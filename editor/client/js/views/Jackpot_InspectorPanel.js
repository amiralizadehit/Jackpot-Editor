import Jackpot_Panel from "./helpers/Jackpot_Panel.js";
import Jackpot_EventEmitter from "../utils/Jackpot_EventEmitter.js";
import Jackpot_GOInspector from "./Jackpot_GOInspector.js";


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
        this.treeManager.getGameTreeObj().traverse(node=>{
            node.inspector = new Jackpot_GOInspector(node);
        });
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

    _createInspectorFor(node){
        node.inspector = new Jackpot_GOInspector(node);
    }

}