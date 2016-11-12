gApp.controller('blogController', function($scope, $http, Blog) {
    Blog.query({}, function(data) {
        $scope.blog_entries = data;
    });
});
