const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games.controllers");
const publisherController = require("../controllers/publisher.controllers");
const reviewsController = require("../controllers/reviews.controllers");

router.route("/games")
    .get(gamesController.getAll)
    .post(gamesController.putOne);

router.route("/games/:gameId")
    .get(gamesController.getOne)
    .put(gamesController.fullUpdateOne)
    .patch(gamesController.partialUpdateOne)
    .delete(gamesController.deleteOne);

router.route("/games/:gameId/publisher")
    .get(publisherController.getOne)
    .post(publisherController.putOne)
    .delete(publisherController.deleteOne);

router.route("/games/:gameId/reviews").get(reviewsController.getAll);

router.route("/games/:gameId/reviews/:reviewId").get(reviewsController.getOne);

module.exports = router;