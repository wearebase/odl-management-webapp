var mongoose = require('mongoose');

var schema = mongoose.Schema({
    imei: { type: String, required: true, unique: true },
    modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Device', schema);