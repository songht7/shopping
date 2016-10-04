var langs=require('../module/lang-pack.js');
var ctg=require('../module/category.js');
var video=require('../module/video.js');
var blg=require('../module/blogger.js');
var cart=require('../module/cart.js');

var funs={
	base:function(getlang,req, res){
		var menu=langs.menu,
		footer_menu=langs.footer_menu;
		var lgkey=getlang.key,lgtype=getlang.lgType;
		var cartNumb=0;
		if(req.cookies){cartNumb=req.cookies.cartNumb;}
		var item={ title: 'shopping',cartNumb:cartNumb,lang:lgtype,lgkey:lgkey,langs:langs,menu:menu,footerMenu:footer_menu};
		return item;
	}
};

module.exports = funs;