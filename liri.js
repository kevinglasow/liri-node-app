var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var keys = require("./keys.js")
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var fs = require("fs");

var input = process.argv.slice(2);
var command = input[0];
var userEntry = input[1];

console.log(command);
console.log(userEntry);

if (command === "my-tweets") {
    myTweets()
} else if (command === "spotify-this-song") {
    if (input.length === 1) {
        spotifyThisSong("The Sign")
    } else {
        spotifyThisSong(command)
    }
} else if (command === "movie-this") {
    if (input.length === 1) {
        movieThis("Mr. Nobody")
    } else {
        movieThis(userEntry)
    }
} else if (command === "do-what-it-says") {
    doWhatItSays()
} else {
    Console.log("Please enter a command")
}

function myTweets() {
    var params = {
        screen_name: 'kevinglasow',
        count: "20"
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) {
            return console.log("Error occurred: " + error);
        }
        tweets.forEach(function (tweet) {
            console.log(tweet.text);
            console.log(tweet.created_at);
            console.log("");
        })
    });
}

function spotifyThisSong(track) {
    spotify.search({
        type: 'track',
        query: track,
        limit: 1
    }, function (error, data) {
        if (error) {
            return console.log("Error occurred: " + error);
        }
        // data.forEach(function (songs) {
        // console.log(JSON.stringify(data.tracks.items[0], null, 2));
        console.log("Artist Name: " + JSON.stringify(data.tracks.items[0].artists[0].name, null, 2));
        console.log("Song Title: " + JSON.stringify(data.tracks.items[0].name, null, 2));
        console.log("Preview URL: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2));
        console.log("Album Name: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
        console.log("");
        // })
    });
}

function movieThis(title) {
    request("http://www.omdbapi.com/?apikey=trilogy&t=" + title, function (error, response, body) {
        if (error) {
            return console.log("Error occured: " + error);
        }
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Production Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot Summary: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
    });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        var command = dataArr[0];
        var userEntry = dataArr[1]
        console.log(command);
        console.log(userEntry);
    });
}