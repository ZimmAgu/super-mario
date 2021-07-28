import BrickResolver from "./BrickResolver.js";

class BrickCollider {
    constructor (brickMatrix) {
        this.bricks = new BrickResolver(brickMatrix);
    }


    checkForX (onScreenObject) {
        const matches = this.bricks.searchByRange(
                                    onScreenObject.position.x, 
                                    onScreenObject.position.x + onScreenObject.size.x,
                                    onScreenObject.position.y, 
                                    onScreenObject.position.y + onScreenObject.size.y);
        matches.forEach(match => { 
          
            if (match.brick.name !== "ground") {
                return;
            }
            if (onScreenObject.velocity.x > 0) {
                console.log('j')
                if (onScreenObject.position.x + onScreenObject.size.x > match.x1) {
                    
                    onScreenObject.velocity.x = match.x1 - onScreenObject.size.x;
                    onScreenObject.velocity.x = 0;
                }
            } else if (onScreenObject.velocity.x < 0) {
                console.log('o')
                if (onScreenObject.position.x < match.x2) {
                    onScreenObject.velocity.x = match.x2;
                    onScreenObject.velocity.x = 0;
                }
            }
        })
    }


    checkForY (onScreenObject) {
        const matches = this.bricks.searchByRange(
                                    onScreenObject.position.x, 
                                    onScreenObject.position.x + onScreenObject.size.x,
                                    onScreenObject.position.y, 
                                    onScreenObject.position.y + onScreenObject.size.y);
        matches.forEach(match => { 
          
            if (match.brick.name !== "ground") {
                return;
            }

            if (onScreenObject.velocity.y > 0) {    // Top of brick 
                
                if (onScreenObject.position.y + onScreenObject.size.y > match.y1) {
                    onScreenObject.velocity.y = match.y1 - onScreenObject.size.y;
                    onScreenObject.velocity.y = 0;
                }
            } else if (onScreenObject.velocity.y < 0) { // Bottom of brick 
                if (onScreenObject.position.y < match.y2) {
                    onScreenObject.velocity.y = match.y2;
                    onScreenObject.velocity.y = 0;
                }
            }
        })
    }

    testColl (onScreenObject) {
        this.checkForX(onScreenObject);
        this.checkForY(onScreenObject);
        const match = this.bricks.searchByPosition(onScreenObject.position.x, onScreenObject.position.y);
        
        if (match) {
            // console.log('Matched Brick ', match, match.brick);
        }
    }
}


export default BrickCollider;