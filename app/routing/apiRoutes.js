var path = require("path");
var games = require('../data/games.js');
var bodyParser = require("body-parser");

module.exports = function(app){

 
  app.get('/api/games', function(req,res){
    res.json(games);
});


app.post("/api/games", function(req, res) {
   
     var newGame = req.body;
        var userResponse = newGame.scores;
        var match = {
          name: "",
          photo: "",
          difference: 500
        };
  
        for (var i = 0; i < games.length; i++) {
          var totalDifference = 0;
          for (var j = 0; j < userResponse.length; j++) {
            totalDifference += Math.abs(games[i].scores[j] - userResponse[j]);
            
            if (totalDifference <= match.difference){
                match.name = games[i].name;
                match.photo = games[i].photo;
                match.difference = totalDifference;
            }
          }
        }
  
        games.push(newGame);
  
        res.json(match);
  
      });
  };




