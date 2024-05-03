// IMPORTS //
// Async Handler
const asyncHandler = require("express-async-handler")
// Express validator 
//Validator methods
const { body, validationResult } = require("express-validator");
// Schemes
const Users = require("../models/user")
// UUID v4
const { v4: uuidv4 } = require('uuid');
// Import JWT
const jwt = require("jsonwebtoken");
// Controllers
const game_controller = require('../controllers/gameController');

// CONTROLLER //
exports.create_user = asyncHandler(async (req, res, next) => {
    try {
        // Set Current time 
        const startTime = new Date();
        // Made uuid USER_ID
        const userID = "UID" + uuidv4()
        // Get user IP Address
        const ipAddress = 'req.socket.remoteAddress;'
        // Create new user
        const newUser = new Users({
            ID: userID,
            START_TIME: startTime,
            FOUND_TOM: false,
            FOUND_SPIDERMAN: false,
            FOUND_KENNY: false,
            FOUND_ROGER: false,
            FOUND_BRIAN: false,
            IP_ADDRESSES: [ipAddress]
        });
        await newUser.save(); // Wait for the save operation to complete
        // CREATE JWT //
        const payload = {
            USER_ID: userID,
        }
        const secretKey = process.env.API_SECURITY_KEY;
        req.accessToken = jwt.sign(payload, secretKey, { expiresIn: '180m' })
        // // // // // //


        console.log("User created successfully:")
        game_controller.start_game(req, res);
    } catch (error) {
        // If an error occurs during the save operation, log and return an error response
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Failed to create user" });
    }

});


exports.get_user_account = asyncHandler(async(req, res, next) => { 

    console.log("Gamepage mounted - back end ")

    const secretKey = process.env.API_SECURITY_KEY;
    const payload = jwt.verify(req.accessToken, secretKey);

    // Extract all info from user and give it to front
    const userAccount = await Users.find({ ID: payload.USER_ID })

    res.status(200).json(
        {
            jwt: req.accessToken,
            userAccount: userAccount
        }
    );

    return;
})