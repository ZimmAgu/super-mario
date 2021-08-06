"use strict";

// Class Imports
import Matrix from "../Classes/Matrix.js";

// Load function Imports
import loadTheBlocks from "./loadTheBlocks.js";


function createCollisionGrid (blocks, patterns) {
    const grid = new Matrix();
    

    for (const {block, x, y} of loadTheBlocks(blocks, patterns)) {
        grid.setMatrix(x, y, {
            type: block.type
        })
    }

    return grid;
}


function createBackgroundGrid (blocks, patterns) {
    const grid = new Matrix();
    

    for (const {block, x, y} of loadTheBlocks(blocks, patterns)) {
        grid.setMatrix(x, y, {
            name: block.name
        })
    }

    return grid;
}


export { createCollisionGrid, createBackgroundGrid };
