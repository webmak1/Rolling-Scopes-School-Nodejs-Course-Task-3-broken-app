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

Было:

```js
app.listen(function () {
  console.log('App is listening on 4000');
});
```

<br/>

Стало:

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

<br/>

```
// SIGN UP
$ curl \
    --data '{"fullName":"Marley",
      "userName":"marley",
      "password":"123456789",
      "email":"marley@example.com"}' \
    --header "Content-Type: application/json" \
    --request POST http://localhost:4000/api/auth/signup \
    | python -m json.tool
```
