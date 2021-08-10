"use strict";

const DASHBOARDLINES = {
    LINE1: 16,
    LINE2: 32
}

const SCORE = 96;
const scoreBoard = SCORE.toString().padStart(6, '0');



function drawDashboardLayer (font, context, countDown) {
    const time = Math.floor(countDown);
    const timeDisplay = time.toString().padStart(3, '0')

    font.printWord("MARIO", context, 32, DASHBOARDLINES.LINE1);
    font.printWord(scoreBoard, context, 32, DASHBOARDLINES.LINE2);


    font.printWord("WORLD", context, 256, DASHBOARDLINES.LINE1);


    font.printWord("TIME", context, 384, DASHBOARDLINES.LINE1);
    font.printWord(timeDisplay, context, 384, DASHBOARDLINES.LINE2);


}

export default drawDashboardLayer;