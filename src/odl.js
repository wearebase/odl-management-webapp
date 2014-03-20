var express = require('express');

var app = module.exports = express();

require('./routes')(app);

if (!module.parent) {
    app.listen(process.env.PORT || 3000, function() {
        console.log('ODL is on port %d!!', this.address().port);
    });
}