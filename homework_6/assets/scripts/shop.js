//js for all pages

//initialize cart if not in local storage
function initializeCart() {
    console.log("executing initializeCart function");
    var mystorage = window.localStorage;
    if (mystorage.getItem("Cart") === null)
    {
        //initialize all quantities to 0
        var cart = {
            "none" : 0,
            "choc" : 0,
            "sugar" : 0,
            "vani" : 0
        }
        mystorage.setItem("Cart", JSON.stringify(cart));
    }
}

//js for the visual indication of how many items user have in their shopping cart
function drawCartCirclePosition() {
    var cartCircle = $(".cartCircle");
    var cartPicPos = $('#cartpic').position();
    cartCircle.css("top", cartPicPos.top - 5);
    cartCircle.css("left", cartPicPos.left + 20);
}

function showCartCircle(cartNum) {
    var cartCircle = $("<span></span>").addClass('cartCircle');
    cartCircle.text(cartNum);
    $('#cartpic').parent().append(cartCircle);
    drawCartCirclePosition();
}

function hideCartCircle() {
    $('.cartCircle').hide();
}

function updateCart() {
    var mystorage = window.localStorage;
    var cart = JSON.parse(mystorage.getItem("Cart"));
    var cartTotNum = cart.none + cart.choc + cart.sugar + cart.vani;
    if (cartTotNum > 0)
    {
        showCartCircle(cartTotNum);
    }
    else
    {
        hideCartCircle();
    }
}

$(window).resize(function(){
    drawCartCirclePosition();
});


//js for product detail page(popup)
//js to control popup
function openForm() {
    document.getElementById("item_add_form").style.display = "block";
}
function closeForm() {
    document.getElementById("item_add_form").style.display = "none";
}

//initialize product detail page(popup)
function initializeShop() {
    var mystorage = window.localStorage;
    mystorage.setItem("Glazing", 'none');
    mystorage.setItem("Quantity", 'one');
}

//change states of attribute options according to onclick events
$(document).ready(function() {
    initializeCart();
    updateCart();
    var url = window.location.href;
    console.log(url);
    if (url.includes("Browsing-DetailPage(popup)")) {
        initializeShop();
        //attribute: glazing and image
        $(".glazing_button").click(function () {
            var mystorage = window.localStorage;
            var selectGlazing = $(this).attr('id');
            var prevGlazing = mystorage.getItem("Glazing");
            // console.log(selectGlazing);
            // console.log(prevGlazing);
            if (selectGlazing !== prevGlazing) {
                // console.log("Should change!");
                $('#' + selectGlazing).attr("class", "glazing_button active1");
                $('#' + prevGlazing).attr("class", "glazing_button not_active1");
                var glazingPicPath = {
                    'none': "../assets/images/item1.png",
                    'choc': "../assets/images/item3.png",
                    'sugar': "../assets/images/item2.png",
                    'vani': "../assets/images/item4.png",
                };
                $("#item1pic1").attr("src", glazingPicPath[selectGlazing]);
                mystorage.setItem("Glazing", selectGlazing);
            }
        });

        //attribute: quantity
        $(".quantity_button").click(function () {
            var mystorage = window.localStorage;
            var selectQuantity = $(this).attr('id');
            var prevQuantity = mystorage.getItem("Quantity");
            console.log(selectQuantity);
            console.log(prevQuantity);
            if (selectQuantity !== prevQuantity) {
                //console.log("Should change!");
                $('#' + selectQuantity).attr("class", "quantity_button active1");
                $('#' + prevQuantity).attr("class", "quantity_button not_active1");
                mystorage.setItem("Quantity", selectQuantity);
                var new_price = 0;
                //change price id to exact number
                switch (selectQuantity) {
                    case 'one':
                        new_price = 3;
                        break;
                    case 'two':
                        new_price = 9;
                        break;
                    case 'three':
                        new_price = 18;
                        break;
                    case 'four':
                        new_price = 36;
                        break;
                }
                //update price
                $(".price_number").text("$" + new_price);
            }
        });
        //when adding to cart
        //save glazing and quantity information to local storage
        $("#addtocart").click(function () {
            var mystorage = window.localStorage;
            var glazing = mystorage.getItem("Glazing");
            var quantity_str = mystorage.getItem("Quantity");
            var quantity = 0;
            switch (quantity_str) {
                case 'one':
                    quantity = 1;
                    break;
                case 'two':
                    quantity = 3;
                    break;
                case 'three':
                    quantity = 6;
                    break;
                case 'four':
                    quantity = 12;
                    break;
            }
            // console.log("adding to cart, glazing is " + glazing + ", quantity is " + quantity);
            var cart = JSON.parse(mystorage.getItem("Cart"));
            // console.log("prior to cart, " + cart[glazing] + " " + glazing);
            cart[glazing] += quantity;
            // console.log("after to cart, " + cart[glazing] + " " + glazing);
            mystorage.setItem("Cart", JSON.stringify(cart));
            updateCart();
            closeForm();
        });
    }
    if (url.includes("Cart"))
    {
        loadCart();
    }
})

//js to control cart page

function loadCart(){
    console.log("loading cart");
    var mystorage = window.localStorage;
    var cart = JSON.parse(mystorage.getItem("Cart"));
    var cartTotNum = cart.none + cart.choc + cart.sugar + cart.vani;
    if (cartTotNum > 0) {
        $(".cart_product").remove();
        var itemHTML = '<div class="cart_product">' +
            '<div class="product-image">' +
            '<img id="product-image-1">' +
            '</div>' +
            '<div class="product-item">original roll</div>' +
            '<div class="product-glazing"></div>' +
            '<div class="product-quantity"></div>' +
            '<div class="product-price"></div>' +
            '<div class="remove-product">' +
            '<a href="#"><img class="remove-product-1" src="../assets/images/remove.png"></a>' +
            '</div>' +
            '</div>';
        var glazings = ['none', 'choc', 'sugar', 'vani'];
        var glazingTextDict = {
            'none': "None",
            'choc': "Double Chocolate",
            'sugar': "Sugar Milk",
            'vani': "Vanilla Milk"
        };
        var glazingTextDictRev = {
            "None": 'none',
            "Double Chocolate": 'choc',
            "Sugar Milk": 'sugar',
            "Vanilla Milk": 'vani'
        };
        var glazingPicPath = {
            'none': "../assets/images/item1.png",
            'choc': "../assets/images/item3.png",
            'sugar': "../assets/images/item2.png",
            'vani': "../assets/images/item4.png",
        };
        var totBuns = 0;
        for (i = 0; i < glazings.length; i++) {
            if (cart[glazings[i]] !== 0) {
                var newItem = $(itemHTML);
                var glazeText = '';
                switch (glazings[i]) {
                    case "none":
                        glazeText = "None";
                        break;
                    case "choc":
                        glazeText = "Double Chocolate";
                        break;
                    case "sugar":
                        glazeText = "Sugar Milk";
                        break;
                    case "vani":
                        glazeText = "Vanilla Milk";
                        break;
                }
                var glazingText = glazingTextDict[glazings[i]];
                newItem.find("#product-image-1").attr("src", glazingPicPath[glazings[i]]);
                newItem.find(".product-glazing").text(glazingText);
                newItem.find(".product-quantity").text(cart[glazings[i]]);
                newItem.find(".product-price").text(3 * cart[glazings[i]]);
                newItem.find(".remove-product-1").click(function () {
                    var glazing = $(this).parent().parent().parent().find(".product-glazing").text();
                    cart[glazingTextDictRev[glazing]] = 0;
                    mystorage.setItem("Cart", JSON.stringify(cart));
                    updateCart();
                    loadCart();
                });
                $("#cart_left").append(newItem);
                totBuns += cart[glazings[i]];
            }
        }
        $("#sum_items").text(totBuns * 3);
        var totPrice = totBuns * 3 + 1.5 + 7;
        $("#sum_price").text(totPrice);
    }
    else {
        $("#cart_body").remove();
        var emptyCartStr = '<div id="cart_empty">' +
                        '<div id="empty-image">' +
                        '<img id="empty-image-1" src="../assets/images/empty.png" alt="empty">' +
                        '</div>' +
                        '<div id="empty-text">' +
                        '<p>Oops!</p><p>Cart is empty…</p></div>' +
                        '<div id="shop_now">' +
                        '<a id="shop_now1" href="../html-assignment5/Browsing-DetailPage(popup).html">SHOP NOW</a>' +
                        '</div></div>'
        var emptyCart = $(emptyCartStr);
        $("#content_body").append(emptyCart);
    }
};


