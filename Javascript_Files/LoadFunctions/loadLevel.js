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


function loadLevel (levelName, characterSpawner) {    // Loads the current levels from the requested JSON file in the GameLevels folder. The level is determined the parameter
    return loadJSON(`/GameLevels/${levelName}.json`)
                .then(levelSpecification => Promise.all([
        levelSpecification,
        loadSpriteSheet(levelSpecification.spriteSetName)    
    ]))
    .then(([levelSpecifications, backgroundSprites]) => {
        const currentLevel = new Level();

        loadCollisionGrid(currentLevel, levelSpecifications);
        loadLevelBackground(currentLevel, levelSpecifications, backgroundSprites);
        drawCharacters(currentLevel, levelSpecifications, characterSpawner);

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



function drawCharacters (level, levelSpecs, characterSpawner) {

    levelSpecs.characters.forEach(character => {
        const name = character.name;            // Assigns the name property of the character to the name of the character 
        const position = character.position;    // Assings the position property of the character to the position array given in the json file
        const [x, y] = position                 // Destructures the position array inter individual x, y values


        const newCharacter = characterSpawner[name]

        newCharacter.position.setVector(x, y);

        level.characters.add(newCharacter)
    })

    const characterDrawings = drawSpriteLayer(level.characters); // Draws mario to the screen
    level.layer.imageLayers.push(characterDrawings);  // Adds mario to the array of layers
}

export default loadLevel;