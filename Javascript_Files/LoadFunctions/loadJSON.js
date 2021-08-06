"use strict";

function loadJSON (url) {
    return fetch(url)
            .then(response  => response.json())
}

export default loadJSON;
