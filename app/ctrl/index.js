var express = require('express');
var langpack=require('../module/lang-pack.js');


exports.index = function(getlang,req, res, next) {
	var langs=langpack;
	var menu=langs.menu,
	footer_menu=langs.footer_menu;
	//console.log(footer_menu);
	var lgkey=getlang.key,lgtype=getlang.lgType;
  res.render('index', { title: 'shopping',lang:lgtype,lgkey:lgkey,langs:langs,menu:menu,footerMenu:footer_menu});
}