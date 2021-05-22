# Rolling Scopes School Nodejs Course Task 3 broken app

<br/>

Разрабатывалось и проверялось в ubuntu 20.04 LTS. Node.js использовалась последняя LTS.

<br/>

# Работа с приложением.

<br/>

Перейти в каталог app/src/

Переименовать файл: .env.sample в .env. В .env.sample копия работающего конфига.

Инсталлировать пакеты

    $ npm install

<br/>

Инсталлировать <a href="//sysadm.ru/devops/containers/docker/setup/">docker и docker-compose</a>

Для запуска базы, выполнить.

    $ docker-compose up

<br/>

```
// SIGN UP
$ curl \
    --data '{
      "fullName":"Marley",
      "userName":"marley",
      "password":"123456789",
      "email":"marley1@example.com"}' \
    --header "Content-Type: application/json" \
    --request POST http://localhost:4000/api/auth/signup \
    | python -m json.tool
```

<br/>

```
// SIGN IN
$ curl \
    --data '{
      "userName":"marley",
      "password":"123456789"}' \
    --header "Content-Type: application/json" \
    --request POST http://localhost:4000/api/auth/signin \
    | python -m json.tool
```

<br/>

**returns**

```
***
"sessionToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRjNjViNmU4LTBjYzQtNDI0NS04MGM4LWMyY2YxYTM3Yjk0YyIsImlhdCI6MTYyMTQ4NDg0OSwiZXhwIjoxNjIxNTcxMjQ5fQ.j0F0DEZNv35rNfkagbOdmfbNjLVppGrs_X_IaWUZito"
***
```

<br/>

$ export TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRjNjViNmU4LTBjYzQtNDI0NS04MGM4LWMyY2YxYTM3Yjk0YyIsImlhdCI6MTYyMTQ4NDg0OSwiZXhwIjoxNjIxNTcxMjQ5fQ.j0F0DEZNv35rNfkagbOdmfbNjLVppGrs_X_IaWUZito

<br/>

```
// GREATE THE GAME 1
$ curl \
    --data '{
      "title":"Starcraft 2",
      "studio":"Blizzard",
      "esrbRating":"8",
      "userRating":"5",
      "havePlayed":"True"
      }' \
    --header "Content-Type: application/json" \
    --header "authorization: ${TOKEN}" \
    --request POST http://localhost:4000/api/game/create \
    | python -m json.tool
```

<br/>

```
// GREATE THE GAME 2
$ curl \
    --data '{
      "title":"Quake 2",
      "studio":"ID Software",
      "esrbRating":"5",
      "userRating":"4",
      "havePlayed":"NO"
      }' \
    --header "Content-Type: application/json" \
    --header "authorization: ${TOKEN}" \
    --request POST http://localhost:4000/api/game/create \
    | python -m json.tool
```

<br/>

```
// GREATE THE GAME 3
$ curl \
    --data '{
      "title":"Dead Space 3",
      "studio":"Visceral Games",
      "esrbRating":"3",
      "userRating":"3",
      "havePlayed":"YES"
      }' \
    --header "Content-Type: application/json" \
    --header "authorization: ${TOKEN}" \
    --request POST http://localhost:4000/api/game/create \
    | python -m json.tool
```

<br/>

```
// GET ALL GAMES
$ curl \
    --header "Content-Type: application/json" \
    --header "authorization: ${TOKEN}" \
    --request GET http://localhost:4000/api/game/all \
    | python -m json.tool
```

<br/>

```
// UPDATE
$ curl \
    --data '{
      "title":"Diablo 3",
      "studio":"Blizzard",
      "esrbRating":"2",
      "userRating":"2",
      "havePlayed":"NO"
      }' \
    --header "Content-Type: application/json" \
    --header "authorization: ${TOKEN}" \
    --request PUT http://localhost:4000/api/game/update/63cd89e2-3d7c-470b-9146-3f5a9f0113ee \
    | python -m json.tool
```

<br/>

```
// GET BY ID
$ curl \
    --header "Content-Type: application/json" \
    --header "authorization: ${TOKEN}" \
    --request GET http://localhost:4000/api/game/63cd89e2-3d7c-470b-9146-3f5a9f0113ee \
    | python -m json.tool
```

<br/>

```
// DELETE GAME
$ curl \
    --header "Content-Type: application/json" \
    --header "authorization: ${TOKEN}" \
    --request DELETE http://localhost:4000/api/game/remove/8830a0da-f49e-441a-972a-af7ea1ad25b5 \
    | python -m json.tool
```

<br/>

<br/>

## Cамопроверка:

<br/>

### Найденные ошибки компиляции

<описание ошибки>. <описание исправления>. Исправлена(ы) строка(и) <номер(а) строк> в файле <относительный путь к файлу из корневой папки> ...

<br/>

**Ошибка 1:**

<br/>

![Application](/img/pic-01-Error-01.png?raw=true)

<br/>

```
module.exports = routers;
                 ^

ReferenceError: routers is not defined

```

<br/>

**Исправление ошибки 1:**

Ошибка в имени переменной.

файл: controllers/gamecontroller.js
Строка: 116

Исправление: Переименование константы в router.

<br/>

**Ошибка 2:**

Error: Cannot find module 'bcrypt'

<br/>

**Исправление ошибки 2:**

Не указан в package.json модуль bcrypt.

файл: package.json

Исправление:

    $ npm install bcrypt

<br/>

**Ошибка 3:**

```
const User = require('../db').import('../models/user');
                                    ^

TypeError: require(...).import is not a function
```

<br/>

**Исправление ошибки 3:**

Ошибка в импорте модели user.

файл: controllers/usercontroller.js
Строка: 5

Исправление: Использовать следующий синтаксис.

    const { User } = require('../models/User');

<br/>

**Ошибка 4:**

```
oken-app/app/src/models/game.js:1
function(sequelize, DataTypes) {
^^^^^^^^

SyntaxError: Function statements require a function name
```

<br/>

**Исправление ошибки 4:**

Ошибка в том, что не экспортируется функция и у функции отсутствует имя.

файл: models/game.js
Строка: 1

Исправление: Использовать следующий синтаксис для экспорта. Присвоение имени объекту с данными.

```js
const Game = sequelize.define('Games', attributes);
exports.Game = Game;
```

<br/>

**Ошибка 5:**

```
db.sync();
   ^

TypeError: db.sync is not a function

```

Ошибка в неправильном (возможно устаревшем) вызове функции.

файл: app.js
Строка: 8

Исправление: удаление функции. Использование синтаксиса следующего вида, при необходимости работы с базой.

<br/>

```js
const { Game } = require('../models/Game');
await Game.sync();
```

<br/>

### Найденные ошибки логики приложения

<описание ошибки>. <описание исправления>. Исправлена(ы) строка(и) <номер(а) строк> в файле <относительный путь к файлу из корневой папки> ...

<br/>

**Ошибка 1:**

Не запускалось приложение на 4000 порту.

<br/>

**Исправление ошибки 1:**

Ошибка в том, что при запуске приложения нужный порт не назначался или не стартовал должным образом.

файл: app.js
Строки: 13-15

<br/>

**Исправление:**

**Было:**

```js
app.listen(function () {
  console.log('App is listening on 4000');
});
```

<br/>

**Стало:**

```js
const APP_PORT = process.env.APP_APP_PORT || 4000;

app.listen(APP_PORT, () =>
  console.log(`App is running on http://localhost:${APP_PORT}`)
);
```

<br/>

**Ошибка 2:**

Не работало приложения до обновления пакетов до актуальных.

<br/>

**Исправление ошибки 2:**

**Исправление:**

    $ npm install -g npm-check-updates
    $ ncu -u
    $ npm install

<br/>

**Ошибка 3:**

Отсутствовал экспорта в файле db.js.

<br/>

**Исправление ошибки 3:**

файл: db.js
Строка: конец файла - строка 17-18

Исправление: Реализовать экспорт.

<br/>

```js
module.exports = sequelize;
```

<br/>

**Ошибка 4:**

<br/>

**Исправление ошибки 4:**

Описание:

Пока не удалил из app.js, не проходили запросы.

```
app.use(require('body-parser'));
```

файл: app.js
Строка: 9

Исправление: Удаление строки из приложения.

<br/>

**Ошибка 5:**

<br/>

**Исправление ошибки 4:**

Описание:

Разный регистр в слове passwordHash. При работе, значение переданное программе терялось.

файл: controllers/usercontroller.js  
Строка: 11

файл: controllers/usercontroller.js  
Строка: 32

Исправление: Использовать одно название в каждом из перечисленных случаев - passwordHash.

<br/>

**Ошибка 6:**

Описание:

При SIGN IN возвращались лишине данные, в том числе и passwordHash

файл: controllers/usercontroller.js  
Строка: 36

Исправление: убрать из возвращаемых данных созданного пользователя.

```
user: user,
```

Оставить только token.

<br/>

**Ошибка 7:**

Описание:

В коде повторяется строковая переменная со значение 'lets_play_sum_games_man' для JWT токена.

файл: middleware/validate-session.js  
Строка: 12

файл: controllers/usercontroller.js  
Строка: 34

Исправление: Вынес строковую переменную в JWT_SECRET_KEY в файл .env.

<br/>

**Ошибка 8:**

Описание:

В моделях отсутвовали constraints, в том числе PK.

файл: models/game.js  
Строка:

файл: models/user.js  
Строка:

Исправление: Добавил constraints на некоторые поля.

<br/>

**Ошибка 9:**

Описание:

Неправильные ответы от сервера. д.б. 404. передается 500. Посторяется в нескольких файлах.

файл: controllers/gamecontroller.js
Строка: 15

<br/>

Было:

<br/>

```js
res.status(500).json({
  message: 'Data not found',
});
```

<br/>

```js
return res.status(404).json({
  message: 'Data not found',
});
```

<br/>

**Ошибка 10:**

Описание:

Использовались id из обычных цифр. Не является хорошей практикой. Является логической ошибкой, т.к. пользователи могу удидеть закономерности и абузить их.

файл: /model/user.js
Строки: -

файл: /model/game.js
Строки: -

Исправления: Использовать.

<br/>

**models/Game.js**

```
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
```

<br/>

**models/User.js**

```
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
```

<br/>

**Ошибка 11:**

Передаваемый параметр havePlayed обрабатывает неправильно. д.б. boolean

Не исправлялось.

<br/>

**Ошибка 12:**

Нет проверок передаваемых параметров в приложение.

Не исправлялось.

<br/>

### Рефактор кода

- Заменены названия файлов. Приведены к camelCase. Файлы с моделями начинаются с большой буквы.
- Заменены переменные var на let и const.
- Заменены промисы на async/await
- Переделаны модели.
- Изменен способ подключения и работы с базой.
- Изменен вывод данных в консоль при запросах.
- Заменил автоинкремент id в моделях на uuidv4
- Заменил названия входных параметров, чтобы они все были camelCase
