const router = require('express').Router();
const { Game } = require('../models/Game');
const { StatusCodes } = require('http-status-codes');

// GET ALL
router.get('/all', async (req, res) => {
  const { id: userId } = req.body.user;

  try {
    // await Game.sync({ force: true });
    await Game.sync();
    const allGames = await Game.findAll({ where: { ownerId: userId } });

    if (!allGames) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Data not found',
      });
    }
    return res.status(StatusCodes.OK).json({
      games: allGames,
      message: 'Data fetched.',
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
});

// GET BY ID
router.get('/:id', async (req, res) => {
  console.log('GET BY ID');
  const { id: userId } = req.body.user;
  const { id: gameId } = req.params;

  try {
    // await Game.sync({ force: true });
    await Game.sync();
    const game = await Game.findOne({
      where: { id: gameId, ownerId: userId },
    });

    if (!game) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Data not found',
      });
    }

    return res.status(StatusCodes.OK).json({
      game,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
});

// CREATE
router.post('/create', async (req, res) => {
  console.log('CREATE');

  const { title, studio, esrbRating, userRating, havePlayed } = req.body;
  const { id: userId } = req.body.user;

  try {
    await Game.sync();
    const createdGame = await Game.create({
      title,
      ownerId: userId,
      studio,
      esrbRating,
      userRating,
      havePlayed,
    });

    return res.status(StatusCodes.OK).json({
      message: `Game with title ${createdGame.title} successfully created!`,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
});

// UPDATE
router.put('/update/:id', async (req, res) => {
  console.log('UPDATE');

  const { id: userId } = req.body.user;
  const { id: gameId } = req.params;
  const { title, studio, esrbRating, userRating, havePlayed } = req.body;

  try {
    // await Game.sync({ force: true });
    await Game.sync();
    const updatedGame = await Game.update(
      {
        title,
        studio,
        esrbRating,
        userRating,
        havePlayed,
      },
      {
        where: {
          id: gameId,
          ownerId: userId,
        },
      }
    );

    return res.status(StatusCodes.OK).json({
      message: `Game with id ${updatedGame} successfully updated!`,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
});

// DELETE
router.delete('/remove/:id', async (req, res) => {
  console.log('DELETE');

  const { id: userId } = req.body.user;
  const { id: gameId } = req.params;

  try {
    // await Game.sync({ force: true });
    await Game.sync();
    await Game.destroy({
      where: {
        id: gameId,
        ownerId: userId,
      },
    });

    return res.status(StatusCodes.OK).json({
      message: `Game with id ${gameId} successfully deleted!`,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
});

module.exports = router;
