import LiteGUI from "../../../lib/litegui.js"
import Jackpot_NewObjectContextMenu from "./Jackpot_NewObjectContextMenu.js";
import Jackpot_EventEmitter from "../utils/Jackpot_EventEmitter.js";

export default class Jackpot_HierarchyPanelTree extends LiteGUI.Tree{
    constructor(gameTree, options, legacy){
        super(gameTree.getHierarchyTreeObj(), options, legacy);
        this.gameTree = gameTree;
        this.gameArrayObj = gameTree.getGameArrayObj();
        this._init();
    }
    _init(){
        this.activeContextMenu = null;
        this.eventEmitter = new Jackpot_EventEmitter();
        this.selectedNodes = [];
        this._addListeners();
    }

    _addListeners(){
        this.root.addEventListener("item_selected",(params)=>{
            this.selectedNodes = [this.gameArrayObj[params.detail.data.id]];
            this.selfFired = true;
            this.eventEmitter.emit(Jackpot_EventEmitter.NODE_SELECTED,{detail: this.gameTree.getGameArrayObj()[params.detail.data.id]});
            this.selfFired = false;
        });
        this.root.addEventListener("item_add_to_selection",(params)=>{
            let index = this.getSelectedItemIndex(params.detail.data.id);
            if(index===-1)
                this.selectedNodes.push(this.gameArrayObj[params.detail.data.id]);
        });

        this.root.addEventListener("item_remove_from_selection",(params)=>{
            let index = this.getSelectedItemIndex(params.detail.data.id);
            if(index!==-1)
                this.selectedNodes.splice(index,1);
        });

        this.onItemContextMenu = (e, data) =>{
            if(this.activeContextMenu){
                this.activeContextMenu.close();
            }
            this.contextMenuFocusItem = data;
            this.activeContextMenu = new Jackpot_NewObjectContextMenu(e);
        };

        this.eventEmitter.on(Jackpot_EventEmitter.CONTEXT_MENU_ITEM_SELECTED, obj =>{

                let newObj = {
                  parentId : parseInt(this.contextMenuFocusItem.data.id,10),
                  selectedItem : obj.detail.item
                };

                this.eventEmitter.emit(Jackpot_EventEmitter.CREATE_NEW_OBJECT, {"detail" : newObj})
        });

        this.eventEmitter.on(Jackpot_EventEmitter.NODE_SELECTED,(e)=>{
            if(this.selfFired)
                return;
            this.unmarkAllAsSelected();
            this.selectedNodes = [this.gameArrayObj[e.detail.id]];
            this.addItemToSelection(e.detail.id);
        });
    }

    getSelectedItemIndex(id){
        let index = -1;
        this.selectedNodes.forEach((node, itemIndex)=>{
            if(node.id===id){
                index = itemIndex;
            }
        });
        return index;
    }
}
