/**
 * Created by islam on 20.07.16.
 */

gApp.controller('blogController', function($scope, $http, Blog) {
    Blog.query({}, function (data) {
        $scope.blog_entries = data;
    });
});
