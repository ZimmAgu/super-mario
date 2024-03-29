"use strict";
import { createAnimation } from "./createAnimation.js";


const marioRunningRight = createAnimation(
    [
        'normal mario run right 1',
        'normal mario run right 2',
        'normal mario run right 3'
    ], 
    12
);

const marioRunningLeft = createAnimation(
    [
        'normal mario run left 1',
        'normal mario run left 2',
        'normal mario run left 3'
    ],
    12
);



function routeMarioFrame (object) {
    
    
    let sign = Math.sign(object.move.movementDirection)

    if (object.ableToDie.isDead) {  // If mario is dead, no other animation can run but the mario death animation
        return 'mario death';
    }

    if (object.ableToDie.isDead == false) {
        if (!object.jump.jumpIsReady && object.move.heading === 1) {        // If the user is in the air & facing right
            return 'jump facing right';
        }

        if (!object.jump.jumpIsReady && object.move.heading !== 1) {        // If the user is in the air & facing left
            return 'jump facing left';
        }

        if (object.move.movementDirection === -1 && object.velocity.x > 0) {  // Break animation runs if user abruptly turns left after going right
            return 'break facing left';
        }

        if (object.move.movementDirection === 1 && object.velocity.x < 0) { // Break animation runs if user abruptly turns right  after going left
            return 'break facing right';
        }

        if (object.move.movementDirection !== 0 && sign === 1) {         // Mario running animation loops when user presses and holds the button to go right
            return marioRunningRight(object.move.distance);
        } 

        if (object.move.movementDirection !== 0 && sign === -1) {        // Mario running animation loops when user presses and holds the button to go left
            return marioRunningLeft(object.move.distance);
        }

        if (object.ableToDie.isDead) {
            console.log('death animation here');
            return 'mario death';
        }


        if (object.move.heading === 1) {

            if (object.velocity.x > 0) {
                return marioRunningRight(object.move.distance); // Mario will take a couple of extra steps before stopping completely
            }

            return 'normal mario idle right'
        } else {
            if (object.velocity.x < 0) {
                return marioRunningLeft(object.move.distance); // Mario will take a couple of extra steps before stopping completely
            }
            return 'normal mario idle left'
        } 
    }


    
} 



export { routeMarioFrame }