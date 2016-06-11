/* Add Google Maps */

angular.module('BookStoreApp').controller('contactsController', function($scope, initialize) {
    initialize($scope);
    document.getElementById('navbar-tab-contacts').className = 'active';

    $scope.vladimir = new google.maps.LatLng(56.133333, 40.416667);

    $scope.mapProp = {
        center: $scope.vladimir,
        zoom:10,
        scrollwheel:false, // изменение масштаба прокруткой
        draggable:true,    // перемещаться по карте с помощью зажатия ЛКМ
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("googleMap"), $scope.mapProp);

    $scope.city = new google.maps.Circle({
        center: $scope.vladimir,
        radius:1000,
        strokeColor:"#0000ff",
        strokeOpacity:0.5,
        strokeWeight:2,
        fillColor:"#0000ff",
        fillOpacity:0.3
    });

    $scope.city.setMap($scope.map);

    $scope.infowindow = new google.maps.InfoWindow({
        content:"Привет!",
    });

    $scope.infowindow.setPosition({lat: 56.133333, lng: 40.416667});
    $scope.infowindow.open($scope.map, $scope.city);
});
