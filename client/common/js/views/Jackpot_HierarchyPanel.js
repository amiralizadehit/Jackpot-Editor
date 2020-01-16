class Jackpot_HierarchyPanel extends Jackpot_Panel{
    constructor(treeStructure) {
        let options = {
            id:"left_panel",
            title:"Hierarchy",
            close:true
        };
        super(options);
        this._init();

    }
    _init(){
        let mytree = { id: "Stage",
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



        this.objectsTree.onItemContextMenu = (e, data) =>{
          console.log(data);
        };

        this.objectsTree.root.addEventListener("item_selected",(params)=>{
           console.log(params);
        });

        this.add(this.objectsTree);

    }
}