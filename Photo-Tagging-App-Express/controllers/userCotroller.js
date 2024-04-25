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
        console.log("User created successfully:", newUser);
        return res.status(200).json({ msg: "User Created" });
    } catch (error) {
        // If an error occurs during the save operation, log and return an error response
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Failed to create user" });
    }
});
