module.exports = {
    DEV: true,

    ODL: {
        port: 9090,
        greeting: 'Hello ODL!! (this is development)'
    },
    DB: {
        url: 'mongodb://localhost/odl'
    },
    GMAPI: {
        url: 'http://localhost:9090/globalmine-server/v2/',
        key: 'k',
        secret: 's'
    }
}
