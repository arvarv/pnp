// get values from cart on localStorage
var cart = JSON.parse(localStorage.getItem("cart"));

//set count message
displayCountMessage();

//display cart list
displayCart();

//display payment checkout
displayPayment();

//Stepper +- quantity
$(".minus-btn").on("click", function () {
    var itemCount = $(this).siblings(".item-count");
    var count = parseInt(itemCount.text());
    if (count > 1) {
        count -= 1;
    }
    itemCount.text(count);

    //get item name of element being updated
    var itemName = $(this).parent().siblings(".item-details").find(".item-name").text();

    //update cart item and payment
    updateCartItem(itemName, count);
    
});

$(".plus-btn").on("click", function () {
    var itemCount = $(this).siblings(".item-count");
    var count = parseInt(itemCount.text());
    count += 1;
    itemCount.text(count);

    //get item name of element being updated
    var itemName = $(this).parent().siblings(".item-details").find(".item-name").text();

    //update cart item and payment
    updateCartItem(itemName, count);
});

$(".item-remove").on("click", function () {
    var item = $(this).parentsUntil(".cart-list").last();
    removeCartItem(item);
});

$("#final-checkout").on("click", function () {
    if (cart.length > 0) {
        window.location.href="checkout.html";
    } else {
        alert("You have no items in your cart.");
    }
});

// Functions
function displayCountMessage() {
    var quantity = 0;
    cart.forEach(element => { quantity += element.quantity; });
    $("#cart-count-msg").text(quantity);
    $(".cart-count").text(quantity);
}

function displayCart() {
    var cartList = $(".cart-list");

    //remove child elements from cartList
    cartList.empty();

    for (let i = 0; i < cart.length; i++) {
        var discount = "";
        const element = cart[i];
        console.log(element.discount);
        if (element.discount > 0) {
            discount =  element.discount + "% off";
        } else {
            discount = "";
        }

        var childDiv = 
        '<div class="row">'+ 
            '<div class="cart-img-holder col-lg-4 d-flex justify-content-sm-center align-items-center">' +
                '<img class=" cart-item-img" src="' + element.image + '">' +
            '</div>'+
            '<div class="col-lg-5 d-flex flex-column justify-content-between">' +
                '<div class="item-details ">' +
                    '<p class="item-name">' + element.name + '</p>' +
                    '<p class="item-likes"><span><i class="far fa-heart fa-md"></i></span><span>234</span>people liked this</p>' +
                '</div>' +
                '<div class="item-quantity d-flex justify-content-sm-start align-items-center">' +
                    '<button class="minus-btn d-flex justify-content-center align-items-center"><span><i class="fas fa-minus"></i></span></button>' +
                    '<p class="item-count">' + element.quantity + '</p>' +
                    '<button class="plus-btn d-flex justify-content-center align-items-center"><span><i class="fas fa-plus"></i></span></button>' +
                '</div>' +
           '</div>' +
           '<div class="col-lg-3 d-flex flex-column justify-content-between align-items-end">' +
                '<div>' +
                    '<p class="item-discount">' + discount + '</p>' +
                    '<p class="item-price">P ' + element.price.toFixed(2) + '</p>' +
                '</div>' +
                '<p class="item-remove"><span><i class="fas fa-trash"></i></span>Remove</p>' +
            '</div>'+
        '</div>';

        if (i < cart.length - 1) {
            childDiv += '<hr class="cart-hr">';
        }
                
        cartList.append(childDiv);
    }
}

function displayPayment(){
    var total = 2500;
    cart.forEach(element => { total += (element.price * element.quantity);});

    $("#subtotal").text("P " + numberWithCommas((total - 2500).toFixed(2)));
    $("#total").text("P " + numberWithCommas(total.toFixed(2)));
}

function updateCartItem(itemName, count) {
    //loop through cart array and then update the quantity
    for (let i = 0; i < cart.length; i++) {
        const element = cart[i];
        if (element.name === itemName) {
            element.quantity = count;
        }
    }

    updateCart();
}

function updateCartStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
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

function removeCartItem(item) {
    var itemName = item.find(".item-name").text();
    var index = -1;

    // get index of item to be remove in cart array
    for (let i = 0; i < cart.length; i++) {
        const element = cart[i];
        if (itemName === element.name) {
            index = i;
        }
    }

    //remove item in cart array
    cart.splice(index,1);

    //remove from html document
    item.slideUp(500, function(){
        
        if(item.next().prop("tagName")) {
            item.next(".cart-hr").remove();
        } else if(item.prev().prop("tagName")) {
            item.prev(".cart-hr").remove();
        }

        $(this).remove();
    });

    updateCart();
}

function updateCart() {
    displayCountMessage();
    displayPayment();

    // update cart object in localStorage
    updateCartStorage();

    //update nav cart
    updateNavCart();
}

