import LiteGUI from "../../../../lib/litegui.js"
import Jackpot_NewObjectContextMenu from "../Jackpot_NewObjectContextMenu.js";
import Jackpot_EventEmitter from "../../utils/Jackpot_EventEmitter.js";

export default class Jackpot_Tree extends LiteGUI.Tree{
    constructor(data, options, legacy){
        super(data, options, legacy);
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
            console.log(this.selectedItems);
        });
        this.root.addEventListener("item_add_to_selection",(params)=>{
            let index = this.getSelectedItemIndex(params.detail.data.id);
            if(index===-1)
                this.selectedItems.push(params);
            console.log(this.selectedItems);
        });

        this.root.addEventListener("item_remove_from_selection",(params)=>{
            let index = this.getSelectedItemIndex(params.detail.data.id);
            if(index!==-1)
                this.selectedItems.splice(index,1);

            console.log(this.selectedItems);
        });

        this.onItemContextMenu = (e, data) =>{
            if(this.activeContextMenu){
                this.activeContextMenu.close();
            }
            this.contextMenuFocusItem = data;
            this.activeContextMenu = new Jackpot_NewObjectContextMenu(e);
        };

        this.eventEmitter.on(Jackpot_EventEmitter.CONTEXT_MENU_ITEM_SELECTED, obj =>{
            /* 1 - WE ADD NEW OBJECT TO THE TREE
               2 - WE CREATE NEW OBJECT IN THE CANVAS
                */
                /*this.insertItem({

                })*/

                this.eventEmitter.emit(Jackpot_EventEmitter.CREATE_NEW_OBJECT, obj)
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
