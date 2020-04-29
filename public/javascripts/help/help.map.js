const knowledgeList = []
let myMap

const getPlaces = () => {

    document.querySelectorAll('.knowledge-field').forEach(elm => knowledgeList.push(elm.innerHTML))

    axios.get(`http://localhost:3000/findCollaborations?knowledgeList=${knowledgeList}`)
        .then(response => {
            console.log(response)
            placeCollaboration(response.data)
        })
        .catch(error => console.log(error))
}

const placeCollaboration = collaborations => {
    collaborations.forEach((elm) => {
        const center = {
            lat: elm.location.coordinates[0],
            lng: elm.location.coordinates[1]
        }
        new google.maps.Marker({
            position: center,
            map: myMap,
            title: elm.name
        })
    })
}

initMap = () => {

    let mapOptions = {
        center: directions.centroMadrid.coords,
        zoom: 12
    }
    myMap = new google.maps.Map(document.getElementById('map'), mapOptions)

    let helperPosition

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                helperPosition = { lat: position.coords.latitude, lng: position.coords.longitude }
                myMap.setCenter(helperPosition)

                let markerOptions = {
                    position: helperPosition,
                    map: myMap,
                    title: "Tú estás aqui",
                }
                new google.maps.Marker(markerOptions)
            },
            error => console.error("Couldn't find a location:", error),
            { enableHighAccuracy: true }
        )
    } else {
        console.error("Couldn't use geolocation")
    }

    getPlaces()
}