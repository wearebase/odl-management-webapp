var mongoose = require('mongoose');

var schema = mongoose.Schema({
    imei: { type: String, required: true, unique: true },
    modified: { type: Date, default: Date.now },
    image: { type: String },
    attributes: { type: Object }
});

module.exports = mongoose.model('Device', schema);