import Jackpot_Panel from "./helpers/Jackpot_Panel.js";

export default class Jackpot_InspectorPanel extends Jackpot_Panel{
    constructor() {
        let options = {
            id:"right_panel",
            title:"Inspector",
            close:true
        };
        super(options);
        this._init();
    }
    _init(){
        this.content.innerHTML = "";

    }
}