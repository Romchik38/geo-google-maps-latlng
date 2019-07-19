'use strict';
// Методы 
// getCurrentPosition(cb, err, timeout)
//  cb(position):
//   accuracy - в метрах
//   altitude - высота на уровнем моря
//   altitudeAccuracy - в метрах
//   heading the direction towards which the device is traveling. Expressed in degrees (0 = North, East = 90, South = 180, West = 270)
//   latitude - широта 
//   longitude - долгота
//   speed - скорость метров / секунду
//  err(error)
//   1 - permission denied
//   2 - position unavailable
//   3 - timeout
//  timeout
//   timeout - to set the number of milliseconds before the request errors out
//   maximumAge - to set the maximum “age” of the position cached by the browser. We don’t accept one older than the set amount of milliseconds
//   enableHighAccuracy - a boolean by default false, requires a position with the highest level of accuracy possible (which might take more time and more power)

// watchPosition()
// если местоположение меняется


// clearWatch()

const geo = navigator.geolocation;
const cbGetCurrent = (p) => {
    initialize(p);
};
const err = (e) => console.error(e);

//Единоразовое получениe позиции
const getPosistion = () => {
    geo.getCurrentPosition(cbGetCurrent, err);
};
getPosistion();

//Постоянно получение позиции при изменении ее
//const watch1 = geo.watchPosition(cbGetCurrent);

//прекращение отслеживания
// setTimeout(() => {
//     geo.clearWatch(watch1);
//     console.log('Отслеживание позиции прекращено');
// }, 60 * 1000);

//Наложение на карту
function initialize(obj) {
    const latitude = obj.coords.latitude;
    const longitude = obj.coords.longitude;
    const mapOptions = {
        zoom: 18,
        center: { lat: latitude, lng: longitude }
    };
    const map = new google.maps.Map(document.getElementById('map'),
        mapOptions);

    const marker = new google.maps.Marker({
        // The below line is equivalent to writing:
        // position: new google.maps.LatLng(-34.397, 150.644)
        position: { lat: latitude, lng: longitude },
        map: map
    });

    // You can use a LatLng literal in place of a google.maps.LatLng object when
    // creating the Marker object. Once the Marker object is instantiated, its
    // position will be available as a google.maps.LatLng object. In this case,
    // we retrieve the marker's position using the
    // google.maps.LatLng.getPosition() method.
    const infowindow = new google.maps.InfoWindow({
         content: '<p>Координаты: ' + marker.getPosition() + '</p>'
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });
}

//google.maps.event.addDomListener(window, 'load', initialize);

//Кнопка обновить
const updBtn = document.getElementById('updBtn');
updBtn.addEventListener('click', getPosistion); 