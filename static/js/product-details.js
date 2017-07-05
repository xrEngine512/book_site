gApp.controller('productDetailsController', function($scope, $routeParams, Books, CartService) {
    Books.get({
        id: $routeParams.id
    }, function(data){
        $scope.book = data;
        if(!$scope.book.age_restriction)
            $scope.book.age_restriction = {short: 'нет'};
    });

    $scope.addToCart = function () {
        CartService.addToCart($scope.book, $scope.quantity);
    };

    $scope.quantity = 1;
});
