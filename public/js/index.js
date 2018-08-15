// Define HTML elements as JQuery objects

// The API object contains methods for each kind of request we'll make
var API = {

};
var elem1 = document.getElementById("miniButtonGlass1")
var elem2 = document.getElementById("miniButtonGlass2")
var elem3 = document.getElementById("miniButtonGlass3")

function getPokemon() {
    console.log("workign");
    document.getElementById("pokeInfo").value = document.getElementById("textbox").value;
    elem2.classList.toggle("yellowlight");
    elem3.classList.toggle("greenlight");
}
// Connect buttons to listeners