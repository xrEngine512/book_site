gApp.controller('registrationDialogController', function($uibModalInstance) {

    var $registration = this;

    $registration.close = function() {
        $uibModalInstance.dismiss('close');
    }
});
