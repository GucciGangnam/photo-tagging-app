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

// CONTROLLER //
exports.create_user = asyncHandler(async (req, res, next) => {

    // Check if userID exists 

    // If YES - DONT CREATE NEW USER

    // if NO - CFREATE NEW USER and pass access token to user browser
    try {
        // Set Current time 
        const startTime = new Date();
        // Made uuid USER_ID
        const userID = "UID" + uuidv4()
        // Get user IP Address
        const ipAddress = req.socket.remoteAddress;
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
            START_TIME: startTime,
        }
        const secretKey = process.env.API_SECURITY_KEY;
        const accessToken = jwt.sign(payload, secretKey, { expiresIn: '60m' })
        console.log(accessToken)
        // // // // // //

        console.log("User created successfully:", newUser);
        return res.status(200).json({ jwt: accessToken });
    } catch (error) {
        // If an error occurs during the save operation, log and return an error response
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Failed to create user" });
    }
});


