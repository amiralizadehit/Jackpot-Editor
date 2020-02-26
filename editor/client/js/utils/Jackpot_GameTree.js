import {Jackpot_TreeBase, Jackpot_NodeBase} from "./helpers/Jackpot_TreeBase.js";
import {NodeTypes} from "./Jackpot_EditorConfiguration.js";
import Jackpot_GOInspector from "../views/Jackpot_GOInspector.js";
import Jackpot_EventEmitter from "./Jackpot_EventEmitter.js";


export class Jackpot_GameNode extends Jackpot_NodeBase {
    constructor(value) {
        super(value);
        this.pixiObj = value.pixiObj;
        this.inspector = null;
        this.eventEmitter = new Jackpot_EventEmitter();
    }

    clone(){
        return this._cloneRecursively();
    }

    _cloneRecursively(){
        let cloneValues= {
            id:this.id,
            parentId:this.parentId,
            isRoot:false,
            title:this.content,
            type:this.type,
            pixiObj:this.pixiObj.clone(),
            children:[]
        };
        let clone = new Jackpot_GameNode(cloneValues);
        switch(this.type){
            case NodeTypes.CONTAINER:
                break;
            case NodeTypes.SPRITE:
                clone.sprite={
                  textureURL: this.sprite.textureURL,
                  textureName: this.sprite.textureName
                };
                break;
        }
        clone.inspector = new Jackpot_GOInspector(clone);
        this.children.forEach(child=>{
            let childClone = child._cloneRecursively();
            clone.children.push(childClone);
            clone.pixiObj.addChild(childClone.pixiObj);
        });
        this.pixiObj.clonePropertiesTo(clone.pixiObj);

        //Cloning Listeners
        if(this.pixiObj.mouseup){
            clone.pixiObj.mouseup = (e)=>{
                this.eventEmitter.emit(Jackpot_EventEmitter.NODE_SELECTED, {"detail": clone});
            }
        }
        return clone;
    }
}



export class Jackpot_GameTree extends Jackpot_TreeBase{
    constructor(rootNode){
        super(rootNode);
    }

    //Override
    remove(nodeId){
        this.traverse((node)=>{
            node.children.forEach((childNode, index)=>{
                if(childNode.id===nodeId){
                    node.children.splice(index,1);
                    node.pixiObj.removeChildAt(index);
                }
            });
        })
    }
}