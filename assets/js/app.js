//Initialize Javascript of Materialize framework
$(document).ready(function(){
            M.AutoInit();
        });

//Mapbox implementation ----------------------------------------------------

mapboxgl.accessToken = 'pk.eyJ1IjoidGhvbWFzdmtsaW5rIiwiYSI6ImNrbXQ4M296bDBpdXEycG13NGYwcnM4Z2YifQ.Y-HjTi_KvGjUZAm0oN8yRg';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/thomasvklink/ckmt8g4m63rt517o51ekxr8jd',
    center: [6.893281367468944, 52.21924535469515],
    zoom: 12,
});

// Add function to display user location control to the map.
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: false
        },
        trackUserLocation: false
        })
);

// When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
map.on('click', 'speeltuinen', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(description)
    .addTo(map);
});

// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'places', function () {
    map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'places', function () {
    map.getCanvas().style.cursor = '';
});

//Navigation ---------------------------------------------------------------

const swiper = new Swiper('.swiper-container', { //Create instance of Swiper
      speed: 400, //Set speed of transistion
      spaceBetween: 100,
      allowTouchMove: false, //Disable interaction directly by user
      initialSlide: 1, //Start on slide 2 (Match)
});

function navProfile(){ //Navigate to profile page (slide 0)
    resetMap();
    swiper.slideTo(0);
    resetNav();
}

function navMatch(){ //Navigate to match page (slide 1)
    resetMap();
    swiper.slideTo(1);
    resetNav();
    document.getElementById("icon-match").classList.add('red-text', 'lighten-2'); //Set icon color to red illustrate that this item is active
}

function navMap(){ //Navigate to map page (slide 2)
    swiper.slideTo(2);
    resetNav();
    document.getElementById("icon-map").classList.add('red-text', 'lighten-2');
    document.getElementById("swiper").style.visibility = "hidden";
    document.getElementById("map").style.visibility = "visible";
    
    setTimeout(function (){
        map.resize();
    }, 100);
}

function navChat(){ //Navigate to chat page (slide 3)
    resetMap();
    swiper.slideTo(3);
    resetNav();
    document.getElementById("icon-chat").classList.add('red-text', 'lighten-2');
    document.getElementById("message-bar").style.display = "";
}

function navInfo(){ //Navigate to info page (slide 4)
    resetMap();
    swiper.slideTo(4);
    resetNav();
    document.getElementById("icon-info").classList.add('red-text', 'lighten-2');
}

function resetNav(){ //Reset icon highlight colors in nav
    document.getElementById("icon-match").classList.remove('red-text', 'lighten-2');
    document.getElementById("icon-map").classList.remove('red-text', 'lighten-2');
    document.getElementById("icon-chat").classList.remove('red-text', 'lighten-2');
    document.getElementById("icon-info").classList.remove('red-text', 'lighten-2');
    document.getElementById("message-bar").style.display = "none";
}

function resetMap(){ //Hide the map and display the swiper (pages)
    document.getElementById("swiper").style.visibility = "visible";
    document.getElementById("map").style.visibility = "hidden";
}

//Matching -----------------------------------------------------------------

function match(){ //Fake a matching process for demo
    document.getElementById('match-screen-1').style.display = "none";
    document.getElementById('match-screen-2').style.display = "";
    setTimeout(function (){
        document.getElementById('match-screen-2').style.display = "none";
        document.getElementById('match-screen-3').style.display = "";
    }, 5000); 
}