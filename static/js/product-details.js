gApp.controller('productDetailsController', function($scope, $routeParams, Books) {
    Books.get({
        id: $routeParams.id
    }, function(data){
        $scope.book = data;
        if(!$scope.book.age_restriction)
            $scope.book.age_restriction = {short: 'нет'};
    });
});
