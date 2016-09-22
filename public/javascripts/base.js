$(function(){
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
});