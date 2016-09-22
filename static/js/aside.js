gApp.controller('asideController', function(filtersFactory) {
	this.listCategories = [
		{selected: false, id: 'check1', name: 'Все'}, 
		{selected: false, id: 'check2', name: 'Анархизм'}, 
		{selected: false, id: 'check3', name: 'Мемуары'}, 
		{selected: false, id: 'check4', name: 'Рассказы'}, 
		{selected: false, id: 'check5', name: 'Романы'}, 
		{selected: false, id: 'check6', name: 'Фэнтези'},
	];	

	this.addCategoryActiveList = function($event) {
		if($event.selected == true)
			filtersFactory.addCategoryActiveList($event.name);
		else 
			filtersFactory.closeChipCategory($event.name);
	};
});