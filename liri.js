//DotEnv
require('dotenv').config();
//Requests NPM
let request = require('request')
let fs = require('fs')
// let Twitter = require('twitter')
let Spotify = require('node-spotify-api')
let keys = require('./keys.js')
//let weather = require("weather-js");
// Retrieve the hidden env keys
let spotify = new Spotify(keys.spotify);
//console.log(spotify);
let weather = (keys.weather);
//console.log(weather.id);
//let client = new Twitter(keys.twitter);

// Twiiter API
//Should show the last 20 tweets and when they were created at in your terminal/bash window.
// function twitterRun(argTwo){
// client.get('favorites/list', function(error, tweets, response) {
//     if(error) throw error;
//     console.log(tweets);  // The favorites.
//     console.log(response);  // Raw response object.
//   });

// }
// Weather function with weather-js package
// function weatherRun(argTwo) {
//     weather.find({ search: argTwo - ' ' , degreeType: 'F'}, function(err, result) {
//         // If there is an error log it.
//         if (err) {
//           console.log(err);
//         }
//         console.log(JSON.stringify(result, null, 2));
//         console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
//         // Name of location
//         console.log('Location name: ' +result[0].location.name);
//         //Current Day
//         console.log('Today is: '+result[0].current.day);
//         //Current Temp
//         console.log('Current Temperature: '+result[0].current.temperature+result[0].location.degreetype);
//         //Feels Like
//         console.log('But it feels like: '+result[0].current.feelslike+result[0].location.degreetype);
//         //Humidity
//         console.log('The humidity is: '+result[0].current.humidity);
//         //Sky 
//         console.log('The sky is: '+result[0].current.skytext);
//         console.log('Have a wonderful day!');
//         console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
//       });

// }
// Weather Search function with requests
function weatherRun(argTwo) {
    // Create the Query URL
    let key = weather.id;
    let queryUrl = `http://api.openweathermap.org/data/2.5/weather?q=${argTwo}&appid=${key}`;
    //Request info from API using built URL and request
    request(queryUrl, function(err,response,body){
        // If error log it to the console.
        if(err){
            console.log('error: ',err);
        }
        //console.log(JSON.parse(body));
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
        // Name of location
        console.log('Location name: ' +JSON.parse(body).name);
        //Current Day
        console.log('The Weather Description is: '+JSON.parse(body).weather[0].description);
        //Current Temp
        console.log('Current Temperature: '+JSON.parse(body).main.temp+'C');
        //Humidity
        console.log('Current Humidity: '+JSON.parse(body).main.humidity);
        console.log('Have a wonderful day!');
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    })

}
//
//Spotify API
// Artist(s), The Song's name, a preview link of the song from Spotify, The album that the song is from.
// If no song is provided your program will use a default.
//Node spotify API
function spotifyRun(argTwo) {
spotify
  .search({ type: 'track', query: argTwo, limit:1 })
  .then(function(response) {
    //console.log(JSON.stringify(response,null,2));
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    //Song Name
    console.log('Track name: '+response.tracks.items[0].name);
    //Preview Link
    console.log('Preview this track: '+response.tracks.items[0].external_urls.spotify);
    //Album 
    console.log('Album name: '+response.tracks.items[0].album.name);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
  })
  .catch(function(err) {
    console.log(err);
  });
  
}
//OMDB API

function ombdRun(argTwo){
let queryUrl = "http://www.omdbapi.com/?t=" + argTwo + "&y=&plot=short&apikey=trilogy";

request(queryUrl, function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
      //console.log(JSON.parse(body));
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
      // Parse the body of the site 
      //Title of movie.
      console.log("The movie's Title is: " + JSON.parse(body).Title);
      // Year the movie came out.
      console.log("The movie's Release Date is: " + JSON.parse(body).Released);
      // IMDB Rating of the movie.
      console.log("The movie's IMBD Rating is: " + JSON.parse(body).Ratings[0].Value);
      //Rotten Tomatoes Rating of the movie.
      console.log("The movie's Rotten Tomatoes Rating is: " + JSON.parse(body).Ratings[1].Value);
      // Country where the movie was produced.
      console.log("The movie's Country where it was produced is: " + JSON.parse(body).Country);
      // Language of the movie.
      console.log("The movie's Language is: " + JSON.parse(body).Language);
      // Plot of the movie.
      console.log("The movie's Plot is: " + JSON.parse(body).Plot);
      // Actors in the movie.
      console.log("The movie's Actors are: " + JSON.parse(body).Actors);
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    }
  });

}
// Read random.txt file for do-what-it-says case.
function readRandom(){
    fs.readFile("random.txt", "utf8", function(error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
        return console.log(error);
        } 
        // We will then print the contents of data
        //console.log('~~~~~~~~~~~~~~');
        //console.log(data);
        // Then split it by commas (to make it more readable)
        var text = (data.split(","));
        argOne = text[0];
        argTwo = text[1];
        //console.log(argOne);
        //console.log(argTwo);
        //console.log('~~~~~~~~~~~~~~~');
        runSwitch();
    });
}

// Store the second argument in a variable and convert it to a string
let argOne = String(process.argv[2]);
//console.log(argOne);
let argTwo = '';
// Function allows the user to pass multiple arugments to build the search string.
function createSearch(){
    for(i=3;i<process.argv.length;i++){
        argTwo = argTwo + String(process.argv[i]) + ' ';
    }
}
createSearch();
//console.log(argTwo);

//Wrapped the switch statement in a function to run in the file reading function
function runSwitch(){
//Switch Statement
switch (argOne) {
    case 'my-weather':
    // Conditional if the user doesn't pass a second argument.
        if (argTwo === ''){
            argTwo = 'Dallas';
        }
        //Run Twitter API Function
        appendLog(argOne,argTwo);
        weatherRun(argTwo);
        break;
    case 'spotify-this-song':
         // Conditional if the user doesn't pass a second argument.
        if (argTwo === ''){
            argTwo = 'Like an Animal';
        }
        //Run Spotify API Function
        appendLog(argOne,argTwo);
        spotifyRun(argTwo);
        break;
    case 'movie-this':
        // Conditional if the user doesn't pass a second argument.
        if (argTwo === ''){
            argTwo = 'Mr.Nobody';
        }
        //Run OMBD API Function
        appendLog(argOne,argTwo);
        ombdRun(argTwo);

        break;
    case 'do-what-it-says':
        //Run Function
        readRandom();
        break;
}
}
runSwitch();

//This function will write the user arguments to the log file to track user search.
function appendLog(argOne, argTwo){
    fs.appendFile('log.txt', argOne + ', ' + argTwo + '\n', function(err) {
    // If an error was experienced we will log it.
    if (err) {
        console.log(err);
    }
    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
    else {
        console.log("Search Terms:logged");
    }
    });
}