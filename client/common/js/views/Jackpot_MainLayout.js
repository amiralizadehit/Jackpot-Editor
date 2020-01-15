class Jackpot_MainLayout {
    constructor(){
        this.sceneCanvasObjectArrays = [];
        this.gameCanvasObjectArrays = [];
        this.init();
    }
    init(){
        this.createMenuBar();
        this.sliceMainArea();
        this.createCanvasSection();
        this.createInspectorPanel();
        this.createHierarchyPanel();
        this.createProjectPanel();
    }
    createMenuBar(){
        this.menuBar = new Jackpot_MenuBar("menu_bar");
        LiteGUI.add(this.menuBar);
    }
    sliceMainArea(){
        this.mainArea = new Jackpot_Area({
            id:"main_area",
            content_id: "canvas_area",
            height: "calc( 100% - 20px )",
            main:true,
            immediateResize: true
        });
        LiteGUI.add(this.mainArea);
        this.mainArea.split("horizontal",[null, 340],true);
        let leftArea = this.mainArea.getSection(0);
        this.rightArea = this.mainArea.getSection(1);
        leftArea.split("vertical",[null, 340], true);
        this.bottomArea = leftArea.getSection(1);
        let topLeftArea = leftArea.getSection(0);
        topLeftArea.split("horizontal",[340, null], true);
        this.leftArea = topLeftArea.getSection(0);
        this.sceneArea = topLeftArea.getSection(1);
    }
    createCanvasSection(){
        let sceneCanvasObject = new Jackpot_SceneCanvas();
        let gameCanvasObject = new Jackpot_GameCanvas();
        let tabs = new Jackpot_Tabs({size:"full"});
        tabs.addScene(sceneCanvasObject);
        tabs.addGame(gameCanvasObject);

        this.sceneArea.add(tabs);
        gameCanvasObject.redraw();
        sceneCanvasObject.redraw();
        this.sceneCanvasObjectArrays.push(sceneCanvasObject);
        this.gameCanvasObjectArrays.push(gameCanvasObject);
    }
    createInspectorPanel(){
        this.inspectorPanel = new Jackpot_InspectorPanel();
        this.rightArea.add(this.inspectorPanel);
        this.rightArea.onresize = ()=>{
            this.redrawCanvases();
        };
        LiteGUI.bind(this.inspectorPanel,"closed",()=>{
            this.mainArea.merge();
        });
    }
    createHierarchyPanel(){
        this.heirarchyPanel = new Jackpot_HierarchyPanel();
        this.leftArea.add(this.heirarchyPanel);
        this.leftArea.onresize = ()=>{
            this.redrawCanvases();
        }
    }
    createProjectPanel(){
        this.projectPanel = new Jackpot_ProjectPanel();
        this.bottomArea.add(this.projectPanel);
        this.bottomArea.onresize = ()=>{
            this.redrawCanvases();
        }
    }

    redrawCanvases(){
        this.sceneCanvasObjectArrays.forEach(object=>{
            object.redraw();
        });
        this.gameCanvasObjectArrays.forEach(object=>{
            object.redraw();
        });
    }
}