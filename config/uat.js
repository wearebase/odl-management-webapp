module.exports = {
    DEV: true,

    ODL: {
        port: process.env.PORT        
    },
    DB: {
        url: process.env.MONGOLAB_URI
    },
    GMAPI: {
        url: 'http://localhost:' + process.env.PORT + '/globalmine-server/v2/',
        key: 'k',
        secret: 's'
    }
}
