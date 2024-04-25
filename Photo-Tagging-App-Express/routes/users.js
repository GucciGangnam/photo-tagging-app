var express = require('express');
var router = express.Router();

// IMPORT CONTROLLERS //
const user_controller = require('../controllers/userCotroller')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// CREATE NEW USER //
router.post('/create', user_controller.create_user)

module.exports = router;
