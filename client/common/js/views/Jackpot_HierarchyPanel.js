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
        this.activeContextMenu = null;

        this._init();

    }
    _init(){

        this.eventEmitter = new Jackpot_EventEmitter();
        let myTree = { id: '0', content:"Stage",
            children: [
                { id: '1', content: "Child 1" },
                { id: '2', content: "Child 2", children: [
                        { id: '3', content: "Sub Child 1" },
                        { id: '4', content: "Sub Child 2" },
                        { id: '5', content: "Sub Child 3" },
                        { id: '6', content: "Sub Child 4" },
                        { id: '6', content: "Sub Child 5" }
                    ]},
                { id: '7', content: "Child 3" },
            ]};
        this.objectsTree = new Jackpot_Tree(myTree,
            {
                allow_rename: true,
                allow_multiselection: true,
                allow_drag: true,
            });

        this.add(this.objectsTree);
        this._addListeners();
    }
    _addListeners(){
        this.eventEmitter.on(Jackpot_EventEmitter.CONTEXT_MENU_ITEM_SELECTED, (e)=>{
            /* 1 - WE ADD NEW OBJECT TO THE TREE
               2 - WE CREATE NEW OBJECT IN THE CANVAS
                */

        })
    }
}
