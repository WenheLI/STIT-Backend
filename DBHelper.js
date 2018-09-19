const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);
/*
Helper for constructing Data Base
 */
const defaultItem = {users:[{classname:[], genreId:[], username:'', password:'', uuid: '', session:''}]};

db.defaults(defaultItem)
    .write();

module.exports = db;