const mongoose = require('mongoose');
const Game = mongoose.model(process.env.GAME_MODEL);
const { log } = require("console");

const getOne = function(req, res){
    log("inside publisherController getOne method");
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err, game){
        log("Found publisher", game.publisher, "for Game", game);
        res.status(200).json(game.publisher);
    });
}

const _addPublisher = function(req, res, game){
    game.publisher.name = req.body.name;
    game.publisher.country = req.body.country;
    game.publisher.established = req.body.established;
    game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    game.save(function(err, updatedGame){
        const response = {status: 200, msg: []};
        if(err){
            response.status = 500;
            response.msg = err; 
        } else {
            response.status = 201;
            response.msg = updatedGame.publisher;
        }
        res.status(response.status).json(response.msg);
    });
}

const addOne = function(req, res){
    log("inside publisherController addOne method");
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err, game){
        console.log("Found game", game);
        const response = {
            status : 200,
            msg: game
        }
        if(err){
            console.log("Error finding game");
            response.status = 500;
            response.msg = err;
        } else {
            if(!game){
                console.log("Game id not found", gameId);
                response.status = 404;
                response.msg = {error : "Game id not found " + gameId};
            } else {
                _addPublisher(req, res, game);
            }
        }
        res.status(response.status).json(response.msg);
    });
}

const _deletePublisher = function(req, res, game){
    game.publisher = {name: "NoName"};
    game.save(function(err, updatedGame){
        const response = {
            status : 204,
            msg : []
        };
        if(err){
            response.status = 500;
            response.msg = err;
        } else {
            response.status = 201;
            response.msg = updatedGame.publisher;
        }
        res.status(response.status).json(response.msg);
    });
}

const deleteOne = function(req, res){
    log("inside publisher controller deleteOne method");
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err, game){
        console.log("Found game", game);
        const response = {
            status : 200,
            msg: game
        }
        if(err){
            console.log("Error finding game");
            response.status = 500;
            response.msg = err;
        } else {
            if(!game){
                console.log("Game id not found", gameId);
                response.status = 404;
                response.msg = {error : "Game id not found " + gameId};
            } else {
                _deletePublisher(req, res, game);
            }
        }
        res.status(response.status).json(response.msg);
    });
}

module.exports = {
    getOne: getOne,
    putOne: addOne,
    deleteOne
}