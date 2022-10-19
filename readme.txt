 

В данной сборке Gulp я собрал такие пакеты как:

gulp-sass - https://www.npmjs.com/package/gulp-sass 
gulp-concat - https://www.npmjs.com/package/gulp-concat
gulp-autoprefixer - https://www.npmjs.com/package/gulp-autoprefixer
gulp-uglify - https://www.npmjs.com/package/gulp-uglify
gulp-imagemin - https://www.npmjs.com/package/gulp-imagemin
del - https://www.npmjs.com/package/del
browser-sync - https://www.npmjs.com/package/browser-sync
gulp-htmlmin - https://www.npmjs.com/package/gulp-htmlmin
gulp-webp - https://www.npmjs.com/package/gulp-webp
gulp-webp-html - https://www.npmjs.com/package/gulp-webp-html
gulp-group-css-media-queries - https://www.npmjs.com/package/gulp-group-css-media-queries
gulp-babel - https://www.npmjs.com/package/gulp-babel
webpack-stream - https://www.npmjs.com/package/webpack-stream

Данная сборка собирает воедино все scss файлы из папки "app/scss" в один файл "app/css/style.min.css".
Сюда я не включил "gulp-file-include - https://www.npmjs.com/package/gulp-file-include" по причине того что я им не пользуюсь, 
а если сайт будет в дальнейшем сажаться на любую CMS то он так и так будет разбиваться на нужные блоки.
Тут присутствует сжатие файлов scss, html, js, images.
Так же для картинок есть преобразователь в формат webp.
Стоит так же и webpack для работы с js файлами.

В html файле уже подключён query через CDN.
В файлах scss уже есть сброс некоторых стилей.

Для запуска данной сборки в командной строке терминала вводится команда "npm i", после установки всех зависимостей (пакетов)
 запускаем сборку командой "gulp". После окончания написания всего кода, завершение проекта, вводится  команда "gulp build". 
 Данная команда сжимает, минифицирует и преобразует картинки для того чтобы проект можно было передать заказчику или залить на сервер. 

 Данная сборка полностью готова для работы.

