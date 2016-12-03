/**
 * Created by yanlli on 2016/11/30.
 */
$(document).ready(function(){
    $(".log_tips ul li").click(function () {
        $(".log_tips ul li").removeClass("selected");
        $(this).addClass("selected");
    })
    $("#confirm").click(function(){
        var name=$("#name").val();
        var password=$("#password").val();
        if($(".selected").html()=="用户登录"){

        }else{
            var manager_url="/library/public/admin/login";
        }
        $.post(manager_url,{name:name,pwd:password},function(result){
            if(result==0){
                $(".tip").css("display","block");
            }else if(result>0){
                window.location.href="book_list.html";
            }
        });
    })
})

