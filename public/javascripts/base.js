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
    $("#Language").change(function(){
        var obj=$(this);
        var key=obj.val(),
        url="/setlang?key="+key;
        console.log(url);
        $.get(url,function(data){
            console.log(data);
            if(data.Result==1){
                window.location.reload() 
            }
        });
    });
    //////
    function getGallerySlideNumber(){
        var scrollOffset = Math.abs($(".homeSlide .wrapper").offset().left);
        var slideWidth = $(".homeSlide .slides").width();
        var slideNum = parseInt(scrollOffset/slideWidth);
        return slideNum;
    }

    $(".homeSlide > .arrowLeft").click(function(){
        var gallery =  $(".homeSlide");
        var prevSlideNum = getGallerySlideNumber() - 1; 
        if(prevSlideNum >= 0){
            gallery.find(".swiper-wrapper").scrollTo(gallery.find('.slides:eq('+prevSlideNum+')'), 500);
        }
    });

    $(".homeSlide > .arrowRight").click(function(){
        var gallery =  $(".homeSlide");
        var nextSlideNum = getGallerySlideNumber() + 1;
        if(nextSlideNum <= gallery.find('.slides').length){
            gallery.find(".swiper-wrapper").scrollTo(gallery.find('.slides:eq('+nextSlideNum+')'), 500);
        }
    });
});