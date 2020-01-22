import Jackpot_ContextMenu from "./helpers/Jackpot_ContextMenu.js";
import Jackpot_EventEmitter from "../utils/Jackpot_EventEmitter.js";

export default class Jackpot_NewObjectContextMenu extends Jackpot_ContextMenu{
    constructor(mouseEvent){
        let actions = ["Sprite"];
        let eventEmitter = new Jackpot_EventEmitter();
        super(actions, {
            callback: (e)=>{
                eventEmitter.emit(Jackpot_EventEmitter.CONTEXT_MENU_ITEM_SELECTED,{"detail":{"item":e}});
            },
            event:mouseEvent
        });
        this.actions = actions;
    }
}