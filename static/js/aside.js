gApp.controller('asideController', function(filtersFactory, Tags) {
    Tags.query({tag_class: 'Жанр'}, function (tags) {
        this.listCategories = tags;
    }.bind(this));



    this.addCategoryActiveList = function($event) {
        if ($event.selected == true)
            filtersFactory.addCategoryActiveList($event.value);
        else
            filtersFactory.closeChipCategory($event.value);
    };
});
