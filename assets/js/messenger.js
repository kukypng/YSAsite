  window.fbAsyncInit = function() {
    FB.init({
      appId            : '1088102988250478',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.11'
    });
  };
 
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/pt_BR/sdk/xfbml.customerchat.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
 
  jQuery('body').append('<div class="fb-customerchat" page_id="105447277604473" minimized="true"> </div>');
