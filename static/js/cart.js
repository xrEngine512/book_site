gApp.controller('cartControllerModal', function ($scope, $uibModalInstance, items) {
    $scope.items = items;       //translate items from outer scope
    
    $scope.getSummary = function () {
        var sum = 0;
        $scope.items.forEach(function (item) {
            sum += item.quantity * item.price;
        });
        return sum;
    };
    
    $scope.removeItem = function (index) {
        $scope.items.splice(index, 1);
    };

    $scope.close = function() {
        $uibModalInstance.dismiss('close');
    }
});

gApp.controller('cartControllerShowContent', function(cartFactory) {
    this.books = cartFactory.getBooks();

    this.totalPrice = 0;
// Ошибка! доделать, вызывается при наведении
    this.getTotalPrice = function() {
        if(this.books.length <= 0) return;
        for (var i = 0; i < this.books.length; i++) {  
            this.totalPrice += this.books[i].price;
            console.log(this.totalPrice);
        }
    };
});