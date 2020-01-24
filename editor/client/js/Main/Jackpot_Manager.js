import Jackpot_EventEmitter from "../utils/Jackpot_EventEmitter.js";
import Jackpot_MainLayout from "../views/Jackpot_MainLayout.js";
import Jackpot_IO from "../utils/Jackpot_IO.js";
import {NodeTypes} from "../utils/Jackpot_EditorConfiguration.js";
import Jackpot_TreeManager from "./Jackpot_TreeManager.js";

export default class Jackpot_Manager {
    constructor(){
        this.eventEmitter = new Jackpot_EventEmitter();
        this.io = new Jackpot_IO();
        //Game Tree is loaded from the disk ...

        let rawJSON = this.io.loadScene();
        this.treeManager = new Jackpot_TreeManager(rawJSON);
        this.loadedGame = this.io.loadGame();

        this.ui = new Jackpot_MainLayout(this.treeManager, this.loadedGame);

        this._init();
    }
    _init(){

        this._addListeners();
    }


    _addListeners(){
        this.eventEmitter.on(Jackpot_EventEmitter.CREATE_NEW_OBJECT, obj =>{
            /* 1 - WE ADD NEW OBJECT TO THE TREE
               2 - WE CREATE NEW OBJECT IN THE CANVAS
                */
            this._processNewObject(obj);

        })
    }

    _processNewObject(obj){
        console.log(obj.detail);
        switch (obj.detail.selectedItem) {
            case NodeTypes.CONTAINER:
                console.log("Container Selected");
                break;
            case NodeTypes.SPRITE:
                console.log("Sprite Selected");
                break;


        }
    }

    getGameObjectTree(){

    }
}