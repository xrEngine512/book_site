/**
 * Created by islam on 20.07.16.
 */

angular.module('BookStoreApp').controller('blogController', function($scope, initialize) {
    initialize($scope);
    document.getElementById('navbar-tab-blog').className = 'active';
});
