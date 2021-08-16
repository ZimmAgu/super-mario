"use strict";
// Class Imports
import Camera from "./Classes/Camera.js";
import SceneRunner from "./Scenes/SceneRunner.js"
import SoundBoard from "./Classes/SoundBoard.js";
import Timer from "./Classes/timer.js";

// Draw The Layers Imports
import drawCameraLayer from "./DrawTheLayers/drawCameraLayer.js"
import drawCollisionLayer from "./DrawTheLayers/drawCollisionLayer.js"
import drawDashboardLayer from "./DrawTheLayers/drawDashboardLayer.js";
import drawStatusScreen from "./DrawTheLayers/drawStatusScreen.js";

// Load Function Imports
import loadCharacters from "./LoadFunctions/loadCharacters.js";
import loadLevel from "./LoadFunctions/loadLevel.js"
import loadFont from "./LoadFunctions/loadFont.js";
import loadSoundBoard from "./LoadFunctions/loadSoundBoard.js";


//Javascript File imports
import { userInput } from "./userInput.js";
import {createSpawnPoint, createCurrentPlayer} from "./playerSpawn.js";
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


        // const enemies = [
        //     characterSpawner.goomba1, 
        //     characterSpawner.goomba2, 
        //     characterSpawner.goomba3, 
        //     characterSpawner.goomba4,
        //     characterSpawner.goomba5, 
        //     characterSpawner.goomba6,
        //     characterSpawner.koopa1,
        //     characterSpawner.koopa2,
        //     characterSpawner.koopa3,
        //     characterSpawner.koopa4,
        // ]

    

        const level = await loadLevel("1-1", characterSpawner); // Loads the current level that the user will be playing in
        const sceneRunner = new SceneRunner();
        
        const mario = createCurrentPlayer(characterSpawner.mario);   // Adds mario to the level
        mario.player.name = "Mario";
        level.objects.add(mario);

        const spawnPoint = createSpawnPoint(mario); // Adds the spawn point of mario to the level as an object
        level.objects.add(spawnPoint);
        // spawnPoint.playerControl.setEnemies(enemies);
        

        sceneRunner.addScene(level);
        level.layeredImages.imageLayers.push(  
            drawCollisionLayer(level),
            drawCameraLayer(camera),
            drawDashboardLayer(font, level),
        );

        const input = userInput(window); // These are the keyboard controls that the user will use to control mario
        input.addReceiver(mario);

        // mouseControl(canvas, mario, camera); 
    

    
        const gameContext = {
            audioContext,
            context,
            characterSpawner,
            refreshRate: null,
        };


        marioTimer.updateMario = (refreshRate) => {
            gameContext.refreshRate = refreshRate
            sceneRunner.updateScene(gameContext);

            // drawStatusScreen(font, context, level.name, mario); 

            camera.position.x = Math.max(0, mario.position.x - 100);
        }

        marioTimer.startTimer();
        sceneRunner.runNext();
        //  window.runLevel = runLevel;
}

main();
// const start = () => {
//     window.removeEventListener('click', start);
    
// };

// context.fillStyle = "white";
// context.font = "32px Arial";
// context.fillText("Super Mario", 150, 50);
// context.fillText("Click To Start", 150, 200);

// window.addEventListener('click', start);




