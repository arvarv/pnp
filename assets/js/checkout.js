// get values from cart on localStorage
var cart = JSON.parse(localStorage.getItem("cart"));

displayPayment();

displaySummary();

// init state
initialize();

//Terms and conditions button clicked
$("#co-form").on("submit", function (e) {
    e.preventDefault();

    $("#co-terms").fadeOut(500);
    $("#co-user-details").fadeOut(500, function (){
        $("body, html").animate({scrollTop: $(this).offset().top});
        $("#co-user-details-suc").fadeIn(500, function(){

            var email = $("#email").val();
    var contact = $("#contact").val();
    var fname = $("#first_name").val();
    var lname = $("#last_name").val();

    var address = $("#address").val();
    var city = $("#city").val();
    var province = $("#province").val();
    var country = $("#country").val();
    var postal = $("#postal").val();

    var bAddress = $("#bill-address").val();
    var bCity = $("#bill-city").val();
    var bProvince = $("#bill-province").val();
    var bCountry = $("#bill-country").val();
    var bPostal = $("#bill-postal").val();

    var fullName = fname + " " + lname;
    contact = "+63" + contact;
    var fullAddress = address + ", " + city + ", " + province + ", " + country + ", " + postal;
    var fullBillAddress = bAddress + ", " + bCity + ", " + bProvince + ", " + bCountry + ", " + bPostal;

    $(".final-email").text(email);
    $(".final-contact").text(contact);
    $(".final-name").text(fullName);
    $("#final-address").text(fullAddress);
    $("#final-bill-address").text(fullBillAddress);
            
            $("#co-payment-pending").fadeOut(500, function(){
                $("body, html").animate({scrollTop: $("#co-user-details-suc").offset().top * 1.75}, 500);
                $("#co-payment").fadeIn(1500);
            });
        });
    });
});

//Make Payment 
$("#make-payment").on("click", function (e) {
    e.preventDefault();
    var cardNumber = $("#cardNumber").val();
    var expiry = $("#expiry").val();
    var cvc = $("#cvc").val();


    var hiddenCardNumber = cardNumber.replace(/\b(?:\d{4}[-]?){3}(?=\d{4}\b)/, "xxxx-xxxx-xxxx-");
    $("#final-card-number").text(hiddenCardNumber);
    $("#final-expiry").text(expiry);

    if (cardNumber && expiry && cvc) {
        $("#co-payment").fadeOut(500, function(){
            $("#co-payment-suc").fadeIn(500, function(){
                $("#co-confirmation-pending").fadeOut(500, function() {
                    $(".edit-summary").hide();
                    $("body, html").animate({scrollTop: $("#co-payment-suc").offset().top * 1.2},500);
                    $("#co-confirmation").fadeIn(500);
                });
            });
        });
    } else {
        alert("Please fill-up the form");
        if(!cardNumber) {
            $("#cardNumber").addClass("text-field-warning");
        }

        if(!expiry) {
            $("#expiry").addClass("text-field-warning");
        }

        if(!cvc) {
            $("#cvc").addClass("text-field-warning");
        }
    }
});


//Continue Shopping
$("#continue-shopping").on("click", function(e){
    e.preventDefault();
    $("#co-confirmation").fadeOut(500, function(){
        $("#co-confirmation-suc").fadeIn(500, function() {
            localStorage.setItem("cart",JSON.stringify([]));
            window.location.href ="product-list.html";
        });
    });
});

$("#co-user-details-suc .edit-summary").on("click", function () {
    $("#co-user-details-suc").slideUp(500, function () {
        $('html,body').scrollTop($("body").offset().top);
        $("#co-user-details").slideDown(700, function (){
            $("#co-payment").slideUp(500, function() {
                $("#co-terms").show();
                $("#co-payment-pending").show();
            });
            
        });
        
    });
    
});

//format input to numbers only
$("#contact").keyup(function (e) { 
    this.value = numbersOnly(this.value);
});

//copy address to bill address
$("#same-as-delivery").change(function() {
    var address = $("#address").val();
    var city = $("#city").val();
    var province = $("#province").val();
    var country = $("#country").val();
    var postal = $("#postal").val();

    if (this.checked) {
        $("#bill-address").val(address);
        $("#bill-city").val(city);
        $("#bill-province").val(province);
        $("#bill-country").val(country);
        $("#bill-postal").val(postal);
    }
    
});

//card format
$('#cardNumber').keypress(function() {
    $(this).removeClass("text-field-warning");
    this.value = numbersOnly(this.value);

    var result = $(this).val().split("-").join(""); // remove hyphens
    if (result.length > 0 && result.length < 20) {
        result = result.match(new RegExp('.{1,4}', 'g')).join("-");
    }
    $(this).val(result);
});

//expiry
$("#expiry").keydown(function() {
    $(this).removeClass("text-field-warning");
    this.value = numbersOnly(this.value);
    var result = $(this).val().split("-").join("");
    if (result.length > 0 && result.length < 5) {
        result = result.match(new RegExp('.{1,2}', 'g')).join("/");
    }
    $(this).val(result);
});

//cvc
$("#cvc").keydown(function (e) { 
    $(this).removeClass("text-field-warning");
    this.value = numbersOnly(this.value);
});


//Functions
function initialize(params) {
    $("#co-user-details-suc").hide();

    $("#co-payment").hide();
    $("#co-payment-suc").hide();

    $("#co-confirmation").hide()
    $("#co-confirmation-suc").hide();
}

function displayPayment(){
    var total = 2500;
    cart.forEach(element => { total += (element.price * element.quantity);});

    $("#subtotal").text("P " + numberWithCommas((total - 2500).toFixed(2)));
    $("#total").text("P " + numberWithCommas(total.toFixed(2)));
}

function displaySummary() {
    var quantity = 0;
    var summary = $("#summary-div");
    
    //remove child elements from Summary
    summary.empty();

    //add udpated child elements
    for (let i = 0; i < cart.length; i++) {
        const element = cart[i];
        quantity += element.quantity;

        var childElement =  '<div class="floating-item-wrapper d-flex justify-content-start align-items-center mb-2">' +
        '<div class="fc-img-holder d-flex justify-content-center align-items-center m-0" >' +
            '<img class="img-item" src="' + element.image + '">' +
        '</div>'+
        '<div class="d-flex flex-column justify-content-center ml-3">' +
            '<p class="m-0 small-p text-dark text-bold">' + element.name + ' <span>('+  element.quantity +')</span>'+'</p>' +
            '<p class="mt-2 mb-0 cart-item-price">P ' + element.price.toFixed(2) + '</p>' +
        '</div>' +    
    '</div>';
        
        summary.append(childElement);
    }

    //udpate cart count
    $(".cart-count").text(quantity);
}

function numbersOnly(text) {
    if (/\D/g.test(text)){
        // Filter non-digits from input value.
        text = text.replace(/\D/g, '');
    } 
    return text;
}