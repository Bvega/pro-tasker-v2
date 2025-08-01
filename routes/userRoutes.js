const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController.js');

// Route for a new user to register
// Maps POST /api/users/register to the registerUser function
router.post('/register', registerUser);

// Route for an existing user to log in
// Maps POST /api/users/login to the loginUser function
router.post('/login', loginUser);

module.exports = router;