import Jackpot_EventEmitter from "./Jackpot_EventEmitter.js";

export class Jackpot_Shortcut{
    constructor(){
        this.eventEmitter = new Jackpot_EventEmitter();
        this.ctrlPressed = false;
        this._init();
    }
    _init(){
        document.addEventListener('keydown',(e)=>{
            switch (e.key) {
                case "Delete":
                    console.log("Delete detected");
                    this.eventEmitter.emit(Jackpot_EventEmitter.ACTION_DELETE);
                    break;
                case "Control":
                    this.ctrlPressed = true;
                    break;
                case "d":
                    if(this.ctrlPressed){
                        this.eventEmitter.emit(Jackpot_EventEmitter.ACTION_DUPLICATE);
                    }
                    break;
            }
        });
        document.addEventListener('keyup',(e)=>{
            switch (e.key) {
                case "Control":
                    this.ctrlPressed = false;
                    break;
            }
        });
    }
}

