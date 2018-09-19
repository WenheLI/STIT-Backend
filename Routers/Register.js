const uuid = require('node-uuid');
const Router = require('koa-router');
const db = require('../DBHelper');
const crypto = require('crypto');

let register = new Router();

/* status code:
 -1 : duplicate username
1: success

post format: {
    'username':'',
    'password':'',
    'genreId':[] optional,
    'classname':[] optional
}

note: username should be stored in form of string
 */

register.post('/', ( ctx ) => {
    let data = ctx.request.body;
    //check if username is used
    if (db.get('users').find({username: data.username}).value()) ctx.body = {status: -1, message: "duplicate username"};
    else {
        const sha1 = crypto.createHash("sha1");

        //hash password
        const uuid_ = uuid.v1();
        sha1.update(data.password + uuid_);
        data.password = sha1.digest('hex');
        //ensure store with string format
        data.username = data.username.toString();
        data.username = data.username.toString();
        const classname = data.classname || [];
        const genreId = data.genreId || [];
        //add uuid to user
        data = {
            uuid: uuid_,
            classname,
            genreId,
            ...
            data
        };
        db.get('users')
            .push(data)
            .write();
        ctx.body = {status:1, message: 'success'}
    }
});

module.exports = register;