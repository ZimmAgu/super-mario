import BlockResolver from "./BlockResolver.js";

class BlockCollider {
    constructor (blockMatrix) {
        this.blocks = new BlockResolver(blockMatrix);
    }


    checkForX (onScreenObject) {
        let xPosition;
        if (onScreenObject.velocity.x > 0) {
            xPosition = onScreenObject.position.x + onScreenObject.size.x;
        } else if (onScreenObject.velocity.x < 0) {
            xPosition = onScreenObject.position.x;
        } else {
            return;
        }

        const matches = this.blocks.searchByRange(
                                        xPosition, 
                                        xPosition,
                                        onScreenObject.position.y, 
                                        onScreenObject.position.y + onScreenObject.size.y
                                    );
        matches.forEach(match => { 
            if (match.block.type !== "solid") {
                return;
            }
            if (onScreenObject.velocity.x > 0) {
                if (onScreenObject.position.x + onScreenObject.size.x > match.x1) {
                    onScreenObject.position.x = match.x1 - onScreenObject.size.x;
                    onScreenObject.velocity.x = 0;
                }
            } else if (onScreenObject.velocity.x < 0) {
                if (onScreenObject.position.x < match.x2) {
                    onScreenObject.position.x = match.x2;
                    onScreenObject.velocity.x = 0;
                }
            }
        })
    }


    checkForY (onScreenObject) {
        let yPosition;
        if (onScreenObject.velocity.y > 0) {
            yPosition = onScreenObject.position.y + onScreenObject.size.y;
        } else if (onScreenObject.velocity.y < 0) {
            yPosition = onScreenObject.position.y;
        } else {
            return;
        }

        const matches = this.blocks.searchByRange(
                                    onScreenObject.position.x, 
                                    onScreenObject.position.x + onScreenObject.size.x,
                                    yPosition, 
                                    yPosition);
        matches.forEach(match => { 
            if (match.block.type !== "solid") {
                return;
            }

            if (onScreenObject.velocity.y > 0) {    // Top of block 
                if (onScreenObject.position.y + onScreenObject.size.y > match.y1) {
                    onScreenObject.position.y = match.y1 - onScreenObject.size.y;
                    onScreenObject.velocity.y = 0;

                    onScreenObject.obstruct('bottom');
                }
            } else if (onScreenObject.velocity.y < 0) { // Bottom of block 
                if (onScreenObject.position.y < match.y2) {
                    onScreenObject.position.y = match.y2;
                    onScreenObject.velocity.y = 0;

                    onScreenObject.obstruct('top');
                }
            }
        })
    }
}


export default BlockCollider;