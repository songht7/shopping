$(function(){
    $("#MenuBtn").on("click",function(){
        var obj=$(this), slideMenu=$("#SlideMenu");
        if(!slideMenu.hasClass("on")){
            obj.addClass("active");
            slideMenu.addClass("on");
            slideMenu.animate({"height":"30px","opacity":1,"padding":"20px 0 0"},500);
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
});
function changeLang(obj){
    var key=obj.val(),
    url="/setlang?key="+key;
    console.log(url);
    $.get(url,function(data){
        if(data.Result==1){
            window.location.reload() 
        }
    });
}