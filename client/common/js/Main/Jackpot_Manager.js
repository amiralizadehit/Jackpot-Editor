import Jackpot_EventEmitter from "../utils/Jackpot_EventEmitter.js";

class Jackpot_Manager {
    constructor(){
        this.eventEmitter = new Jackpot_EventEmitter();
        this._init();
    }
    _init(){
        this.gameObjectTree = [];
    }
    _addListeners(){
        this.eventEmitter.on(Jackpot_EventEmitter.CREATE_NEW_OBJECT, obj =>{
            /* 1 - WE ADD NEW OBJECT TO THE TREE
               2 - WE CREATE NEW OBJECT IN THE CANVAS
                */
            this.processNewObject(obj);

        })
    }

    processNewObject(obj){

        switch (contextMenuItem) {
            case "Sprite":
                break;
            case "Container":
                break;


        }
    }
}