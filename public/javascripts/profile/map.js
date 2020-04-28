initMap = () => {

    let mapOptions = {
        center: directions.centroMadrid.coords,
        zoom: 16,
    }


    const myMap = new google.maps.Map(document.getElementById('map'), mapOptions)

    let markerOptions = {
        position: directions.centroMadrid.coords,
        map: myMap,
        title: directions.centroMadrid.title
    }

    new google.maps.Marker(markerOptions)

    const markers = []

    let center = {
        lat: undefined,
        lng: undefined
    };

    function getPlaces() {
        console.log('Entra en getPlaces')
        axios.get("http://localhost:3000/all-petitions")
            .then(response => {
                console.log(response.data)
                placeCollaboration(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    function placeCollaboration(collaborations) {
        console.log('hola Fran', collaborations)
        collaborations.forEach((collaboration) => {
            console.log(collaboration)
            const center = {
                lat: collaboration.location.coordinates[0],
                lng: collaboration.location.coordinates[1]
            };
            new google.maps.Marker({
                position: center,
                map: myMap,
                title: collaboration.name
            });
        });
    }

    getPlaces()

}
