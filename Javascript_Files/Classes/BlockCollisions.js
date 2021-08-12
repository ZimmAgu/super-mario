"use strict";
import BlockResolver from "./BlockResolver.js";

const BLOCKSIDES = {
    TOP: 'top',
    BOTTOM: 'bottom',
    LEFT: 'left',
    RIGHT: 'right'
}

class BlockCollisions {
    constructor (blockMatrix) {
        this.blocks = new BlockResolver(blockMatrix);
    }


    checkForX (onScreenObject) {
        let xPosition;
        if (onScreenObject.velocity.x > 0) {
            xPosition = onScreenObject.hitbox.right;
        } else if (onScreenObject.velocity.x < 0) {
            xPosition = onScreenObject.hitbox.left;
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
            if (onScreenObject.velocity.x > 0) {    // Triggered when a character hits the right side of a block
                if (onScreenObject.hitbox.right > match.x1) { 
                    onScreenObject.obstruct(BLOCKSIDES.LEFT, match); // If you hit the right of the block you want to obstruct the character from the left
                }
            } else if (onScreenObject.velocity.x < 0) { // Triggered when a character hits the left side of a block
                if (onScreenObject.hitbox.left < match.x2) { 
                    onScreenObject.obstruct(BLOCKSIDES.RIGHT, match); // If you hit the left of the block you want to obstruct the character from the right
                }
            }
        })
    }


    checkForY (onScreenObject) {
        let yPosition;
        if (onScreenObject.velocity.y > 0) {
            yPosition = onScreenObject.hitbox.bottom;
        } else if (onScreenObject.velocity.y < 0) {
            yPosition = onScreenObject.hitbox.top;
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

            if (onScreenObject.velocity.y > 0) {    // Triggered when a character hits the top side of a block
                if (onScreenObject.hitbox.bottom > match.y1) { 
                    onScreenObject.obstruct(BLOCKSIDES.BOTTOM, match); // If you hit the top of the block you want to obstruct the character from the bottom
                }
            } else if (onScreenObject.velocity.y < 0) { // Triggered when a character hits the bottom side of a block
                if (onScreenObject.hitbox.top < match.y2) { 
                    onScreenObject.obstruct(BLOCKSIDES.TOP, match);    // If you hit the bottom of the block you want to obstruct the character from the top
                }
            }
        })
    }
}


export default BlockCollisions;