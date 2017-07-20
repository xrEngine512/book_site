gApp.controller('userController', function($scope, $uibModalInstance, Profile) {
    var $user = this;

    $user.close = function() {
        $uibModalInstance.close();
    };

    if ($scope.applicationState.auth.user)
        Profile.get({
            user_id: $scope.applicationState.auth.user.id
        }, function(data) {
            $scope.profile = data;
        });
});
