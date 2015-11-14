$(document).ready(function() {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1390511594581802',
      xfbml      : true,
      version    : 'v2.5'
    });

    FB.getLoginStatus(function(response) {
      checkLoginState();
    });

  };
  // Load the SDK asynchronously
  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // This is called with the results from from FB.getLoginStatus().
  function loginUser(response) {
    FB.login(checkStatus, {scope: 'public_profile,email'});
  }

  function checkStatus(response) {
    var $loginMsg = $('.login-msg');
    var $fbLoginBtn = $('.fb-login-btn');

    if (response.status === 'connected') {
      getUserInfor();
      $loginMsg.html('');
    } else if (response.status === 'not_authorized') {
      $fbLoginBtn.css('display', '');
      $loginMsg.html('');
    } else {
      $fbLoginBtn.css('display', '');
      $loginMsg.html('');
    }
  }

 function checkLoginState() {
    FB.getLoginStatus(checkStatus);
  }
  var user_data;
  function getUserInfor() {
    FB.api('/me',{fields: "id,about,age_range,picture,bio,birthday,context,email,first_name,gender,hometown,link,location,middle_name,name,timezone,website,work"}, function(response) {
      $('.login-msg').html('You have been registered as ' + response.name);
      $('.login-msg').append('<br/><br/><a href="#tutor" class="no-text-decoration"><span class="label label-error" outline>See the guide first below :)<span></a> <br/><br/> and then you can ...<br/><br/> <a href="https://www.facebook.com/profile.php?id=100010661648426" target="_blank" style="text-decoration: none;"><span class="label label-primary" outline>Start chatting with stranger :)</span></a><br/>');
      $('.fb-login-btn').css('display', 'none');
      $('.fb-logout-btn').css('display', '');
      // console.log(response);
      // console.log('Successful login for: ' + response.name);
      // console.log('id:'+response.id);
      // console.log('birthday:'+response.birthday);
      // console.log('gender:'+response.gender);
      // console.log('age_range:'+response.age_range);
      // console.log('min_age_range:'+response.age_range.min);
      // console.log('max_age_range:'+response.age_range.max);
      // console.log('link:'+response.link);
      // console.log('email:'+response.email);
      // console.log('picture:'+response.picture);
      user_data = response;

      $.ajax({
          url: '/users/signin',
          data: user_data,
          type:"POST",
          success: function(msg){
              // alert(msg);
          },
           error:function(xhr, ajaxOptions, thrownError){
              // alert(thrownError);
           },
      });

    });
  }

  $('.fb-login-btn').click(function(e) {
    e.preventDefault();
    loginUser();
  });

  $('.fb-logout-btn').click(function(e) {
    FB.logout(function(res) {
      var $loginMsg = $('.login-msg');
      var $fbLoginBtn = $('.fb-login-btn');

      $fbLoginBtn.css('display', '');
      $('.fb-logout-btn').css('display', 'none');
      $loginMsg.html('');
    });
  });

});
