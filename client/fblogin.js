window.fbAsyncInit = function() {
    FB.init({
      appId      : '318062672725904',
      cookie     : true,
      xfbml      : true,
      version    : 'v8.0',
      status: true
    });

    // FB.AppEvents.logPageView();
    // FB.getLoginStatus(function(response) {   // Called after the JS SDK has been initialized.
    //     statusChangeCallback(response);        // Returns the login status.
    //   });
    };

  // function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
  //   console.log('statusChangeCallback');
  //   console.log(response.status);                   // The current login status of the person.
  //   if (response.status === 'connected') {   // Logged into your webpage and Facebook.
  //     testAPI();
  //   } else {                                 // Not logged into your webpage or we are unable to tell.
  //     document.getElementById('status').innerHTML = 'Please log ' +
  //       'into this webpage.';
  //   }
  // }
  // function checkLoginState() {
  //   FB.getLoginStatus(function(response) {
  //     statusChangeCallback(response);
  //   });
  // }
  //
  // function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
  //   console.log('Welcome!  Fetching your information.... ');
  //   FB.api('/me', function(response) {
  //       console.log(JSON.stringify(response))
  //     console.log('Successful login for: ' + response.name);
  //     document.getElementById('status').innerHTML =
  //       'Thanks for logging in, ' + response.name + '!';
  //   });
  // }
//   FB.login(function(response) {
//     if (response.status === 'connected') {
//     //     const URI = `/users/newuser?${response.u}`
//     //   fetch('/users/', {
//     //       method: 'POST',

//     //   })
//     console.log(response);
//     } else {
//       // The person is not logged into your webpage or we are unable to tell.
//     }
//   });

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
