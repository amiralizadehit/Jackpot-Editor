import Jackpot_EventEmitter from "../utils/Jackpot_EventEmitter.js";
import {Jackpot_GameTree} from "../utils/Jackpot_GameTree.js";
import Jackpot_MainLayout from "../views/Jackpot_MainLayout.js";

export default class Jackpot_Manager {
    constructor(){
        this.eventEmitter = new Jackpot_EventEmitter();

        //Game Tree is loaded from the disk ...

        let loadedTree = { id: '0', parentId: null, type: "Container", content:"Stage",
            children: [
                { id: '1', parentId: '0', type:"Container", content: "Child 1", children: [] },
                { id: '2', parentId: '0', type:"Container", content: "Child 2", children: [
                        { id: '3', parentId: '2', type:"Sprite", content: "Sub Child 1", children: [] },
                        { id: '4', parentId: '2', type:"Sprite", content: "Sub Child 2", children: [] },
                        { id: '5', parentId: '2', type:"Sprite", content: "Sub Child 3", children: [] },
                        { id: '6', parentId: '2', type:"Sprite", content: "Sub Child 4", children: [] },
                        { id: '7', parentId: '2', type:"Sprite", content: "Sub Child 5", children: [] }
                    ]},
                { id: '8', parentId: '0', type:"Container", content: "Child 3", children: [] },
            ]};


        this.gameObjectTree = new Jackpot_GameTree(loadedTree);


        this._init();
    }
    _init(){
        this.ui = new Jackpot_MainLayout(this.gameObjectTree.getTree());
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
            case "Sprite":
                console.log("Sprite Selected");
                break;
            case "Container":
                break;


        }
    }

    getGameObjectTree(){

    }
}