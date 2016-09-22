/**
 * Created by islam on 23.08.16.
 */

function multipartRequest(data) {
    var formData = new FormData();
    for (var field in data)
        if(data.hasOwnProperty(field)) {
            var value = data[field];
            formData.append(field, typeof value == 'object' && value.constructor != File ? angular.toJson(value) : value);
        }

    return formData;
}

gApp.factory('Blog', function ($resource) {
    return $resource('api/blog_entry/:entryID/', {}, {
        save: {
            method: 'POST',
            transformRequest: multipartRequest,
            headers: { 'Content-Type': undefined }
        },
        update: {
            method: 'PUT',
            transformRequest: multipartRequest,
            headers: { 'Content-Type': undefined }
        }
    },
    {
        stripTrailingSlashes: false
    })
}).factory('Files', function ($resource) {
    return $resource('api/files/', {}, {
        save: {
            method: 'POST',
            transformRequest: multipartRequest,
            headers: { 'Content-Type': undefined }
        }
    },
    {
        stripTrailingSlashes: false
    })
});
