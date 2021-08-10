"use strict";

function drawDashboardLayer (font, context) {
    font.drawTheSprite("M", context, 0, 0);
    font.drawTheSprite("A", context, 16, 0);
    font.drawTheSprite("R", context, 32, 0);
    font.drawTheSprite("I", context, 48, 0);
    font.drawTheSprite("O", context, 64, 0);
}

export default drawDashboardLayer;