import LiteGUI from "../../../../lib/litegui.js"

export default class Jackpot_Inspector extends LiteGUI.Inspector{
    constructor(options){
        super(options);
    }

    clone(){
        let clone = new Jackpot_Inspector();
        if(this.nameWidget){
            clone.addString("Name",this.nameWidget.getValue());
        }
        if(this.visibility){
            clone.addChecbox
        }


    }
}
