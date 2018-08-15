// Define HTML elements as JQuery objects\
var elem1 = document.getElementById("miniButtonGlass1");
var elem2 = document.getElementById("miniButtonGlass2");
var elem3 = document.getElementById("miniButtonGlass3");
var synth = window.speechSynthesis;
var pitchValue = 1.2;
var rateValue = 1;
var voices = [];

// The API object contains methods for each kind of request we'll make
var API = {
    home: window.location.origin,
    searchForPokemon: function (str) {
        window.location.href = this.home + "/" + str;
    }
};

document.addEventListener("DOMContentLoaded", function () {
    voices = synth.getVoices();
    console.log(voices);
    var utterThis = new SpeechSynthesisUtterance(document.getElementById("pokemon-name").textContent);

    var selectedOption = "Google UK English Male";
    for (i = 0; i < voices.length; i++) {
        if (voices[i].name === selectedOption) {
            utterThis.voice = voices[i];
        }
    }
    utterThis.pitch = pitchValue;
    utterThis.rate = rateValue;
    synth.speak(utterThis);
});

function getPokemon() {
    let search = document.getElementById("textbox").value.toLowerCase().replace(/[^a-z]/, "");

    API.searchForPokemon(search);
}
// Connect buttons to listeners