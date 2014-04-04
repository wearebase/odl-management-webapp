var rekuire = require('rekuire');
var util = require('util');
var config = require('config');
var _ = require('underscore');
var rest = rekuire('src/util/rest');
var request = require('request');
User = rekuire('src/models/user');

module.exports.getAllUsers = function(req, res) {
    User.find({}, function(err, devices) {
        res.send(err ? 404 : devices);
    });
}

module.exports.newUser = function(req, res) {
    new User(req.body).save(function (err, user) {
        res.send(err ? 404 : user);
    });
}

module.exports.deleteUserByUsername = function(req, res){
    User.findOne({userName: req.param ('userName')}, function(err, user){
        user.remove(function(err, user){
            res.send(err ? 404 : user);
        }); 
    });
}

module.exports.getUserByUserName = function(req, res) {
    User.findOne({userName: req.param('userName')}, function(err, userName) {
        res.send(userName ? userName : 404);
    });
}
