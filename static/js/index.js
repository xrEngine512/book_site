/**
 * Created by islam on 29.05.16.
 */
var app = angular.module('BookStoreApp', ['ngRoute', 'ui.bootstrap']);
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
    for(var i = 0; i < tabs.length; ++i) {
        tabs[i].className = 'inactive';
    }
}

function scrolltop() {
    var top = 0;
    if (typeof(window.pageYOffset) == "number") {
        top = window.pageYOffset;
    } else if (document.body && document.body.scrollTop) {
        top = document.body.scrollTop;
    } else if (document.documentElement && document.documentElement.scrollTop) {
        top = document.documentElement.scrollTop;
    }
    return top;
}

function fixNavControls() {
    if (scrolltop() > 40) {
        document.getElementById("main").style.paddingTop = "72px";
        document.getElementById("topnav").style.position = "fixed";
        document.getElementById("topnav").style.top = "0";
        document.getElementById("search-bar").style.marginTop = "1%";
    } else {
        document.getElementById("main").style.paddingTop = "0";
        document.getElementById("topnav").style.position = "relative";
        document.getElementById("search-bar").style.marginTop = "0";
    }
    console.log($(document).height());
    var footerFactor = ($(window).scrollTop() + $(window).height()) - ($(document).height() - 75);

    if(footerFactor > 25) {
        document.getElementById("footer").style.top = "{}px".format($(window).height() - footerFactor);
    }
    else {
        document.getElementById("footer").style.top = "";
        document.getElementById("footer").style.position = "fixed";
        document.getElementById("footer").style.bottom = "-75px";
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
    
    window.addEventListener("scroll", fixNavControls);

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
})

.factory('initialize', function ($timeout) {
    return function ($scope) {
        resetAllTabs();
        $scope.$on('$viewContentLoaded', function() {
            $timeout(function() {
                fixNavControls();
            }, 500);
        });
    }
})
    
.directive('super', function () {
    
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

