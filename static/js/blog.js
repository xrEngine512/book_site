/**
 * Created by islam on 20.07.16.
 */

gApp.controller('blogController', function($scope, $http, initialize, Blog) {
    initialize($scope);
    document.getElementById('navbar-tab-blog').className = 'active';
    Blog.query({}, function (data) {
        $scope.blog_entries = data;
    });
});
