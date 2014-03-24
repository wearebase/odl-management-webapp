var config = require('config');

var db = {
    system: {indexes: []},
    devices: [{
            imei: '012345678912345'
        },{
            imei: '112345678912345' 
        },{
            imei: '212345678912345'
 	}]
};

module.exports[config.DB.name] = db;