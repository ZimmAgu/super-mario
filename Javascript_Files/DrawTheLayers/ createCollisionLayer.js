"use strict";

// Class Imports
import Matrix from "../Classes/Matrix.js";

function createCollisionLayer (level) {
    const blockResolver = level.blockCollisions.blocks;
    const blockSize = blockResolver.blockSize;

    const resolvedBlocks = new Matrix();
    const getByIndexOriginal = blockResolver.getByIndex;

    blockResolver.getByIndex = (column, row) => {
        resolvedBlocks.setMatrix(column, row, true);
        return getByIndexOriginal.call(blockResolver, column, row);
    }

    
   
    return (context, camera) => {   // Draws the outline of the hitbox
        context.strokeStyle = 'blue';

        resolvedBlocks.forEach((value, x, y) => {
            // context.beginPath();
            // context.rect(
            //     x * blockSize - camera.position.x, 
            //     y * blockSize - camera.position.y, 
            //     blockSize, 
            //     blockSize);
            // context.stroke();
        });
        resolvedBlocks.clear();

        level.objects.forEach(onScreenObject => {
            // context.strokeStyle = 'green';
            // context.beginPath();

            // context.rect(
            //             onScreenObject.position.x - camera.position.x, 
            //             onScreenObject.position.y - camera.position.y, 
            //             onScreenObject.size.x,
            //             onScreenObject.size.y
            //         );

            // context.stroke();
        })
    };
}

export default createCollisionLayer;