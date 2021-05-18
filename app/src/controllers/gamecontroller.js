const router = require('express').Router();
// const Game = require('../db').import('../models/game');
const Game = require('../models/Game');

// GET ALL
router.get('/all', (req, res) => {
  Game.findAll({ where: { owner_id: req.user.id } }).then(
    function findSuccess(data) {
      res.status(200).json({
        games: games,
        message: 'Data fetched.',
      });
    },

    function findFail() {
      res.status(500).json({
        message: 'Data not found',
      });
    }
  );
});

// GET BY ID
router.get('/:id', (req, res) => {
  Game.findOne({ where: { id: req.params.id, owner_id: req.user.id } }).then(
    function findSuccess(game) {
      return res.status(200).json({
        game: game,
      });
    },

    function findFail(err) {
      return res.status(500).json({
        message: 'Data not found.',
      });
    }
  );
});

// CREATE
router.post('/create', (req, res) => {
  Game.create({
    title: req.body.game.title,
    owner_id: req.body.user.id,
    studio: req.body.game.studio,
    esrb_rating: req.body.game.esrb_rating,
    user_rating: req.body.game.user_rating,
    have_played: req.body.game.have_played,
  }).then(
    function createSuccess(game) {
      return res.status(200).json({
        game: game,
        message: 'Game created.',
      });
    },

    function createFail(err) {
      return res.status(500).send(err.message);
    }
  );
});

// UPDATE
router.put('/update/:id', (req, res) => {
  Game.update(
    {
      title: req.body.game.title,
      studio: req.body.game.studio,
      esrb_rating: req.body.game.esrb_rating,
      user_rating: req.body.game.user_rating,
      have_played: req.body.game.have_played,
    },
    {
      where: {
        id: req.params.id,
        owner_id: req.user,
      },
    }
  ).then(
    function updateSuccess(game) {
      return res.status(200).json({
        game: game,
        message: 'Successfully updated.',
      });
    },

    function updateFail(err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  );
});

// DELETE
router.delete('/remove/:id', (req, res) => {
  Game.destroy({
    where: {
      id: req.params.id,
      owner_id: req.user.id,
    },
  }).then(
    function deleteSuccess(game) {
      return res.status(200).json({
        game: game,
        message: 'Successfully deleted',
      });
    },

    function deleteFail(err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  );
});

module.exports = router;
