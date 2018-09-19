# STIT-Backend Challenge

## Description

This a simple backend developed with Koa2(next generation of Express) and lowdb.

It has four endpoints:
 - **login** allow user to login in your account and it will return a session code for other endpoints to check
 -  **register** allow users to resist an account note that every password will be hashed with salt to ensure the password safety and it will generate a **UUID** for Database to do reference.
 - **events** so far it only allow users to get new events based on their prefs.
 - **preference** so far allow users to use post to change their preference setting.

All the codes are developed under ES 7 with promising and async/await and all the APIs are developed under RESTful.

## How to use

Run ``https://github.com/WenheLI/STIT-Backend.git``

``cd STIT-Backend``

``npm install``

``node ./index.js``

## API useage

``POST /login``
``` 
{
    'username': '',
    'password': ''
   }
```

``POST /register``
```
{
    'username':'',
    'password':'',
    'genreId':[] //optional,
    'classname':[] //optional
}
```

``GET /events?session=""&username=""``

``POST /preferences``
```
{       
        'username': "",
        'session': "",
        'classname': "", //optional
        'genreId': ""   //optional
    }
```
