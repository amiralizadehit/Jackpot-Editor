export default class TransformHelper {

}

TransformHelper.setPivotAndKeepPosition = (displayObject, pivotX, pivotY) => {
    let pivotDiffX = pivotX - displayObject.pivot.x;
    let pivotDiffY = pivotY - displayObject.pivot.y;
    let currentXPos = displayObject.position.x;
    let currentYPos = displayObject.position.y;

    displayObject.pivot.set(pivotX,pivotY);

    let scaledX = pivotDiffX * displayObject.scale.x;
    let scaledY = pivotDiffY * displayObject.scale.y;

    //let dist = Math.sqrt(Math.pow(scaledX,2) + Math.pow(scaledY,2));

    let finalX = Math.cos(displayObject.rotation)*scaledX - Math.sin(displayObject.rotation)*scaledY;
    let finalY = Math.cos(displayObject.rotation)*scaledY + Math.sin(displayObject.rotation)*scaledX;

    let newXPos = currentXPos+finalX;
    let newYPos = currentYPos+finalY;

    displayObject.position.set(newXPos, newYPos);

    return [newXPos, newYPos];
};

TransformHelper.getGlobalTransform = (displayObject)=>{ //[rotation, [scale.x, scale.y]]
    if(displayObject.parent===null)
      return [displayObject.getGlobalPosition(), displayObject.rotation, [displayObject.scale.x, displayObject.scale.y]];
    let t = TransformHelper.getGlobalTransform(displayObject.parent);
    return [displayObject.getGlobalPosition(), displayObject.rotation + t[1], [displayObject.scale.x*t[2][0],displayObject.scale.y*t[2][1]]];
};