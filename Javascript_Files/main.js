"use strict";
// Class Imports
import Camera from "./Classes/Camera.js";
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


    

    async function runLevel (name) {
        const level = await loadLevel(name, characterSpawner); // Loads the current level that the user will be playing in
        
        
        
        const mario = characterSpawner.mario;   // Adds mario to the level
        level.objects.add(mario);

        const spawnPoint = createSpawnPoint(mario); // Adds the spawn point of mario to the level as an object
        level.objects.add(spawnPoint);


        level.layer.imageLayers.push(  
            drawCollisionLayer(level),
            drawCameraLayer(camera)
            
        );

        const input = userInput(window); // These are the keyboard controls that the user will use to control mario
        input.addReceiver(mario);

        // mouseControl(canvas, mario, camera); 

        

        
        marioTimer.updateMario = (refreshRate) => {

            level.updateLevel(refreshRate);     // Constantly updates the level

            if (level.levelCountdown > 0) {
                context.fillStyle = "black";
                context.fillRect(0, 0, canvas.width, canvas.height);
                
                drawDashboardLayer(
                    font, 
                    context, 
                    spawnPoint.playerControl.countdown,
                    mario.score,
                    level.name
                ); 

                drawStatusScreen(font, context, level.name, mario); 
            } else {
                level.layer.drawTheLayer(context, camera);

                drawDashboardLayer(
                                    font, 
                                    context, 
                                    spawnPoint.playerControl.countdown,
                                    mario.score,
                                    level.name
                                ); 
            }

            camera.position.x = Math.max(0, mario.position.x - 100);

            if (mario.ableToDie.isDead) {
                level.music.player.pauseTrack('main');
                level.music.player.playTrack('marioDeath');
            } else {
                level.music.player.pauseTrack('marioDeath');
                level.music.player.playTrack('main');
            }
        }

        marioTimer.startTimer();
        
    }

    // runLevel("1-1")
    window.runLevel = runLevel;
}


const start = () => {
    window.removeEventListener('click', start);
    main();
};

context.fillStyle = "white";
context.font = "32px Arial";
context.fillText("Super Mario", 25, 50);
context.fillText("Click To Start", 240, 200);

window.addEventListener('click', start);




