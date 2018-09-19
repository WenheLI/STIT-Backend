const uuid = require('node-uuid');
const Router = require('koa-router');
const db = require('../DBHelper');
const crypto = require('crypto');

let login = new Router();
/*
   post format:
   {
    'username': '',
    'password': ''
   }

   status:
   1 => login success,
   0 => wrong password,
   -1 => wrong username

   return password or username for frontend to debug
 */

login.post('/', ( ctx ) => {
    let data = ctx.request.body;
    //check if username is used
    let {username, password} = data;
    username = username.toString();
    const user = db.get('users').find({username}).value();
    if (user) {
        const sha1 = crypto.createHash("sha1");
        sha1.update(password + user.uuid);
        let encry_password = sha1.digest('hex');
        //check password
        if (encry_password === user.password) {
            let session = uuid.v4();
            db.get('users').find({username}).assign({session}).write();
            ctx.body = {status: 1, message: "Success", session}
        } else {
            ctx.body = {status: 0, message: `wrong password ${encry_password}`, session:"-1"}
        }
    } else {
        ctx.body = {status: -1, message: `wrong username ${username}`, session:"-1"}
    }
});

module.exports = login;