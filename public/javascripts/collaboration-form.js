getLocation = () => {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
            position => {
                console.log("La posición es:", position)
                const geocoder = new google.maps.Geocoder()
                geocoder.geocode({ 'location': { lat: position.coords.latitude, lng: position.coords.longitude } },
                    (results, status) => {
                        if (status === 'OK') {
                            if (results[0]) {
                                console.log('La calle es', results[0])
                            }
                        } else {
                            console.error("No se puedo obtener la localización:")
                        }
                    })
            },
            error => console.error("No se puedo obtener la localización:", error),
            { enableHighAccuracy: true }
        )
    } else {
        console.error("El navegador no dispone de geolocalizador")
    }
}