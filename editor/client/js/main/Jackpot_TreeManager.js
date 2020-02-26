import {Jackpot_JSONTree} from "../utils/Jackpot_JSONTree.js";
import {Jackpot_GameTree} from "../utils/Jackpot_GameTree.js";
import {NodeTypes} from "../utils/Jackpot_EditorConfiguration.js";
import Jackpot_PIXI_Container from "../game/Jackpot_PIXI_Container.js";
import Jackpot_PIXI_Sprite from "../game/Jackpot_PIXI_Sprite.js";
import {Jackpot_GameNode} from "../utils/Jackpot_GameTree.js";
import {Jackpot_JSONNode} from "../utils/Jackpot_JSONTree.js";
import Jackpot_AssetLoader from "../utils/Jackpot_AssetLoader.js";
import Jackpot_EventEmitter from "../utils/Jackpot_EventEmitter.js";
import {projectFolderURL} from "../utils/Jackpot_EditorConfiguration.js";
import {GAME_INFO} from "../utils/Jackpot_GameInfo.js";




let _JSONTreeObj = null;
let _GameTreeObj = null;
let _GameArrayObj = {};

/*
    This class is responsible for all tree operations (creation, updating, ...)
 */
export default class Jackpot_TreeManager {
    constructor(rawJSON){

        //Building Tree Objects
        this.rawJSON = rawJSON;
        this.eventEmitter = new Jackpot_EventEmitter();
        this.gameProjectURL = projectFolderURL + GAME_INFO.name;
        this._init();
    }
    _init(){
        this._createJSONTreeObject();
        this._addListeners();
    }
    _addListeners(){
        this.eventEmitter.on(Jackpot_EventEmitter.CREATE_NEW_OBJECT, e=>{
            this._addNewNode(e.detail.parentId, e.detail.selectedItem);
        });
        this.eventEmitter.on(Jackpot_EventEmitter.DELETE_OBJECTS, e=>{
            this._removeNodes(e.detail)
        });
        this.eventEmitter.on(Jackpot_EventEmitter.DUPLICATE_OBJECTS, e=>{
            this._duplicateNode(e.detail);
        })
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
            pixiObj: new Jackpot_PIXI_Container(),
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
                        let finalURL = this.gameProjectURL + GAME_INFO.imgFolder + node.properties.image;
                        newGameNode.sprite = {
                            textureURL:finalURL,
                            textureName:node.properties.image
                        };
                        let texture = Jackpot_AssetLoader.getTexture(finalURL);
                        if(!texture)
                            throw new Error("Texture not found!");
                        newGameNode.pixiObj = new Jackpot_PIXI_Sprite(texture);

                        _GameTreeObj.add(newGameNode);
                        break;
                    }
                    default : {
                        throw new Error("The game node type is not supported!");
                    }
                }
                let parentNode = _GameArrayObj[newGameNode.parentId];
                    parentNode.pixiObj.addChild(newGameNode.pixiObj);


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
        if (!referenceNode || referenceNode.properties === "default")
            newNode.pixiObj.interactive = true;
        else{
            newNode.pixiObj.position.set(referenceNode.properties.position.x, referenceNode.properties.position.y);
            newNode.pixiObj.scale.set(referenceNode.properties.scale.x, referenceNode.properties.scale.y);
            newNode.pixiObj.rotation = referenceNode.properties.rotation;
            newNode.pixiObj.pivot.set(referenceNode.properties.pivot.x, referenceNode.properties.pivot.y);
            newNode.pixiObj.visible = referenceNode.properties.visible;
            newNode.pixiObj.interactive = true;
        }
    }

    _setSpriteObjectProperties(referenceNode, newNode){
        if(referenceNode.properties==="default")
            return;
        newNode.pixiObj.anchor.set(referenceNode.properties.anchor.x, referenceNode.properties.anchor.y);
        this._addSpriteObjectListeners(newNode);

    }
    _addSpriteObjectListeners(newNode){
        newNode.pixiObj.mouseup = (e) => {
            this.eventEmitter.emit(Jackpot_EventEmitter.NODE_SELECTED, {"detail": newNode});
        };
    }

    _addNewNode(parentId, type){
        let newGameNode = new Jackpot_GameNode({
            parentId: `${parentId}`,
            title: `New ${type}`,
            type: type,
            isRoot:false,
            children: [],
        });

        switch (type) {
            case NodeTypes.CONTAINER:
                _GameTreeObj.add(newGameNode);
                newGameNode.pixiObj = new Jackpot_PIXI_Container();
                break;
            case NodeTypes.SPRITE:
                _GameTreeObj.add(newGameNode);
                newGameNode.sprite = {
                    textureURL:Jackpot_AssetLoader.TEXTURE_SPRITE_PLACEHOLDER
                };
                let texture = Jackpot_AssetLoader.getTexture(Jackpot_AssetLoader.TEXTURE_SPRITE_PLACEHOLDER);
                if(!texture)
                    throw new Error("Texture not found!");
                newGameNode.pixiObj = new Jackpot_PIXI_Sprite(texture);

                this._addSpriteObjectListeners(newGameNode);
                break;
        }
        _GameArrayObj[newGameNode.id]=newGameNode;
        this._setDisplayObjectProperties(null, newGameNode);
        this._attachPixiObj(newGameNode);
        this.eventEmitter.emit(Jackpot_EventEmitter.NEW_OBJECT_CREATED,{"detail":newGameNode});
    }

    _removeNodes(nodes){
        nodes.forEach(node=>{
            _GameTreeObj.remove(node.id);
        });
        _GameArrayObj = {};
        _GameTreeObj.traverse(node=>{
            _GameArrayObj[node.id] = node;
        })
    }

    _duplicateNode(node){
        let clone = node.clone();
        clone.content = `${node.content}_Clone`;
        _GameTreeObj.add(clone);
        this._addToArrayObjRecursively(clone);
        this._attachPixiObj(clone);
        this.eventEmitter.emit(Jackpot_EventEmitter.OBJECT_DUPLICATED, {"detail":{
            clone:clone, reference:node
            }});
    }

    _attachPixiObj(node){
        let parentNode = _GameArrayObj[node.parentId];
        if(parentNode.isRoot){ //stage
            parentNode.pixiObj._addChildAt(node.pixiObj,parentNode.pixiObj.children.length-1,"other"); //before gizmo
        }else{
            parentNode.pixiObj._addChild(node.pixiObj,"other");
        }
    }

    _addToArrayObjRecursively(node){
        _GameArrayObj[node.id] = node;
        node.children.forEach(child=>{
           this._addToArrayObjRecursively(child);
        });
    }

    getHierarchyTreeObj(){
        return _GameTreeObj.getRoot();
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

}