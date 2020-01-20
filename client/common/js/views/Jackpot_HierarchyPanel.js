import Jackpot_Panel from "./helpers/Jackpot_Panel.js";
import Jackpot_Tree from "./helpers/Jackpot_Tree.js";
import Jackpot_EventEmitter from "../utils/Jackpot_EventEmitter.js";
import Jackpot_NewObjectContextMenu from "./Jackpot_NewObjectContextMenu.js";

export default class Jackpot_HierarchyPanel extends Jackpot_Panel{
    constructor(treeStructure) {
        let options = {
            id:"left_panel",
            title:"Hierarchy",
            close:true
        };
        super(options);
        this._init();

    }
    _init(){

        this.eventEmitter = new Jackpot_EventEmitter();
        let myTree = { id: "Stage",
            children: [
                { id: "Child1" },
                { id: "Child2", children: [
                        { id: "SubChild1" },
                        { id: "SubChild2" },
                        { id: "SubChild3" },
                        { id: "SubChild4" }
                    ]},
                { id: "Child3" },
            ]};
        this.objectsTree = new Jackpot_Tree(myTree,
            {
                allow_rename: true,
                allow_multiselection: true,
                allow_drag: true,
            });



        this.objectsTree.onItemContextMenu = (e, data) =>{
          new Jackpot_NewObjectContextMenu();
        };

        this.objectsTree.root.addEventListener("item_selected",(params)=>{
           console.log(params);
        });

        this.add(this.objectsTree);
        this._addListeners();
    }
    _addListeners(){
        this.eventEmitter.addEventListener(Jackpot_EventEmitter.CREATE_NEW_OBJECT, (e)=>{
            console.log("Event Received!", e)
        })
    }
}
