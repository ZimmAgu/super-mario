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

        const mergedBlocks = levelSpecifications.layers.reduce((mergedBlocks, layespecifications) => {
            return mergedBlocks.concat(layespecifications.blocks)
        }, [])
        
        const collisionGrid = createCollisionGrid(mergedBlocks, levelSpecifications.patterns);
        currentLevel.setCollisionGrid(collisionGrid);


       
        levelSpecifications.layers.forEach(layer => {
            const backgroundGrid = createBackgroundGrid(layer.blocks, levelSpecifications.patterns);
            const backgroundLayer = drawBackground(currentLevel, backgroundGrid, backgroundSprites);
            currentLevel.layer.imageLayers.push(backgroundLayer);    // Adds the background image to the array of layers
        })
        
    
        const marioDrawing = drawSpriteLayer(currentLevel.objects); // Draws mario to the screen
        currentLevel.layer.imageLayers.push(marioDrawing);  // Adds mario to the array of layers

        return currentLevel;
    })
}

export default loadLevel;