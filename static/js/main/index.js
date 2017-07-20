gApp.controller('navbar', function ($scope, $location, $uibModal, User, CartService) {
    // корзина
    $scope.animationsEnabled = true;

    $scope.$watch(CartService.getItemsCount, function (itemsCount) {
        $scope.numberBooks = itemsCount;
    });

    $scope.openCartDialog = function (size) {
        $uibModal.open({
            animations: $scope.animationsEnabled,
            templateUrl: '/static/pages/cart.html',
            controller: 'cartControllerModal',
            size: size
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

    $scope.openLogoutDialog = function (size) {
        $uibModal.open({
            animations: $scope.animationsEnabled,
            templateUrl: '/static/pages/logout.html',
            controller: 'logoutDialogController',
            controllerAs: '$logout',
            size: size
        });
    };

    // регистрация
    $scope.openRegistrationDialog = function (size) {
        $uibModal.open({
            animations: $scope.animationsEnabled,
            templateUrl: '/static/pages/registration.html',
            controller: 'registrationDialogController',
            controllerAs: '$registration',
            size: size
        });
    };

    // пользователь
    $scope.openUser = function (size) {
        $uibModal.open({
            animations: $scope.animationsEnabled,
            templateUrl: '/static/pages/user.html',
            controller: 'userController',
            controllerAs: '$user',
            size: size
        });
    };

    $scope.openSocialIcon = function () {
        var x = document.getElementById("ulTopnav");
        if (x.className === "topnav") {
            x.className += " resleft";
        } else {
            x.className = "topnav";
        }
    };

    $scope.openServiceIcon = function () {
        var x = document.getElementById("ulTopnav");
        if (x.className === "topnav") {
            x.className += " resright";
        } else {
            x.className = "topnav";
        }
    };

    $scope.openNavbar = function () {
        var x = document.getElementById("ulMainnav");
        if (x.className === "navbar") {
            x.className += " responsive";
        } else {
            x.className = "navbar";
        }
    };

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.showCartContent = function () {
        var elem = document.getElementById("headCart");
        elem.style.display = "block";
        elem.style.zIndex = "20";
        elem = document.getElementById("cartContent");
        elem.style.display = "block";
        elem.style.zIndex = "20";
    };

    $scope.hideCartContent = function () {
        var elem = document.getElementById("headCart");
        elem.style.display = "none";
        elem = document.getElementById("cartContent");
        elem.style.display = "none";
    };

    $scope.$on('logged_in', function (event, data) {
        $scope.applicationState.auth.user = data;

        $('#btn-user span.text-user').text(data.username);
        $('#btn-login').hide();
        $('#btn-registration').hide();
        $('#btn-user').show();
        $('#btn-logout').show();
    });

    $scope.$on('logged_out', function () {
        $scope.applicationState.auth.user = null;

        $('#btn-user span.text-user').text('');
        $('#btn-login').show();
        $('#btn-registration').show();
        $('#btn-user').hide();
        $('#btn-logout').hide();
    });

    User.current.user().$promise.then(function (data) {
        $scope.$emit('logged_in', data);
    }).catch(function (data) {
        console.error(data);
    })
});

gApp.controller('breadcrumbController', function ($scope, $location) {
    // хреновый подход!
    var pages = {
        'Домашняя': '/home', 'Магазин': '/store', 'Блог': '/blog',
        'Контакты': '/contact', 'Q&A': '/qna',
        'О нас': '/about-us', 'Пользователь': '/user'
    };

    $scope.pathStr = function () {
        var locpath = $location.path();

        for (var page in pages) {
            if (locpath == pages[page]) return page;
        }
    };

    $scope.getPath = function () {
        return $location.path();
    }
});

gApp.run(function ($route, $rootScope, $location) {
    $rootScope.applicationState = {
        auth: {
            user: null,
            isAdmin: function () {
                return this.user && this.user.is_superuser;
            },
            isAuthenticated: function () {
                return this.user !== null;
            }
        }
    };

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
