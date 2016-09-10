/**
 * Created by islam on 18.08.16.
 */

gApp.controller('blogDetailsController', function($scope, $http, $routeParams, $sce, $location, initialize, Blog, Files) {
    initialize($scope);
    document.getElementById('navbar-tab-blog').className = 'active';

    /*----Declarations----*/
    $scope.save = function () {
        if(+$routeParams.id) {
            $scope.blog_entry.image = $scope.file;
            Blog.update({entryID: $routeParams.id}, $scope.blog_entry);
        }
        else {
            $scope.blog_entry.image = $scope.file;
            Blog.save($scope.blog_entry, function (data) {
                $scope.blog_entry = data;
                $location.path('blog/{}'.format(data.id), false);
            });
        }
    };

    $scope.cancel = function () {
        Files.delete({file_paths: $scope.uploadedFilesUrls});
    };

    $scope.getMaxHeight = function() {
        return document.getElementById("footer").getBoundingClientRect().top - document.getElementById("header").getBoundingClientRect().bottom - 50;
    };

    $scope.hideElement = function (element) {
        element.style.display = "none";
    };

    $scope.showElement = function (element) {
        element.style.display = "";
    };

    $scope.setModeEdit = function(edit) {
        (edit ? $scope.showElement : $scope.hideElement)(document.querySelector("#edit-mode"));
        (edit ? $scope.hideElement : $scope.showElement)(document.querySelector("#view-mode"));
        if(!$scope.image)
            if(edit)
                $scope.setDefaultImage();
            else
                $scope.showEntryImage();
    };

    $scope.htmlContent = function () {
        return $scope.blog_entry ? $sce.trustAsHtml($scope.blog_entry.text) : undefined;
    };

    $scope.setLoadingState = function () {
        $scope.blog_entry = {
            "id": 0,
            "header": "<p>Загрузка...</p>",
            "text": "<p>Загрузка...</p>",
            "image": ""
        };
        $scope.setLoadingImage();
    };

    $scope.setDefaultState = function () {
        $scope.blog_entry = {
            "id": 0,
            "header": "",
            "text": "",
            "image": ""
        };
        $scope.setDefaultImage();
    };

    $scope.showEntryImage = function () {
        $scope.image = $scope.blog_entry.image;
    };

    $scope.setDefaultImage = function () {
        $scope.image = "/static/img/add_image.png";
    };

    $scope.setLoadingImage = function () {
        $scope.image = "/static/img/loading.gif";
    };

    /*---------------------*/

    $scope.file = null;
    $scope.uploadedFilesUrls = [];

    //listen for the file selected event
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {
            //add the file object to the scope's files collection
            if(args.target_id == "file-picker")
                Files.save({file: args.file},
                    function (data) {       //success
                        var win = $scope.callee_info.win;
                        var field_name = $scope.callee_info.field_name;
                        var el = win.document.getElementById(field_name);
                        el.style.color = "";
                        el.value = data.url;
                        $scope.uploadedFilesUrls.push(data.url);
                    },
                    function (error) {      //fail
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
            $scope.callee_info = {win: win, field_name: field_name};        //FIXME: I just wanted to sleep, leave me alone...
            $('#file-picker').trigger('click');
        },
        setup: function (editor) {
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
                onclick: function(){$scope.setModeEdit(false)}
            });
        }
    };

    if(+$routeParams.id) {   // open existing entry
        $scope.setLoadingState();
        $scope.setModeEdit(false);
        Blog.get({entryID: $routeParams.id}, function (data) {
            $scope.blog_entry = data;
            if(data.image)
                $scope.blog_entry.image = $scope.blog_entry.image.replace("%3A", ":");  //Colon escaping workaround
            $scope.showEntryImage();
        });
    }
    else {                  // create a new one
        $scope.setDefaultState();
        $scope.setModeEdit(true);
    }
});
