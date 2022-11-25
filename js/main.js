// Coded BY Freell(https://freell.top)

$(".start").click(function() {
    $('.leaflet-control').hide();
    anime({
        targets: ['.start'],
        backgroundColor: '#F72C5B',
        duration: 100,
        easing: 'easeInOutSine'
    });
    anime({
        targets: ['.start'],
        scale: 30,
        duration: 3000,
        delay: 100,
    });
    setTimeout(function() {
        $('.bg').remove();
        $('.start').remove();
    }, 500);
    // show_map(800);
    // show_control(800);
    $('.vlrout2').show();
    show_vleft(800);
    show_vright(800);
    show_vbutton(800);
});

var show_vleft = function(delay=0) {
    anime({
        targets: ['.vleft'],
        translateX: '140%',
        duration: 1000,
        easing: 'easeInOutSine',
        delay: delay
    });
}

var show_vright = function(delay=0) {
    anime({
        targets: ['.vright'],
        translateX: '-140%',
        duration: 1000,
        easing: 'easeInOutSine',
        delay: delay
    });
}

var show_vbutton = function(delay=0) {
    anime({
        targets: ['.vlrout2'],
        opacity: 1,
        duration: 1000,
        easing: 'easeInOutSine',
        delay: delay
    });
}

var hide_vleft = function(delay=0) {
    anime({
        targets: ['.vleft'],
        translateX: '0%',
        duration: 1000,
        easing: 'easeInOutSine',
        delay: delay
    });
}

var hide_vright = function(delay=0) {
    anime({
        targets: ['.vright'],
        translateX: '0%',
        duration: 1000,
        easing: 'easeInOutSine',
        delay: delay
    });
}

var show_map = function(delay=0) {
    anime({
        targets: ['.map'],
        translateX: '100%',
        duration: 1000,
        easing: 'easeInOutSine',
        delay: delay
    });
}

var show_control = function(delay=0) {
    anime({
        targets: ['.control'],
        translateX: '-100%',
        duration: 1000,
        easing: 'easeInOutSine',
        delay: delay
    });
}

var hide_map = function(delay=0) {
    anime({
        targets: ['.map'],
        translateX: 0,
        duration: 1000,
        easing: 'easeInOutSine',
        delay: delay
    });
}

var hide_control = function(delay=0) {
    anime({
        targets: ['.control'],
        translateX: 0,
        duration: 1000,
        easing: 'easeInOutSine',
        delay: delay
    });
}

// Coded BY Freell(https://freell.top)


// var lat = 23.12215912195709;
// var lng = 113.33481281681468;
// var map = L.map('map').setView([lat,lng], 11);

// L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map);

// var geojsonMarkerOptions = {
//     radius: 5,
//     fillColor: "#ff7800",
//     color: "#ccc",
//     weight: 1,
//     opacity: 1,
//     fillOpacity: 0.8
// };

// var datas = [];

// function data_out(result){
//     datas = result;
//     var location = result.map( d => {
//         let o = new Object;
//         o.type = "Feature";
//         o.properties = d;
//         o.geometry = {"type":"Point", "coordinates": [+d.lng,+d.lat]};
//         return o;
//     });

//     var geojson = {
//         "type": "FeatureCollection",
//         "features": location
//     };

//     let citationDots = L.geoJson(geojson, {
//         pointToLayer: function (feature, latlng) {
//             // geojsonMarkerOptions.fillColor = feature.color;
//             return L.circleMarker(latlng, geojsonMarkerOptions);
//         }
//     })
//     .addTo(map)
//     .on('mouseover', function(e) {
//         let feature = e.layer.feature;
//         let popup = L.popup()
//             .setLatLng(e.latlng)
//             .setContent(feature.properties.Name)
//             .openOn(map);
//     })
//     .on('mouseout', function(e) {
//         map.closePopup();
//     })
//     .on('click',function(e) {
//         console.log(e.layer.feature.properties);
//         var innerdata = e.layer.feature.properties;
//         lng = innerdata.lng;
//         lat = innerdata.lat;
//         map.setView([lat,lng], 18);
//         var innerhtml = `<div class="name">`+ innerdata.Name +`</div>
//         <div class="address">地址：`+ innerdata.Address +`</div>`
//         $(".controlinner").html(innerhtml);
//     })
// }

// Coded BY Freell(https://freell.top)