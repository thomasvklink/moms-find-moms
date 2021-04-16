// --- Moms find Moms ---
// Creative Technology - Living and Working Tomorrow Project Prototype
// Group 17 - Mommification
// by Thomas van Klink - t.vanklink@student.utwente.nl
// April 2021
// ----------------------

//Initialize Javascript of Materialize framework
$(document).ready(function(){
            M.AutoInit();
        });

//Mapbox implementation ----------------------------------------------------

mapboxgl.accessToken = 'pk.eyJ1IjoidGhvbWFzdmtsaW5rIiwiYSI6ImNrbXQ4M296bDBpdXEycG13NGYwcnM4Z2YifQ.Y-HjTi_KvGjUZAm0oN8yRg';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/thomasvklink/ckmt8g4m63rt517o51ekxr8jd', 
    //This style is created in Mapbox Studio and also includes the three locations layers we display on the map.
    center: [6.893281367468944, 52.21924535469515], //Centered on Enschede by default.
    zoom: 12, //Standard zoom level for map
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

//HTML Pop-up on map for walking-locations layer, build after Mapbox's example code
map.on('click', 'walking-locations', function (e) { 
    var coordinates = e.features[0].geometry.coordinates.slice(); //Get coordinates of locations in dataset
    var description = e.features[0].properties.description; //Get HTML description of location (Raw HTML)

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) { //Calculate if the mouse is near a point
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
}
    
new mapboxgl.Popup() //Create a pop-up on the correct coordinates with the HTML description and add it to the map.
    .setLngLat(coordinates)
    .setHTML(description)
    .addTo(map);
});

//HTML Pop-up on map for the playgrounds layer
map.on('click', 'playgrounds', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
}
    
new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(description)
    .addTo(map);
});

//HTML Pop-up on map for the amusement-locations layer
map.on('click', 'amusement-locations', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;

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

//Profile ------------------------------------------------------------------

var forename, surname, email; //Defining variables
let profile = [forename, surname, email]; //Defining array
var profileCheck = false; //Defining check boolean

function setProfile(){
    forename = document.getElementById("first_name").value;
    surname = document.getElementById("last_name").value;
    email = document.getElementById("email").value;
    
    profile = [forename, surname, email]; //Store data in array
    
    if (forename === ""){ //Check if the user actually entered at least the forename field
        alert("Please fill in the required fields.");
    } else {
        loadProfile(); //Load the profile data into the page
        profileCheck = true; //The profile has been created set check variable to true
    }
    
}

function loadProfile(){ //Loading the profile into the page
    
    if (profile.length === 0){ //If the array is empty, the profile has not been set yet.
        
        console.log("No data stored");
        
    } else{
        
        document.getElementById("profile_name").textContent = profile[0] + " " + profile[1]; //Set profile button to name
        
        //Create a new html H3 tag with profile name to display on match page
        var para = document.createElement("h3");
        var node = document.createTextNode(profile[0]);
        para.appendChild(node);
        var div = document.getElementById("match-title");
        div.appendChild(para);
        
        
        //Launch succes modal with just set name included
        document.getElementById("modal-name").textContent = profile[0] + "!";
        const elem = document.getElementById('modal-profile-succes');
        const instance = M.Modal.init(elem, {dismissible: false});
        instance.open();
        }
        
    }
    
//Matching -----------------------------------------------------------------

function match(){ //Fake a matching process for demo
    
    if (profileCheck){ //Check if user created a profile, if so start matching
        
        document.getElementById('match-screen-1').style.display = "none";
        document.getElementById('match-screen-2').style.display = "";
        setTimeout(function (){ //After 5 seconds of "searching" display the set match
            document.getElementById('match-screen-2').style.display = "none";
            document.getElementById('match-screen-3').style.display = "";
        }, 5000); 
        
    } else { //No profile has been set up yet
        
        //Launch modal to inform the user to create a profile
        const elem = document.getElementById('modal-no-profile');
        const instance = M.Modal.init(elem, {dismissible: false});
        instance.open();
        
    }
    
}