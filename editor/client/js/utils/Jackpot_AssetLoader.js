import {NodeTypes} from "./Jackpot_EditorConfiguration.js";
import {GAME_INFO} from "./Jackpot_GameInfo.js";

let projectPrefixURL = "./projects/";

export default class Jackpot_AssetLoader{

    static markForLoading(node){
        let projectURL = projectPrefixURL + GAME_INFO.name;
        switch (node.type) {
            case NodeTypes.SPRITE:
                let finalURL = projectURL + node.properties.image;
                PIXI.Loader.shared.add(node.id, finalURL);
                break;
        }
    }

    static loadNow(callback){
        PIXI.Loader.shared.load(callback)
    }

    static getResource(name){
        return PIXI.Loader.shared.resources[name];
    }

    static getTexture(name){
        return PIXI.Loader.shared.resources[name].texture;
    }


    //Editor
    static loadEditorResources(callback){
        let imgFolderURL = "./editor/client/img";

        PIXI.Loader.shared.add("placeholder_sprite", imgFolderURL + "/placeholder_sprite.jpg");
        PIXI.Loader.shared.load(callback);
    }
}