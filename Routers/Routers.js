const router = require('koa-router')();

const register = require('./Register');
const login = require('./Login');
const events = require('./Events');
const pref = require('./Preferences');

router.use('/register', register.routes(), register.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());
router.use('/events', events.routes(), events.allowedMethods());
router.use('/preferences', pref.routes(), pref.allowedMethods());

module.exports = router;