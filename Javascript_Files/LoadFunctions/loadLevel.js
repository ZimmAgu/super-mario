"use strict";

// Class Imports
import Level from "../Classes/Level.js";

// Javascript File Imports
import { drawBackground } from "../drawTheLayers.js";
import { drawSpriteLayer } from "../drawTheLayers.js";

// Load Function Imports
import {createCollisionGrid, createBackgroundGrid} from "./createGrids.js"
import loadJSON from "./loadJSON.js";
import loadSpriteSheet from "./loadSpriteSheet.js";

function loadLevel (levelName) {    // Loads the current levels from the requested JSON file in the GameLevels folder. The level is determined the parameter
    return loadJSON(`/GameLevels/${levelName}.json`)
                .then(levelSpecification => Promise.all([
        levelSpecification,
        loadSpriteSheet(levelSpecification.spriteSetName)    
    ]))
    .then(([levelSpecifications, backgroundSprites]) => {
        const currentLevel = new Level();

        loadCollisionGrid(currentLevel, levelSpecifications);
        loadLevelBackground(currentLevel, levelSpecifications, backgroundSprites);
        drawMarioOnLevel(currentLevel);

        return currentLevel;
    })
}




function loadCollisionGrid (level, levelSpecs) {
    const mergedBlocks = levelSpecs.layers.reduce((mergedBlocks, layespecifications) => {
        return mergedBlocks.concat(layespecifications.blocks)
    }, [])
    
    const collisionGrid = createCollisionGrid(mergedBlocks, levelSpecs.patterns);
    level.setCollisionGrid(collisionGrid);
}




function loadLevelBackground (level, levelSpecs, sprites) {
    levelSpecs.layers.forEach(layer => {
        const backgroundGrid = createBackgroundGrid(layer.blocks, levelSpecs.patterns);
        const backgroundLayer = drawBackground(level, backgroundGrid, sprites);
        level.layer.imageLayers.push(backgroundLayer);    // Adds the background image to the array of layers
    })
}



function drawMarioOnLevel (level) {
    const marioDrawing = drawSpriteLayer(level.objects); // Draws mario to the screen
    level.layer.imageLayers.push(marioDrawing);  // Adds mario to the array of layers
}

export default loadLevel;