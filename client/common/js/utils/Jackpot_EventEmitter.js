export default class Jackpot_EventEmitter extends EventTarget{
    constructor(){
        if(Jackpot_EventEmitter.instance instanceof Jackpot_EventEmitter){
            return Jackpot_EventEmitter.instance
        }
        super();
        Object.freeze(this);

        Jackpot_EventEmitter.instance = this;
    }
}

Jackpot_EventEmitter.CREATE_NEW_OBJECT = "createnewobject";
