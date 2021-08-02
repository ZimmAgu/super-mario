
function createAnimation (allFrames, frameLength) {
    return (distance) => {
        const currentFrame = Math.floor(distance / frameLength)  % allFrames.length;
        const frames = allFrames[currentFrame];
        return frames 
    }
}

const marioRunningRight = createAnimation(
    [
        'normal mario run right 1',
        'normal mario run right 2',
        'normal mario run right 3'
    ], 
    10
);

const marioRunningLeft = createAnimation(
    [
        'normal mario run left 1',
        'normal mario run left 2',
        'normal mario run left 3'
    ],
    10
);


export { marioRunningRight, marioRunningLeft };