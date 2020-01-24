import Jackpot_Panel from "./helpers/Jackpot_Panel.js";

export default class Jackpot_ProjectPanel extends Jackpot_Panel{
    constructor() {
        let options = {
            id:"bottom_panel",
            title:"Project",
            close:true
        };
        super(options);
    }
}