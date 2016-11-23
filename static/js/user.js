gApp.controller('userController', function($uibModalInstance) {
    var $user = this;

    $user.close = function() {
        $uibModalInstance.dismiss('close');
    };
});
