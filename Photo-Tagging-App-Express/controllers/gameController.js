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
// Controller 
const user_controller = require('../controllers/userCotroller')







// CONTROLLER //
exports.start_game = async (req, res, next) => {
    console.log("game started")
    const secretKey = process.env.API_SECURITY_KEY;
    const payload = jwt.verify(req.accessToken, secretKey);
    // Extract all info from user and give it to front
    const userAccount = await Users.find({ ID: payload.USER_ID })
    await res.status(200).json(
        {
            jwt: req.accessToken,
            userAccount: userAccount
        }
    );
    return;
}


// CHARACTER SELECT //
// Select TOM 
exports.select_tom = asyncHandler(async (req, res, next) => {
    const selectedCell = parseInt(req.body.selectedCell); // Parse to integer
    // If cell matches respond OK
    if (selectedCell === 4603 || selectedCell === 4656 || selectedCell === 4709 || selectedCell === 4657 || selectedCell === 4710) {
        // Use res.userId to update database
        await Users.updateOne({ ID: req.userId }, { $set: { FOUND_TOM: true } });
        return res.status(200).end(); // End the response after setting the status
    } else {
        return res.status(401).end(); // Unauthorized status for incorrect credentials
    }
});


// Select SPIDERMAN
exports.select_spiderman = asyncHandler(async (req, res, next) => {
    const selectedCell = parseInt(req.body.selectedCell); // Parse to integer
    // If cell matches respond OK
    if (selectedCell === 4379 || selectedCell === 4380 || selectedCell === 4432 || selectedCell === 4433) {
        // Use res.userId to update database
        await Users.updateOne({ ID: req.userId }, { $set: { FOUND_SPIDERMAN: true } });
        return res.status(200).end(); // End the response after setting the status
    } else {
        return res.status(401).end(); // Unauthorized status for incorrect credentials
    }
})

// Seect KENNY
exports.select_kenny = asyncHandler(async (req, res, next) => {
    const selectedCell = parseInt(req.body.selectedCell); // Parse to integer
    // If cell matches respond OK
    if (selectedCell === 2363 || selectedCell === 2364 || selectedCell === 2415 || selectedCell === 2416) {
        // Use res.userId to update database
        await Users.updateOne({ ID: req.userId }, { $set: { FOUND_KENNY: true } });
        return res.status(200).end(); // End the response after setting the status
    } else {
        return res.status(401).end(); // Unauthorized status for incorrect credentials
    }
})

// Select ROGER
exports.select_roger = asyncHandler(async (req, res, next) => {
    const selectedCell = parseInt(req.body.selectedCell); // Parse to integer
    // If cell matches respond OK
    if (selectedCell === 1993 || selectedCell === 1994 || selectedCell === 2046 || selectedCell === 2047 || selectedCell === 2100) {
        // Use res.userId to update database
        await Users.updateOne({ ID: req.userId }, { $set: { FOUND_ROGER: true } });
        return res.status(200).end(); // End the response after setting the status
    } else {
        return res.status(401).end(); // Unauthorized status for incorrect credentials
    }
})

// Select BRIAN
exports.select_brian = asyncHandler(async (req, res, next) => {
    const selectedCell = parseInt(req.body.selectedCell); // Parse to integer
    // If cell matches respond OK
    if (selectedCell === 1862) {
        // Use res.userId to update database
        await Users.updateOne({ ID: req.userId }, { $set: { FOUND_BRIAN: true } });
        return res.status(200).end(); // End the response after setting the status
    } else {
        return res.status(401).end(); // Unauthorized status for incorrect credentials
    }
})


// CHECK IF GAME IS OVER

// // // // // // // // // 