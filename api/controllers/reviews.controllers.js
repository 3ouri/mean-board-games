const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL);

const getAll = function(req, res){
    console.log("inside reviews controller getAll method");
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function(err, game){
        console.log("Found reviews", game.reviews, "for game", game);
        res.status(200).json(game.reviews);
    });
}

const getOne = function(req, res){
    console.log("inside reviews controller getOne method");
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    Game.findById(gameId).select("reviews").exec(function(err, game){
        console.log("found review", game.reviews.id(reviewId), "for game", game);
        req.status(200).json(game.reviews.id(reviewId));
    });
}

module.exports = {
    getAll,
    getOne
}

