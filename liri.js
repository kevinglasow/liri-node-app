var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var keys = require("./keys.js")
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var fs = require("fs");

var command = process.argv[2];
var userEntry = process.argv[3]

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
        limit: 20
    }, function (error, data) {
        if (error) {
            return console.log("Error occurred: " + error);
        }
        data.tracks.items.forEach(function (song) {
            console.log("Artist Name: " + JSON.stringify(song.artists[0].name, null, 2));
            console.log("Song Title: " + JSON.stringify(song.name, null, 2));
            console.log("Preview URL: " + JSON.stringify(song.preview_url, null, 2));
            console.log("Album Name: " + JSON.stringify(song.album.name, null, 2));
            console.log("");
        })
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
        if (command === "Do what it says") {
            console.log("Please don't put me into an infinate loop. That'd be mean.")
        } else {
            ifElse(command, userEntry);
        }
    });
}

function ifElse(command, userEntry) {
    if (command === "my-tweets") {
        myTweets()
    } else if (command === "spotify-this-song") {
        if (userEntry == null) {
            spotifyThisSong("The Sign Ace of Base")
        } else {
            spotifyThisSong(userEntry)
        }
    } else if (command === "movie-this") {
        if (userEntry == null) {
            movieThis("Mr. Nobody")
        } else {
            movieThis(userEntry)
        }
    } else if (command === "do-what-it-says") {
        doWhatItSays()
    } else {
        console.log("Please enter a valid command")
    }
}

ifElse(command, userEntry);