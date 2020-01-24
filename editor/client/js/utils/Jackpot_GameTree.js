import {Jackpot_TreeBase, Jackpot_NodeBase} from "./helpers/Jackpot_TreeBase.js";


export class Jackpot_GameNode extends Jackpot_NodeBase{
    constructor(value){
        super(value);
        this.pixiObj = value.pixiObj;
    }
}



export class Jackpot_GameTree extends Jackpot_TreeBase{
    constructor(rootNode){
        super(rootNode);
    }
}