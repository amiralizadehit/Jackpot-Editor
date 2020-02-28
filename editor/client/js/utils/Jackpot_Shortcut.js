import Jackpot_EventEmitter from "./Jackpot_EventEmitter.js";


export class Jackpot_Shortcut{
    constructor(){
        if(Jackpot_Shortcut.instance instanceof Jackpot_Shortcut){
            return Jackpot_Shortcut.instance
        }
        this._init();
        this._eventEmitter = new Jackpot_EventEmitter();
        this._addKeyUpListeners = [];
        this._ctrl = false;
        this._shift=false;
        //Object.freeze(this);
        Jackpot_Shortcut.instance = this;
    }
    _init(){
        document.addEventListener('keydown',(e)=>{
            switch (e.key) {
                case "Delete":
                    console.log("Delete detected");
                    e.preventDefault();
                    this._eventEmitter.emit(Jackpot_EventEmitter.ACTION_DELETE);
                    break;
                case "Control":
                    this._ctrl= true;
                    break;
                case "Shift":
                    this._shift=true;
                    break;
                case "d":
                    if(this._ctrl){
                        this._eventEmitter.emit(Jackpot_EventEmitter.ACTION_DUPLICATE);
                    }
                    break;
            }
        });
        document.addEventListener('keyup',(e)=>{
            switch (e.key) {
                case "Control":
                    this._ctrl = false;
                    break;
                case"Shift":
                    this._shift = false;
                    break;
            }
            this._addKeyUpListeners.forEach(callback=>{
                callback(e.key);
            })
        });
    }

    addKeyUpListener(callback){
        this._addKeyUpListeners.push(callback);
    }


    get ctrl(){
        return this._ctrl
    }
    get shift(){
        return this._shift;
    }
}

