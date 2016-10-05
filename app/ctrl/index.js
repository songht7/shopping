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
	id=req.body.id,
	price=req.body.price;
	var odr={"ctgid":ctgid,"id":id,"numb":1,"price":price,"subtotal":price}
	,cartNumb=1;
	var total=price;
	//var getOdr=eval("(" + odr + ")");

	var cks=req.cookies;
	var has=false;
	if(cks.cart!=undefined){
		list=cks.cart,total=0;
		list.forEach(function(obj,key){
			cartNumb+=obj.numb;
			if(obj.id==id){
				obj.numb+=1;
				var nb=obj.numb,pc=obj.price;
				obj.subtotal=funs.floatMul(nb,pc);
				has=true;
			}
		});
	}
	if(!has){
		list.push(odr);
	}
	if(cks.total){tl=cks.total;}else{tl=0;}
	total=funs.floatAdd(price,tl);

	res.cookie('cart', list, {  path: '/' });
	res.cookie('cartNumb', cartNumb, {  path: '/' });
	res.cookie('total', total, {  path: '/' });
	res.json({ "result": '1',"msg":"success","cartNumb":cartNumb,"total":total})
}

exports.removecart = function(getlang,req, res, next) {
	var ctgid=req.body.ctgid,
			id=req.body.id;
  var cks=req.cookies;
  var cart=cks.cart,cartNumb=cks.cartNumb,total=cks.total;
  cart.forEach(function(obj,key){
  	if(obj.id==id&&obj.ctgid==ctgid){
  		cart.splice(key,1);
  		cartNumb-=obj.numb;
  		total=funs.floatSub(total,obj.subtotal);
  	}
  });
	res.cookie('cart', cart, {  path: '/' });
	res.cookie('cartNumb', cartNumb, {  path: '/' });
	res.cookie('total', total, {  path: '/' });
	res.json({ "result": '1',"msg":"success","cartNumb":cartNumb,"total":total})
}

exports.cart = function(getlang,req, res, next) {
	var item = funs.base(getlang,req, res);
	var fqr=req.query.fqr;
	var list=[],total=0;
	var dtl=video.detail;//分类下产品列表
	if(fqr){//微信扫描购物
		var ctgid=req.query.ctgid;
		var pro=dtl[ctgid]["product"];//对应分类产品列表
		pro.forEach(function(p,k){
			if(k<3){
				total=funs.floatAdd(total,p.unit_price);
				p["numb"]=1;
				list.push(p);
			}
		});
		res.cookie('total', total, {  path: '/' });
	}else{//PC购物
	  var cks=req.cookies;
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
		if(cks.total!=undefined){
			total=cks.total;
		}
	}
  item["cart"]=cart;
  //console.log(list);
  item["cartList"]=list;
  item["total"]=total;
	res.render('cart',item);
}

exports.order = function(getlang,req, res, next) {
	
	var item = funs.base(getlang,req, res);

	res.clearCookie('cart', { path: '/' });
	res.clearCookie('cartNumb', { path: '/' });
	res.clearCookie('total', {  path: '/' });
	res.render('order',item);
}