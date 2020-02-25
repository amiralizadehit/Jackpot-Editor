import LiteGUI from "../../lib/litegui.js";
import Jackpot_Manager from "./main/Jackpot_Manager.js";
import Jackpot_AssetLoader from "./utils/Jackpot_AssetLoader.js";
import {Jackpot_Shortcut} from "./utils/Jackpot_Shortcut.js";

(function () {
    "use strict";

    LiteGUI.init();
    Jackpot_AssetLoader.loadEditorResources(()=>{
        new Jackpot_Shortcut();
        new Jackpot_Manager();
    });
})();






