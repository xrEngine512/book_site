/**
 * Created by islam on 06.06.16.
 */

angular.module('BookStoreApp').controller('aboutUsController', function ($scope) {
    resetAllTabs();
    document.getElementById('navbar-tab-about-us').className = 'active';
});
