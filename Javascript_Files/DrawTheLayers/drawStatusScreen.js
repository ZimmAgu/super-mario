"use strict";



function drawStatusScreen (font, context, levelName) {

    font.printWord("WORLD", context, font.size * 11, font.size * 9);
    font.printWord(levelName, context, font.size * 17, font.size * 9);
}

export default drawStatusScreen;