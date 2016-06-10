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
    for (var tabID in tabs)
        tabs[tabID].className = 'inactive';
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

    function fixNavBar() {
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

        var footerFactor =  ($(window).scrollTop() + $(window).height()) - ($(document).height() - 75);

        if(footerFactor > 25) {
            document.getElementById("footer").style.top = "{}px".format($(window).height() - footerFactor);
        }
        else {
            document.getElementById("footer").style.top = "";
            document.getElementById("footer").style.position = "fixed";
            document.getElementById("footer").style.bottom = "-75px";
        }
    }

    window.addEventListener("scroll", fixNavBar);

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
});

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

