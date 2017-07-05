gApp.controller('asideController', function($scope, Genres) {
    /*---- Definitions ----*/
    this.onSelectionChange = function (senderCategory) {
        if (senderCategory.selected == true)
            this.addCategoryActiveList(senderCategory);
        else
            this.closeChipCategory(senderCategory);
    }.bind(this);

    this.addCategoryActiveList = function(category) {
        if ($scope.listActiveCategories.indexOf(category.id) == -1)
            $scope.listActiveCategories.push(category.id);
    };

    this.closeChipCategory = function(chipCategory) {
        var i = $scope.listActiveCategories.indexOf(chipCategory.id);
        if (i > -1)
            $scope.listActiveCategories.splice(i, 1);
    };

    this.clearCategoryActiveList = function () {
        $scope.listCategories.forEach(function (category) {
            category.selected = false;
        });
        $scope.listActiveCategories.length = 0;
    };

    /*--- Actions ----*/
    $scope.listActiveCategories = [];

    Genres.query({}, function (genres) {
        $scope.listCategories = genres;
    });
});
