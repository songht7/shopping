var express = require('express');
var langpack=require('../module/lang-pack.js');
var ctg=require('../module/category.js');
var video=require('../module/video.js');
var blg=require('../module/blogger.js');
var cart=require('../module/cart.js');


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

exports.video = function(getlang,req, res, next) {
	var ctgid=req.params.id;
	if(ctgid>5){
		return res.redirect('/');
	}
	var langs=langpack;
	var menu=langs.menu,
	footer_menu=langs.footer_menu;
	var lgkey=getlang.key,lgtype=getlang.lgType;
	var item={ title: 'shopping',lang:lgtype,lgkey:lgkey,langs:langs,menu:menu,footerMenu:footer_menu};
  

  var wine=video.detail[ctgid];
  item["wine"]=wine;

  var related=blg.related;
  item["related"]=related;

  var otherVideo=video.otherVideo;
  item["otherVideo"]=otherVideo;

  var uMayLike=video.uMayLike;
  item["uMayLike"]=uMayLike;

  	res.render('video',item);
}

exports.blogger = function(getlang,req, res, next) {
	var id=req.params.id;
	
	var langs=langpack;
	var menu=langs.menu,
	footer_menu=langs.footer_menu;
	var lgkey=getlang.key,lgtype=getlang.lgType;
	var item={ title: 'shopping',lang:lgtype,lgkey:lgkey,id:id,langs:langs,menu:menu,footerMenu:footer_menu};
  

	var page_menu=langs.page_menu;
  item["page_menu"]=page_menu;

	var category=ctg.ctgs;
  item["category"]=category;

  var wine=video.detail[id];
  item["wine"]=wine;

  var recmd=blg.rec;
  item["recmd"]=recmd;
  var related=blg.related;
  item["related"]=related;

  var content=related.list;
  console.log(content);

	res.render('blogger',item);
}

exports.cart = function(getlang,req, res, next) {
	
	var langs=langpack;
	var menu=langs.menu,
	footer_menu=langs.footer_menu;
	var lgkey=getlang.key,lgtype=getlang.lgType;

	var item={ title: 'shopping',lang:lgtype,lgkey:lgkey,langs:langs,menu:menu,footerMenu:footer_menu};
	
  item["cart"]=cart;
	res.render('cart',item);
}