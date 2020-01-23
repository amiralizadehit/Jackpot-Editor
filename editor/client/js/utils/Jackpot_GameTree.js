
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

let _maxId = 0;

export class Jackpot_GameTree {
    constructor(loadedTree){
        //Here we make the tree from JSON file stored on disk.

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



    _updateMaxId(){
        this.traverse(node=>{
            let intId = parseInt(node.id,10);
            if(intId > _maxId)
                _maxId = intId
        });
        console.log(_maxId);
    }


    traverse(callback){
        function walk(node) {
            callback(node);
            node.children.forEach(walk);
        }
        walk(this._root);
    }


    add(value){
        value["id"] = (++_maxId).toString();
        _maxId++;
        let newNode = new Jackpot_GameNode(value);

        this.traverse((node)=>{
            if(value.parentId === node.id){
                node.children.push(newNode)
            }
        });

    }

    remove(nodeId){
        this.traverse((node)=>{
            node.children.forEach((childNode, index)=>{
                if(childNode.id===nodeId){
                    node.children.splice(index,1);
                }
            });
        })
    }

    search(nodeId){
        let nodeInTree = null;
        this.traverse((node)=>{
            if(node.id===nodeId){
                nodeInTree = node;
            }
        });
        return nodeInTree;
    }

    getInnerTree(){
        return this._root;
    }


}