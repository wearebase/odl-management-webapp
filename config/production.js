module.exports = {
	ODL: {
		port: process.env.PORT,
    	greeting: 'Hello ODL!! (this is production)'
    },
	DB: {
		url: process.env.MONGOLAB_URI
    }
}