let collabMap

initMap = () => {

    let mapOptions = {
        center: {
            lat: 41.566230,
            lng: -2.1749801
        },
        zoom: 6
    }

    let markers

    collabMap = new google.maps.Map(document.getElementById('collabMap'), mapOptions)
    const collaborationId = document.getElementById('collabMap').getAttribute('collaborationId')

    axios.get(`/${collaborationId}/place`)
        .then(response => putMarkers(response.data))
        .catch(error => console.log(error))

}

function putMarkers(collaboration) {
    const coord = {
        lat: collaboration.location.coordinates[0],
        lng: collaboration.location.coordinates[1]
    }

    new google.maps.Marker({ position: coord, map: collabMap, title: collaboration.collaborationType })
    collabMap.setCenter(coord)
    collabMap.setZoom(17)

}
