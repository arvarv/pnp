// Get user object from storage
var user = JSON.parse(localStorage.getItem("user"));

$("#login-form").submit(function(event) {
    event.preventDefault();

    var emailInput = $("#email").val();
    var passwordInput = $("#password").val();
    
    if (user.email == emailInput && user.password == passwordInput) {
        alert("Logged in successfully!");
        window.location.href = "index.html";
    } else {
        alert("User doesn't exists");
        $("#email").val("");
        $("#password").val("");
        return;
    }
});