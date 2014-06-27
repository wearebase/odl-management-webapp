module.exports = {
    DEV: true,

    ODL: {
        port: process.env.PORT        
    },
    DB: {
        url: process.env.MONGOLAB_URI
    },
    GMAPI: {
        url: 'http://localhost:9090/globalmine-server/v2/',
        key: 'k',
        secret: 's'
    }
}
