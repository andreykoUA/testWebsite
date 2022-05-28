/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const ads = document.querySelectorAll('.promo__adv img'),
        promoBg = document.querySelector('.promo__bg'),
        genre = promoBg.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        form = document.querySelector('form.add'),
        input = form.querySelector('.adding__input'),
        checkbox = form.querySelector('[type="checkbox"]');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let newMovie = input.value;
        const favorite = checkbox.checked;

        if (newMovie) {

            if (newMovie.length > 21) { //123456789123456789123
                movieDB.movies.push(`${newMovie.slice(0, 22)}...`);
            }
            if (favorite) {
                console.log('Adding favourite movie');
            }

            movieDB.movies.push(newMovie);

            sortMovies(movieDB.movies);
            createMovieList(movieDB.movies, movieList);
        }
        e.target.reset(); // clearing the form
    });

    const removeAds = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    const changesOnPage = () => {
        genre.textContent = 'драма';

        promoBg.style.backgroundImage = "url(./img/bg.jpg)";
    };

    const sortMovies = (arr) => {
        arr.sort();
    };

    function createMovieList(films, parent) { //  parent to clear and films - array of movies
        parent.innerHTML = "";

        sortMovies(films);

        films.forEach((film, i) => {
            parent.innerHTML += ` <li class="promo__interactive-item">${i + 1} ${film}
        <div class="delete"></div>
    </li>`;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', (e) => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(films, parent); // recursion helps to properly display list 
            });
        });
    }

    removeAds(ads);
    changesOnPage();
    createMovieList(movieDB.movies, movieList);
});