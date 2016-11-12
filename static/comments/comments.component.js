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
        },
        delete: {
            method: "DELETE"
        }
    });
}]).
component('commentsComponent', {
    templateUrl: '/static/comments/comments.template.html',
    controller: ['commentsFactory',
        function(commentsFactory) {
            var self = this;

            self.comments = commentsFactory.list();

            self.comments.$promise.then(function(data) {
                self.numberComments = data.length;

                self.addCommentView = function() {
                    self.tempComment = document.getElementById('textareaComment').value;
                    var _maxId = maxId();
                    self.comments.push({
                        "id": ++_maxId,
                        "comment": self.tempComment
                    });
                    self.numberComments++;
                };

                self.deleteComment = function(id) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].id == id) {
                            var index = i;
                        }
                    }
                    data.splice(index, 1);
                    self.numberComments--;
                };

                var maxId = function() {
                    if (data.length < 1) {
												return 0;
                    }
                    var max = data[0].id;
                    for (var i = 0; i < self.numberComments; i++) {
                        if (max < data[i].id) {
                            max = data[i].id;
                        }
                    }
                    return max;
                };
            });



            // self.firstComment = commentsFactory.get({id: 1});

            /*
            self.postComment = function() {
                  var tempComment = document.getElementById('textareaComment').value;

                  commentsFactory.save({
                      comment: tempComment
                  });
            };*/

            // commentsFactory.update({id: 2}, { comment: "update data for comment" });


        }
    ]
});
