angular.module('BookStoreApp').controller('cartController', function ($scope, $uibModalInstance, items){
    $scope.items = items;       //translate items from outer scope
    
    $scope.getSummary = function () {
        var sum = 0;
        $scope.items.forEach(function (item) {
            sum += item.quantity * item.price;
        });
        return sum;
    };
    
    $scope.close = function() {
        $uibModalInstance.dismiss('close');
    }
});