mapboxgl.accessToken = mapToken
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: campground.geometry.coordinates,
    zoom: 9
});
map.addControl(new mapboxgl.NavigationControl());

//we make a marker
new mapboxgl.Marker()
    //set the latitude and longitude where it should go
    .setLngLat(campground.geometry.coordinates)
    //set pop up on that marker (what happesn when a user clickes)
    .setPopup(
        //make that pop up
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
            `<h5>${campground.title}</h5><p>${campground.location}</p>`
        )
)
//add that marker to the map.
    .addTo(map)
