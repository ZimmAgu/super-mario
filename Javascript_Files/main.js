"use strict";
// Class Imports
import Camera from "./Classes/Camera.js";
import Timer from "./Classes/timer.js";

// Draw The Layers Imports
import drawCameraLayer from "./DrawTheLayers/drawCameraLayer.js"
import drawCollisionLayer from "./DrawTheLayers/drawCollisionLayer.js"
import drawDashboardLayer from "./DrawTheLayers/drawDashboardLayer.js";

// Load Function Imports
import loadCharacters from "./LoadFunctions/loadCharacters.js";
import loadLevel from "./LoadFunctions/loadLevel.js"
import loadFont from "./LoadFunctions/loadFont.js";


//Javascript File imports
import { userInput } from "./userInput.js";
import createSpawnPoint from "./spawnPoint.js";
import mouseControl from "./mouseDebugger.js";



const canvas = document.getElementById("gameScreen");
const context = canvas.getContext("2d");

const camera = new Camera();



async function main () {
    const [characterSpawner, font] = await Promise.all([ 
        loadCharacters(),
        loadFont()
    ]);


    const level = await loadLevel('1-1', characterSpawner);

    const mario = characterSpawner.mario;
    level.objects.add(mario);

    const spawnPoint = createSpawnPoint(mario);
    level.objects.add(spawnPoint);



    level.layer.imageLayers.push(
        drawCollisionLayer(level),
        drawCameraLayer(camera)
    );

    const input = userInput(mario);

    mouseControl(canvas, mario, camera)

    input.keyboardEventListener(window)

    const marioTimer = new Timer(1/60);

    marioTimer.updateMario = (refreshRate) => {
        level.updateLevel(refreshRate);     // Constantly updates the level
        level.layer.drawTheLayer(context, camera);

        drawDashboardLayer(font, context, spawnPoint.playerControl.countdown);

        camera.position.x = Math.max(0, mario.position.x - 100);
    }

    marioTimer.startTimer();
}

main();
