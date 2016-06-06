
angular.module('BookStoreApp').controller('shopController', function($scope) {
    resetAllTabs();
    document.getElementById('navbar-tab-shop').className = 'active';
    $(function() {
        $("#slider-range").slider({
          range: true,
          min: 0,
          max: 500,
          values: [75, 300],
          slide: function (event, ui) {
              $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
          }
        });
        $("#amount").val("$" + $("#slider-range").slider("values", 0) +
            " - $" + $("#slider-range").slider("values", 1));
    });
});
  