import {Jackpot_TreeBase, Jackpot_NodeBase} from "./helpers/Jackpot_TreeBase.js";


export class Jackpot_JSONNode extends Jackpot_NodeBase{
    constructor(value){
        super();
        this.properties = value.properties;
    }
}

export class Jackpot_JSONTree extends Jackpot_TreeBase{
    constructor(rootNode){
        super(rootNode);
    }
}