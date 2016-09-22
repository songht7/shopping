var express = require('express');
var cookie = require('cookie-parser');
///en:1,zh:2
///
exports.Setlang = function(req, res, next) {
	var type="en",key=1;
	var getKey=req.query.key;
	if(getKey){
		key=getKey;
	}
	if(key==2){type="zh";}
	res.cookie('lang', {"type":type,"key":key}, {  path: '/' });
	res.json({ Result: '1',Msg:'成功'});
}
exports.CheckLang = function(req, res, next) {
	var cks=req.cookies;
	if(cks.lang==undefined){
		langkey=1;
	}else{
		langkey=cks.lang.key;
	}
	next(langkey);
}