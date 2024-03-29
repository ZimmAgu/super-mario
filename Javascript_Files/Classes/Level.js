"use strict";

import { findPlayers } from "../playerSpawn.js";
// Class Imports
import BlockCollisions from "./BlockCollisions.js";
import Camera from "./Camera.js";
import CharacterCollisions from "./CharacterCollisions.js";
import LayeredImages from "./LayerTheImages.js";
import MusicController from "./MusicController.js";

// Scene Imports
import Scene from "../Scenes/Scene.js";

class Level extends Scene {
    static EVENT_TRIGGER = Symbol('trigger');

    constructor () {
        super();
        this.name = '';
        this.gravity = 1500;
        this.totalTime = 0;
        this.countdown = 400;
        this.camera = new Camera();
        this.music = new MusicController();

        this.objects = new Set(); // Sets are like maps but they don't allow duplicates to be added to it
        
        this.characterCollisions = new CharacterCollisions(this.objects);
        this.blockCollisions = null;

    }

    setCollisionGrid (matrix) {
        this.blockCollisions = new BlockCollisions(matrix)
    }

    drawLevel (gameContext) {
        this.layeredImages.drawTheLayers(gameContext.context, this.camera);
    }

    updateLevel (gameContext) {
        this.objects.forEach(object => {
            object.updateTrait(gameContext.refreshRate, this);

            object.position.x += (object.velocity.x * gameContext.refreshRate);

            this.blockCollisions.checkForX(object);
            

            object.position.y += (object.velocity.y * gameContext.refreshRate);

            this.blockCollisions.checkForY(object);
            


            object.velocity.y += (this.gravity * gameContext.refreshRate);
        })

      

        this.objects.forEach(object => {
            this.characterCollisions.checkForCharacter(object); // All of the character collisions need to be updated at the same time so this was moved to a seperate loop
        })

        this.objects.forEach(object => {
            object.finalize();  // All of the task it the Traits queue are ran at this moment
        })

        focusCameraOnPlayer(this);

        this.totalTime += gameContext.refreshRate;
    }

    pauseMusic () {
        this.music.pauseAllMusic()
    }

}



function focusCameraOnPlayer (level) {
    for (const player of findPlayers(level)) {
        level.camera.position.x = Math.max(0, player.position.x - 100);
    }
}

export default Level;