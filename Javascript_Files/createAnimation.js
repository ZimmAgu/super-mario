"use strict";

function createAnimation (allFrames, frameLength) {     // Will be used to create animations for all of the characters
    return (distance) => {
        const currentFrame = Math.floor(distance / frameLength)  % allFrames.length;
        const frames = allFrames[currentFrame];
        return frames ;
    }
}


export { createAnimation };