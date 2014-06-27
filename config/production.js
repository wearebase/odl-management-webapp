module.exports = {
    ODL: {
        port: process.env.PORT        
    },
    DB: {
        url: process.env.MONGOLAB_URI
    },
    GMAPI: {
        url: process.env.GMAPI_URL,
        key: process.env.GMAPI_KEY,
        secret: process.env.GMAPI_SECRET
    }
}