import {NodeTypes} from "./Jackpot_EditorConfiguration.js";
import {GAME_INFO} from "./Jackpot_GameInfo.js";
import {editorImgFolderURL, projectFolderURL} from "./Jackpot_EditorConfiguration.js";

let _nodeResourceMapping = {};

export default class Jackpot_AssetLoader{

    static markForLoading(node){
        let projectURL = projectFolderURL + GAME_INFO.name + GAME_INFO.imgFolder;
        let finalURL = "";
        switch (node.type) {
            case NodeTypes.SPRITE:
                if(node.properties.image){
                    finalURL = projectURL + node.properties.image;
                }
                break;
            case NodeTypes.SPINE:
                if(node.properties.source){
                    finalURL = projectURL + node.properties.source;
                }
                break;
        }
        PIXI.Loader.shared.add(finalURL, finalURL);
    }

    static loadNow(callback){
        PIXI.Loader.shared.load(callback)
    }

    static loadTexture(name, callback){
        if(PIXI.Loader.shared.resources[name]){
            callback(this.getTexture(name));
        }
        else{
            PIXI.Loader.shared.add(name, name).load(()=>{
                callback(this.getTexture(name));
            });
        }
    }

    static getTexture(name){
        return PIXI.Loader.shared.resources[name].texture;
    }

    static getSpinData(name){
        return PIXI.Loader.shared.resources[name].spineData;
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