/**
 * Created by islam on 14.01.17.
 */

var gApp = angular.module('BookStoreApp', ['ngRoute', 'ngAnimate', 'ngSanitize',
                                           'ngResource', 'ngStorage', 'ui.bootstrap', 'ui.tinymce',
                                           'storeModule', 'qnaModule', 'commentsModule']);

gApp.config(function ($routeProvider, $locationProvider, $httpProvider, $resourceProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "/static/pages/home.html",
            controller: "homeController"
        })
        .when("/store", {
            templateUrl: "/static/pages/store.html",
            controller: "storeController"
        })
        .when("/store/:id", {
            templateUrl: "/static/pages/product-details.html",
            controller: "productDetailsController"
        })
        .when("/blog", {
            templateUrl: "/static/pages/blog.html",
            controller: "blogController"
        })
        .when('/blog/:id', {
            templateUrl: '/static/pages/blog-details.html',
            controller: 'blogDetailsController'
        })
        .when("/contact", {
            templateUrl: "/static/pages/contact.html",
            controller: "contactController"
        })
        .when("/qna", {
            templateUrl: "/static/pages/qna.html"
        })
        .when("/about-us", {
            templateUrl: "/static/pages/about-us.html",
            controller: "aboutController"
        })
        .when("/user", {
            templateUrl: "/static/pages/user.html",
            controller: "userController"
        })
        .when("/activate/:key", {
            templateUrl: "/static/pages/activation.html",
            controller: "activationController",
            controllerAs: "$activation"
        })
        .when("/404", {
            templateUrl: "/static/pages/404.html"
        })
        .when("/", {
            redirectTo: "/home"
        })
        .otherwise(
            {redirectTo: '/404'}
        );
    /* ---- */
    $locationProvider.html5Mode(true);
    /* ---- */
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    /* ---- */
    $resourceProvider.defaults.stripTrailingSlashes = false;
});
