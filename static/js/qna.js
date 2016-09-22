gApp.directive('onLastRepeat', function() {
	return function(scope, element, attrs) {
		if (scope.$last) setTimeout(function() {
			scope.$emit('onRepeatLast', element, attrs);
		}, 1);
	};
})
.controller('qnaController', function($scope) {
	$scope.questions = [
		{
			title: 'Кто такой Влад Микин?',
			content: 'Юный программист'
		},
		{
			title: 'Кофе он или оно?',
			content: 'Он'
		},
		{
			title: 'Никишечкин любит нейронные сети?',
			content: 'Нет'
		},
		{
			title: 'Как купить велосипед?',
			content: 'Пойти в магазин и купить'
		},
		{
			title: 'Откуда добраться легче до солнца от земли или от меркурия?',
			content: 'От земли'
		},
		{
			title: 'Корова ест траву?',
			content: 'Да, вместе с Никишечкиным'
		}
	];

	$scope.$on('onRepeatLast', function(scope, element, attrs) {
		var acc = document.getElementsByClassName("accordion");
		var i;

		for (i = 0; i < acc.length; i++) {
			acc[i].onclick = function(){
				this.classList.toggle("active");
				this.nextElementSibling.classList.toggle("show");
			}
		}
	});
});
