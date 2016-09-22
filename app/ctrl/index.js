var express = require('express');
var langpack=require('../module/lang-pack.js');


exports.index = function(langkey,req, res, next) {
	var langs=langpack;
	var menu=langs.menu,
	footer_menu=langs.footer_menu;
	//console.log(footer_menu);
	var key=langkey-1;
  res.render('index', { title: 'shopping',lang:key,langs:langs,menu:menu,footerMenu:footer_menu});
}