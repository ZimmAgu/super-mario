import BrickResolver from "./BrickResolver.js";

class BrickCollider {
    constructor (brickMatrix) {
        this.bricks = new BrickResolver(brickMatrix);
    }

    testColl (onScreenObject) {
        const match = this.bricks.matchByPosition(onScreenObject.position.x, onScreenObject.position.y);
        
        if (match) {
            console.log('Matched Brick ', match, match.brick);
        }
    }
}


export default BrickCollider;