gApp.controller('cartControllerModal', function($scope, $uibModalInstance, CartService, Books) {

    $scope.onBookInCartChange = function (item) {
        CartService.setQuantity(item);
        if(item.quantity == 0)
            return;
        $scope.summary = 0;
        $scope.items.forEach(function (item) {
            $scope.summary += item.quantity * item.price;
        });
    };

    $scope.removeItem = function (index) {
        var item = $scope.items.splice(index, 1)[0];
        CartService.removeFromCart(item);
        $scope.summary -= item.quantity * item.price;
    };

    $scope.close = function() {
        $uibModalInstance.close();
    };

    $scope.items = [];
    $scope.summary = 0;
    Books.query(CartService.getFilter(), function (books) {
        $scope.summary = 0;
        books.forEach(function (book) {
            CartService.ceilQuantity(book);
            book.quantity = CartService.getQuantity(book);
            $scope.summary += book.quantity * book.price;
        });
        $scope.items = books;
    });
});

gApp.controller('cartControllerShowContent', function(cartFactory) {
    this.books = cartFactory.getBooks();

    this.totalPrice = 0;
    // Ошибка! доделать, вызывается при наведении
    this.getTotalPrice = function() {
        if (this.books.length <= 0) return;
        for (var i = 0; i < this.books.length; i++) {
            this.totalPrice += this.books[i].price;
            console.log(this.totalPrice);
        }
    };
});
