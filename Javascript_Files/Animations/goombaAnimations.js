"use strict";
import { createAnimation } from "./createAnimation.js";



const goombaWalking = createAnimation(
    [
        "goomba walking right",
        "goomba walking left",
    ],
    0.2
);


function routeGoombaFrame (object) {
    if (object.ableToDie.isDead == true) {
        return 'squashed goomba'
    }

    return goombaWalking(object.lifetime);
}

export { routeGoombaFrame };

