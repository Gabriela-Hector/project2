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

  let center = {
    lat: undefined,
    lng: undefined
  };

  function getPlaces() {
    axios.get("http://localhost:3000/profile")
      .then(response => {
        placeCollaboration(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  function placeCollaboration(collaborations) {
    collaborations.forEach((collaboration) => {

      const center = {
        lat: location.coordinates[0],
        lng: location.coordinates[1]
      };
      const pin = new google.maps.Marker({
        position: center,
        map: map,
        title: collaboration.name
      });
      markers.push(pin);
    });
  }

  getPlaces()

}
