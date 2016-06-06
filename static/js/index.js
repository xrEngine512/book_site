/**
 * Created by islam on 29.05.16.
 */
var app = angular.module('BookStoreApp', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
      .when('/contact',{
        templateUrl: '/static/pages/contact.html',
        controller: 'contactsController'
    }).when('/home', {
        templateUrl: '/static/pages/home.html',
        controller: 'homeController'
    }).when('/qna', {
        templateUrl: '/static/pages/qna.html',
        controller: 'qnaController'
    }).when('/shop', {
        templateUrl: '/static/pages/shop.html',
        controller: 'shopController'
    }).when('/support', {
        templateUrl: '/static/pages/support.html',
        controller: 'supportController'
    }).when('/blog', {
        templateUrl: '/static/pages/blog.html',
        controller: 'blogController'
    }).when('/about-us', {
        templateUrl: '/static/pages/about-us.html',
        controller: 'aboutUsController'
    }).otherwise({
        redirectTo: '/home'
    });
});
function resetAllTabs() {
    var tabs = document.getElementById('navbar-tabs').getElementsByTagName('li');
    for (var tabID in tabs)
        tabs[tabID].className = 'inactive';
}

app.controller('homeController', function($scope, $http) {
    resetAllTabs();
    document.getElementById('navbar-tab-home').className = 'active';
    $http.get("test_request").then(function (response) {
       $scope.data_from_backend = response.data.data;
    });
});

app.controller('qnaController', function($scope) {
    resetAllTabs();
    document.getElementById('navbar-tab-qna').className = 'active';
});

app.controller('supportController', function($scope) {
    resetAllTabs();
    document.getElementById('navbar-tab-support').className = 'active';
});

app.controller('blogController', function($scope) {
    resetAllTabs();
    document.getElementById('navbar-tab-blog').className = 'active';
});

