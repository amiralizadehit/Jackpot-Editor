class Jackpot_NewObjectContextMenu extends Jackpot_ContextMenu(){
    constructor(){

        let actions = ["Sprite"];
        let eventEmitter = new Jackpot_EventEmitter();
        super(actions, {
            callback: (e)=>{
                eventEmitter.emit(Jackpot_EventEmitter.CREATE_NEW_OBJECT,e)
            }
        });
        this.actions = actions;
    }
}