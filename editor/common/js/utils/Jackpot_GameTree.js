
export class Jackpot_GameNode{
    constructor(value){
        this.id = value.id;
        this.parentId = value.parentId;
        this.content = value.title;
        this.type = value.type;
        this.children = value.children;
        this.properties = value.properties;
    }

    rename(newName){
        this.title = newName;
    }
}

export class Jackpot_GameTree {
    constructor(loadedTree){
        //Here we make the tree from JSON file stored on disk.
        this.maxId = 0;
        if(loadedTree)
            this._createTree(loadedTree);
        else{
            this._root = new Jackpot_GameNode({
                id:'0',
                parentId: null,
                title: "Stage",
                children : [],
                type: "Container"
            });
        }
    }

    _createTree(loadedTree){
        this._root = loadedTree;
        this._updateMaxId();
    }

    _traverse(callback){
        function walk(node) {
            callback(node);
            node.children.forEach(walk);
        }
        walk(this._root);
    }

    _updateMaxId(){
        this._traverse(node=>{
            let intId = parseInt(node.id,10);
            if(intId > this.maxId)
                this.maxId = intId
        });
        console.log(this.maxId);
    }

    add(value){
        value["id"] = (++this.maxId).toString();
        this.maxId++;
        let newNode = new Jackpot_GameNode(value);

        this._traverse((node)=>{
            if(value.parentId === node.id){
                node.children.push(newNode)
            }
        });

    }

    remove(nodeId){
        this._traverse((node)=>{
            node.children.forEach((childNode, index)=>{
                if(childNode.id===nodeId){
                    node.children.splice(index,1);
                }
            });
        })
    }

    search(nodeId){
        let nodeInTree = null;
        this._traverse((node)=>{
            if(node.id===nodeId){
                nodeInTree = node;
            }
        });
        return nodeInTree;
    }

    getTree(){
        return this._root;
    }


}