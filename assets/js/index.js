//user data
var user = {
    email: "john.smith@email.com",
    password: "12345",
    cart: [{name: "Aqua Therapy", quantity: 1}, 
        {name: "Bourbon 150mg", quantity: 2},
        {name: "Forever Royal Jelly 60 Tablets", quantity:1},
        {name: "Holle Organic Growing-up Milk 3", quantity:1}
    ]
}

//if user data doesn't exist
if (localStorage.getItem("user") == null ) {
    localStorage.setItem("user", JSON.stringify({email: "john.smith@email.com", password: "12345"}));
}

//init default cart values
if (localStorage.getItem("cart") == null) {
    initCart();
}

//update nav cart count
updateNavCart();


//Nav Cart Behavior
$(".floating-cart-wrapper").css({opacity: 0, visibility: "hidden"});
$(".my-cart").on("click", function () {
    var opacity = $(".floating-cart-wrapper").css("opacity");
    if (opacity == 0) {
        $(".floating-cart-wrapper").css({visibility: "visible"}).animate({opacity: 1}, 300);
    } else {
        $(".floating-cart-wrapper").css({visibility: "hidden"}).animate({opacity: 0}, 300);
    }
});

$(document).on("click", function () {
    var opacity = $(".floating-cart-wrapper").css("opacity");
    if (opacity == 1) {
        $(".floating-cart-wrapper").css({visibility: "hidden"}).animate({opacity: 0}, 300);
    } 
});

$("#checkout-btn").on("click", function (e) {
    e.preventDefault();
    var cart = JSON.parse(localStorage.getItem("cart"));
    if (cart.length > 0) {
        window.location.href="checkout.html";
    } else {
        alert("You have no items in your cart.");
    }
});

//Stepper +- quantity
$(".minus-btn").on("click", function () {
    var itemCount = $(this).siblings(".item-count");
    var count = parseInt(itemCount.text());
    if (count > 0) {
        count -= 1;
    }
    itemCount.text(count);
});

$(".plus-btn").on("click", function () {
    var itemCount = $(this).siblings(".item-count");
    var count = parseInt(itemCount.text());
    count += 1;
    itemCount.text(count);
});

// Functions
function initCart() {
    var navCart = [{
        name: "Aqua Therapy",
        price: 565,
        quantity: 1,
        image: "assets/images/item1-final.png",
        discount: 21
    }];

    localStorage.setItem("cart", JSON.stringify(navCart));
}

function updateNavCart() {
    var storedCart = JSON.parse(localStorage.getItem("cart"));
    var quantity = 0;
    var navCartList = $(".floating-cart ul");
    
    //remove child elements from Nav Cart
    navCartList.empty();

    //add udpated child elements
    for (let i = 0; i < storedCart.length; i++) {
        const element = storedCart[i];
        quantity += element.quantity;

        var childElement = 
        '<li>' +
            '<div class="floating-item-wrapper d-flex justify-content-start align-items-center mb-2">' +
                '<div class="fc-img-holder d-flex justify-content-center align-items-center m-0" >' +
                    '<img class="img-item" src="' + element.image + '">' +
                '</div>'+
                '<div class="d-flex flex-column justify-content-center ml-3">' +
                    '<p class="m-0 small-p text-dark">' + element.name + '<span>('+  element.quantity +')</span>'+'</p>' +
                    '<p class="mt-2 mb-0 cart-item-price">P ' + element.price.toFixed(2) + '</p>' +
                '</div>' +    
            '</div>' +
            '<hr>' +
        '</li>'
                
        navCartList.append(childElement);
    }

    //udpate cart count
    $(".cart-count").text(quantity);
}

function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
