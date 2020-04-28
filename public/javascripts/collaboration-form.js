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


const inputAudio = document.querySelector('.audioDescription input')

let audioChunks = []
let rec
let recordedAudio = document.querySelector('#recordedAudio')

navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => { handlerFunction(stream) })

function handlerFunction(stream) {
    rec = new MediaRecorder(stream)
    rec.ondataavailable = e => {
        audioChunks.push(e.data)
        if (rec.state == "inactive") {
            let blob = new Blob(audioChunks, { type: 'audio/mpeg-3' })

            let path = URL.createObjectURL(blob)

            fetch(URL.createObjectURL(blob)).then(r => {
                r.blob()
                    .then(response => console.log(response))
            })

            //path = path.substr(5, path.length - 6)

            // const file = new File([blob], path, { type: 'audio/mpeg-3', lastModified: Date.now() })

            // recordedAudio.src = path
            // recordedAudio.controls = true
            // recordedAudio.autoplay = true

            // inputAudio.value = path
            //axios.get(`http://localhost:5000/collaboration-request/audiofile?blob=${recordedAudio.src}`)
            //  .then()
        }
    }
}

// function sendData(data) {
//     const file = new File([data], 'audio.mp3', { type: 'audio/mpeg-3', lastModified: Date.now() })
//     console.log('Blob esta aqui', file);


// }

record.onclick = e => {
    console.log('I was clicked')
    record.disabled = true
    record.style.backgroundColor = "blue"
    stopRecord.disabled = false
    audioChunks = []
    rec.start()
}
stopRecord.onclick = e => {
    console.log("I was clicked")
    record.disabled = false
    stop.disabled = true
    record.style.backgroundColor = "red"
    rec.stop()
}

// //Copyright (c) 2020 by Jeremy Gottfried (https://codepen.io/jeremyagottfried/pen/bMqyNZ)