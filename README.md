# webpack-template
Стартовый шаблон для проектов

Установка: npm i или yarn

Скрипты:
  npm run dev - режим разработки,
  npm run build - сборка проекта в папку dist

Особенности сборки:
  1) В /assets/fonts кладем файлы шрифтов
  2) Картинки кладем в /assets/images, фавиконку в /static
  3) Js-файлы в /assets/js, подключаем в /index.js
  4) Стили в папке /assets/scss/common:
     colors.scss - переменные цветов,
     core.scss - глобальные классы,
     fonts.scss - подключение шрифтов,
     variable.scss - переменные для текущего проекта
  5) Новые scss-файлы подключаем в /assets/scss/index.scss
  6) В /pages кладем html-файлы, из /includes импортируем хедер и футер в свои страницы
  7) Сборка умеет минифицировать все файлы, сжимать картинки и делать webp из png и jpg
  
