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
}
