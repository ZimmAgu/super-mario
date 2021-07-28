import BrickResolver from "./BrickResolver.js";

class BrickCollider {
    constructor (brickMatrix) {
        this.bricks = new BrickResolver(brickMatrix);
    }


    checkForY (onScreenObject) {
        const match = this.bricks.matchByPosition(onScreenObject.position.x, onScreenObject.position.y);

        if (!match) {
            return;
        }
        
        if (match.brick.name !== "ground") {
            return;
        }

        if (onScreenObject.velocity.y > 0) {
            
            if (onScreenObject.position.y > match.y1) {
                onScreenObject.velocity.y = match.y1;
                onScreenObject.velocity.y = 0;
            }
        } else if (onScreenObject.velocity.y < 0) {
            
            if (onScreenObject.position.y < match.y2) {
                onScreenObject.velocity.y = match.y2;
                onScreenObject.velocity.y = 0;
            }
        }
    }

    testColl (onScreenObject) {
        this.checkForY(onScreenObject);
        const match = this.bricks.matchByPosition(onScreenObject.position.x, onScreenObject.position.y);
        
        if (match) {
            // console.log('Matched Brick ', match, match.brick);
        }
    }
}


export default BrickCollider;