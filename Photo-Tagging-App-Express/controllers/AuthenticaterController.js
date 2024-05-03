// Import asyncHandler
const asyncHandler = require("express-async-handler");
// Impiort jwt
const jwt = require('jsonwebtoken');
// Controllers
const user_controller = require('../controllers/userCotroller')

exports.validateAccessToken = asyncHandler(async (req, res, next) => {
    const clientAccessToken = req.headers.authorization
    // IF THERE ISNT AN ACCESS TOKEN
    if (!clientAccessToken || !clientAccessToken.startsWith('Bearer ')) {
        // If the authorization token is missing or doesnt start with "bearer", return a 401 Unauthorized response
        console.log("Couldnt Validate JWT => Create new user 1")
        try { 
            user_controller.create_user(req, res);
        } catch (error){ 
            console.error(error)
        }
        return;
    }
    // Extract the token part from the Authorization header
    const token = clientAccessToken.split(' ')[1];
    try {
        // Verify the token
        const secretKey = process.env.API_SECURITY_KEY;
        const payload = jwt.verify(token, secretKey);
        req.userId = payload.USER_ID;
        req.accessToken = token;
        console.log('Authrnification passed')
        console.log(req.userId)
        next(); 
    } catch (error) {
        try { 
            res.status(400).json({ error: "JWT NO GOOD" });
            user_controller.create_user(req, res);
        } catch (error){ 
            console.error(error)
            res.status(500).json({ error: "Internal Server Error" });
        }
        return
    }
})

