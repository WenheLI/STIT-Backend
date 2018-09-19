const Router = require('koa-router');
const db = require('../DBHelper');

let preferences = new Router();

/*
    status code:
    -1 => wrong username
    0 => wrong session,
    1 => success

    json format:
    {
        'username': "",
        'session': "",
        'classname': "",
        'genreId': ""
    }
 */

preferences.post('/', ( ctx ) => {
    let data = ctx.request.body;
    let {username, classname, genreId, session} = data;
    classname = classname || [];
    genreId = genreId || [];
    const user = db.get('users').find({username}).value();
    if (user) {
        if (user.session === session) {
            db.get('users').find({username}).assign({classname, genreId}).write();
            ctx.body = {status: 1, message: 'Success'}
        } else {
            ctx.body = {status: 0, message: `wrong session ${session}`}
        }
    } else {
        ctx.body = {status: -1, message: `wrong username ${username}`}
    }
});

module.exports = preferences;