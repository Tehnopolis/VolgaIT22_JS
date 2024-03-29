# О проекте
> Выполнил Кабиров Сергей, ГАПОУ СО "Самарский государственный колледж"

Проект представляет из себя задание отборочного этапа по Volga IT 2022, в номинации JavaScript.

Выполнен на HTML + CSS + JavaScript + React + Git и представляет из себя виджет для подбора очков, с 11 экранами.

Скрипт виджета - `widget/widget.js`, Стиль виджета - `widget/widget.css`, Страница - `index.html`. По требованиям было сделано так, что виджет рендеринтся в элементе с нужным id, поэтому и React, JSX загружается инлайном, а не через `npm`.

# Запуск
Проект сам является статичным и предполагалось, что будет просто открываться как файл в браузере, но к сожалению использовался `Babel` + `JSX`, которые используют AJAX для подгрузки скрипта (Но дело в том, что AJAX не может обратиться к файлу в файловой системе, нужно запускать HTTP сервер)

Есть несколько способов запустить http сервер:

## 1. В Visual Studio Code
Первый способ запуска - используя плагин Live Server в VS Code, запустите Live Server из `index.html`.

## 2. С помощью Node.js
1. Установите `http-server` глобально:
```bash
npm i http-server -g
```
2. Запустите сервер:
```bash
http-server ./ -o --cors -p 5050
```
3. Откройте в браузере URL:
```
http://127.0.0.1:5050/index.html
```