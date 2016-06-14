/**
 * Created by islam on 29.05.16.
 */
var app = angular.module('BookStoreApp');
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
    }).when('/product-details', {
        templateUrl: '/static/pages/product-details.html'
    }).otherwise({
        redirectTo: '/home'
    });
});

function resetAllTabs() {
    var tabs = document.getElementById('navbar-tabs').getElementsByTagName('li');
    for(var i = 0; i < tabs.length; ++i) {
        tabs[i].className = 'inactive';
    }
}

app.controller('rootController', function ($scope, $uibModal, $location, $anchorScroll) {
    $scope.animationsEnabled = true;
    var testItems = [
        {
            title: 'Война и мир',
            price: 15,
            quantity: 1
        },
        {
            title: 'Преступление и наказание',
            price: 17,
            quantity: 4
        }
    ];
    $scope.openCart = function (size) {
        $uibModal.open({
            animations: $scope.animationsEnabled,
            templateUrl: '/static/pages/cart.html',
            controller: 'cartController',
            size: size,
            resolve: {
                items: function () {
                    return testItems;
                }
            }
        });
    };
    
    $scope.goUp = function () {
        $location.hash('main');
        $anchorScroll();
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
})

.factory('initialize', function () {
    return function () {
        resetAllTabs();
    }
})
    
.controller('homeController', function($scope, $http, initialize) {
    initialize($scope);
    document.getElementById('navbar-tab-home').className = 'active';
    $http.get("test_request").then(function (response) {
       $scope.data_from_backend = response.data.data;
    });
})

.controller('qnaController', function($scope, initialize) {
    initialize($scope);
    document.getElementById('navbar-tab-qna').className = 'active';
})

.controller('supportController', function($scope, initialize) {
    initialize($scope);
    document.getElementById('navbar-tab-support').className = 'active';
})

.controller('blogController', function($scope, initialize) {
    initialize($scope);
    document.getElementById('navbar-tab-blog').className = 'active';
});

