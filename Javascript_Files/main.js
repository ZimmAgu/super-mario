"use strict";
// Class Imports
import Camera from "./Classes/Camera.js";
import SoundBoard from "./Classes/SoundBoard.js";
import Timer from "./Classes/timer.js";

// Draw The Layers Imports
import drawCameraLayer from "./DrawTheLayers/drawCameraLayer.js"
import drawCollisionLayer from "./DrawTheLayers/drawCollisionLayer.js"
import drawDashboardLayer from "./DrawTheLayers/drawDashboardLayer.js";

// Load Function Imports
import loadAudio from "./LoadFunctions/loadAudio.js";
import loadCharacters from "./LoadFunctions/loadCharacters.js";
import loadLevel from "./LoadFunctions/loadLevel.js"
import loadFont from "./LoadFunctions/loadFont.js";
import loadSoundBoard from "./LoadFunctions/loadSoundBoard.js";


//Javascript File imports
import { userInput } from "./userInput.js";
import createSpawnPoint from "./spawnPoint.js";
import mouseControl from "./mouseDebugger.js";



const canvas = document.getElementById("gameScreen");
const context = canvas.getContext("2d");


const camera = new Camera();                // Class that deals with showing what the user sees on screen
const audioContext = new AudioContext();    // high-level JavaScript API for processing and synthesizing audio in web applications 
const marioTimer = new Timer(1/60);         // Class that deals with real time




async function main () {
    const [characterSpawner, font] = await Promise.all([ 
        loadCharacters(audioContext),
        loadFont(),
        loadSoundBoard('marioSoundEffects', audioContext)
    ]);

    const level = await loadLevel('1-1', characterSpawner); // Loads the current level that the user will be playing in

    const mario = characterSpawner.mario;   // Adds mario to the level
    level.objects.add(mario);

    const spawnPoint = createSpawnPoint(mario); // Adds the spawn point of mario to the level as an object
    level.objects.add(spawnPoint);


    level.layer.imageLayers.push(  
        drawCollisionLayer(level),
        drawCameraLayer(camera)
    );

    const input = userInput(mario); // These are the keyboard controls that the user will use to control mario
    input.keyboardEventListener(window);

    mouseControl(canvas, mario, camera);

    


    marioTimer.updateMario = (refreshRate) => {
        level.updateLevel(refreshRate);     // Constantly updates the level
        level.layer.drawTheLayer(context, camera);

        drawDashboardLayer(
                            font, 
                            context, 
                            spawnPoint.playerControl.countdown,
                            mario.stomp.score
                        );

        camera.position.x = Math.max(0, mario.position.x - 100);
    }

    marioTimer.startTimer();
}

const start = () => {
    window.removeEventListener('click', start);
    main(); 
}

window.addEventListener('click', start)


