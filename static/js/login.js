gApp.controller('loginDialogController', function($rootScope, $scope, $uibModalInstance, User) {
	var $login = this;

    $login.getCredentials = function () {
        return $login.username + ':' + $login.password;
    };

    $login.setStateLoggedIn = function(data){

    };

	$login.close = function() {
        $uibModalInstance.dismiss('close');
    };

    $login.submit = function () {
        User.auth($login.getCredentials).login().$promise.then(function (data) {
            $login.close();
            $rootScope.$broadcast('logged_in', data);
        }).catch(function (data) {
            console.error(data);
        });
    };
});