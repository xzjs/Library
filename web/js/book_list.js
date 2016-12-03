/**
 * Created by yanlli on 2016/12/2.
 */
$(document).ready(function () {
    var tr=$(".book_message1");
    tr.mouseover(function () {
        $(this).css("background-color","#e8e8e8");
    });
    tr.mouseout(function () {
        $(this).css("background-color","#f9f9f9");
    });
    $(".check_all").click(function(){
        $("[name=checkbox]:checkbox").attr("checked",this.checked);
    });
    $("[name=checkbox]:checkbox").click(function() {
        var flag = true;
        var option=$(this).parent().parent();
        if(this.checked){
            option.addClass("delete_option");
        }else{
            option.removeClass("delete_option");
        }

        $("[name=checkbox]:checkbox").each(function () {
            if (!this.checked) {
                flag = false;
            }
        });
        $(".check_all").attr("checked", flag);
    });
    $(".delete").click(function () {
        $(this).css("box-shadow","#5e5e5e 1px 1px 0px");
        $(".delete_option").each(function () {
            console.log($(this));
            $(this).remove();
        });
    });
    $(".add").click(function () {
        $(this).css("box-shadow","#5e5e5e 1px 1px 0px");
    });
    $("#cover_file").change(function () {
       var url=window.URL.createObjectURL(this.files.item(0));
        $(".preview").attr("src",url);
    });
    $(".modification").mouseover(function () {
        $(this).css({"width":"20px","height":"20px"})
    });
    $(".modification").mouseout(function () {
        $(this).css({"width":"16px","height":"16px"})
    });
    $(".modification").click(function () {

    });
})