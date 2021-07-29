
function mouseControl (canvas, object, camera) {
    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons == 1) {
                object.velocity.setVector(0, 0);
                object.position.setVector(
                                event.offsetX + camera.position.x, 
                                event.offsetY + camera.position.y
                            );
            }
        })
    })
}

export default mouseControl;