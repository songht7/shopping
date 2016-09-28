var express = require('express');
var langpack=require('../module/lang-pack.js');
var ctg=require('../module/category.js');


exports.index = function(getlang,req, res, next) {
	var langs=langpack;
	var menu=langs.menu,
	footer_menu=langs.footer_menu;
	var category=ctg.product;
	console.log(category);
	var lgkey=getlang.key,lgtype=getlang.lgType;
  res.render('index', { title: 'shopping',lang:lgtype,lgkey:lgkey,langs:langs,menu:menu,category:category,footerMenu:footer_menu});
}