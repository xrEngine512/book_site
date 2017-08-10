angular.
module('qnaModule').
component('qnaComponent', {
	templateUrl: '/static/qna/qna.template.html',
	controller: [
		function qnaController() {
			var self = this;

            self.questions = [
				{
					"title": "Кофе он или оно?",
					"content": "Он"
				},
				{
					"title": "Никишечкин любит нейронные сети?",
					"content": "Нет"
				}
			];

			self.isOpen = false;
		}
	]
});
