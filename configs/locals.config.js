module.exports = app => {
    app.locals.title = 'Backend generator (auth included!)'
    app.locals.mapsApiKey = process.env.GOOGLEMAPSAPIKEY
}