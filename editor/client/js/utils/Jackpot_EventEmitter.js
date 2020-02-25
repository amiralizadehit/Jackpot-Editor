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
Jackpot_EventEmitter.NEW_OBJECT_CREATED="newobjectcreated";

//Actions
Jackpot_EventEmitter.ACTION_DELETE="deletebuttonpressed"; //pressing del
Jackpot_EventEmitter.ACTION_DUPLICATE="actionduplicate";

Jackpot_EventEmitter.DELETE_OBJECTS="deleteobjects";

Jackpot_EventEmitter.DUPLICATE_OBJECTS="duplicateobjects";
Jackpot_EventEmitter.OBJECT_DUPLICATED="objectduplicated";

Jackpot_EventEmitter.RENDER_TREE = "rendertree";

Jackpot_EventEmitter.NODE_SELECTED = "nodeselected";

Jackpot_EventEmitter.NODE_PROPERTY_UPDATED="nodepropertyupdated";


