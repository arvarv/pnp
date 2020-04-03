    // Get Card details and pass it to modal
$("#pl-modal").on("show.bs.modal", function(e) {
    var card = $(e.relatedTarget);
    //get details from card
    var cardImg = card.find('.img-item').attr("src");
    var cardTitle = card.find('.card-title').text();
    var cardPrice = card.find('.trending-deal-price').text();

    //pass values from card to modal
    $(this).find('.product-img').attr("src", cardImg);
    $(this).find('#pl-modal-title').text(cardTitle);
    $(this).find('#pl-modal-price').text(cardPrice);
    $(this).find('.item-count').text(0);
});

// Add to cart
$("#add-to-cart-btn").on("click", function () {
    var modal = $("#pl-modal");

    var img = modal.find(".product-img").attr("src");
    var title = modal.find("#pl-modal-title").text();
    var price = parseFloat(modal.find("#pl-modal-price").text().split(" ")[1]);
    var quantity = parseInt(modal.find('.item-count').text());

    // set static discounts
    var discount = 0;
    if (title === "Aqua Therapy") { 
        discount = 21;
    } else if (title === "Holle Organic Growing-up Milk 3") {
        discount = 12;
    } 
    
    var item = {
        name: title,
        price: price,
        quantity: quantity,
        image: img,
        discount: discount
    };

    if (quantity > 0) {
        insertCart(item);
        alert("Successfully added to cart");
        modal.modal("toggle");
    } else {
        event.preventDefault();
        alert("You have not increased the quantity.");
    }
    
});

//functions

function insertCart(item) {
    var item = item;
    var index = -1;
    var quantity = 0;
    var storedCart = JSON.parse(localStorage.getItem("cart"));
    var navCartList = $(".floating-cart ul");

    //get item index
    for (let i = 0; i < storedCart.length; i++) {
       if (storedCart[i].name === item.name) {
            index = i;
       }
    }

    //insert to storedCart arr
    if (index != -1) {
        storedCart[index].quantity += item.quantity;
    } else {
        storedCart.push({name: item.name, quantity: item.quantity, price: item.price, image: item.image, discount: item.discount});
        index = storedCart.length - 1;
    }

    //updated Nav Cart
    storedCart.forEach(element => {
        quantity += element.quantity;
    });

    $(".cart-count").text(quantity);

    //save updated storedCart to localStorage
    localStorage.setItem("cart", JSON.stringify(storedCart));
    storedCart = JSON.parse(localStorage.getItem("cart"));

    //remove child elements from Nav Cart
    navCartList.empty();

    //add udpated child elements
    for (let i = 0; i < storedCart.length; i++) {
        const element = storedCart[i];

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

}