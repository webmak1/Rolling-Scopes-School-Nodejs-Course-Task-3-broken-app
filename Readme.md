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

<br/>

```js
const APP_PORT = process.env.APP_APP_PORT || 4000;

app.listen(APP_PORT, () =>
  console.log(`App is running on http://localhost:${APP_PORT}`)
);
```
