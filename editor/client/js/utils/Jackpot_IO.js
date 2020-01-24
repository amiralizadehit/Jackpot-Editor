let scene = {
    id: '0',
    parentId: null,
    isRoot: true,
    type: 'Container',
    content: 'Stage',
    properties: {
    position: {
        x: 100,
            y: 200
    },
    rotation: 0,
        scale: {
        x: 1,
            y: 1
    },
    skew: {
        x: 0,
            y: 0
    },
    pivot: {
        x: 0,
            y: 0
    }
},
    children: [
        {
            id: '1',
            parentId: '0',
            isRoot:false,
            type: 'Container',
            content: 'Child 1',
            properties: {
                position: {
                    x: 100,
                    y: 200
                },
                rotation: 0,
                scale: {
                    x: 1,
                    y: 1
                },
                skew: {
                    x: 0,
                    y: 0
                },
                pivot: {
                    x: 0,
                    y: 0
                }
            },
            children: []
        },
        {
            id: '2',
            parentId: '0',
            isRoot:false,
            type: 'Container',
            content: 'Child 2',
            children: [
                {
                    id: '3',
                    parentId: '2',
                    type: 'Sprite',
                    content: 'Sub Child 1',
                    properties: {
                        position: {
                            x: 100,
                            y: 200
                        },
                        rotation: 0,
                        scale: {
                            x: 1,
                            y: 1
                        },
                        skew: {
                            x: 0,
                            y: 0
                        },
                        pivot: {
                            x: 0,
                            y: 0
                        },
                        image: './img/symbol_bird.png'
                    },
                    children: []
                },
                {
                    id: '4',
                    parentId: '2',
                    isRoot:false,
                    type: 'Sprite',
                    content: 'Sub Child 2',
                    properties: {
                        position: {
                            x: 100,
                            y: 200
                        },
                        rotation: 0,
                        scale: {
                            x: 1,
                            y: 1
                        },
                        skew: {
                            x: 0,
                            y: 0
                        },
                        pivot: {
                            x: 0,
                            y: 0
                        },
                        image: './img/symbol_blue.png'
                    },
                    children: []
                },
                {
                    id: '5',
                    parentId: '2',
                    isRoot:false,
                    type: 'Sprite',
                    content: 'Sub Child 3',
                    properties: {
                        position: {
                            x: 100,
                            y: 200
                        },
                        rotation: 0,
                        scale: {
                            x: 1,
                            y: 1
                        },
                        skew: {
                            x: 0,
                            y: 0
                        },
                        pivot: {
                            x: 0,
                            y: 0
                        },
                        image: './img/symbol_chest.png'
                    },
                    children: []
                },
                {
                    id: '6',
                    parentId: '2',
                    isRoot:false,
                    type: 'Sprite',
                    content: 'Sub Child 4',
                    properties: {
                        position: {
                            x: 100,
                            y: 200
                        },
                        rotation: 0,
                        scale: {
                            x: 1,
                            y: 1
                        },
                        skew: {
                            x: 0,
                            y: 0
                        },
                        pivot: {
                            x: 0,
                            y: 0
                        },
                        image: './img/symbol_dagger.png'
                    },
                    children: []
                },
                {
                    id: '7',
                    parentId: '2',
                    isRoot:false,
                    type: 'Sprite',
                    content: 'Sub Child 5',
                    properties: {
                        position: {
                            x: 100,
                            y: 200
                        },
                        rotation: 0,
                        scale: {
                            x: 1,
                            y: 1
                        },
                        skew: {
                            x: 0,
                            y: 0
                        },
                        pivot: {
                            x: 0,
                            y: 0
                        },
                        image: './img/symbol_frog.png'
                    },
                    children: []
                }
            ]
        },
        {
            id: '8',
            parentId: '0',
            isRoot:false,
            type: 'Container',
            content: 'Child 3',
            properties: {
                position: {
                    x: 100,
                    y: 200
                },
                rotation: 0,
                scale: {
                    x: 1,
                    y: 1
                },
                skew: {
                    x: 0,
                    y: 0
                },
                pivot: {
                    x: 0,
                    y: 0
                }
            },
            children: []
        }
    ]
};
let game = {
    name: "relichunt",
    scenes: ["./scene.json"]
};

export default class Jackpot_IO {
    constructor(){

    }
    loadGame(){
        return game;
    }

    loadScene(){
        return scene;
    }
}