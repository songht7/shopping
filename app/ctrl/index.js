var express = require('express');
var langpack=require('../module/lang-pack.js');
var ctg=require('../module/category.js');
var video=require('../module/detail.js');


exports.index = function(getlang,req, res, next) {
	var langs=langpack;
	var menu=langs.menu,
	footer_menu=langs.footer_menu;
	var lgkey=getlang.key,lgtype=getlang.lgType;
	var item={ title: 'shopping',lang:lgtype,lgkey:lgkey,langs:langs,menu:menu,footerMenu:footer_menu};
  
	var category=ctg.ctgs;
  item["category"]=category;

  res.render('index',item);
}

exports.detail = function(getlang,req, res, next) {
	var ctgid=req.params.id;
	
	var langs=langpack;
	var menu=langs.menu,
	footer_menu=langs.footer_menu;
	var lgkey=getlang.key,lgtype=getlang.lgType;
	var item={ title: 'shopping',lang:lgtype,lgkey:lgkey,langs:langs,menu:menu,footerMenu:footer_menu};
  

  var wine=video.detail[ctgid];
  item["wine"]=wine;
  console.log(item["wine"]);

  	res.render('detail',item);
}