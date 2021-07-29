
function mouseControl (canvas, object, camera) {
    let previousEvent;
    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons == 1) { // Left click
                object.velocity.setVector(0, 0);
                object.position.setVector(
                                event.offsetX + camera.position.x, 
                                event.offsetY + camera.position.y
                            );
            } else if (event.buttons == 2 // Right clisk
                        && previousEvent && previousEvent.buttons === 2 
                        && previousEvent.type === 'mousemove') {
                camera.position.x -= event.offsetX - previousEvent.offsetY;
            }
            previousEvent = event;
        })
    })

    canvas.addEventListener('contextmenu', event => {
        event.preventDefault();
    });
}

export default mouseControl;