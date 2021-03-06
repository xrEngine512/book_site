gApp.filter('inArray', function ($filter) {
    return function (array, arrayFilter, key) {
        return $filter('filter')(array, function (item) {
            return arrayFilter.indexOf(item[key]) != -1;
        });
    };
});
