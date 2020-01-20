import LiteGUI from "../../../../lib/litegui.js";

export default class Jackpot_Tabs extends LiteGUI.Tabs{
    constructor(options, legacy){
        super(options, legacy);

    }

    addScene(sceneCanvasObject){
        let sceneTab = this.addTab("Scene",
            {
                id:"scene_canvas",
                selected:true,
                size:"full",
                tab_width:100,
                overflow:"hidden",
                callback:()=>{sceneCanvasObject.redraw();}
            });
        sceneTab.add(sceneCanvasObject.getElement());
    }

    addGame(gameCanvasObject){
        let gameTab = this.addTab("Game",
            {
                id:"game_canvas",
                size:"full",
                tab_width:100,
                overflow:"hidden",
                callback:()=>{gameCanvasObject.redraw();}
            });

        gameTab.add(gameCanvasObject.getElement());
    }
}