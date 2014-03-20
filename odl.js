var express = require('express');

var app = express();

app.get('/', function(req, res){
  res.send('Hello ODL!!');
});

var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port %d', server.address().port);
});
