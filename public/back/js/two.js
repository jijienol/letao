$(function () {
    var currentPage = 1;
    var pageSize = 5;
    function render() {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            dataType: 'json',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                // $('tbody').html(template('tmp', info));
                // getPage(info.total);
                console.log(info);
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

    //下拉菜单数据的渲染
    $.ajax({
        url: '/category/queryTopCategoryPaging',
        data: {
            page: 1,
            pageSize: 100
        },
        dataType: 'json',
        success: function (info) {
            console.log(info);
            $('#cate-name').html(template('tmp-one', info))
        }
    })

    //点击选中
    $('#cate-name').on('click', 'a', function () {
        $('.cate-text').text($(this).text());
        $('[name="categoryId"]').val($(this).data('id'));
        $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID')
    })

    //文件上传
    $('#file').fileupload({
        dataType: 'json',
        done: function (e, data) {
            $('.pic').attr('src', data.result.picAddr);
            $('[name="brandLogo"]').val(data.result.picAddr);
            $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID')
        }
    })

    //表单验证
    $('#form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandName: {
                validators: {
                    notEmpty: {
                        message: '二级分类不能为空'
                    }
                }
            },
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '图片不能为空'
                    }
                }
            }
        }
    })

    //验证成功后提交数据
    $('#form').on('success.form.bv',function(e){
        e.preventDefault();
        $.ajax({
            url : '/category/addSecondCategory',
            dataType :'json',
            type : 'post',
            data : $('#form').serialize(),
            success : function(info){
                console.log(info);
                render();
                $('.modal-add').modal('hide');
                $('#form').data('bootstrapValidator').resetForm(true);
                $('.cate-text').text('请选择一级分类');
                $('.pic').attr('src','./images/none.png');
            }
        })
    })
})