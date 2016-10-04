var express = require('express');
var funs=require('../module/base.js');
var langs=require('../module/lang-pack.js');
var ctg=require('../module/category.js');
var video=require('../module/video.js');
var blg=require('../module/blogger.js');
var cart=require('../module/cart.js');


exports.index = function(getlang,req, res, next) {

	var item = funs.base(getlang,req, res);

	var category=ctg.ctgs;
  item["category"]=category;

  res.render('index',item);
}

exports.video = function(getlang,req, res, next) {
	var ctgid=req.params.id;
	if(ctgid>5){
		return res.redirect('/');
	}
	
	var item = funs.base(getlang,req, res);

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
	
	var item = funs.base(getlang,req, res);

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

  item["id"]=id;

  var content=related.list;
  //console.log(content);

	res.render('blogger',item);
}


exports.add2cart = function(getlang,req, res, next) {
	
	var list=[],
	ctgid=req.body.ctgid,
	id=req.body.id;
	var odr={"ctgid":ctgid,"id":id,"numb":1},cartNumb=1;
	//var getOdr=eval("(" + odr + ")");

	var cks=req.cookies;
	var has=false;
	if(cks.cart!=undefined){
		list=cks.cart;
		list.forEach(function(obj,key){
			cartNumb+=obj.numb;
			if(obj.id==id){
				obj.numb+=1;
				has=true;
			}
		});
	}
	if(!has){
		list.push(odr);
	}
	res.cookie('cart', list, {  path: '/' });
	res.cookie('cartNumb', cartNumb, {  path: '/' });
	res.json({ "result": '1',"msg":"success","cartNumb":cartNumb })
}
exports.cart = function(getlang,req, res, next) {
	var item = funs.base(getlang,req, res);
  
  var list=[];
  var cks=req.cookies;
	var dtl=video.detail;

	if(cks.cart!=undefined){
		cks.cart.forEach(function(obj,key){
			var pro=dtl[obj.ctgid]["product"];
			pro.forEach(function(p,k){
				if(p.id==obj.id){
					wn=p;
					wn["numb"]=obj.numb;
					list.push(wn);
				}
			});
		});
	}

  item["cart"]=cart;
  item["cartList"]=list;
	res.render('cart',item);
}

exports.order = function(getlang,req, res, next) {
	
	var item = funs.base(getlang,req, res);

	res.clearCookie('cart', { path: '/' });
	res.clearCookie('cartNumb', { path: '/' });
	res.render('order',item);
}