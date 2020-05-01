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

const inputAudio = document.querySelector('.audio-description input')

let audioChunks = []
let rec
const startRecord = document.querySelector('#record')
const stopRecord = document.querySelector('#stop-record')
const msgRecord = document.querySelector('#msg-record')

navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => { handlerFunction(stream) })

function handlerFunction(stream) {
    rec = new MediaRecorder(stream)
    rec.ondataavailable = e => {
        audioChunks.push(e.data)
        if (rec.state == "inactive") {
            let blob = new Blob(audioChunks, { type: 'audio/mpeg-3' })

            let formData = new FormData()
            formData.append("audioRequest", blob)
            axios.post('/collaboration-request/uploadAudio', formData)
                .then(response => inputAudio.value = response.data)
                .catch(err => console.log("error", err))
        }
    }
}

startRecord.onclick = e => {
    startRecord.style.display = 'none'
    stopRecord.style.display = 'inline'
    audioChunks = []
    rec.start()
}
stopRecord.onclick = e => {
    stopRecord.style.display = 'none'
    msgRecord.style.display = 'inline'
    rec.stop()
}
