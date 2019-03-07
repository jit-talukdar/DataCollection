var md5 = require('md5');
var db = require('../config/connection');

var UserModel = {
    getUsers: function (callback) {
        return db.query("SELECT `mu_id` id, `mu_name` name, `mu_phone` phone, `mu_email` email, `mu_status` status FROM mst_user", callback);
    },
    getUser: function (id, callback) {
        return db.query("SELECT `mu_id` id, `mu_name` name, `mu_phone` phone, `mu_email` email, `mu_password` pwd, `mu_status` status FROM mst_user where mu_id =?",[id],callback);
    },
    getUserBasic: function (id, callback) {
        return db.query("SELECT mu_id id, mu_name name, mu_phone phone, mu_email email FROM mst_user where mu_id =? AND mu_status=1",[id],callback);
    },
    addUser:function(data,callback){
        var pwd = md5(data.pwd);
        var query = 'INSERT INTO mst_user (mu_name, mu_email, mu_phone, mu_password) VALUES(?,?,?,?)';
        return db.query(query,[data.name, data.email, data.phone, pwd], callback);
    },
    deleteUser:function(id,callback){
        return db.query("DELETE FROM mst_user WHERE mu_id =?",[id],callback);
    },
    login: function(phone, pwd, callback) {
        var query = "SELECT mu_id id, mu_name name, mu_phone phone, mu_email email FROM mst_user where mu_phone = ? AND mu_password = ?";
        var res = db.query(query,[phone, pwd], callback);
        return res;
    }
};

module.exports = UserModel;