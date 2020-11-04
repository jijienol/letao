NProgress.configure({ showSpinner: false });
$(document).ajaxStart(function(){
  // alert(1);
  NProgress.start();
})
$(document).ajaxStop(function(){
  NProgress.done()
})