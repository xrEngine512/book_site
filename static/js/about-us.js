/**
 * Created by islam on 06.06.16.
 */

angular.module('BookStoreApp').controller('aboutUsController', function ($scope, initialize) {
    initialize($scope);
    document.getElementById('navbar-tab-about-us').className = 'active';
});
