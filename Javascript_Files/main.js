"use strict";
// Class Imports
import Camera from "./Classes/Camera.js";
import Timer from "./Classes/timer.js";

// Character Imports
import loadMario from "./Characters/mario.js";
import loadGoomba from "./Characters/goomba.js";
import loadKoopa from "./Characters/koopa.js";

//Javascript File imports
import loadLevel from "./LoadFunctions/loadLevel.js"
import { createCameraLayer, createCollisionLayer } from "./drawTheLayers.js";
import { userInput } from "./userInput.js";
import mouseControl from "./mouseDebugger.js";

const canvas = document.getElementById("gameScreen");
const context = canvas.getContext("2d");

const camera = new Camera();

Promise.all([   // Will make the Spritesheet and world textures load at the same time instead of one after another
    loadLevel('1-1'),
    loadMario(),
    loadGoomba(),
    loadKoopa()
]).then(([level, createMario, createGoomba, createKoopa]) => {   // The image parameter is what is returned from the loadBackgroundSprites() function. The level parameter is what is returned from the loadLevel() function

    
    const mario = createMario;
    level.objects.add(mario);

    const goomba = createGoomba;
    level.objects.add(goomba)

    const koopa = createKoopa;
    level.objects.add(koopa)

    level.layer.imageLayers.push(
        createCollisionLayer(level),
        createCameraLayer(camera)
    );
    
    const input = userInput(mario);

    mouseControl(canvas, mario, camera)

    input.keyboardEventListener(window)

    

    const marioTimer = new Timer(1/60);

    marioTimer.updateMario = (refreshRate) => {
        level.updateLevel(refreshRate);
        level.layer.drawTheLayer(context, camera);

        if (mario.position.x > 100) {
        camera.position.x = mario.position.x - 100;
    }
    }

    marioTimer.startTimer();
})