import LiteGUI from "../../../lib/litegui.js"
import Jackpot_NewObjectContextMenu from "./Jackpot_NewObjectContextMenu.js";
import Jackpot_EventEmitter from "../utils/Jackpot_EventEmitter.js";

export default class Jackpot_HierarchyPanelTree extends LiteGUI.Tree{
    constructor(gameTree, options, legacy){
        super(gameTree.getHierarchyTreeObj(), options, legacy);
        this.gameTree = gameTree;
        this._init();
    }
    _init(){
        this.activeContextMenu = null;
        this.eventEmitter = new Jackpot_EventEmitter();
        this.selectedNodes = [];
        this._addListeners();
    }

    _addListeners() {
        this.root.addEventListener("item_selected", (params) => {
            const gameArrayObj = this.gameTree.getGameArrayObj();
            this.selectedNodes = [gameArrayObj[params.detail.data.id]];
            this.selfFired = true;
            this.eventEmitter.emit(Jackpot_EventEmitter.NODE_SELECTED, {detail: gameArrayObj[params.detail.data.id]});
            this.selfFired = false;
        });
        this.root.addEventListener("item_add_to_selection", (params) => {
            const gameArrayObj = this.gameTree.getGameArrayObj();
            let index = this.getSelectedItemIndex(params.detail.data.id);
            if (index === -1)
                this.selectedNodes.push(gameArrayObj[params.detail.data.id]);
        });

        this.root.addEventListener("item_remove_from_selection", (params) => {
            let index = this.getSelectedItemIndex(params.detail.data.id);
            if (index !== -1)
                this.selectedNodes.splice(index, 1);
        });

        this.onItemContextMenu = (e, data) => {
            if (this.activeContextMenu) {
                this.activeContextMenu.close();
            }
            this.contextMenuFocusItem = data;
            this.activeContextMenu = new Jackpot_NewObjectContextMenu(e);
        };

        this.eventEmitter.on(Jackpot_EventEmitter.CONTEXT_MENU_ITEM_SELECTED, obj => {

            let newObj = {
                parentId: parseInt(this.contextMenuFocusItem.data.id, 10),
                selectedItem: obj.detail.item
            };
            this.eventEmitter.emit(Jackpot_EventEmitter.CREATE_NEW_OBJECT, {"detail": newObj})
        });
        this.eventEmitter.on(Jackpot_EventEmitter.NODE_SELECTED, e => {
            const gameArrayObj = this.gameTree.getGameArrayObj();
            if (this.selfFired)
                return;
            this.unmarkAllAsSelected();
            this.selectedNodes = [gameArrayObj[e.detail.id]];
            this.addItemToSelection(e.detail.id);
        });
        this.eventEmitter.on(Jackpot_EventEmitter.NEW_OBJECT_CREATED, e => {
            this.insertItem({
                id: e.detail.id,
                content: e.detail.content,
                children: e.detail.children
            }, e.detail.parentId, null, {selected: true});
            this.eventEmitter.emit(Jackpot_EventEmitter.NODE_SELECTED, {detail: e.detail});
        });
        this.eventEmitter.on(Jackpot_EventEmitter.ACTION_DELETE, e => {
            this.selectedNodes.forEach(node => {
                if (!node.isRoot) //you can not remove the stage
                    this.removeItem(node.id, true);
            });
            this.eventEmitter.emit(Jackpot_EventEmitter.DELETE_OBJECTS, {"detail": this.selectedNodes});
            this.selectedNodes = [];
        });
        this.eventEmitter.on(Jackpot_EventEmitter.ACTION_DUPLICATE, e => {
            if (this.selectedNodes.length > 1) {
                console.warn("Multiple duplication is not supported!");
                return;
            }
            this.selectedNodes.forEach(node => {
                this.eventEmitter.emit(Jackpot_EventEmitter.DUPLICATE_OBJECTS, {"detail": node});
            });
        });
        this.eventEmitter.on(Jackpot_EventEmitter.OBJECT_DUPLICATED, e => {
            this.insertItem(e.detail.clone,e.detail.clone.parentId,
                null,{
                selected:true});
            this.eventEmitter.emit(Jackpot_EventEmitter.NODE_SELECTED, {detail: e.detail.clone});
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
