import {Jackpot_JSONTree} from "../utils/Jackpot_JSONTree.js";
import {Jackpot_GameTree} from "../utils/Jackpot_GameTree.js";
import {NodeTypes} from "../utils/Jackpot_EditorConfiguration.js";
import Jackpot_PIXI_Container from "../game/Jackpot_PIXI_Container.js";
import Jackpot_PIXI_Sprite from "../game/Jackpot_PIXI_Sprite.js";
import {Jackpot_GameNode} from "../utils/Jackpot_GameTree.js";
import {Jackpot_JSONNode} from "../utils/Jackpot_JSONTree.js";
import Jackpot_AssetLoader from "../utils/Jackpot_AssetLoader.js";
import Jackpot_EventEmitter from "../utils/Jackpot_EventEmitter.js";



let _JSONTreeObj = null;
let _GameTreeObj = null;
let _GameArrayObj = [];
let _loadableNodes = [];     //This keeps track of all nodes which need to be loaded before use
                            // e.g. Sprites, Spine, ...

/*
    This class is responsible for all tree operations (creation, updating, ...)
 */
export default class Jackpot_TreeManager {
    constructor(rawJSON){

        //Building Tree Objects
        this.rawJSON = rawJSON;
        this.eventEmitter = new Jackpot_EventEmitter();
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

    _createGameTreeObject(){
        let root = new Jackpot_GameNode({
            id:"0",
            parentId: null,
            title:"Stage",
            type:"Container",
            children:[],
            properties: "default",
            pixiObj: new Jackpot_PIXI_Container(), //This PIXI Object has already been created for us.
            isRoot: true,
        });
        _GameTreeObj = new Jackpot_GameTree(root);
        _GameArrayObj["0"] = root;
        _JSONTreeObj.traverse(node => {
            if(!node.isRoot){
                let newGameNode = new Jackpot_GameNode({
                    parentId: node.parentId,
                    title: node.content,
                    type: node.type,
                    isRoot:false,
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

                if(newGameNode.pixiObj instanceof PIXI.DisplayObject){
                    this._setDisplayObjectProperties(node, newGameNode);
                }
                if(newGameNode.pixiObj instanceof PIXI.Sprite){
                    this._setSpriteObjectProperties(node, newGameNode)
                }
                _GameArrayObj[node.id]=newGameNode;
            }
            else {
                this._setDisplayObjectProperties(node, _GameTreeObj.getRoot());
            }
        });
    }

    _setDisplayObjectProperties(referenceNode, newNode) {
        if (referenceNode.properties === "default")
            return;
        newNode.pixiObj.position.set(referenceNode.properties.position.x, referenceNode.properties.position.y);
        newNode.pixiObj.scale.set(referenceNode.properties.scale.x, referenceNode.properties.scale.y);
        newNode.pixiObj.rotation = referenceNode.properties.rotation;
        newNode.pixiObj.pivot.set(referenceNode.properties.pivot.x, referenceNode.properties.pivot.y);
        newNode.pixiObj.visible = referenceNode.properties.visible;
        newNode.pixiObj.interactive = true;

    }

    _setSpriteObjectProperties(referenceNode, newNode){
        if(referenceNode.properties==="default")
            return;
        newNode.pixiObj.anchor.set(referenceNode.properties.anchor.x, referenceNode.properties.anchor.y);
        newNode.pixiObj.mouseup = (e) => {
            this.eventEmitter.emit(Jackpot_EventEmitter.NODE_SELECTED, {"detail": newNode});
        };
    }



    getHierarchyTreeObj(){
        return _JSONTreeObj.getRoot();
    }

    generateGameTree(callback){
        Jackpot_AssetLoader.loadNow(()=>{
            this._createGameTreeObject();
            if(callback)
                callback();
        });
    }

    getGameArrayObj(){
        return _GameArrayObj;
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