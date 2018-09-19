const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const routers = require('./Routers/Routers');

const app = new Koa();
app.use(bodyParser());
app.use(routers.routes()).use(routers.allowedMethods());

app.listen(1029);
console.log('Start at port 1029');