$(document).ready(function () {
  $("#login-btn").click(function () {
    window.location.href = "/login";
    console.log("login clicked");
  });

  $("#signup-btn").click(function () {
    window.location.href = "/signup";
    console.log("signup clicked");
  });

  $("#logout-btn").click(function () {
    window.location.href = "/logout";
    console.log("logout clicked");
  });

});
