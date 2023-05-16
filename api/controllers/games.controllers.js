const { log } = require("console");
const gamesData = require("../data/games.json");

const { title, off } = require("process");
const { default: mongoose } = require("mongoose");

const Game = mongoose.model(process.env.GAME_MODEL);

const getAll = function (req, res) {
  console.log("Inside games controller getAll method");
  let offset,
    count,
    maxCount = 10;
  if (!req.query || !req.query.offset || !req.query.count) {
    console.log("Missing offset/count query params");
    res.status(400).json({ error: "Required query params are missing" });
  } else {
    offset = parseInt(req.query.offset, 10);
    count = parseInt(req.query.count, 10);
    if (isNaN(offset) || isNaN(count)) {
      res.status(400).json({
        error: "Query params offset and count should be of type number",
      });
      return;
    }
    if (count > maxCount) {
      res.status(400).json({ error: "Cannot exceed count of " + maxCount });
      return;
    }
    let pageGames = gamesData.slice(offset, offset + count);
    Game.find()
      .skip(offset)
      .limit(count)
      .exec(function (err, games) {
        if (err) {
          console.log("Error finding games");
          res.status(500).json(err);
        } else {
          console.log("Found games", games.length);
          res.status(200).json(games);
        }
      });
  }
};

const getOne = function (req, res) {
  log("Inside games controller getOne method");
  const gameId = req.params.gameId;
  Game.findById(gameId).exec(function (err, game) {
    const response = {
      status: 200,
      msg: game,
    };
    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.msg = err;
    } else if (!game) {
      console.log("Game id not found");
      response.status = 404;
      response.msg = "Game id not found";
    }
    res.status(response.status).json(response.msg);
  });
};

const putOne = function (req, res) {
  log("Inside games controller putOne method");
  // if(!req.body || !req.body.title || !req.body.price){
  //     log("Data missing from POST body");
  //     res.status(400).json({error : "Required data missing from POST body"});
  // } else {
  console.log("Request body", req.body);
  const newGame = {
    title: req.body.title,
    price: req.body.price,
    year: req.body.year,
    rate: req.body.rate,
    minPlayers: req.body.minPlayers,
    maxPlayers: req.body.maxPlayers,
    publisher: { name: "NoName" },
    reviews: [],
    minAge: req.body.minAge,
    designers: req.body.designers,
  };
  Game.create(newGame, function (err, game) {
    const response = {
      status: 201,
      msg: game,
    };
    if (err) {
      log("Failed to insert new game");
      response.status = 500;
      response.msg = err;
    }
    res.status(response.status).json(response.msg);
  });
  // }
};

const deleteOne = function (req, res) {
  log("Inside games controller deleteOne method");
  const gameId = req.params.gameId;
  Game.findByIdAndDelete(gameId).exec(function (err, deletedGame) {
    const response = { status: 200, msg: deletedGame };
    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.msg = err;
    } else if (!deletedGame) {
      console.log("Game id not found", gameId);
      response.status = 404;
      response.msg = { message: "Game id not found" };
    }
    res.status(response.status).json(response.msg);
  });
};

const _updateOne = function (req, res, updateCallback) {
  log("Inside games controller updateOne method");
  const gameId = req.params.gameId;
  Game.findById(gameId).exec(function (err, game) {
    const response = { status: 200, message: game };
    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;
    } else if (!game) {
      console.log("Game id not found");
      response.status = 404;
      response.message = { message: "Game ID not found" };
    }
    if (200 !== response.status) {
      res.status(response.status).json(response.message);
    } else {
      updateCallback(req, game);
      game.save(function (err, updatedGame) {
        console.log("updatedGame",updatedGame);
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.message = updatedGame;
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};

const _fullUpdate = function (req, game) {
  game.title = req.body.title;
  game.year = req.body.year;
  game.rate = req.body.rate;
  game.price = req.body.price;
  game.minPlayers = req.body.minPlayers;
  game.maxPlayers = req.body.maxPlayers;
  game.minAge = req.body.minAge;
  game.designers = req.body.designers;
  if (req.body.name) {
    console.log("Name passed");
    game.publisher = { name: req.body.name };
  } else {
    console.log("No name passed");
    game.publisher = { name: "NoName" };
  }
  game.reviews = [];
};

const _partialUpate = function (req, game) {
  if (req.body.title) {
    game.title = req.body.title;
  }
  if (req.body.year) {
    game.year = req.body.year;
  }
  if (req.body.rate) {
    game.rate = req.body.rate;
  }
  if (req.body.price) {
    game.price = req.body.price;
  }
  if (req.body.minPlayers) {
    game.minPlayers = req.body.minPlayers;
  }
  if (req.body.maxPlayers) {
    game.maxPlayers = req.body.maxPlayers;
  }
  if (req.body.minAge) {
    game.minAge = req.body.minAge;
  }
  if (req.body.designers) {
    game.designers = req.body.designers;
  }
  if (req.body.publisher) {
    game.publisher = req.body.publisher;
  }
  if (req.body.reviews) {
    game.reviews = req.body.reviews;
  }
};

const fullUpdateOne = function (req, res) {
  console.log("Inside games controller fullUpdateOne method");
  _updateOne(req, res, _fullUpdate);
};

const partialUpdateOne = function (req, res) {
  console.log("Inside games controller partialUpdateOne method");
  _updateOne(req, res, _partialUpate);
};


module.exports = {
    getAll,
    getOne,
    putOne,
    fullUpdateOne,
    partialUpdateOne,
    deleteOne
}