gApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when("/news", {
		templateUrl : "/static/pages/home.html",
		controller: "newsController"
	})
	.when("/store", {
		templateUrl : "/static/pages/store.html",
		controller: "storeController"
	})
	.when("/store/:idBook", {
		templateUrl : "/static/pages/product-details.html",
		controller: "productDetailsController"
	}) 
	.when("/blog", {
		templateUrl : "/static/pages/blog.html",
		controller: "blogController"
	})
	.when('/blog/:id', {
        templateUrl: '/static/pages/blog-details.html',
        controller: 'blogDetailsController'
    })
	.when("/contact", {
		templateUrl : "/static/pages/contact.html",
		controller: "contactController"
	})
	.when("/qna", {
		templateUrl : "/static/pages/qna.html",
		controller: "qnaController"
	})
	.when("/about-us", {
		templateUrl : "/static/pages/about-us.html",
		controller: "aboutController"
	})
	.when("/user", {
		templateUrl : "/static/pages/user.html",
		controller: "userController"
	})
	.when("/404", {
		templateUrl : "/static/pages/404.html"
	})
	.otherwise(
		{redirectTo:'/404'}
	);
}]);

gApp.controller('navbar', function($scope, $location, $uibModal) {
	// корзина
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
    $scope.openCartDialog = function (size) {
        $uibModal.open({
            animations: $scope.animationsEnabled,
            templateUrl: '/static/pages/cart.html',
            controller: 'cartControllerModal',
            size: size,
            resolve: {
                items: function () {
                    return testItems;
                }
            }
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    }; // конец корзины

	// логин
    $scope.openLoginDialog = function (size) {
        $uibModal.open({
            animations: $scope.animationsEnabled,
            templateUrl: '/static/pages/login.html',
            controller: 'loginDialogController',
            controllerAs: '$login',
            size: size
        });
    };

    // логин
    $scope.openRegistrationDialog = function (size) {
        $uibModal.open({
            animations: $scope.animationsEnabled,
            templateUrl: '/static/pages/registration.html',
            controller: 'registrationDialogController',
            controllerAs: '$registration',
            size: size
        });
    };

	$scope.openSocialIcon = function() {
		var x = document.getElementById("ulTopnav");
		if (x.className === "topnav") {
			x.className += " resleft";
		} else {
			x.className = "topnav";
		}
	};

	$scope.openServiceIcon = function() {
		var x = document.getElementById("ulTopnav");
		if (x.className === "topnav") {
			x.className += " resright";
		} else {
			x.className = "topnav";
		}
	};

	$scope.openNavbar = function() {
		var x = document.getElementById("ulMainnav");
		if (x.className === "navbar") {
			x.className += " responsive";
		} else {
			x.className = "navbar";
		}
	};

	$scope.searchBook = function() {
		document.querySelector("#Search").classList.toggle("bs_search-from-visible");
	};

	$scope.isActive = function (viewLocation) { 	
        return viewLocation === $location.path();
    };
});

gApp.controller('breadcrumbController', function($scope, $location) {
	// хреновый подход!
	var pages = { 'Новости' : '/news', 'Магазин' : '/store', 'Блог' : '/blog', 
				  'Контакты' : '/contact', 'Q&A' : '/qna', 
			      'О нас' : '/about-us', 'Пользователь': '/user'
	};
		
	$scope.pathStr = function() {
		var locpath = $location.path();

 		for (var page in pages) {
 			if(locpath == pages[page]) return page;
 		}
	};

	$scope.getPath = function() {
		return $location.path();
	}
});

gApp.run(function ($route, $rootScope, $location) {
    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
});

