import {Jackpot_TreeBase, Jackpot_NodeBase} from "./helpers/Jackpot_TreeBase.js";
import {NodeTypes} from "./Jackpot_EditorConfiguration.js";


export class Jackpot_GameNode extends Jackpot_NodeBase {
    constructor(value) {
        super(value);
        this.pixiObj = value.pixiObj;
        this.inspector = null;
    }

    clone(){
        let clone = {...this}; //shallow copy
        switch(this.type){
            case NodeTypes.CONTAINER:
                values
                break;
            case NodeTypes.SPRITE:
                break;
        }
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