module.exports = app => {
    app.locals.title = 'Yava | Colaboración entre vecinos'
    app.locals.mapsApiKey = process.env.GOOGLEMAPSAPIKEY
}