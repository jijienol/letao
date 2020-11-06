$(function () {
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
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名2-6位'
          },
          callback : {
            message : '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码6-12位'
          },
          callback : {
            message : '密码错误'
          }
        }
      }
    }
  })

  var validator = $('#form').data('bootstrapValidator');
  $('.btn-reset').on('click', function () {
    validator.resetForm()
  });

  $('#form').on('success.form.bv', function (e) {
    // e.preventDefault();
    // alert(1)
    console.log(1);
    e.preventDefault();
    $.ajax({
      url: '/employee/employeeLogin',
      data: $('#form').serialize(),
      dataType: 'json',
      type: 'post',
      success: function (info) {
        if(info.success){
          location.href = './index.html';
        } ;
        if(info.error == 1000) {
          validator.updateStatus('username','INVALID','callback')
        }
        if(info.error == 1001){
          validator.updateStatus('password','INVALID','callback')
        }
      }
    })
  });
  
})