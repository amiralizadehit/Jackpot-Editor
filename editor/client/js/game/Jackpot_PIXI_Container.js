import Jackpot_EventEmitter from "../utils/Jackpot_EventEmitter";

export default class Jackpot_PIXI_Container extends PIXI.Container{
    constructor(){
        super();
        this.eventEmitter = new Jackpot_EventEmitter();
    }

    _setPosition(x, y, eventEmitter){
        this.position.set(x, y);
        this.eventEmitter.emit(Jackpot_EventEmitter.NODE_PROPERTY_UPDATED, {"detail":{"emitter":eventEmitter}});
    }
    _setRotation(angle, eventEmitter){
        this.rotation = angle;
        this.eventEmitter.emit(Jackpot_EventEmitter.NODE_PROPERTY_UPDATED, {"detail":{"emitter":eventEmitter}});
    }
    _setSize(width, height, eventEmitter){
        this.height = height;
        this.width = width;
        this.eventEmitter.emit(Jackpot_EventEmitter.NODE_PROPERTY_UPDATED, {"detail":{"emitter":eventEmitter}});
    }
    _setScale(x, y, eventEmitter){
        this.scale.set(x, y);
        this.eventEmitter.emit(Jackpot_EventEmitter.NODE_PROPERTY_UPDATED, {"detail":{"emitter":eventEmitter}});
    }
    _setPivot(x, y, eventEmitter){
        this.pivot.set(x, y);
        this.eventEmitter.emit(Jackpot_EventEmitter.NODE_PROPERTY_UPDATED, {"detail":{"emitter":eventEmitter}});
    }
}