import {NodeTypes} from "../utils/Jackpot_EditorConfiguration.js";
import Jackpot_AssetLoader from "../utils/Jackpot_AssetLoader.js";
import Jackpot_Inspector from "./helpers/Jackpot_Inspector.js";
import {projectFolderURL} from "../utils/Jackpot_EditorConfiguration.js";
import {GAME_INFO} from "../utils/Jackpot_GameInfo.js";

export default class Jackpot_GOInspector extends Jackpot_Inspector{
    constructor(node, options){
        super(options);
        this.node = node;
        this._init();
    }
    _init(){
       this._createInspectorFor(this);
    }
    _createInspectorFor(){
        if(this.node.pixiObj instanceof PIXI.DisplayObject){
            let position = {
                x:this.node.pixiObj.position.x,
                y:this.node.pixiObj.position.y,
            };
            let scale = {
                x:this.node.pixiObj.scale.x,
                y:this.node.pixiObj.scale.y,
            };
            let pivot = {
                x:this.node.pixiObj.pivot.x,
                y:this.node.pixiObj.pivot.y,
            };
            let size = {
                width: this.node.pixiObj.width,
                height: this.node.pixiObj.height
            };

            let rotation = this.node.pixiObj.rotation;
            let visibility = this.node.pixiObj.visible;

            this.nameWidget = this.addString("Name",this.node.content);
            this.visibilityWidget = this.addCheckbox("Visibility",visibility, {callback:(e)=>{
                    this.node.pixiObj.visible = e;
                }});
            this.rectTransformSection = this.addSection("Rect Transform");
            this.positionWidget = this.addVector2("Position",[position.x, position.y],{precision: 3, step:1, callback:(e)=>{
                    this.node.pixiObj._setPosition(e[0], e[1],"inspector");
                }});

            this.scaleWidget = this.addVector2("Scale",[scale.x, scale.y],{precision: 2,callback:(e)=>{
                    this.node.pixiObj._setScale(e[0], e[1],"inspector");
                }});
            this.sizeWidget = this.addVector2("Size",[size.width, size.height],{precision: 2,callback:(e)=>{
                    this.node.pixiObj._setSize(e[0], e[1],"inspector");
                }});
            this.rotationWidget = this.addSlider("Rotation",rotation,{min:0,max:359,step:1, callback:(e)=>{
                    this.node.pixiObj._setRotation(e*Math.PI/180,"inspector");
                }});
            this.pivotWidget = this.addVector2("Pivot ",[pivot.x/size.width, pivot.y/size.height],{ step:0.1, precision: 1,callback:(e)=>{
                    this.node.pixiObj._setPivot(
                        e[0]*this.node.pixiObj.width/this.node.pixiObj.scale.x,
                        e[1]*this.node.pixiObj.height/this.node.pixiObj.scale.y);
                }});
        }
        switch (this.node.type) {
            case NodeTypes.SPRITE:
                let anchor = {
                    x:this.node.pixiObj.anchor.x,
                    y:this.node.pixiObj.anchor.y,
                };
                this.spriteSection = this.addSection("Sprite");
                this.anchorSection = this.addVector2("Anchor ",[anchor.x, anchor.y],{step:0.05, precision: 2,min: 0, max:1,callback:(e)=>{
                        this.node.pixiObj.anchor.set(e[0], e[1]);
                    }});
                this.imageSection = this.addFile("Image", {name:this.node.sprite.textureName}, {callback:(e)=>{
                    let url = projectFolderURL + GAME_INFO.name +GAME_INFO.imgFolder+ e.name;
                    Jackpot_AssetLoader.loadTexture(url,(e)=>{
                        this.node.pixiObj._SetTexture(e,"other");
                    });
                    }});

                break;
        }
    }
}
