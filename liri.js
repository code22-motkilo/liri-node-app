// liri-hmwrk-app

require("dotenv").config();

// required to import the spotify api keys
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

//load the fs package to read/write
var fs = require("fs");

// var for liri command
var action = process.argv[2];

// direct which function to run
switch (action) {
  case "concert-this":
    concertThis();
    break;
  
  case "spotify-this-song":
    spotifyThis();
    break;

  case "movie-this": 
    movieThis();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;
}

// concert functionality
function concertThis() {

  // define index 3 of process.argv
  var searchParam = process.argv[3];

  // require the axios
  var axios = require("axios");

  // make the api call and return the reqwuested info
  axios.get("https://rest.bandsintown.com/artists/" + searchParam + "/events?app_id=codingbootcamp")
  .then(
    function(response) {
      console.log('\n=====================================================================');
      console.log('LIRI "CONCERT THIS" RESULTS FOR: ' + searchParam);
      console.log('---------------------------------------------------------------------');
      //console.log("concert-this function working...");
      // Name of the venue
      //console.log(searchParam + " is playing at: ")
      console.log("Venue: " + response.data[0].venue.name);
      
      // Venue Location
      console.log("Location: " + response.data[0].venue.city + ", "+ response.data[0].venue.region);

      // Date of the event
      console.log("Date: " + response.data[0].datetime);
      console.log('=======================================================================');
    }
  );
}


function spotifyThis() {
  console.log("Spotify function is still being built...");

  
}

function movieThis() {
  console.log("Movie This function is still being built...");

  /*  GEt results for this info:
         * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
  */

  // require the axios package
  var axios = require('axios');
  // get the argumnets from th CLI
  var nodeArgs = process.argv;
  // empty variable that will hoold the movie title to search
  var movieTitle = "";
  // loop-magic to get the movie title if more than one word
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      movieTitle = movieTitle + '+' + nodeArgs[i];
    }
    else {
      movieTitle += nodeArgs[i];
    }
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";
  //console test the url
  console.log(queryUrl);

  axios.get(queryUrl)
  .then(function(response) {
    console.log("movie-this is working....");
    
    console.log('\n=====================================================================');
    console.log('LIRI "MOVIE THIS" RESULTS FOR: ' + response.data.Title);
    console.log('---------------------------------------------------------------------');
    console.log("Release Year: " + response.data.Year);
    console.log("IMDB Rated: "+ response.data.Rated);
    console.log("Rotten-Tomtoes Rating: " + response.data.Ratings[1].Value);
    console.log("Made In: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Synopsis: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
    console.log('=====================================================================');
    console.log("\n");
  });


}

function doWhatItSays() {
  console.log("Do What It Says function is still being built...");

}

