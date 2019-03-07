var express = require('express');
var router = express.Router();
var usercontroller = require('../controller/user.controller');

router.all('/', function(req, res, next) {
    res.status(400).json({
        msg: "Bad Request"
    });
});

// router.post('/api/users', usercontroller.registerUser);
// // router.delete('/api/users/:id', usercontroller.delete);
router.post('/users/login', usercontroller.loginUser);
// router.post('/api/users/submission', usercontroller.usersubmission);

module.exports = router;