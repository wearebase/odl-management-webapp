var mongoose = require('mongoose');

var schema = mongoose.Schema({
    date: { type: Date, default: Date.now },
    humanId: {type: String, required: true, unique: true}
});

module.exports = mongoose.model('QrCode', schema);