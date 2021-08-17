"use strict";

import {findPlayers} from "../playerSpawn.js"

function getCurrentPlayer (level) {
    for (const object of findPlayers(level)) {
        return object.player;
    }
}

const DASHBOARDLINES = {
    LINE1: 16,
    LINE2: 32
}

function createDashboardLayer (font, level) {
    
    
    return function drawDashboardLayer (context) {
        const currentPlayer = getCurrentPlayer(level)

        const scoreBoard = currentPlayer ? currentPlayer.score.toString().padStart(6, '0') : "0"; // If the level has a current player the current score is the score of the player. If the level does not have a player, then the current score it 0
        
        const time = Math.floor(level.countdown);
        const timeDisplay = time.toString().padStart(3, '0')

        font.printWord("MARIO", context, 32, DASHBOARDLINES.LINE1);
        font.printWord(scoreBoard, context, 32, DASHBOARDLINES.LINE2);

        font.printWord("@", context, 160, DASHBOARDLINES.LINE2);
        font.printWord("x00", context, 180, DASHBOARDLINES.LINE2);



        font.printWord("WORLD", context, 256, DASHBOARDLINES.LINE1);
        font.printWord(level.name, context, 256, DASHBOARDLINES.LINE2);


        font.printWord("TIME", context, 384, DASHBOARDLINES.LINE1);
        font.printWord(timeDisplay, context, 384, DASHBOARDLINES.LINE2);
    }


}

export default createDashboardLayer;