angular.module('productDetailsController', function ($scope) {
	initialize($scope);
	$scope.ZoomBook = function () {
		var az = false; // active zoom

		$('#zoom').click(
			function () {

				if(az === false) {
					$("#view-book").addClass("active-zoom");
					$("#zoom > span").addClass("glyphicon-resize-small");
					$("#zoom > span").removeClass("glyphicon-fullscreen");

					az = true;
				} else if(az === true) {
					$("#view-book").removeClass("active-zoom");
					$("#zoom > span").removeClass("glyphicon-resize-small");
					$("#zoom > span").addClass("glyphicon-fullscreen");

					az = false;
				}
				$(".backdrop").toggle("fast");
			}
		);
	};
});

