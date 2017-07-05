angular.module('storeModule', ['rzModule'])
    .factory('pagination', function($sce) {

        var currentPage = 0;
        var itemsPerPage = 9;
        var products = [];

        return {

            setProducts: function(newProducts) {
                products = newProducts;
            },
            /* END of setProducts */

            getPageProducts: function(num) {
                var num = angular.isUndefined(num) ? 0 : num;
                var first = itemsPerPage * num;
                var last = first + itemsPerPage;
                currentPage = num;
                last = last > products.length ? (products.length) : last;
                return products.slice(first, last);
            },
            /* END of getPageProducts */

            getTotalPagesNum: function() {
                return Math.ceil(products.length / itemsPerPage);
            },
            /* END of getTotalPagesNum */

            getPaginationList: function() {
                var pagesNum = this.getTotalPagesNum();
                var paginationList = [];
                paginationList.push({
                    name: $sce.trustAsHtml('&laquo;'),
                    link: 'prev'
                });
                for (var i = 0; i < pagesNum; i++) {
                    var name = i + 1;
                    paginationList.push({
                        name: $sce.trustAsHtml(String(name)),
                        link: i
                    });
                }
                paginationList.push({
                    name: $sce.trustAsHtml('&raquo;'),
                    link: 'next'
                });
                if (pagesNum > 2) {
                    return paginationList;
                } else {
                    return null;
                }
            },
            /* END of getPaginationList */

            getPrevPageProducts: function() {
                var prevPageNum = currentPage - 1;
                if (prevPageNum < 0) prevPageNum = 0;
                return this.getPageProducts(prevPageNum);
            },
            /* END of getPrevPageProducts */

            getNextPageProducts: function() {
                var nextPageNum = currentPage + 1;
                var pagesNum = this.getTotalPagesNum();
                if (nextPageNum >= pagesNum) nextPageNum = pagesNum - 1;
                return this.getPageProducts(nextPageNum);
            },
            /* END of getNextPageProducts */

            getCurrentPageNum: function() {
                return currentPage;
            },
            /* END of getCurrentPageNum */

        }
    }) /* END of factory-pagination */
    .factory('cartFactory', function() {
        var books = [];
        return {
            setBook: function(book) {
                var i = books.indexOf(book);
                if (i != -1)
                    books.splice(i, 1);
                else
                    books.push(book);
            },
            isBook: function(index) {
                var i = books.indexOf(index);
                if (i != -1)
                    return false;
                else
                    return true;
            },
            getBooks: function() {
                return books;
            }
        }
    })
    .factory('booksFactory', function($http) {
        return {
            booksFromJson: function(callback) {
                $http({
                    method: 'GET',
                    url: '/static/json/books.json',
                    cache: true
                }).success(callback);
            }
        }
    })
    .controller('storeController', function($scope, pagination, Books) {
        this.queryBooks = function (queryArgs) {
            if(!queryArgs)
                queryArgs = {};

            Books.query(queryArgs, function (data) {

                $scope.booksList = data;

                pagination.setProducts($scope.booksList);
                $scope.products = pagination.getPageProducts($scope.currentPage);
                $scope.paginationList = pagination.getPaginationList();

                $scope.showPage = function (page) {
                    if (page == 'prev') {
                        $scope.products = pagination.getPrevPageProducts();
                    } else if (page == 'next') {
                        $scope.products = pagination.getNextPageProducts();
                    } else {
                        $scope.products = pagination.getPageProducts(page);
                    }
                };

                $scope.currentPageNum = function () {
                    return pagination.getCurrentPageNum();
                }
            });
        };

        this.queryBooks();
    })
    .controller('booksController', function($scope, CartService) {
        $scope.isActive = CartService.inCart;
        $scope.addToCart = CartService.addToCart;
    })
    .controller('cartController', function($scope, cartFactory) {
        $scope.books = cartFactory.getBooks();
    })
    .controller('sliderController', function($scope) {
        $scope.slider = {
            minValue: 100,
            maxValue: 400,
            options: {
                ceil: 500,
                floor: 0,
                translate: function(value) {
                    // символ рубля
                    return '&#8381;' + value;
                }
            }
        };
    })
    .controller('sortController', function(Genres) {
        this.sortAuthor = "Автор";
        this.sortPrice = "Цена";
        this.sortName = "Название";
        this.sortCategories = "Категории";
        this.sortRating = "Рейтинг";
    })
    .controller('tagsController', function(Tags) {
        Tags.query({}, function(tags) {
            this.tags = tags;
        }.bind(this));
    });
