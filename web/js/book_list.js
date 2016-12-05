/**
 * Created by yanlli on 2016/12/2.
 */
$(document).ready(function () {

    $(".delete").click(function () {
        $(this).css("box-shadow","#5e5e5e 1px 1px 0px");
        $(".delete_option").each(function () {
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

    $("#save").click(function () {
        var formData=new FormData($("form")[0]);
        $.ajax({
            url:"/library/public/book",
            type:'post',
            data:formData,
            processData:false,
            contentType:false,
            success:function (e) {
                if(e=='true'){
                    $('#myModal').modal('hide');
                    getBooksList();
                }
            }
        })
    });
    getBooksList();
});

function getBooksList () {
    $.getJSON("/library/public/book",function (result) {
        var table=$("table");
        $(".book_message1").remove();
        for(var i=0;i<result.length;i++){
            var html='<tr data-img='+result[i]["img"]+' data-content='+result[i]["content"]+' class="book_message1"><td><input name="checkbox" type="checkbox"> </td> <td>'+result[i]["id"]+'</td> <td>'+result[i]["book_no"]+'</td> <td><a href="/library/public/uploads/txts/'+result[i]["txt"]+'">'+result[i]["name"]+'</a></td> <td>'+result[i]["author"]+'</td> <td>'+result[i]["publish"]+'</td> <td width="4%"><img class="modification" src="img/modify.png" alt=""></td> </tr>';
            table.append(html);
        }
        var tr=$(".book_message1");
        tr.mouseover(function () {
            $(this).css("background-color","#e8e8e8");
            $("#cover_img").attr("src","/library/public/uploads/imgs/"+$(this).data("img"));
            $("#content").html($(this).data("content"));

        });
        tr.mouseout(function () {
            $(this).css("background-color","#f9f9f9");
        });
        $(".check_all").click(function(){
            var check_all=this.checked;
            $("[name=checkbox]:checkbox")
            if(check_all==true){
                $("[name=checkbox]:checkbox").each(function () {
                    this.checked=true;
                });
            }else{
                $("[name=checkbox]:checkbox").each(function () {
                    this.checked=false;
                });
            };

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
        $(".modification").mouseover(function () {
            $(this).css({"width":"20px","height":"20px"})
        });
        $(".modification").mouseout(function () {
            $(this).css({"width":"16px","height":"16px"})
        });
        $(".modification").click(function () {
        });
    });
}