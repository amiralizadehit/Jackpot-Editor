import Jackpot_Canvas from "./helpers/Jackpot_Canvas.js";
import Jackpot_PIXI_Container from "../game/Jackpot_PIXI_Container.js";
import Jackpot_PIXI_Graphics from "../game/Jackpot_PIXI_Graphics.js";
import Jackpot_PIXI_Sprite from "../game/Jackpot_PIXI_Sprite.js";





export default class Jackpot_SceneCanvas extends Jackpot_Canvas{
    constructor(treeManager){
        super({width:100, height:100, antialias:true , strokeText:"Scene", strokeColor:"#AAF"});
        this.treeManager = treeManager;
        this._init();
        this.renderTree();
        this.createGizmos();
    }

    _init(){
        this.gizmoz = new Jackpot_PIXI_Container();
        this.stage.addChild(this.gizmoz);
    }

    renderTree(){
        this.treeManager.getGameArrayObj()["0"].children.forEach(stageChild=>{
            this.stage.addChild(stageChild.pixiObj);
        });
    }
    createGizmos(){
        let scale = 2;
        let rectTransformGizmo = new Jackpot_PIXI_Graphics();
        rectTransformGizmo.lineStyle(1, 0xA0A0A0);
        rectTransformGizmo.drawRect(100, 100, 400, 400);
        //let texture = this.renderer.generateTexture(rectTransformGizmo);
        //let testSprite = new Jackpot_PIXI_Sprite(texture);
        //testSprite.scale.set(1,1);
        rectTransformGizmo.scale.set(scale,scale);

        rectTransformGizmo.clear();
        rectTransformGizmo.lineStyle(1/scale, 0xA0A0A0);
        rectTransformGizmo.drawRect(0, 0, 400, 400);
        //testSprite.position.set(900, 100);
        //testSprite.scale.set(5, 5);
        //rectTransformGizmo.beginFill(0xFFFF00);
        this.gizmoz.addChild(rectTransformGizmo);
    }
}
