"use strict"

// Dom references
const headerEl = document.querySelector("header");
const navEl = document.querySelector("nav");
const cart = document.querySelector("#cart");
const cartIcon = document.querySelector(".fa-cart-shopping");
const trashIcon = document.querySelector("#trash-icon");
const emptyCart = document.querySelector("#empty-cart");
const cartHasItem = document.querySelector("#cart-with-item");
const itemsInCart = document.querySelector("#cart-user-icons > span");
const items = document.querySelector("#items");
const totalAmount = document.querySelector("#total");
const imagesContainer = document.querySelector("#images-wrapper");
const imageSlider = document.querySelector("#images-container");
const currentImgNum = document.querySelector("#current-img");
const imgChoosedLarge = document.querySelector("#show-img-larger > img");
const allImages = document.querySelectorAll("#images-container img");
const btnsParent = document.querySelector("#btns");
const valueBtn = document.querySelector("#value");
const overlay = document.querySelector("#overlay")

// Add class to style first and choosed image on screen 600px and up
if (window.screen.width >= 600) {
    Array.from(allImages)[0].classList.add("choosed-img-shadow")
}


// Function shows/hides nav for screens up to 600px wide
function toggleNavMobile(evt) {

    const target = evt.target.id;

    if (target !== "hamburger-icon" && target !== "close-icon") return

    //target === "hamburger-icon" ? navEl.classList.add("show-nav-mobile") : navEl.classList.remove("show-nav-mobile");

    if (target === "hamburger-icon") {
        navEl.classList.add("show-nav-mobile");

        overlay.classList.add("overlay");

        disableScroll();
        return
    }
    navEl.classList.remove("show-nav-mobile");

    overlay.classList.remove("overlay");

    enableScroll();

}

headerEl.addEventListener("click", toggleNavMobile);

// Function disables scroll
function disableScroll() {
    document.body.style.overflow = "hidden"
}

// Function enables scroll
function enableScroll() {
    document.body.style.overflow = ""

}

/***** ******/


// Function shows/hides cart empty or with item 
function toggleCart() {

    cart.classList.toggle("show-cart");

    // If car has items show cart with items 
    if (hasCartItems()) {
        emptyCart.classList.add("hidden");
        cartHasItem.classList.remove("hidden");
        return
    }

    // Show empty cart
    emptyCart.classList.remove("hidden");
    cartHasItem.classList.add("hidden");
}

cartIcon.addEventListener("click", toggleCart);

// Function checks if cart has items or not and returns a boolean
function hasCartItems() {
    return Number(itemsInCart.textContent) > 0 ? true : false;
}

/***** ******/

let currentImg = 1; // Representing first image
let totalImgs = 4; // Constant value for total images
/*Function initiates slides images when user clicks arrows */
function initiImgSlider(evt) {
    const target = evt.target.id;

    if (target !== "slide-left" && target !== "slide-right") return

    target === "slide-left" ? slideLeft() : slideRight();
}


imagesContainer.addEventListener("click", initiImgSlider);

// Function slides images-container to the left and shows which image is in view
function slideLeft() {
    if (currentImg < totalImgs) {

        imageSlider.style.transform = `translateX(-${currentImg * 100}%)`;
        currentImg++

        showCurrentImgNumber(currentImg);
    }
}

// Function slides images-container to the right and shows which image is in view

function slideRight() {
    if (currentImg > 1 && currentImg <= 4) {

        imageSlider.style.transform = `translateX(${(currentImg * - 100) + 200}%)`;
        currentImg--

        showCurrentImgNumber(currentImg);
    }
}

// Function showing current img number e.g 1/4
function showCurrentImgNumber(num) {
    currentImgNum.textContent = num;
}

/***** ******/

// Function shows choosed image larger, removes style class and adds to choosed img on screen 600px wide and up
if (window.screen.width >= 600) {
    function showChoosedImg(evt) {

        evt.stopPropagation()

        const target = evt.target;

        if (target.classList.contains("choosed-img-shadow") || target.tagName === "DIV") return


        // Remove class on choosed img
        allImages.forEach(img => img.classList.remove("choosed-img-shadow"));

        target.classList.add("choosed-img-shadow");

        const targetSrc = target.src;

        imgChoosedLarge.src = targetSrc;

    }

    imagesContainer.addEventListener("click", showChoosedImg);
}


/***** ******/


//Initiates functions for changing items value or add to cart
function initCartFunc(evt) {
    const target = evt.target;
    const targetId = evt.target.id;

    if (targetId !== "decrement" && targetId !== "increment" && !target.closest("#add-to-cart")) return

    const operation = targetId === "decrement" || targetId === "increment" ? changeItemValue(targetId) : addToCart();
}

// Function increment or decrement items value 
function changeItemValue(operation) {
    const items = Number(valueBtn.textContent);

    if (operation === "increment") {
        valueBtn.textContent = items + 1;
        return
    }

    else if (items >= 1 && operation === "decrement") {
        valueBtn.textContent = items - 1;
        return
    }
}

// Adds value to cart icon, in cart, resets incremented value, calculates total
function addToCart() {

    //Value over cart icon - number of item in cart
    const itemsNum = Number(itemsInCart.textContent);

    //Value from increment or decrement value
    const itemsToAdd = Number(valueBtn.textContent);

    if (itemsToAdd === 0) return

    // Sets span value over cart-icon
    itemsInCart.textContent = itemsToAdd + itemsNum;

    // In cart value
    items.textContent = Number(itemsInCart.textContent);

    //Calculate total in cart
    calcTotal();

    // Resets value incement or decrement
    resetItemsValue();

}

//Calculates total amount in cart
function calcTotal() {
    totalAmount.textContent = Number(items.textContent) * 125;
}

//Resets incremented value
function resetItemsValue() {
    valueBtn.textContent = 0;

}

btnsParent.addEventListener("click", initCartFunc);


// Clear cart and values
function clearCart() {
    // Value over cart-icon
    itemsInCart.textContent = 0;
    // Number of items in cart
    items.textContent = 0;
    // Total in cart
    totalAmount.textContent = 0;
    //Incremented value
    valueBtn.textContent = 0;
}

trashIcon.addEventListener("click", clearCart);

/***** ******/
