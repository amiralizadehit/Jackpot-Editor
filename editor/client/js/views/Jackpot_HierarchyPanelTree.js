import LiteGUI from "../../../lib/litegui.js"
import Jackpot_NewObjectContextMenu from "./Jackpot_NewObjectContextMenu.js";
import Jackpot_EventEmitter from "../utils/Jackpot_EventEmitter.js";

export default class Jackpot_HierarchyPanelTree extends LiteGUI.Tree{
    constructor(gameTree, options, legacy){
        super(gameTree, options, legacy);
        this.gameTree = gameTree;
        this._init();
    }
    _init(){
        this.activeContextMenu = null;
        this.eventEmitter = new Jackpot_EventEmitter();
        this.selectedItems = [];
        this._addListeners();
    }

    _addListeners(){
        this.root.addEventListener("item_selected",(params)=>{
            this.selectedItems = [params];
            this.eventEmitter.emit(Jackpot_EventEmitter.NODE_SELECTED,{detail: params.detail.data.id});
        });
        this.root.addEventListener("item_add_to_selection",(params)=>{
            let index = this.getSelectedItemIndex(params.detail.data.id);
            if(index===-1)
                this.selectedItems.push(params);
        });

        this.root.addEventListener("item_remove_from_selection",(params)=>{
            let index = this.getSelectedItemIndex(params.detail.data.id);
            if(index!==-1)
                this.selectedItems.splice(index,1);
        });

        this.onItemContextMenu = (e, data) =>{
            if(this.activeContextMenu){
                this.activeContextMenu.close();
            }
            this.contextMenuFocusItem = data;
            this.activeContextMenu = new Jackpot_NewObjectContextMenu(e);
        };

        this.eventEmitter.on(Jackpot_EventEmitter.CONTEXT_MENU_ITEM_SELECTED, obj =>{
            /* 1 - WE ADD NEW OBJECT TO THE TREE'
               2 - WE CREATE NEW OBJECT IN THE CANVAS
                */
                let newObj = {
                  parentId : parseInt(this.contextMenuFocusItem.data.id,10),
                  selectedItem : obj.detail.item
                };

                this.eventEmitter.emit(Jackpot_EventEmitter.CREATE_NEW_OBJECT, {"detail" : newObj})
        });

    }

    getSelectedItemIndex(id){
        let index = -1;
        this.selectedItems.forEach((item,itemIndex)=>{
            if(item.detail.data.id===id){
                index = itemIndex;
            }
        });
        return index;
    }
}
