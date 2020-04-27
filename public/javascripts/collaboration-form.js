getLocation = () => {

    const inputLat = document.querySelector('.geolocation #lat')
    const inputLng = document.querySelector('.geolocation #lng')
    const inputLocation = document.querySelector('.geolocation input')
    const searchBox = new google.maps.places.SearchBox(inputLocation);
    const geocoder = new google.maps.Geocoder()

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
            position => {
                inputLat.value = position.coords.latitude
                inputLng.value = position.coords.longitude

                geocoder.geocode({ 'location': { lat: position.coords.latitude, lng: position.coords.longitude } },
                    (results, status) => {
                        if (status === 'OK') {
                            if (results[0]) {
                                inputLocation.value = results[0].formatted_address
                            }
                        } else {
                            console.error(`Geocode was not successful for the following reason: ${status}`)
                        }
                    })
            },
            error => console.error("Couldn't find a location:", error),
            { enableHighAccuracy: true }
        )
    } else {
        console.error("Couldn't use geolocation")
    }

    // SearchBox adress is changed
    searchBox.addListener('places_changed', () => {
        geocoder.geocode({ 'address': searchBox.getPlaces()[0].formatted_address }, (results, status) => {
            if (status === 'OK') {
                inputLat.value = results[0].geometry.location.lat()
                inputLng.value = results[0].geometry.location.lng()
            } else {
                alert(`Geocode was not successful for the following reason: ${status}`);
            }
        })
    })
}