var express = require('express');

var app = express();

app.get('/', function(req, res){
  res.send('Hello ODL!!');
});

module.exports = app;

if (!module.parent) {
    app.listen(process.env.PORT || 3000, function() {
        console.log('ODL is on port %d!!', this.address().port);
    });
}