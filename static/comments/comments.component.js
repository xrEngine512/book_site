angular.
module('commentsModule').component('commentsComponent', {
    templateUrl: '/static/comments/comments.template.html',
    bindings: {
        appState: '<',
        book: '<',
        blog_entry: '<'
    },
    controller: function(Comments) {
        this.handleComments = function (comments) {
            this.comments = comments;
            this.numberComments = comments.length;
        }.bind(this);

        this.addComment = function() {
            Comments.save(tools.union(this.context, {text: document.getElementById('textareaComment').value}), this.handleComments);
            document.getElementById('textareaComment').value = '';
        }.bind(this);

        this.deleteComment = function(id) {
            Comments.remove(tools.union(this.context, {id: id}), this.handleComments);
        }.bind(this);

        this.context = {};

        if(this.book)
            this.context = {book_id: this.book.id};
        else if(this.blog_entry)
            this.context = {blog_entry_id: this.blog_entry.id};

        Comments.query(this.context, this.handleComments);
    }
});
