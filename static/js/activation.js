gApp.controller('activationController', function($scope, $routeParams, $window, $timeout, User) {
    User.users.activate({activation_key: $routeParams.key}, function(user) {
        $scope.user = user;
        $timeout(function () {
            $window.location.href = '/home';
        }, 5000)
    }, function(error) {
        $scope.error = error;
    });
});
