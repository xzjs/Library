/**
 * Created by yanlli on 2016/12/2.
 */
$(document).ready(function () {

    $("#delete").mousedown(function () {
        $(this).css("box-shadow", "#5e5e5e 1px 1px 0px");
    });
    $("#delete").mouseup(function () {
        $(this).css("box-shadow", "#5e5e5e 1px 1px 2px");
    });
    $("#delete").click(function () {
        var sure = confirm("是否确定要删除？");
        if (sure == true) {
            var success = true;
            $("[name=checkbox]:checkbox").each(function () {
                if (this.checked == true) {
                    var id = $(this).parent().parent().data("id");
                    $.ajax({
                        url: "/library/public/book/" + id,
                        type: "DELETE",
                        success: function (e) {
                            if (e != "true") {
                                alert(e);
                                success = false;
                            }
                        }
                    });
                }
            });
            if (success == true) {
                alert("删除成功！");
                getBooksList();
            }
        }
    });
    $("#add").mousedown(function () {
        $(this).css("box-shadow", "#5e5e5e 1px 1px 0px");
    });
    $("#add").mouseup(function () {
        $(this).css("box-shadow", "#5e5e5e 1px 1px 2px");
    });
    $("#cover_file").change(function () {
        var url = window.URL.createObjectURL(this.files.item(0));
        $(".preview").attr("src", url);
    });
    $("#save").click(function () {
        var book_id = $("#book_id").val();
        var formData = new FormData($("form")[0]);
        if (book_id == "0") {
            $.ajax({
                url: "/library/public/book",
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                success: function (e) {
                    if (e == 'true') {
                        $('#myModal').modal('hide');
                        getBooksList();
                    }
                }
            })
        } else {
            $.ajax({
                url: "/library/public/book/" + book_id,
                type: "PUT",
                data: formData,
                processData: false,
                contentType: false,
                success: function (e) {
                    if (e == "true") {
                        $('#myModal').modal('hide');
                        getBooksList();
                    }
                }
            });
        }
    });
    getBooksList();
});

function getBooksList() {
    $.getJSON("/library/public/book", function (result) {
        var table = $("table");
        $(".book_message1").remove();
        for (var i = 0; i < result.length; i++) {
            var html = '<tr data-id=' + result[i]["id"] + ' data-img='
                + result[i]["img"] + ' data-content='
                + result[i]["content"] + ' class="book_message1"><td><input name="checkbox" type="checkbox"> </td> <td>'
                + (i + 1) + '</td> <td class="book_no">'
                + result[i]["book_no"] + '</td> <td><a class="name" href="/library/public/uploads/txts/' + result[i]["txt"] + '">'
                + result[i]["name"] + '</a></td> <td class="author">'
                + result[i]["author"] + '</td> <td class="publish">'
                + result[i]["publish"] + '</td> <td width="4%"><img data-toggle="modal" data-target="#myModal" class="modification" src="img/modify.png" alt=""></td> </tr>';
            table.append(html);
        }
        var tr = $(".book_message1");
        tr.mouseover(function () {
            $(this).css("background-color", "#e8e8e8");
            $("#cover_img").attr("src", "/library/public/uploads/imgs/" + $(this).data("img"));
            $("#content").html($(this).data("content"));
        });
        tr.mouseout(function () {
            $(this).css("background-color", "#f9f9f9");
        });
        $(".check_all").click(function () {
            var check_all = this.checked;
            if (check_all == true) {
                $("[name=checkbox]:checkbox").each(function () {
                    this.checked = true;
                });
            } else {
                $("[name=checkbox]:checkbox").each(function () {
                    this.checked = false;
                });
            }
            ;
        });
        $("[name=checkbox]:checkbox").click(function () {
            var flag = true;
            $("[name=checkbox]:checkbox").each(function () {
                if (!this.checked) {
                    flag = false;
                }
            });
            $(".check_all").each(function () {
                this.checked = flag;
            })
        });
        $(".modification").mouseover(function () {
            $(this).css({"width": "20px", "height": "20px"})
        });
        $(".modification").mouseout(function () {
            $(this).css({"width": "16px", "height": "16px"})
        });
        $(".modification").click(function () {
            var thisTr = $(this).parent().parent();
            $("[name=book_no]").val(thisTr.children(".book_no").html());
            $("[name=name]").val(thisTr.find(".name").html());
            $("[name=author]").val(thisTr.children(".author").html());
            $("[name=publish]").val(thisTr.children(".publish").html());
            $("[name=content]").val(thisTr.data("content"));
            var thisTrId = thisTr.data("id");
            $("#book_id").val(thisTrId);


        });
    });
}

