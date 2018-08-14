//require image-scraper to pull images from source (requires npm install image-scraper)
//image-scraper uses cheerio.js
var Scraper = require("image-scraper");
var mysql = require("mysql");
var fs = require("fs");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "pokemon_db"
});

connection.query("SELECT id, name FROM pokemon WHERE id BETWEEN 1 AND 151", function (err, data) {
    var saved = [];
    data.forEach((pokemon) => {
        // console.log(pokemon.id);
        urlId = pokemon.id.toString();
        if (urlId.length === 2) {
            urlId = "0" + urlId;
        } else if (urlId.length === 1) {
            urlId = "00" + urlId;
        }
        // console.log(urlId);
        var name = pokemon.name;

        if (name.slice(-1) === "?") {
            name = name.substring(0, name.length - 1);
        }

        name = name.replace(" ", "_");
        name = name.replace("'", "%27");

        // console.log("Name: " + name);
        var filename = urlId + name;

        var scrapeUrl = "https://bulbapedia.bulbagarden.net/wiki/File:" + filename + ".png";
        console.log(scrapeUrl);
        var scraper = new Scraper(scrapeUrl);

        //Scrape function serches for specific image files with 600px           
        scraper.scrape(function (image) {

            // console.log("image found");
            if (saved.indexOf(image.name) === -1 && (image.name === filename || image.name.substring(0, 3) === "600")) {
                saved.push(image.name);
                image.saveTo = "C:/Users/Tartarus/Desktop/uofa/Tools/scraper/imgs/";
                image.save();
                // console.log(image.name);
                //appends image file and link address to folder 
                fs.appendFile("urls.txt", image.address + "\n", function (err) {
                    if (err) throw err;
                    // console.log("Saved!");
                });
                console.log(saved.length);
            }
        });
    });
});

