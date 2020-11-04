NProgress.configure({ showSpinner: false });
$(document).ajaxStart(function(){
  // alert(1);
  NProgress.start();
})
$(document).ajaxStop(function(){
  NProgress.done()
})

$(function(){
  // 分类管理菜单隐藏切换
  $('.cateMan').on('click',function(){
    $('.two').slideToggle();
  })
  //菜单按钮动画效果
  $('.menu').on('click',function(){
    $('body').toggleClass('menuAni')
  })

  // 退出登陆
  $('.btn-loginout').on('click',function(){
    $.ajax({
      url : '/employee/employeeLogout',
      dataType : 'json',
      type : 'get',
      success : function(info){
        console.log(info);
        if(info.success){
          location.href = './login.html'
        }
      }
    })
  })
})