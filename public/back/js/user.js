$(function () {
    //渲染用户数据
    var currentPage = 1;
    var pageSize = 5;
    function render() {
        $.ajax({
            url: '/user/queryUser',
            dataType: 'json',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                $('tbody').html(template('tmp', info));
                getPage(info.total);
            }
        })
    }
    render()

    //动态获得validator
    function getPage(total) {
        $("#pagintor").bootstrapPaginator({
            bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
            currentPage: currentPage,//当前页
            totalPages: Math.ceil(total/pageSize),//总页数
            size: "small",//设置控件的大小，mini, small, normal,large
            onPageClicked: function (event, originalEvent, type, page) {
                //为按钮绑定点击事件 page:当前点击的按钮值
                currentPage = page;
                render()
            }

        });

    }

    //存储id
    var userId = null;
    var isDelete = null;
    $('tbody').on('click','span',function(){
        userId = $(this).parent().data('id');
        isDelete = $(this).hasClass('btn-success') ? 1 : 0;
        // console.log(isDelete);
    });

    $('.btn-ok').click(function(){
        $.ajax({
            url : '/user/updateUser',
            data : {
                id : userId,
                isDelete : isDelete
            },
            dataType : 'json',
            type : 'post',
            success :function(info) {
                // console.log(info);
                render();
                $('.modal-user').modal('hide')
            }
        })
    })
})