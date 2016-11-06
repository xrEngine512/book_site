angular.
module('commentsModule').
factory('commentsFactory', ['$resource', function($resource) {
	var url = '/static/json/comments.json';
	return $resource(url, null, {
		list: {
			method: "GET",
			params: {},
			isArray: true,
			cache: true,
		}, 
		query: {
			method: "GET",
			params: {},
			isArray: false,
			cache: true,
		},
		save: {
			method: "POST"
		},
		update: {
			method: "PUT"
		}
	});
}]).
component('commentsComponent', {
	templateUrl: '/static/comments/comments.template.html',
	controller: ['commentsFactory', 
		function(commentsFactory) {
			var self = this;

			self.comments = commentsFactory.list();
		}
	]
});