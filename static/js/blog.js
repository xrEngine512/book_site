/**
 * Created by islam on 20.07.16.
 */

angular.module('BookStoreApp').controller('blogController', function($scope, $http, initialize) {
    initialize($scope);
    document.getElementById('navbar-tab-blog').className = 'active';
    $http.get("blog_entries").then(function (response) {
       $scope.blog_entries = response.data.blog_entries;
    });
});
