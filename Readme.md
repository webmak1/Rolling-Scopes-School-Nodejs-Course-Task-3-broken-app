# Rolling Scopes School Nodejs Course Task 3 broken app

<br/>

**Ошибка 1:**

<br/>

![Application](/img/pic-01-Error-01.png?raw=true)

<br/>

**Ошибка 2:**

Error: Cannot find module 'bcrypt'

    $ npm install bcrypt

<br/>

**Ошибка 3:**

```
const User = require('../db').import('../models/user');
                                    ^

TypeError: require(...).import is not a function
```

<br/>

**Ошибка 4:**

```
var Game = require('../db').import('../models/game');
                                  ^

TypeError: require(...).import is not a function
```

<br/>

**Ошибка 5:**

```
oken-app/app/src/models/game.js:1
function(sequelize, DataTypes) {
^^^^^^^^

SyntaxError: Function statements require a function name
```

<br/>

**Ошибка 6:**

```
module.exports = routers;
                 ^

ReferenceError: routers is not defined

```

<br/>

**Ошибка 7:**

```
db.sync();
   ^

TypeError: db.sync is not a function

```

<br/>

**Ошибка 8:**

```
const User = require('sequelize').import('../models/user');
                                        ^

TypeError: require(...).import is not a function
```

<br/>

**Ошибка 9:**

Не запускалось приложение на 4000 порту.

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

**Ошибка 10:**

Не было экспорта в файле db.js.

```
module.exports = sequelize;

```

** Ошибка 11:**

```
app.use(require('body-parser'));
```

Пока не удалил из app.js, не проходили запросы.

<br/>

**usercontroller.js**

```
User.create({
    fullName: req.body.user.fullName,
    userName: req.body.user.userName,
    passwordHash: bcrypt.hashSync(req.body.user.password, 10),
    email: req.body.user.email,
  })
```

Данные нужно брать из req.body

fullName, userName, passwordHash были не в camelCase. Из за чего были ошибки.

passwordHash отличалась в модели и в вызовах.

// TODO:
При SIGN IN возвращаются лишине данные, в том числе и passwordHash

Повторяется JWT ключ

Какая-то непонятная ерунда в импортах.
// const User = require('sequelize').import('../models/user');

Game лишняя.
req.body.game

Записывалось в
req.user = user;
req.body.user = user;

Нет проверки перед добавлением данных в базу

<br/>

д.Б 404
res.status(500).json({
message: 'Data not found',
});

havePlayed обрабатывает неправильно. д.б. boolean

Используются id из обычных цифр.

Возможно неправильно сделана модель.

При SIGN IN возвращаетмся много лишнего. Нужно возвращать только токен.

Можно добавлять повторяющиеся данные.

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

**returns**

```
***
"sessionToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRjNjViNmU4LTBjYzQtNDI0NS04MGM4LWMyY2YxYTM3Yjk0YyIsImlhdCI6MTYyMTQ4NDg0OSwiZXhwIjoxNjIxNTcxMjQ5fQ.j0F0DEZNv35rNfkagbOdmfbNjLVppGrs_X_IaWUZito"
***
```

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
