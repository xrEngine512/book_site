angular.module('qnaModule', []);
angular.
module('qnaModule').
component('qnaComponent', {
	templateUrl: '/static/qna/qna.template.html',
	controller: ['$http', 
		function qnaController($http) {
			var self = this;

			$http.get('/static/json/qna.json').then(function(response) {
                self.questions = response.data;
            });

			self.isOpen = false;
		}
	]
});


angular.module('commentsModule', ['ngResource']);
angular.
module('commentsModule').
factory('commentsFactory', ['$resource', function($resource) {
    var url = '/static/json/comments.json';
    return $resource(url, null, {
        list: {
            method: "GET",
            params: {},
            isArray: true,
            cache: true,
        },
        query: {
            method: "GET",
            params: {},
            isArray: false,
            cache: true,
        },
        save: {
            method: "POST"
        },
        update: {
            method: "PUT"
        },
        delete: {
            method: "DELETE"
        }
    });
}]).
component('commentsComponent', {
    templateUrl: '/static/comments/comments.template.html',
    controller: ['commentsFactory',
        function(commentsFactory) {
            var self = this;

            self.comments = commentsFactory.list();

            self.comments.$promise.then(function(data) {
                self.numberComments = data.length;

                self.addCommentView = function() {
                    self.tempComment = document.getElementById('textareaComment').value;
                    var _maxId = maxId();
                    self.comments.push({
                        "id": ++_maxId,
                        "comment": self.tempComment
                    });
                    self.numberComments++;
                };

                self.deleteComment = function(id) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].id == id) {
                            var index = i;
                        }
                    }
                    data.splice(index, 1);
                    self.numberComments--;
                };

                var maxId = function() {
                    if (data.length < 1) {
												return 0;
                    }
                    var max = data[0].id;
                    for (var i = 0; i < self.numberComments; i++) {
                        if (max < data[i].id) {
                            max = data[i].id;
                        }
                    }
                    return max;
                };
            });



            // self.firstComment = commentsFactory.get({id: 1});

            /*
            self.postComment = function() {
                  var tempComment = document.getElementById('textareaComment').value;

                  commentsFactory.save({
                      comment: tempComment
                  });
            };*/

            // commentsFactory.update({id: 2}, { comment: "update data for comment" });


        }
    ]
});

gApp.controller('aboutController', function($scope) {

});

gApp.controller('asideController', function(filtersFactory) {
    this.listCategories = [{
        selected: false,
        id: 'check1',
        name: 'Все'
    }, {
        selected: false,
        id: 'check2',
        name: 'Анархизм'
    }, {
        selected: false,
        id: 'check3',
        name: 'Мемуары'
    }, {
        selected: false,
        id: 'check4',
        name: 'Рассказы'
    }, {
        selected: false,
        id: 'check5',
        name: 'Романы'
    }, {
        selected: false,
        id: 'check6',
        name: 'Фэнтези'
    }, ];

    this.addCategoryActiveList = function($event) {
        if ($event.selected == true)
            filtersFactory.addCategoryActiveList($event.name);
        else
            filtersFactory.closeChipCategory($event.name);
    };
});

gApp.controller('blogDetailsController', function($scope, $http, $routeParams, $sce, $location, Blog, Files) {
    /*----Declarations----*/
    $scope.save = function() {
        if (+$routeParams.id) {
            $scope.blog_entry.image = $scope.file;
            Blog.update({
                entryID: $routeParams.id
            }, $scope.blog_entry);
        } else {
            $scope.blog_entry.image = $scope.file;
            Blog.save($scope.blog_entry, function(data) {
                $scope.blog_entry = data;
                $location.path('blog/{}'.format(data.id), false);
            });
        }
    };

    $scope.cancel = function() {
        Files.delete({
            file_paths: $scope.uploadedFilesUrls
        });
    };

    $scope.getMaxHeight = function() {
        return document.getElementById("footer").getBoundingClientRect().top - document.getElementById("header").getBoundingClientRect().bottom - 50;
    };

    $scope.hideElement = function(element) {
        element.style.display = "none";
    };

    $scope.showElement = function(element) {
        element.style.display = "";
    };

    //TODO: redo switching between modes using angular's $stateProvider
    $scope.setModeEdit = function(edit) {
        (edit ? $scope.showElement : $scope.hideElement)(document.querySelector("#edit-mode"));
        (edit ? $scope.hideElement : $scope.showElement)(document.querySelector("#view-mode"));
    };

    $scope.htmlContent = function() {
        return $scope.blog_entry ? $sce.trustAsHtml($scope.blog_entry.text) : undefined;
    };

    $scope.setLoadingState = function() {
        $scope.blog_entry = {
            "id": 0,
            "header": "<p>Загрузка...</p>",
            "text": "<p>Загрузка...</p>",
            "image": ""
        };
    };

    $scope.setDefaultState = function() {
        $scope.blog_entry = {
            "id": 0,
            "header": "",
            "text": "",
            "image": ""
        };
    };
    /*---------------------*/


    /*----Initialization---*/
    $scope.file = null;
    $scope.uploadedFilesUrls = [];

    //listen for the file selected event
    $scope.$on("fileSelected", function(event, args) {
        $scope.$apply(function() {
            //add the file object to the scope's files collection
            if (args.target_id == "file-picker")
                Files.save({
                        file: args.file
                    },
                    function(data) { //success
                        var win = $scope.callee_info.win;
                        var field_name = $scope.callee_info.field_name;
                        var el = win.document.getElementById(field_name);
                        el.style.color = "";
                        el.value = data.url;
                        $scope.uploadedFilesUrls.push(data.url);
                    },
                    function(error) { //fail
                        var win = $scope.callee_info.win;
                        var field_name = $scope.callee_info.field_name;
                        var el = win.document.getElementById(field_name);
                        el.style.color = 'red';
                        el.value = "Ошибка. Файл не загружен";
                        console.error(error);
                    }
                );
            else
                $scope.file = args.file;
        });
    });

    $scope.tinymceOptions = {
        plugins: 'link image',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | link image | Save Cancel Preview',
        menubar: false,
        statusbar: false,
        language: 'ru_RU',
        height: $scope.getMaxHeight(),
        initial_content: '<p>Загрузка...</p>',
        file_browser_callback_types: 'image',
        file_browser_callback: function(field_name, url, type, win) {
            $scope.callee_info = {
                win: win,
                field_name: field_name
            }; //FIXME: I just wanted to sleep, leave me alone...
            $('#file-picker').trigger('click');
        },
        setup: function(editor) {
            editor.addButton('Save', {
                text: 'Сохранить',
                icon: 'icon-save',
                onclick: $scope.save
            });
            editor.addButton('Cancel', {
                text: 'Отмена',
                icon: 'icon-remove-sign',
                onclick: $scope.cancel
            });
            editor.addButton('Preview', {
                text: 'Предпросмотр',
                icon: 'fa-eye',
                onclick: function() {
                    $scope.setModeEdit(false)
                }
            });
        }
    };
    /*----------------------*/


    /*----Startup actions---*/

    if (+$routeParams.id) { // open existing entry
        $scope.setLoadingState();
        $scope.setModeEdit(false);
        Blog.get({
            entryID: $routeParams.id
        }, function(data) {
            $scope.blog_entry = data;
        });
    } else { // create a new one
        $scope.setDefaultState();
        $scope.setModeEdit(true);
    }
    /*----------------------*/
});

gApp.controller('blogController', function($scope, $http, Blog) {
    Blog.query({}, function(data) {
        $scope.blog_entries = data;
    });
});

gApp.controller('cartControllerModal', function($scope, $uibModalInstance, items) {
    $scope.items = items; //translate items from outer scope

    $scope.getSummary = function() {
        var sum = 0;
        $scope.items.forEach(function(item) {
            sum += item.quantity * item.price;
        });
        return sum;
    };

    $scope.removeItem = function(index) {
        $scope.items.splice(index, 1);
    };

    $scope.close = function() {
        $uibModalInstance.dismiss('close');
    }
});

gApp.controller('cartControllerShowContent', function(cartFactory) {
    this.books = cartFactory.getBooks();

    this.totalPrice = 0;
    // Ошибка! доделать, вызывается при наведении
    this.getTotalPrice = function() {
        if (this.books.length <= 0) return;
        for (var i = 0; i < this.books.length; i++) {
            this.totalPrice += this.books[i].price;
            console.log(this.totalPrice);
        }
    };
});

gApp.controller('contactController', function($scope) {

    $scope.vladimir = new google.maps.LatLng(56.133333, 40.416667);

    $scope.mapProp = {
        center: $scope.vladimir,
        zoom: 10,
        scrollwheel: false, // изменение масштаба прокруткой
        draggable: true, // перемещаться по карте с помощью зажатия ЛКМ
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("googleMap"), $scope.mapProp);

    $scope.city = new google.maps.Circle({
        center: $scope.vladimir,
        radius: 1000,
        strokeColor: "#0000ff",
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: "#0000ff",
        fillOpacity: 0.3
    });

    $scope.city.setMap($scope.map);

    $scope.infowindow = new google.maps.InfoWindow({
        content: "Мы здесь! Привет!",
    });

    $scope.infowindow.setPosition({
        lat: 56.133333,
        lng: 40.416667
    });
    $scope.infowindow.open($scope.map, $scope.city);
});

gApp.controller('homeController', function() {
        this.new = 'example';
        this.news = [{
            tags: 'Важно!',
            date: '11 Май 2016',
            title: 'Что такое бумага?',
            content: 'Абра-кадабра! ежкин кот! ну докатились!',
            author: 'Админ'
        }, {
            tags: 'Внимание!',
            date: '11 Май 2011',
            title: 'Что такое автомобиль?',
            content: 'Абра-кадабра! ежкин кот! ну докатились!',
            author: 'Редактор'
        }, {
            tags: 'Мяу!',
            date: '11 Май 2013',
            title: 'Что такое бумеранг?',
            content: 'Абра-кадабра! ежкин кот! ну докатились!',
            author: 'Админ'
        }];
    })
    .controller('newsController', function() {
        this.slideIndex = 1;

        this.showSlides = function(n) {
            var i;
            var slides = document.getElementsByClassName("mySlides");
            var dots = document.getElementsByClassName("dot");
            if (n > slides.length) {
                this.slideIndex = 1
            }
            if (n < 1) {
                this.slideIndex = slides.length
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" activeSlide", "");
            }
            slides[this.slideIndex - 1].style.display = "block";
            dots[this.slideIndex - 1].className += " activeSlide";
        };

        this.plusSlides = function(n) {
            this.showSlides(this.slideIndex += n);
        };

        this.currentSlide = function(n) {
            this.showSlides(this.slideIndex = n);
        };

        this.showSlides(this.slideIndex);
    });

gApp.controller('loginDialogController', function($rootScope, $scope, $uibModalInstance, User) {
    var $login = this;

    $login.getCredentials = function() {
        return $login.username + ':' + $login.password;
    };

    $login.close = function() {
        $uibModalInstance.dismiss('close');
    };

    $login.submit = function() {
        var data = {
            'remember_me': $login.remember_me
        };
        User.auth($login.getCredentials).login(data).$promise.then(function(data) {
            $login.close();
            $rootScope.$broadcast('logged_in', data);
        }).catch(function(data) {
            console.error(data);
        });
    };
});

gApp.controller('logoutDialogController', function($rootScope, $scope, $uibModalInstance, User) {
    var $logout = this;

    $logout.setStateLoggedIn = function(data) {

    };

    $logout.close = function() {
        $uibModalInstance.dismiss('close');
    };

    $logout.submit = function() {
        User.current.logout().$promise.then(function() {
            $logout.close();
            $rootScope.$broadcast('logged_out');
        }).catch(function(data) {
            console.error(data);
        });
    };
});

gApp.controller('productDetailsController', function($scope, $routeParams, booksFactory) {
    var idbooks = Number($routeParams.idBook);
    // медленный поиск и еще вызов json
    booksFactory.booksFromJson(function(booksFactory) {
        for (var i = 0; i < booksFactory.products.length; i++) {
            if (booksFactory.products[i].id == idbooks)
                $scope.book = booksFactory.products[i];
        }
    });
});

gApp.controller('registrationDialogController', function($uibModalInstance) {

    var $registration = this;

    $registration.close = function() {
        $uibModalInstance.dismiss('close');
    }
});

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
    .factory('filtersFactory', function() {
        var listActiveCategories = [];
        return {
            addCategoryActiveList: function(category) {
                if (listActiveCategories.indexOf(category) != -1)
                    return;
                else
                    listActiveCategories.push(category);
            },

            closeChipCategory: function(chipCategory) {
                var i = listActiveCategories.indexOf(chipCategory);
                if (i > -1)
                    listActiveCategories.splice(i, 1);
            },

            getListActiveCategories: function() {
                return listActiveCategories;
            }
        }
    })
    .controller('storeController', function($scope, pagination, booksFactory) {

        booksFactory.booksFromJson(function(booksFactory) {

            $scope.booksList = booksFactory;

            pagination.setProducts($scope.booksList.products);
            $scope.products = pagination.getPageProducts($scope.currentPage);
            $scope.paginationList = pagination.getPaginationList();

            $scope.showPage = function(page) {
                if (page == 'prev') {
                    $scope.products = pagination.getPrevPageProducts();
                } else if (page == 'next') {
                    $scope.products = pagination.getNextPageProducts();
                } else {
                    $scope.products = pagination.getPageProducts(page);
                }
            };

            $scope.currentPageNum = function() {
                return pagination.getCurrentPageNum();
            }
        });

    })
    .controller('booksController', function($scope, cartFactory) {
        $scope.isActive = function(id) {
            return cartFactory.isBook(id);
        };
        $scope.addToCart = function(product) {
            cartFactory.setBook(product);
        };
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
    .controller('filtersController', function(filtersFactory) {
        this.listActiveCategories = filtersFactory.getListActiveCategories();
    })
    .controller('sortController', function(filtersFactory) {
        this.sortAuthor = "Автор";
        this.sortPrice = "Цена";
        this.sortName = "Название";
        this.sortCategories = "Категории";
        this.sortRating = "Рейтинг";

        this.listCategories = ['Анархизм', 'Мемуары', 'Рассказы', 'Романы', 'Фэнтези'];

        this.addCategoryActiveList = function(category) {
            filtersFactory.addCategoryActiveList(category);
    };
});

gApp.controller('userController', function() {
    var $user = this;
});
