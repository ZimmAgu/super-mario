"use strict";

// Class Imports
import OnScreenObject from "./Classes/OnScreenObjects.js"

// Trait Imports
import PlayerControl from "./Traits/PlayerControl.js"

function createSpawnPoint (player) {
    const spawnPoint = new OnScreenObject();
    spawnPoint.position.setVector(0,0);
    spawnPoint.size.setVector(32, 32);

    const playerControl = new PlayerControl();
    playerControl.checkPoint.setVector(0, 0);

    playerControl.setPlayer(player);
    
    spawnPoint.addTrait(playerControl);

    return spawnPoint;
}

export default createSpawnPoint;