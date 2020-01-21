export default class Jackpot_EventEmitter extends EventTarget{
    constructor(){
        if(Jackpot_EventEmitter.instance instanceof Jackpot_EventEmitter){
            return Jackpot_EventEmitter.instance
        }
        super();
        Object.freeze(this);

        Jackpot_EventEmitter.instance = this;
    }
    //Syntactic sugar
    on(eventName, callback){
        this.addEventListener(eventName, callback);
    }

    //Syntactic sugar
    emit(eventName, arg){
        this.dispatchEvent(new CustomEvent(eventName,arg));
    }
}

Jackpot_EventEmitter.CONTEXT_MENU_ITEM_SELECTED = "contextmenuitemselected";
Jackpot_EventEmitter.CREATE_NEW_OBJECT = "createnewobject";
Jackpot_EventEmitter.RENDER_TREE = "rendertree";
