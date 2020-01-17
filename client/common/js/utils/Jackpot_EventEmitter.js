class Jackpot_EventEmitter {
    constructor(){
        if(Jackpot_EventEmitter.instance instanceof Jackpot_EventEmitter){
            return Jackpot_EventEmitter.instance
        }
        //Object.freeze(this);
        Jackpot_EventEmitter.instance = this;
    }
}


//Jackpot_EventEmitter.CREATE_NEW_OBJECT = "createnewobject";

//module.exports.Jackpot_EventEmitter = Jackpot_EventEmitter;