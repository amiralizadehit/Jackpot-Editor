import Jackpot_EventEmitter from "../utils/Jackpot_EventEmitter.js";

export default class Jackpot_PIXI_Sprite extends PIXI.Sprite{
    constructor(spriteData){
        super(spriteData);
        this.eventEmitter = new Jackpot_EventEmitter();
    }
    clone(){
        return new Jackpot_PIXI_Sprite(this.texture);
    }
    clonePropertiesTo(target){
        target.interactive = this.interactive;
        target.visibility = this.visibility;
        target.position.set(this.position.x, this.position.y);
        target.scale.set(this.scale.x, this.scale.y);
        target.rotation = this.rotation;
        target.width = this.width;
        target.height = this.height;
        target.pivot.set(this.pivot.x, this.pivot.y);
        target.anchor.set(this.anchor.x, this.anchor.y);
    }

    _SetTexture(texture, eventEmitter){
        this.texture = texture;
        this.eventEmitter.emit(Jackpot_EventEmitter.NODE_PROPERTY_UPDATED, {"detail":{"emitter":eventEmitter}});
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
    _addChild(child, eventEmitter){
        this.addChild(child);
        this.eventEmitter.emit(Jackpot_EventEmitter.NODE_PROPERTY_UPDATED, {"detail":{"emitter":eventEmitter}});
    }


}
