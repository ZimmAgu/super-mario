"use strict";

function loadAudio (url, context) {
    return fetch(url)
        .then(response  => {
            return response.arrayBuffer();
    })
    .then(arrayBuffer => {
        return context.decodeAudioData(arrayBuffer);
    })
}

export default loadAudio;