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
            if (onScreenObject.velocity.x > 0) {    // Right  of block
                if (onScreenObject.position.x + onScreenObject.size.x > match.x1) {
                    onScreenObject.position.x = match.x1 - onScreenObject.size.x;
                    onScreenObject.velocity.x = 0;

                    onScreenObject.obstruct(BLOCKSIDES.LEFT); // If you hit the right of the block you want to obstruct the character from the left
                }
            } else if (onScreenObject.velocity.x < 0) { // Left  of block
                if (onScreenObject.position.x < match.x2) {
                    onScreenObject.position.x = match.x2;
                    onScreenObject.velocity.x = 0;

                    onScreenObject.obstruct(BLOCKSIDES.RIGHT); // If you hit the left of the block you want to obstruct the character from the right
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

                    onScreenObject.obstruct(BLOCKSIDES.BOTTOM); // If you hit the top of the block you want to obstruct the character from the bottom
                }
            } else if (onScreenObject.velocity.y < 0) { // Bottom of block 
                if (onScreenObject.position.y < match.y2) {
                    onScreenObject.position.y = match.y2;
                    onScreenObject.velocity.y = 0;

                    onScreenObject.obstruct(BLOCKSIDES.TOP);    // If you hit the bottom of the block you want to obstruct the character from the top
                }
            }
        })
    }
}


export default BlockCollisions;