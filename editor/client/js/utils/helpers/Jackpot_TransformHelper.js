export default class TransformHelper {

}

TransformHelper.setPivotAndKeepPosition = (displayObject, pivotX, pivotY) => {
    let pivotDiffX = pivotX - displayObject.pivot.x;
    let pivotDiffY = pivotY - displayObject.pivot.y;
    displayObject.pivot.set(pivotX,pivotY);
    let currentXPos = displayObject.position.x;
    let currentYPos = displayObject.position.y;
    let newXPos = currentXPos+pivotDiffX;
    let newYPos = currentYPos+pivotDiffY;
    displayObject.position.set(newXPos, newYPos);
    return [newXPos, newYPos];
};

TransformHelper.getGlobalTransform = (displayObject)=>{ //[rotation, [scale.x, scale.y]]
    if(displayObject.parent===null)
      return [displayObject.getGlobalPosition(), displayObject.rotation, [displayObject.scale.x, displayObject.scale.y]];
    let t = TransformHelper.getGlobalTransform(displayObject.parent);
    return [displayObject.getGlobalPosition(), displayObject.rotation + t[1], [displayObject.scale.x*t[2][0],displayObject.scale.y*t[2][1]]];
};