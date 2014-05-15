var mapperPort = 19002;

module.exports = {
    MAPPER: {
        port: mapperPort
    },
    ODL: {
        port: 9000,
        greeting: 'Hello ODL!!'
    },
    DB: {
        url: 'mongodb://localhost/odl-test'
    },
    GMAPI: {
        url: 'http://localhost:' + mapperPort + '/globalmine-server/v2/',
        key: 'k',
        secret: 's'
    }
}