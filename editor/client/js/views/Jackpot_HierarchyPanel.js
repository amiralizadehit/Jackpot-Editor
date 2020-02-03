import Jackpot_Panel from "./helpers/Jackpot_Panel.js";
import Jackpot_HierarchyPanelTree from "./Jackpot_HierarchyPanelTree.js";
import Jackpot_EventEmitter from "../utils/Jackpot_EventEmitter.js";
import Jackpot_NewObjectContextMenu from "./Jackpot_NewObjectContextMenu.js";

export default class Jackpot_HierarchyPanel extends Jackpot_Panel{
    constructor(gameTree) {
        let options = {
            id:"left_panel",
            title:"Hierarchy",
            close:true
        };
        super(options);
        this.activeContextMenu = null;
        this.eventEmitter = new Jackpot_EventEmitter();
        this.gameTree = gameTree;
        this._init();

    }
    _init(){

        this.objectsTree = new Jackpot_HierarchyPanelTree(this.gameTree,
            {
                allow_rename: true,
                allow_multiselection: true,
                allow_drag: true,
            });

        this.add(this.objectsTree);
        this._addListeners();
    }
    _addListeners(){
    }
}
