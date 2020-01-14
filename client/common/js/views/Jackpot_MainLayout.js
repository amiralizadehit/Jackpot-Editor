class Jackpot_MainLayout {
    constructor(){
        this.init();
    }
    init(){
        this.menuBar = new Jackpot_MenuBar();
        this.sceneHierarchyPanel = new Jackpot_Inspector();

        LiteGUI.add(this.menuBar);
    }
}