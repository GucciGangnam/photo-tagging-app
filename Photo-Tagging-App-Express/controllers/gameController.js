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
exports.check_game_over = asyncHandler(async (req, res, next) => {
    const userAccount = await Users.findOne({ ID: req.userId });
    if ((userAccount.FOUND_TOM) && (userAccount.FOUND_SPIDERMAN) && (userAccount.FOUND_KENNY) && (userAccount.FOUND_ROGER) && (userAccount.FOUND_BRIAN)) {
        if (!userAccount.FINISH_TIME) { // Check if FINISH_TIME doesn't exist
            await Users.updateOne({ ID: req.userId }, { $set: { FINISH_TIME: new Date() } });
            return res.status(200).end();
        } else {
            return res.status(200).end(); // FINISH_TIME already exists
        }
    } else {
        return res.status(401).end();
    }
});
// // // // // // // // // 

// ADD FIRST AND LAST NAME AND DURATION TO ACCOUNT INFO //
exports.submit_name = asyncHandler(async (req, res, next) => {
    try {
        // Find user 
        const userAccount = await Users.findOne({ ID: req.userId });

        // Check if both START_TIME and FINISH_TIME exist
        if (userAccount.START_TIME && userAccount.FINISH_TIME) {
            // Convert strings to Date objects
            const startTime = new Date(userAccount.START_TIME);
            const finishTime = new Date(userAccount.FINISH_TIME);

            // Calculate the difference in milliseconds
            const duration = finishTime.getTime() - startTime.getTime();

            const firstname = req.body.firstname;
            const lastname = req.body.lastname;

            // Update user 
            await Users.updateOne(
                { ID: req.userId },
                {
                    $set: {
                        FIRST_NAME: firstname,
                        LAST_NAME: lastname,
                        DURATION: duration
                    }
                }
            );
            res.status(200).json({ msg: "all good bro" });
        } else {
            // If either START_TIME or FINISH_TIME is missing, return a 400 error
            console.log('START_TIME or FINISH_TIME is missing');
            res.status(400).json({ error: 'START_TIME or FINISH_TIME is missing' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// // // // // // /// // // /// // /// /// //

// TOP 5 LEADERBOARD //
exports.get_highscores = asyncHandler(async (req, res, next) => {
    try {
        // Calculate the date 3 hours ago
        const threeHoursAgo = new Date();
        threeHoursAgo.setHours(threeHoursAgo.getHours() - 3);

        await Users.deleteMany({
            $and: [
                { FINISH_TIME: true }, // Check if FINISH_TIME is true
                { START_TIME: { $lt: threeHoursAgo } } // Check if START_TIME is older than 3 hours ago
            ]
        });

        // Fetch the shortest 5 durations
        const shortestDurations = await Users.find({ DURATION: { $exists: true } })
            .sort({ DURATION: 1 }) // Sort by DURATION field in ascending order
            .limit(5); // Limit the result to 5 users

        // Extract first name, last name, and duration of the shortest 5 durations
        const highscores = shortestDurations.map(user => ({
            firstName: user.FIRST_NAME,
            lastName: user.LAST_NAME,
            duration: user.DURATION
        }));

        // Return the shortest 5 durations' first name, last name, and duration
        return res.status(200).json(highscores);
    } catch (error) {
        console.error('Error fetching highscores:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});