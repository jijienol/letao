$(function () {
    //渲染用户数据
    var currentPage = 1;
    var pageSize = 5;
    function render() {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            dataType: 'json',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                // $('tbody').html(template('tmp', info));
                // getPage(info.total);
                $('tbody').html(template('tmp', info));
                getPage(info.total)
            }
        })
    }
    render()

    //分页

    function getPage(total) {
        $("#paginator").bootstrapPaginator({
            bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
            currentPage: currentPage,//当前页
            totalPages: Math.ceil(total / pageSize),//总页数
            // size:"small",//设置控件的大小，mini, small, normal,large
            onPageClicked: function (event, originalEvent, type, page) {
                //为按钮绑定点击事件 page:当前点击的按钮值
                currentPage = page;
                render()
            }

        });
    }
    //一级分类表单验证
    $('#form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [':disabled', ':hidden', ':not(:visible)'],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '一级分类不能为空'
                    }
                }
            }
        }
    })

    $('#form').on('success.form.bv', function (e) {
        e.preventDefault();

        $.ajax({
            url: '/category/addTopCategory',
            type: 'post',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {
                console.log(info);
                render()
                $('.modal-cate').modal('hide')
                $('#form').data('bootstrapValidator').resetForm(true);
               
            }
        })
    })
})




