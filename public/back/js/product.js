

$(function () {
    //渲染页面数据
    var currentPage = 1;
    var pageSize = 3;
    function render() {
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                //  console.log(info);
                $('tbody').html(template('tmp', info))
                getPage(info.total)
            }
        });
    }
    render()

    //分页

    function getPage(total) {
        $('#paginator').bootstrapPaginator({
            bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
            currentPage: currentPage,//当前页
            totalPages: Math.ceil(total / pageSize),//总页数
            onPageClicked: function (event, originalEvent, type, page) {
                //为按钮绑定点击事件 page:当前点击的按钮值
                currentPage = page;
                render();
            }
        })
    }

    // 下拉菜单渲染完成

    $.ajax({
        type: "get",
        url: "/category/querySecondCategoryPaging",
        data: {
            page: 1,
            pageSize: 100
        },
        dataType: "json",
        success: function (info) {
            console.log(info);
            $('#cate-name').html(template('tmp-name', info))
        }
    });


    //下拉列表选中
    $('#cate-name').on('click', 'a', function () {
        $('.cate-text').text($(this).text());
        $('[name="brandId"]').val($(this).data('id'));
        $('#form').data('bootstrapValidator').updateStatus('brandId','VALID')
    })

    //上传图片
    var picAttr = [];
    $('#file').fileupload({
        dataType: 'json',
        done: function (e, data) {
            // console.log(data);
            picAttr.unshift(data.result);
            // console.log(data.result.picAddr);
            $('.pic-box').prepend('<img src = "' + data.result.picAddr + '" width = "150"/>')
            if (picAttr.length > 3) {
                picAttr.pop();
                $('.pic-box img:last-child').remove();
            }
            if(picAttr.length == 3) {
            // console.log(3333333333333);
            $('#form').data('bootstrapValidator').updateStatus('picStatu','VALID')

            }
            // console.log(picAttr);
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
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择二级菜单'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入二级分类'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    regexp : {
                        regexp : /^[1-9]\d*$/,
                        message:'必须为数字'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '请输入商品尺码'
                    },
                    regexp : {
                        regexp : /^[1-9]\d-[1-9]\d$/,
                        message : '请输入数字'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '请输入商品原价'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '请输入商品现价'
                    }
                }
            },
            picStatu: {
                validators: {
                    notEmpty: {
                        message: '请选择3张图片'
                    }
                }
            },

        }
    })

    //表单上传
    $('#form').on('success.form.bv',function(e){
        e.preventDefault();
        var str = $('#form').serialize() + '&picArr=' + JSON.stringify(picAttr);
        console.log(str);
        $.ajax({
            url :'/product/addProduct',
            type : 'post',
            data :str,
            dataType : 'json',
            success : function(info){
                currentPage = 1;
                render();
                $('.modal-add').modal('hide');
                $('#form').data('bootstrapValidator').resetForm(true);
                $('.pic-box').empty();
                $('.cate-text').text('请选择二级分类');
                picArr = [];
            }
        })
    })
})