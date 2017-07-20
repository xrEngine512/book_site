gApp.controller('logoutDialogController', function($rootScope, $scope, $uibModalInstance, User) {
    var $logout = this;

    $logout.setStateLoggedIn = function(data) {

    };

    $logout.close = function() {
        $uibModalInstance.close();
    };

    $logout.submit = function() {
        User.current.logout().$promise.then(function() {
            $logout.close();
            $rootScope.$broadcast('logged_out');
        }).catch(function(data) {
            console.error(data);
        });
    };
});
