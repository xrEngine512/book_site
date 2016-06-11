/**
 * Created by islam on 11.06.16.
 */

function scrollTop() {
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

function handleNavigationBar(navigationBar) {
    var top = scrollTop();
    if (top > 40) {
        navigationBar.attr('style', 'position : fixed; top : 0px;');
        document.getElementById("main").style.paddingTop = "72px";
        document.getElementById("search-bar").style.marginTop = "1%";   //TODO: get rid of this workaround
    } else {
        navigationBar.removeAttr('style');
        document.getElementById("main").style.paddingTop = "0";
        document.getElementById("search-bar").style.marginTop = "0";    //TODO: here too
    }
}
function handleFooter(footer) {
    var footerFactor = (scrollTop() + $(window).height()) - ($(document).height() - 75);

    if(footerFactor > 25) {
        footer.attr('style', 'top : ' + '{}px'.format($(window).height() - footerFactor));
    }
    else {
        footer.removeAttr('style');
    }
}

angular.module('BookStoreApp', ['ngRoute', 'ui.bootstrap'])

.directive('siteDynamicContent', function ($interval) {
    return function (scope, element) {
        $interval(function () {     //FIXME: when images will load from our source, maybe $digest ($watch) method will work, if it doesn't - do on load for every image
            scope.__height = element.height();
        }, 500);
    }
})
.directive('siteNavigationBar', function () {
    return function (scope, element, attributes) {
        function handler () {
            handleNavigationBar(element)
        }
        window.addEventListener("scroll", handler);
    }
})

.directive('siteFooter', function () {
    return function (scope, element, attributes) {
        function handler () {
            handleFooter(element);
        }
        scope.$watch('__height', handler);
        window.addEventListener("scroll", handler);
        window.addEventListener("resize", handler);
    }
});