"use strict";

// Class Imports
import OnScreenObject from "./Classes/OnScreenObjects.js"

// Trait Imports
import PlayerControl from "./Traits/PlayerControl.js"

function createSpawnPoint (player) {
    const spawnPoint = new OnScreenObject();

    const playerControl = new PlayerControl();

    playerControl.setPlayer(player);
    
    spawnPoint.addTrait(playerControl);

    return spawnPoint;
}

export default createSpawnPoint;