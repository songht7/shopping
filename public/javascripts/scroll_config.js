$(function(){
  var doit;
  window.onresize = function(){
    clearTimeout(doit);
    doit = setTimeout(resizedw, 100);
  };
  var swiper =  new Swiper('.swiper-container', {
        onSlideChangeEnd: swiperChange
      });
  var scrollbar = $('#featuredGallery .container').perfectScrollbar();
  resizedw();
  function resizedw(){
    if($(window).width() > 768) {
      if(swiper != null) {
        swiper.destroy(true, true);
        swiper = null;
      }
      if(scrollbar == null) {
        scrollbar = $('#featuredGallery .container').perfectScrollbar();
      }
    }else{
      if(scrollbar != null) {
        $('#featuredGallery .container').perfectScrollbar('destroy');
        scrollbar = null;
      }
      if(swiper == null) {
        swiper = new Swiper('.swiper-container', {
          onSlideChangeEnd: swiperChange
        });
        $("#featuredGallery .wrapper").scrollTo({top:'0', left:'0'}, 0);
      }
    }
  }

  function swiperChange(swiper){
        var dataSrc = $('.swiper-slide-active .thImage').attr("data-src");
        if(dataSrc){
          $('.swiper-slide-active .thImage').css({
            backgroundImage : "url("+dataSrc+")"
          }).fadeTo(300, 1);
        }
      }
  var bLazy = new Blazy({
        container: "#featuredGallery .container"
      });
  $("#featuredGallery").hover(
      function() {
        if($(window).width() > 768) {
          $(this).find(".navGallery .arrowLeft, .navGallery .arrowRight").stop(true, true).fadeIn(300);
        }
      }, 
      function() {
        if($(window).width() > 768) {
          $(this).find(".navGallery .arrowLeft, .navGallery .arrowRight").stop(true, true).delay(1000).fadeOut(300);
        }
      }
  );

  function getGallerySlideNumber(){
    var scrollOffset = Math.abs($("#featuredGallery .wrapper").offset().left);
    var slideWidth = $("#featuredGallery .galleryItem").width();
    var slideNum = parseInt(scrollOffset/slideWidth);
    return slideNum;
  }

  $(".navGallery > .arrowLeft").click(function(){
    var gallery =  $("#featuredGallery");
    var prevSlideNum = getGallerySlideNumber() - 1; 
    console.log(prevSlideNum);
    if(prevSlideNum >= 0){
      gallery.find(".container").scrollTo(gallery.find('.galleryItem:eq('+prevSlideNum+')'), 500);
    }
  });

  $(".navGallery > .arrowRight").click(function(){
    var gallery =  $("#featuredGallery");
    var nextSlideNum = getGallerySlideNumber() + 1;
    if(nextSlideNum <= gallery.find('.galleryItem').length){
      gallery.find(".container").scrollTo(gallery.find('.galleryItem:eq('+nextSlideNum+')'), 500);
    }
  });
});