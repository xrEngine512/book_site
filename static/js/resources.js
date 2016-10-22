/**
 * Created by islam on 23.08.16.
 */

function multipartRequest(data) {
    var formData = new FormData();
    for (var field in data)
        if(data.hasOwnProperty(field)) {
            var value = data[field];
            if(value)
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
    })
}).factory('Files', function ($resource) {
    return $resource('api/files/', {}, {
        save: {
            method: 'POST',
            transformRequest: multipartRequest,
            headers: { 'Content-Type': undefined }
        }
    })
}).factory('User', function ($resource) {
    // defining the endpoints.
    return {
        auth: function (credentialsGetter) {    //Because some fucking RETARD have decided to remove header modification in transform request
            return $resource('/api/auth/', {}, {
                    login: {
                        method: 'POST',
                        headers: {Authorization: ('Basic ' + btoa(credentialsGetter()))}
                    }
                }
            )
        },
        current: $resource('/api/auth/', {},{
                user: {method: 'GET'},
                logout: {method: 'DELETE'}
            }
        ),
        users: $resource('/api/users/', {}, {
                create: {method: 'POST'}
            }
        )
    };
}).config(function ($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}).config(function ($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
});
