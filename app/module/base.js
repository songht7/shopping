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
	,floatAdd:function(arg1,arg2){//加 
	     var r1,r2,m;    
	     try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}    
	     try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}    
	     m=Math.pow(10,Math.max(r1,r2));    
	     return (arg1*m+arg2*m)/m;    
	} 
	,floatSub:function(arg1,arg2){//减   
	    var r1,r2,m,n;    
	    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}    
	    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}    
	    m=Math.pow(10,Math.max(r1,r2));    
	    //动态控制精度长度    
	    n=(r1>=r2)?r1:r2;    
	    return ((arg1*m-arg2*m)/m).toFixed(n);    
	}       
	,floatMul:function(arg1,arg2){//乘 
	    var m=0,s1=arg1.toString(),s2=arg2.toString();     
	    try{m+=s1.split(".")[1].length}catch(e){}     
	    try{m+=s2.split(".")[1].length}catch(e){}     
	    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);     
	}
	,floatDiv:function(arg1,arg2){//除
	      var t1=0,t2=0,r1,r2;     
	      try{t1=arg1.toString().split(".")[1].length}catch(e){}     
	      try{t2=arg2.toString().split(".")[1].length}catch(e){}     
	        
	      r1=Number(arg1.toString().replace(".",""));  
	   
	      r2=Number(arg2.toString().replace(".",""));     
	      return (r1/r2)*Math.pow(10,t2-t1);     
	}
};

module.exports = funs;