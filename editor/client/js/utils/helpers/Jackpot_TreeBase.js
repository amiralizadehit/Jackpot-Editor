export class Jackpot_NodeBase{
    constructor(value){
        this.isRoot = value.isRoot || false;
        this.id = value.id || "-1";
        this.parentId = value.parentId;
        this.content = value.title;
        this.type = value.type;
        this.isRoot = value.isRoot;
        this.children = value.children;
    }

    rename(newName){
        this.content = newName;
    }
}


export class Jackpot_TreeBase {
    constructor(rootNode){
        this._root = rootNode;
        this._maxId = 0;
        this._updateMaxId();
    }


    _updateMaxId(){
        this.traverse(node=>{
            let intId = parseInt(node.id,10);
            if(intId > this._maxId)
                this._maxId = intId
        });
    }


    traverse(callback){
        function walk(node) {
            callback(node);
            node.children.forEach(walk);
        }
        walk(this._root);
    }


    add(newNode){
        this._maxId++;
        newNode["id"] = (this._maxId).toString();
        newNode["isRoot"] = false;

        this.traverse((node)=>{
            if(newNode.parentId === node.id){
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

    getRoot(){
        return this._root;
    }

}