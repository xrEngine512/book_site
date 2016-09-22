gApp.controller('loginDialogController', function($scope, $uibModalInstance) {
	var $login = this;

	$login.close = function() {
        $uibModalInstance.dismiss('close');
    }
});