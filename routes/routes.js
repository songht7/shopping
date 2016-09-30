var express = require('express');
var router = express.Router();
var lg=require('../app/ctrl/lang');
var home=require('../app/ctrl/index');

module.exports = function(app){
	/* GET home page. */
	app.get('/setlang',lg.Setlang);
	app.get('/',lg.CheckLang,home.index);
	app.get('/detail/:id?',lg.CheckLang,home.detail);
	app.get('/blogger/:id?',lg.CheckLang,home.blogger);

};
