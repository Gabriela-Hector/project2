getLocation = () => {

    const inputLocation = document.querySelector('.geolocation input')
    const searchBox = new google.maps.places.SearchBox(inputLocation);

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
                                inputLocation.value = results[0].formatted_address
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
    
    // SearchBox adress is changed
    // searchBox.addListener('places_changed', () => console.log('el nuevo lugar es', searchBox.getPlaces()))
}