import Jackpot_ContextMenu from "./helpers/Jackpot_ContextMenu.js";
import Jackpot_EventEmitter from "../utils/Jackpot_EventEmitter.js";

export default class Jackpot_NewObjectContextMenu extends Jackpot_ContextMenu{
    constructor(){
        let actions = ["Sprite"];
        let eventEmitter = new Jackpot_EventEmitter();
        super(actions, {
            callback: (e)=>{
                eventEmitter.dispatchEvent(new Event(Jackpot_EventEmitter.CREATE_NEW_OBJECT,e))
            }
        });
        this.actions = actions;
    }
}