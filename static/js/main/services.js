/**
 * Created by islam on 14.01.17.
 */

gApp.factory('CartService', function ($localStorage) {
    if (!('cartItems' in $localStorage))
        $localStorage.cartItems = {};

    function idOf(item) {
        return +(typeof item === "object" ? item.id : item);
    }

    var ServiceState = {
        items: $localStorage.cartItems,
        itemsCount: Object.keys($localStorage.cartItems).length,
        updateItemsCount: function () {
            this.itemsCount = Object.keys(this.items).length;
        }
    };

    var ServiceInterface = {};

    ServiceInterface.inCart = function (item) {
        return item.id in ServiceState.items;
    };

    ServiceInterface.addToCart = function (item) {
        ServiceState.items[idOf(item)] = 1;
        ServiceState.updateItemsCount();
    };

    ServiceInterface.removeFromCart = function (item) {
        delete ServiceState.items[idOf(item)];
        ServiceState.updateItemsCount();
    };

    ServiceInterface.getIDs = function () {
        var ids = Object.keys(ServiceState.items);
        return ids.length ? ids : [0];
    };

    ServiceInterface.getFilter = function () {
        return {ids: this.getIDs().join()}
    };

    ServiceInterface.setQuantity = function (item) {
        if (item.quantity == 0)
            this.removeFromCart(item);
        else {
            ServiceState.items[item.id] = item.quantity;
            ServiceState.updateItemsCount();
        }
    };

    ServiceInterface.getQuantity = function (item) {
        if(!(idOf(item) in ServiceState.items))
            return 0;
        return ServiceState.items[idOf(item)];
    };

    ServiceInterface.getItemsCount = function () {
        return ServiceState.itemsCount;
    };

    ServiceInterface.ceilQuantity = function (product) {
        ServiceState.items[product.id] = Math.min(ServiceState.items[product.id], product.in_stock);
    };

    return ServiceInterface;
});
