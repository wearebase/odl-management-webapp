var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	userName: { type:String, required: true, unique: true },
	email: { type:String, required: true, unique: true },
	password: { type:String, required: true},
	isAdmin: { type: Boolean },
	salt: { type: String },
	hash: {type: String}
})

module.exports = mongoose.model('User', userSchema);