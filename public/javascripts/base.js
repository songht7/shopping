$(function(){
    $("#MenuBtn").on("click",function(){
        var obj=$(this), slideMenu=$("#SlideMenu");
        if(!slideMenu.hasClass("on")){
            obj.addClass("active");
            slideMenu.addClass("on");
            slideMenu.animate({"height":"32px","opacity":1,"padding":"20px 0 0"},500);
        }else{
            obj.removeClass("active");
            slideMenu.removeClass("on");
            slideMenu.animate({"height":"0","opacity":"0","padding":"0"},500);
        }
    });
    $(".multi").mouseover(function(){
        var obj=$(this);
        obj.find(".hasSub").addClass("active");
        obj.find(".subBox").show();
    });
    $(".multi").mouseleave(function(){
        var obj=$(this);
        obj.find(".hasSub").removeClass("active");
        obj.find(".subBox").hide();
    });

    $("#MbMenuBtn").on("click",function(){
        var obj=$(this), mbMenu=$("#MobileMenu");
        if(!mbMenu.hasClass("on")){
            obj.addClass("active");
            mbMenu.addClass("on");
            mbMenu.animate({"left":"0"},500);
        }else{
            obj.removeClass("active");
            mbMenu.removeClass("on");
            mbMenu.animate({"left":"-100%"},500);
        }
    });

    var QRcode=$("#QRcode");
    if(QRcode.length){
        var host=window.location.host,ctgid=QRcode.data("ctgid"),protocol=window.location.protocol;
        /**,port=window.location.port;if(port!=""||port!="80"){port=":"+port;}else{port="";}**/
        var url=protocol+"//"+host+"/cart?fqr=true&ctgid="+ctgid;
        //console.log(url);
        QRcode.qrcode({
            width: 140, //宽度 
            height:140, //高度 
            text    : url
        }); 
    }
    $(".fltBox").hover(function(){
        $(this).find("#QRcode").show();
    },function(){
        $(this).find("#QRcode").hide();
    });

    //购物车删除
    $(document).on("click",".delt",function(){
        var obj=$(this),prt=obj.parent();
        var ctgid=prt.data("ctgid"),id=prt.data("id"),
        row=prt.data("row");
        $.post("/removecart", { "ctgid": ctgid, "id": id }, function(data) {
            if (data.result == 1) {
                $("#CartWarp,.cartConut").html(data.cartNumb);
                $(".totals").find("i").html(data.total);
                $(".total.mobile").find("i").html(data.total);
                $("#"+row).remove();
            }
        });
    });

    /**表单**/
    $(document).on("click", ".selHtm", function () {
        var selList = $(this).parent().find(".selList");
        var prt = $(this).parent();
        if (!selList.hasClass("active")) { selList.show(); selList.addClass("active"); prt.addClass("on"); } else { selList.hide(); selList.removeClass("active"); prt.removeClass("on"); }
        var onError = $(this).parent().parent().find(".onError");
        if (onError.length > 0) { onError.attr("class","onFocus");}
    });
    $(document).on("click", ".selList li", function () {
        if (!$(this).hasClass("overView")) {
            var val = $(this).data("value");
            var htm = $(this).html();
            $(this).addClass("on").siblings("li").removeClass("on");
            $(this).parent().parent().find(".selVal").attr("value", val);
            $(this).parent().parent().find(".selHtm").html(htm);
            $(this).parent().removeClass("active").hide();
            $(".selBlock").removeClass("on");
            changeLang($(".selVal"));
        }
    });
    $(document).on("click",".shareBtn",function(){
        $(".shareMain").toggle();
    });

    resize();
    $(window).resize(function(){
        resize();
    });
});
function changeLang(obj){
    var key=obj.val(),
    url="/setlang?key="+key;
    //console.log(url);
    $.get(url,function(data){
        if(data.Result==1){
            window.location.reload() 
        }
    });
}
function resize(){
    var bodyHeight=$("body").height(),
        mainHeight=$("#PageMain").height(),
        headerHeight=$("header").height(),
        footerHeight=$("footer").height(),
        winHeight=$(window).height(),
        winWidth=$(window).width();
    var mHeight=bodyHeight-headerHeight;
    if(bodyHeight<=winHeight){mHeight=winHeight-headerHeight}
    $("#MobileMenu").css({"height":mHeight});
    if(winWidth>=736){
        $("#MbMenuBtn").removeClass("active");
        $("#MobileMenu").css({"left":"-100%"});
    }

    var mHeight=winHeight-headerHeight-footerHeight;
    if(mainHeight<mHeight){
        $("#PageMain").css({"min-height":mHeight})
    }

}
//加    
function floatAdd(arg1,arg2){    
     var r1,r2,m;    
     try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}    
     try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}    
     m=Math.pow(10,Math.max(r1,r2));    
     return (arg1*m+arg2*m)/m;    
}    
      
//减    
function floatSub(arg1,arg2){    
    var r1,r2,m,n;    
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}    
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}    
    m=Math.pow(10,Math.max(r1,r2));    
    //动态控制精度长度    
    n=(r1>=r2)?r1:r2;    
    return ((arg1*m-arg2*m)/m).toFixed(n);    
}    
       
//乘    
function floatMul(arg1,arg2)   {     
    var m=0,s1=arg1.toString(),s2=arg2.toString();     
    try{m+=s1.split(".")[1].length}catch(e){}     
    try{m+=s2.split(".")[1].length}catch(e){}     
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);     
}     
      
      
//除   
function floatDiv(arg1,arg2){     
      var t1=0,t2=0,r1,r2;     
      try{t1=arg1.toString().split(".")[1].length}catch(e){}     
      try{t2=arg2.toString().split(".")[1].length}catch(e){}     
        
      r1=Number(arg1.toString().replace(".",""));  
   
      r2=Number(arg2.toString().replace(".",""));     
      return (r1/r2)*Math.pow(10,t2-t1);     
}