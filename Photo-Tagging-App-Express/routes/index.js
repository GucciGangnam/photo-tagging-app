var express = require('express');
var router = express.Router();

const game_controller = require('../controllers/gameController')
const authenticater_Controller = require('../controllers/authenticaterController')
const user_controller = require('../controllers/userCotroller')

/* GET home page. */
router.post('/startgame', authenticater_Controller.validateAccessToken, game_controller.start_game)

// Get user Account info 
router.post('/userAccount', authenticater_Controller.validateAccessToken, user_controller.get_user_account)


// CHARACTER SELECT //
// Select TOM 
router.post('/selecttom', authenticater_Controller.validateAccessToken, game_controller.select_tom )

// Select KENNY
router.post('/selectkenny', authenticater_Controller.validateAccessToken, game_controller.select_kenny )

// Seect SPIDERMAN
router.post('/selectspiderman', authenticater_Controller.validateAccessToken, game_controller.select_spiderman )

// Select ROGER
router.post('/selectroger', authenticater_Controller.validateAccessToken, game_controller.select_roger )

// Select BRIAN
router.post('/selectbrian', authenticater_Controller.validateAccessToken, game_controller.select_brian )

// Check game over 
router.post('/checkgameover', authenticater_Controller.validateAccessToken, game_controller.check_game_over)

// Submit score 
router.post('/submitscore', authenticater_Controller.validateAccessToken, game_controller.submit_name)


module.exports = router;
