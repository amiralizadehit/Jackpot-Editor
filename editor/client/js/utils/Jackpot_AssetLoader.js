import {NodeTypes} from "./Jackpot_EditorConfiguration.js";
import {GAME_INFO} from "./Jackpot_GameInfo.js";
import {editorImgFolderURL, projectFolderURL} from "./Jackpot_EditorConfiguration.js";

let _nodeResourceMapping = {};

export default class Jackpot_AssetLoader{

    static markForLoading(node){
        let projectURL = projectFolderURL + GAME_INFO.name;
        switch (node.type) {
            case NodeTypes.SPRITE:
                if(node.properties.image){
                    let finalURL = projectURL + node.properties.image;
                    PIXI.Loader.shared.add(finalURL, finalURL);
                    this.addTextureToMapper(node.id, finalURL);
                }else{
                    this.addTextureToMapper(node.id, Jackpot_AssetLoader.TEXTURE_SPRITE_PLACEHOLDER);
                }
                break;
        }
    }

    static loadNow(callback){
        PIXI.Loader.shared.load(callback)
    }

    static addTextureToMapper(id, name){
        if(_nodeResourceMapping[id]===undefined){
            _nodeResourceMapping[id] = {"texture":name};
        }else{
            _nodeResourceMapping[id]["texture"] = name;
        }
    }

    static getTextureURL(id){
        return PIXI.Loader.shared.resources[_nodeResourceMapping[id].texture].url;
    }

    static getTexture(id){
        return PIXI.Loader.shared.resources[_nodeResourceMapping[id].texture].texture;
    }




    //Editor
    static loadEditorResources(callback){
        PIXI.Loader.shared.add(
            Jackpot_AssetLoader.TEXTURE_SPRITE_PLACEHOLDER,
            Jackpot_AssetLoader.TEXTURE_SPRITE_PLACEHOLDER);
        PIXI.Loader.shared.load(callback);
    }
}

Jackpot_AssetLoader.TEXTURE_SPRITE_PLACEHOLDER = editorImgFolderURL+ "/placeholder_sprite.jpg";