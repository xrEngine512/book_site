angular.
module('qnaModule').
component('qnaComponent', {
	templateUrl: '/static/qna/qna.template.html',
	controller: ['$http', 
		function qnaController($http) {
			var self = this;

			$http.get('/static/json/qna.json').then(function(response) {
                self.questions = response.data;
            });

			self.isOpen = false;
			console.log(self.isOpen);
		}
	]
});

