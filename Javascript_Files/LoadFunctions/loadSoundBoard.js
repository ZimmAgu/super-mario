"use strict";

// Class Imports
import SoundBoard from "../Classes/SoundBoard.js"

// Load Function Imports
import loadAudio from "./loadAudio.js"
import loadJSON from "./loadJSON.js";

// const audioContext = new AudioContext();    // high-level JavaScript API for processing and synthesizing audio in web applications 
// const soundBoard = new SoundBoard(audioContext);



function loadSoundBoard (fileName, audioContext) {
    const soundBoard = new SoundBoard(audioContext);

    return loadJSON(`SoundFX/${fileName}.json`) // Parses JSON file
        .then (audioSheet => {
            const soundEffects = audioSheet.soundFX
            const listOfSounds = [];

            Object.keys(soundEffects).forEach(name => {
                const url = soundEffects[name].url;

                const sound = loadAudio(url, audioContext)
                                .then(audioFile => {
                                    soundBoard.addAudio(name, audioFile);
                                })
                                

                listOfSounds.push(sound);
            })

            return Promise.all(listOfSounds).then(() => soundBoard) // Returns a soundBoard with all of the sounds from the JSON file ready to play
    })
}

export default loadSoundBoard;
