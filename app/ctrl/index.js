var express = require('express');
var langpack=require('../module/lang-pack.js');
var ctg=require('../module/category.js');
var detail=require('../module/detail.js');


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
	var langs=langpack;
	var menu=langs.menu,
	footer_menu=langs.footer_menu;
	var lgkey=getlang.key,lgtype=getlang.lgType;
	var item={ title: 'shopping',lang:lgtype,lgkey:lgkey,langs:langs,menu:menu,footerMenu:footer_menu};
  
	var category=ctg.ctgs;
  item["category"]=category;
  
  if(lgkey==1){
  	res.render('detail',item);
	}else{
  	res.render('zh/detail',item);
	}
}