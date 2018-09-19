const Router = require('koa-router');
const db = require('../DBHelper');

const get = require('../APIHelper');
const genreIds = require('../Events');

let events = new Router();

/*
status:
1 => success,
0 => session problem,
-1 => username

get format => session=""&username=""
 */

events.get('/', async ( ctx ) => {
    let {session, username} = ctx.query;
    const user = db.get('users').find({ username}).value();
    if (user) {
        if (user.session === session) {
            const classname = user.classname[Math.floor(Math.random()* user.classname.length)] || "";
            const genreId = genreIds[user.genreId[Math.floor(Math.random()* user.genreId.length)]] || "";
            //wait until the response comes out
            await get(classname, genreId).then(data => {
                ctx.body = {status: 1, message: "Success", data}
            });
        } else {
            ctx.body = {status: 0, message: "wrong session"}
        }
    } else {
        ctx.body = {status: -1, message: "wrong username"}
    }

});

module.exports = events;