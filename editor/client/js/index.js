import Jackpot_MainLayout from "./views/Jackpot_MainLayout.js";
import LiteGUI from "../../lib/litegui.js";
import Jackpot_Manager from "./main/Jackpot_Manager.js";
import Jackpot_AssetLoader from "./utils/Jackpot_AssetLoader.js";

(function () {
    "use strict";

    LiteGUI.init();
    Jackpot_AssetLoader.loadEditorResources(()=>{
        new Jackpot_Manager();
    });
})();






