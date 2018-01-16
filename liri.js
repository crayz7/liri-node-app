require("dotenv").config();

var keys = require("./keys.js");

//var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);

var command = process.argv[2];
var input = process.argv[3];
		


//switch case statement to determine which function gets run
switch (command) {
	case "my-tweets": tweets();
	break;

	case "spotify-this-song": spotify();
	break;

	case "movie-this": movie();
	break;

	case "do-what-it-says": says();
	break;
}

function tweets() {
	var Twitter = require('twitter');
 
	var client = new Twitter(keys.twitter);

  client.get('statuses/user_timeline', {q: "JchanCodingCamp", count: 20}, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < 7; i++) {
      	console.log(JSON.stringify(tweets[i].text, null, 2));
      	console.log(JSON.stringify(tweets[i].created_at, null, 2));
      
      }
    }
  });
}

function spotify() {
	var Spotify = require('node-spotify-api');

	//could not default to Ace of Base song. Tried:
	// if (input === null) {
	// 	input = "ace of base the sign";
	// }

	var spotify = new Spotify(keys.spotify);
 
	spotify.search({type: 'track', query: input}, function(err, data) {
  	  if (err) {
   	    return console.log('Error occurred: ' + err);
 	    	   
 	    } else {
   	    console.log("Artist: " + data.tracks.items[0].artists[0].name +
  	    			"\nSong Title: " + data.tracks.items[0].name +
  	    			"\nPreview Link: " + data.tracks.items[0].preview_url +
					"\nAlbum: " + data.tracks.items[0].album.name);

	  }
  });
}

function movie() {
	var request = require("request");

	var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
	
	request(queryUrl, function(err, response, body) {
		if (err) {
			return console.log('Error occured: ' + err);
		} else {
			console.log("Title: " + JSON.parse(body).Title +
						"\nRelease Year: " + JSON.parse(body).Year +
						"\nIMDB Rating: " + JSON.parse(body).Ratings[0].Value +
						"\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +
						"\nCountry Produced: " + JSON.parse(body).Country +
						"\nLanguage: " + JSON.parse(body).Language +
						"\nPlot: " + JSON.parse(body).Plot + 
						"\nActors: " + JSON.parse(body).Actors);
		}
	});
}

function says() {
	var fs = require("fs");

	fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
			return console.log("Error occured: " + err);
		} else {
			console.log(data);
			var dataArr = data.split(",");
			
			command = dataArr[0];
			input = dataArr[1];
				
			switch (command) {
				case "my-tweets": tweets();
				break;

				case "spotify-this-song": spotify();
				break;

				case "movie-this": movie();
				break;
			}
		}
	});
}