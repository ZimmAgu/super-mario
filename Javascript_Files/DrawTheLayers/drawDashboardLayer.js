"use strict";

function drawDashboardLayer (font, context) {
    font.printWord("MARIO", context, 32, 16);
    font.printWord("WORLD", context, 256, 16);
    font.printWord("TIME", context, 384, 16);
}

export default drawDashboardLayer;