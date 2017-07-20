gApp.controller('registrationDialogController', function($scope, $uibModalInstance, User) {

    var $registration = this;

    $registration.close = function() {
        $uibModalInstance.close();
    };

    $registration.submit = function () {
        $scope.failure = undefined;
        $scope.status = undefined;

        User.users.create($scope.account, function (user) {
            $scope.failure = undefined;
            $scope.status = 'Письмо для активации отправлено на почту "{}"'.format(user.email);
        }, function (response) {
            $scope.status = undefined;
            $scope.failure = 'Не удалось выполнить регистрацию: ' + response.data.reason;
        });
    };
});
