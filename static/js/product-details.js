gApp.controller('productDetailsController', function($scope, $routeParams, booksFactory) {
	var idbooks = Number($routeParams.idBook);
	// медленный поиск и еще вызов json
	booksFactory.booksFromJson(function(booksFactory) {
		for (var i = 0; i < booksFactory.products.length; i++) {
			if(booksFactory.products[i].id == idbooks)
				$scope.book = booksFactory.products[i];
		}
	});
});
