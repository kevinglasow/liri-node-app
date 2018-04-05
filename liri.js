var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var keys = require("./keys.js")
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var input = process.argv.slice(2);
console.log(input);

if (input[0] === "my-tweets") {
    myTweets()
} else if (input[0] === "spotify-this-song") {
    if (input.length === 1) {
        spotifyThisSong("Let It Be")
    } else {
        spotifyThisSong(input[1])
    }
} else if (input[0] === "movie-this") {
    movieThis()
} else if (input[0] === "do-what-it-says") {
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
        if (!error) {
            tweets.forEach(function (tweet) {
                console.log(tweet.text);
                console.log(tweet.created_at);
                console.log("");
            })
        }
    });
}

function spotifyThisSong(track) {
    spotify.search({
        type: 'track',
        query: track,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
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