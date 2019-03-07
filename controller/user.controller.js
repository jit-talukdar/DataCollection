var md5 = require('md5');
var usermodel = require("../model/user.model");
var config = require("../config/config");


exports.registerUser = (req, res) => {
    var resp = {};
    var params = req.body;
    var paramLength = Object.keys(params).length;
    if (paramLength === 4) {
        // Insert User
        usermodel.addUser(params, function(error, rs) {
            // res.json(error);
            if (error) {
                resp.status = 403;
                resp.msg = error.code;
                res.status(403).json(resp);
            } else {
                if (rs.affectedRows) {
                    // Fetch the user data without password using the last inserted id
                    usermodel.getUserBasic(rs.insertId, function(err, rows) {
                        if (err) {
                            resp.status = 400;
                            resp.msg = err.code;
                            res.status(400).json(resp);
                        } else {
                            resp.status = 201;
                            resp.data = rows;
                            res.status(201).json(resp);
                        }
                    });
                } else {
                    // Through error if unable to insert
                    resp.status = 500;
                    resp.msg = "ERROR_INSERT";
                    res.status(500).json(resp);
                }
            }
        });
    } else {
        res.status(500).json({ status: 500, msg: "INVALID PARAMETERS" });
    }
};

exports.loginUser = (req, res) => {
    var resp = {};
    var phone = req.body.phone;
    var pwd = md5(req.body.pwd);
    usermodel.login(phone, pwd, function(error, results) {
        if (error) {
            resp.status = 400;
            resp.msg = error.code;
            res.status(400).json(resp);
        } else {
            if (results.length) {
                resp.status = 200;
                resp.token = config.createToken(results[0].id);
                res.status(200).json(resp);
            } else {
                resp.status = 404;
                resp.msg = "EMPTY";
                res.status(404).json(resp);
            }
        }
    });
};

exports.usersubmission = (req, res, next) => {
  res.send(req.file.path);
};

// exports.usersubmission = (req, res, next) => {
//     const file = req.file;
//     if (!file) {
//         const error = new Error('Please upload a file');
//         error.httpStatusCode = 400;
//         return next(error);
//     }
//     res.send(file);
// };

/*exports.getAllUsers = (req, res) => {
    var resp = {};
    // res.json(req.userData);
    usermodel.getUsers(function(err, rows) {
        if (err) {
            serverStatus = 400;
            resp.status = 400;
            resp.msg = err.code;
            res.status(400).json(resp);
        } else {
            if (rows.length) {
                resp.status = 200;
                resp.data = rows;
                res.status(200).json(resp);
            } else {
                resp.status = 404;
                resp.msg = "EMPTY";
                res.status(404).json(resp);
            }
        }
    });
    
};

exports.getUser = (req, res) => {
    var resp = {};
    usermodel.getUserBasic(req.params.id, function(err, rows) {
        if (err) {
            resp.status = 400;
            resp.msg = err.code;
            res.status(400).json(resp);
        } else {
            if (rows.length) {
                resp.status = 200;
                resp.data = rows;
                res.status(200).json(resp);
            } else {
                resp.status = serverStatus;
                resp.msg = "Empty User";
                res.status(404).json(resp);
            }
        }
    });
};

exports.delete = (req, res) => {
  var resp = {};
  usermodel.deleteUser(req.params.id, function(err, rows) {
    if (err) {
      resp.status = 400;
      resp.msg = err.code;
      res.status(400).json(resp);
    } else {
      resp.status = 200;
      resp.msg = rows.affectedRows ? "Data Deleted" : "Nothing to delete";
      res.status(200).json(resp);
    }
  });
};*/