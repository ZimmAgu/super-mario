"use strict";

// Class Imports
import Level from "../Classes/Level.js";
import OnScreenObject from "../Classes/OnScreenObjects.js";

// Draw the Layers Function
import  drawBackground  from "../DrawTheLayers/drawBackground.js";
import  drawSpriteLayer  from "../DrawTheLayers/drawSpriteLayer.js";

// Load Function Imports
import {createCollisionGrid, createBackgroundGrid} from "./createGrids.js"
import loadJSON from "./loadJSON.js";
import loadMusicSet from "./loadMusicSet.js";
import loadSpriteSet from "./loadSpriteSet.js";

// Trait Imports
import Solid from "../Traits/Solid.js";
import Trigger from "../Traits/Trigger.js";


function loadLevel (levelName, characterSpawner) {    // Loads the current levels from the requested JSON file in the GameLevels folder. The level is determined the parameter
    return loadJSON(`/GameLevels/${levelName}.json`)
                .then(levelSpecification => Promise.all([
        levelSpecification,
        loadSpriteSet(levelSpecification.spriteSetName),
        loadMusicSet(levelSpecification.musicSetName)
    ]))
    .then(([levelSpecifications, backgroundSprites, musicPlayer]) => {
        const currentLevel = new Level();
        currentLevel.name = levelName.toString();
        currentLevel.music.setPlayer(musicPlayer);

        loadCollisionGrid(currentLevel, levelSpecifications);
        loadLevelBackground(currentLevel, levelSpecifications, backgroundSprites);
        drawCharacters(currentLevel, levelSpecifications, characterSpawner);
        setupTriggers (currentLevel, levelSpecifications);
        currentLevel.music.playMainTheme()

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
        level.layeredImages.imageLayers.push(backgroundLayer);    // Adds the background image to the array of layers
    })
}



function drawCharacters (level, levelSpecs, characterSpawner) {


    levelSpecs.characters.forEach(character => {
        const name = character.name;            // Assigns the name property of the character to the name of the character 
        const position = character.position;    // Assings the position property of the character to the position array given in the json file
        const [x, y] = position;                // Destructures the position array inter individual x, y values


        const newCharacter = characterSpawner[name];

        newCharacter.position.setVector(x, y);

        level.objects.add(newCharacter);
    })

    const characterDrawings = drawSpriteLayer(level.objects); // Draws mario to the screen
    level.layeredImages.imageLayers.push(characterDrawings);  // Adds mario to the array of layers
}


function setupTriggers (level, levelSpecs) {
    if (!levelSpecs.triggers) {
        return;
    }
    
    for (const triggerSpecs of levelSpecs.triggers) {
        const object = createTrigger()
        
        object.trigger.conditions.push((object, touches, gc, level) => {
            level.events.emit(Level.EVENT_TRIGGER, triggerSpecs, object, touches);
        });
        
        
        object.size.setVector(200, 300);
        object.position.setVector(triggerSpecs.position[0], triggerSpecs.position[1]);
        level.objects.add(object);
    }
}

function createTrigger() {
    const object = new OnScreenObject();
    object.addTrait(new Trigger());
    object.addTrait(new Solid());
    return object;
}

export default loadLevel;