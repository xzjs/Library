/**
 * Created by yanlli on 2016/11/30.
 */
$(document).ready(function () {
    $(".log_tips ul li").click(function () {
        $(".log_tips ul li").removeClass("selected");
        $(this).addClass("selected");
    });
    $("#confirm").click(function () {
        var name = $("#name").val();
        var password = $("#password").val();
        if (name != "" && password != "") {

            var user_id;
            var admin_id;
            if ($(".selected").html() == "用户登录") {
                user_id=name;
                admin_id="";
                var manager_url ="/library/public/user/login";

            } else if($(".selected").html() == "管理员登录"){
                admin_id = name;
                user_id="";
                var manager_url = "/library/public/admin/login";
            }
            $.post(manager_url, {name: name, pwd: password}, function (result) {
                if (result == 0) {
                    $(".tip").css("display", "block");
                } else if (result > 0) {
                    $.cookie("admin_id", admin_id);
                    $.cookie("user_id",user_id);
                    window.location.href = "book_list.html";
                }
            });
        } else {
            alert("用户名或密码不能为空！");
        }
    });
    $("#password").keydown(function () {
        if (event.keyCode==13){
            $("#confirm").click();
        }
    });
    $("#save").click(function () {
        var bossName=$("[name=boss_name]").val();
        var name=$.trim($("[name=name]").val());
        var pwd=$.trim($("[name=pwd]").val());
        var pwd2=$.trim($("[name=pwd2]").val());
        if (bossName!="张艳丽"){
            $("#boss_wrong").css("display","inline-block");
        }else{
            $("#boss_wrong").css("display","none");
        }
        if (name==''){
            $("#name_wrong").css("display","inline-block");
        }else{
            $("#name_wrong").css("display","none");
        }
        if (pwd==''){
            $("#pwd_wrong").css("display","inline-block");
        }else{
            $("#pwd_wrong").css("display","none");
        }
        if (pwd2==''){
            $("#pwd2_wrong").css("display","inline-block");
        }else{
            $("#pwd2_wrong").css("display","none");
        }
        if (pwd!=""&&pwd2!=""&&pwd!=pwd2){
            $("#unequal").css("display","inline-block");
        }else{
            $("#unequal").css("display","none");
        }
        if (bossName=="张艳丽"&&name!=""&&pwd!=""&&pwd==pwd2){
            $.post("/library/public/user",{name:name,pwd:pwd},function (result) {
                console.log(result);
                if (result!=0){
                    alert("注册成功！点击确认进入图书馆");
                    $.cookie("user_id", name);
                    window.location.href = "book_list.html";
                }
            });
        }
    });
});

