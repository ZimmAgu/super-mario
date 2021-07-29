"use strict";
// Class Imports
import Camera from "./Classes/Camera.js";
import Timer from "./Classes/timer.js";


//Javascript File imports
import createMario from "./createMario.js";
import { loadLevel } from "./loadFunctions.js";
import { createCollisionLayer } from "./drawTheLayers.js";
import { userInput } from "./userInput.js";
import mouseControl from "./mouseDebugger.js";

const canvas = document.getElementById("gameScreen");
const context = canvas.getContext("2d");

const camera = new Camera();
window.camera = camera;

Promise.all([   // Will make the Spritesheet and world textures load at the same time instead of one after another
    loadLevel('1-1'),
    createMario()
]).then(([level, mario]) => {   // The image parameter is what is returned from the loadBackgroundSprites() function. The level parameter is what is returned from the loadLevel() function

    level.objects.add(mario);
    
    level.layer.imageLayers.push(createCollisionLayer(level));
    
    const input = userInput(mario);

    mouseControl(canvas, mario, camera)

    input.keyboardEventListener(window)


    const marioTimer = new Timer(1/60);

    marioTimer.updateMario = (refreshRate) => {
        level.updateLevel(refreshRate);
        level.layer.drawTheLayer(context, camera);
    }

    marioTimer.startTimer();
})