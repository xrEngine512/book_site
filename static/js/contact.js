/* Add Google Maps */

angular.module('BookStoreApp').controller('contactsController', function($scope) {
    resetAllTabs();
    document.getElementById('navbar-tab-contacts').className = 'active';

    var vladimir = new google.maps.LatLng(56.133333, 40.416667);

    var mapProp = {
        center:vladimir,
        zoom:10,
        scrollwheel:false, // изменение масштаба прокруткой
        draggable:true,    // перемещаться по карте с помощью зажатия ЛКМ
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

    var city = new google.maps.Circle({
        center:vladimir,
        radius:1000,
        strokeColor:"#0000ff",
        strokeOpacity:0.5,
        strokeWeight:2,
        fillColor:"#0000ff",
        fillOpacity:0.3
    });

    city.setMap(map);

    var infowindow = new google.maps.InfoWindow({
        content:"Привет!",
    });

    infowindow.setPosition({lat: 56.133333, lng: 40.416667});
    infowindow.open(map,city);
});