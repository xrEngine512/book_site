gApp.controller('loginDialogController', function($rootScope, $scope, $uibModalInstance, User) {
    var $login = this;

    $login.getCredentials = function() {
        return $login.username + ':' + $login.password;
    };

    $login.close = function() {
        $uibModalInstance.close();
    };

    $login.submit = function() {
        var data = {
            'remember_me': $login.remember_me
        };
        User.auth($login.getCredentials).login(data).$promise.then(function(data) {
            $login.close();
            $rootScope.$broadcast('logged_in', data);
        }).catch(function(data) {
            console.error(data);
        });
    };
});
