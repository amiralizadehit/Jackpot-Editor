class Jackpot_HierarchyPanel extends Jackpot_Panel{
    constructor() {
        let options = {
            id:"left_panel",
            title:"Hierarchy",
            close:true
        };
        super(options);
        this._init();

    }
    _init(){
        let mytree = { id: "Rootnode",
            children: [
                { id: "Child1" },
                { id: "Child2", children: [
                        { id: "SubChild1" },
                        { id: "SubChild2" },
                        { id: "SubChild3" },
                        { id: "SubChild4" }
                    ]},
                { id: "Child3" },
            ]};
        this.objectsTree = new Jackpot_Tree(mytree,
            {
                allow_rename: true,
                allow_multiselection: true,
                allow_drag: true,
            });

        this.objectsTree.root.addEventListener("item_selected",(params)=>{
           console.log(params);
        });

        this.add(this.objectsTree);

    }
}