// Define HTML elements as JQuery objects\
var elem1 = document.getElementById("miniButtonGlass1");
var elem2 = document.getElementById("miniButtonGlass2");
var elem3 = document.getElementById("miniButtonGlass3");
var signInModal = document.getElementById('signInModal');
var startBtn = document.getElementById("barbutton1");
var signInSpan = document.getElementsByClassName("close")[0];
var signInForm = $("#signIn");
var synth = window.speechSynthesis;
var pitchValue = 1.2;
var rateValue = 1;
var voices = [];

// The API object contains methods for each kind of request we'll make
var API = {
    home: window.location.origin,
    searchForPokemon: function (str) {
        window.location.href = this.home + "/" + str;
    },
    isLoggedIn: function () {
        return $.ajax({
            url: "/api/user_data",
            type: "GET"
        });
    }
};

document.addEventListener("DOMContentLoaded", function () {
    voices = synth.getVoices();
    // console.log(voices);
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

signInForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
        name: $("#name").val().trim(),
        email: $("#email").val().trim(),
        password: $("#password").val().trim()
    };

    if (!userData.email || !userData.password) {
        return;
    }

    if (userData.name) {
        console.log("signing up");
        signUpUser(userData.name, userData.email, userData.password);
    } else {
        loginUser(userData.email, userData.password);
    }
    $("#email").val("");
    $("#password").val("");
    $("#name").val("");
});

// loginUser does a post to our "api/login" route and if successful, redirects us the the members page
function loginUser(email, password) {
    $.post("/api/login", {
        email: email,
        password: password
    }).then(function (data) {
        window.location.replace(data);
        // If there's an error, log the error
    }).catch(function (err) {
        console.log(err);
    });
}

function signUpUser(name, email, password) {
    $.post("/api/signup", {
        username: name,
        email,
        password
    }).then(function(data) {
        window.location.replace(data);
    });
}

$("#quit").on("click", function () {
    $.get("/logout").then((res) => {
        location.reload();
    })
});

// When the user clicks the button, open the modal 
startBtn.onclick = function () {
    // console.log("Clicked the blue button"); 
    API.isLoggedIn().then(function (res) {
        if (!res) {
            signInModal.style.display = "block";
        }
    });
}

// When the user clicks on <span> (x), close the modal
signInSpan.onclick = function () {
    signInModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == signInModal) {
        signInModal.style.display = "none";
    }
}
// Connect buttons to listeners