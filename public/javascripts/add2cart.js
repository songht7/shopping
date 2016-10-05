$(function() {
    $(".add2Cart").click(function(event) {
        var obj = $(this);
        if (!obj.hasClass("noStock")) {
            var img = obj.parent().parent().find('img').attr('src'),
                ctgid = obj.data("ctgid"),
                id = obj.data("id"),
                price=obj.data("price");
            $.post("/add2cart", { "ctgid": ctgid, "id": id,"price":price }, function(data) {
                if (data.result == 1) {
                    obj.addClass("noStock");
                    shopAnimate(obj, img, data.cartNumb); //购物车动画效果
                }
            });
        }
    });
});

var fo = 0;

function shopAnimate(obj, img, cartNumb) {
    fo++;
    var $shop = $('#CartWarp');
    var mbCart = $(".mbCart").css("display");
    if (mbCart != "none") { $shop = $(".mbCart"); }
    var $target = obj,
        x = $target.offset().left + 30,
        y = $target.offset().top + 10,
        X = $shop.offset().left + $shop.width() / 2 - $target.width() / 2 + 10,
        Y = $shop.offset().top;
    if ($('#floatOrder').length <= 0) {
        var _div = '<div class="floatOrder fo' + fo + '"><img src="' + img + '" width="50" height="50" /></div>';
        $('body').append(_div);
    };
    var $obj = $('.fo' + fo + '');
    $obj.css({ 'left': x, 'top': y }).animate({ 'left': X, 'top': Y - 80 }, 1000, function() {
        $("#CartWarp,.cartConut").html(cartNumb);
        $obj.stop(false, false).animate({ 'top': Y - 20, 'opacity': 0 }, 1000, function() {
            $obj.fadeOut(800, function() {
                $obj.remove();
            });
        });
    });
}
