module.exports = {
    ODL: {
        port: process.env.PORT,
        greeting: 'Hello ODL!! (this is production)'
    },
    DB: {
        url: process.env.MONGOLAB_URI
    },
    GMAPI: {
        url: process.env.GMAPI_URL,
        key: process.env.GMAPI_KEY,
        secret: process.env.GMAPI_SECRET
    },
    QR: {
        url: 'http://api.qrserver.com/v1/create-qr-code/'
    }
}