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
