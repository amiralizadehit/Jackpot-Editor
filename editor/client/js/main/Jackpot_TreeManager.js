import {Jackpot_JSONTree} from "../utils/Jackpot_JSONTree.js";
import {Jackpot_GameTree} from "../utils/Jackpot_GameTree.js";
import {NodeTypes} from "../utils/Jackpot_EditorConfiguration.js";
import Jackpot_PIXI_Container from "../game/Jackpot_PIXI_Container.js";
import Jackpot_PIXI_Sprite from "../game/Jackpot_PIXI_Sprite.js";
import {Jackpot_GameNode} from "../utils/Jackpot_GameTree.js";
import {Jackpot_JSONNode} from "../utils/Jackpot_JSONTree.js";
import Jackpot_AssetLoader from "../utils/Jackpot_AssetLoader.js";



let _JSONTreeObj = null;
let _GameTreeObj = null;
let _loadableNodes = [];     //This keeps track of all nodes which need to be loaded before use
                            // e.g. Sprites, Spine, ...

/*
    This class is responsible for all tree operations (creation, updating, ...)
 */
export default class Jackpot_TreeManager {
    constructor(rawJSON){

        //Building Tree Objects
        this.rawJSON = rawJSON;
        this._init();
    }
    _init(){
        this._createJSONTreeObject();
    }




    _createJSONTreeObject(){
        if(this.rawJSON){
            _JSONTreeObj = new Jackpot_JSONTree(this.rawJSON);
            _JSONTreeObj.traverse(node=>{
                Jackpot_AssetLoader.markForLoading(node);
            })
        }
        else{
            _JSONTreeObj = new Jackpot_JSONTree(new Jackpot_JSONNode({
                id:"0",
                parentId: null,
                title: "Stage",
                children : [],
                type: "Container",
                properties: "default",
                isRoot: true,
            }));
        }
    }
    _loadLoadableAssets(){

    }

    _createGameTreeObject(){
        _GameTreeObj = new Jackpot_GameTree(new Jackpot_GameNode({
            id:"0",
            parentId: null,
            title:"Stage",
            type:"Container",
            children:[],
            pixiObj: null,
            isRoot: true,
        }));
        _JSONTreeObj.traverse(node => {
            if(!node.isRoot){
                let newGameNode = new Jackpot_GameNode({
                    parentId: node.parentId,
                    title: node.content,
                    type: node.type,
                    children: [],
                });
                switch (node.type) {
                    case NodeTypes.CONTAINER : {
                        newGameNode.pixiObj = new Jackpot_PIXI_Container();
                        _GameTreeObj.add(newGameNode);
                        break;
                    }
                    case NodeTypes.SPRITE : {
                        let texture = Jackpot_AssetLoader.getTexture(node.id);
                        if(!texture)
                            throw new Error("Texture not found!");
                        newGameNode.pixiObj = new Jackpot_PIXI_Sprite(texture);
                        _GameTreeObj.add(newGameNode);
                        _loadableNodes.push(node);
                        break;
                    }
                    default : {
                        throw new Error("The game node type is not supported!");
                    }
                }
                let parentNode = _GameTreeObj.search(newGameNode.parentId);
                if(!parentNode.isRoot){
                    parentNode.pixiObj.addChild(newGameNode.pixiObj)
                }
            }
        });
    }

    getHierarchyTreeObj(){
        return _JSONTreeObj.getInnerTree();
    }

    generateGameTree(callback){
        Jackpot_AssetLoader.loadNow(()=>{
            this._createGameTreeObject();
            if(callback)
                callback();
        });
    }

    getJSONTreeObj(){
        return _JSONTreeObj;
    }

    getGameTreeObj(){
        return _GameTreeObj;
    }

    getLoadableNodes(){
        return _loadableNodes;
    }
}