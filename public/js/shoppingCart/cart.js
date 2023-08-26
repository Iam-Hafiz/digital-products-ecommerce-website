// on reloading the page check the local storge to update the cart if these is items
function setproductsQty(){
    const productsQty = parseInt(window.localStorage.getItem("productsQty"))
    // if it's not null or empty
    if(productsQty) {
        // productsQty is cart nomber stored in a variable in local storge
       document.querySelector('.productsQty').textContent = productsQty
        // for mobile cart design
       document.querySelector('.mobile_productsQty').textContent = productsQty
    }
}
setproductsQty();

// display shopping cart **********************************************************************************************************************
displayCart();

// play Audio files ************************************************************************************************************************
async function playAudio(audio) {
    try {
      await audio.play();
    } catch (err) {
      console.log('could not play audio:' + err)
    }
}

// get data from database**********************************************************************************************************************
addEventListener('DOMContentLoaded', async (e) => {
    let products = null;
    let data = null;
  try {
    const res = await window.fetch('/products', {
      method: 'GET',
    });
    data = await res.json();
    //console.log(data);
    if (data.errors) {
       console.log('Could not get data');
    }
    if (data.products) {
        products = data.products;
    }
  }
  catch (err) {
    console.log(err);
  }
//console.log('products are:', products );

    // loop throuth the buttons and get the product info
    let buttons = document.querySelectorAll('.addToCart');
    let spinIcon = document.querySelectorAll(".addToCart .fa-spinner");
    let btnText = document.querySelectorAll(".addToCart_btn > span");
    for (let i =0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', (event) => {
            const audio = document.querySelector(".addToCart_btn_audio");
            if(audio){
                audio.volume = 0.1;
                setTimeout(() => {
                    playAudio(audio)
                }, 1000)
            }
            const itemId = buttons[i].previousElementSibling.value;
            //console.log('itemId: ', itemId, typeof itemId)
            products.forEach(product => {
                if(itemId === product._id){
                    products_quantity_in_cart(product);
                    totalPrice(product);
                }
            })
             //button animations
             buttons[i].style.cursor = "wait";
             spinIcon[i].classList.add("spin_icon");
             btnText[i].textContent = "";
            setTimeout(() => {
                buttons[i].style.pointerEvents = "none";
                spinIcon[i].classList.replace("spin_icon", "checked_icon");
                spinIcon[i].classList.replace("fa-spinner", "fa-check");
                btnText[i].textContent = "Bien ajouté";
            }, 200); //1s = 1000ms
        });
    }
});

//update the number in the cart icon and local storge**************************************************************************************
function products_quantity_in_cart(product) {
    let productsQty = parseInt(window.localStorage.getItem("productsQty"))
    if( productsQty ) {
        window.localStorage.setItem("productsQty", productsQty + 1)
        // increase the cart number text also by 1
        document.querySelector(".productsQty").textContent = productsQty + 1
        document.querySelector(".mobile_productsQty").textContent = productsQty + 1
    } else {
        window.localStorage.setItem("productsQty", 1)
        // increase the cart number text also by 1
        document.querySelector(".productsQty").textContent = 1
        document.querySelector(".mobile_productsQty").textContent = 1
    }
    saveProductsToLS(product);
}

// get and save products to local storge  ****************************************************************************************************
function saveProductsToLS(product) {
    let cartItems = JSON.parse(window.localStorage.getItem("productsInLocalStorge"))
    if (cartItems) {
        if(!cartItems[product._id]){
            cartItems = {
                ...cartItems,
                [product._id]: product
            };
        }
        cartItems[product._id].productsInCart += 1;
    } else {
        product.productsInCart = 1;
        cartItems = {
            [product._id]: product
        };
    }
    window.localStorage.setItem("productsInLocalStorge", JSON.stringify(cartItems))
}

// calculate the total price and save to local storge ********************************************************************************************
function totalPrice(product) {
    let total = parseInt(window.localStorage.getItem("totalPrice"))
    if (total) {
        window.localStorage.setItem("totalPrice", total + product.price)
    } else {
        window.localStorage.setItem("totalPrice", product.price)
    }
}

// get products from local storage and display shopping cart  *************************************************************************************
function displayCart() {
    let cartItems = JSON.parse(window.localStorage.getItem("productsInLocalStorge"))
    let productWrapper = document.querySelector(".cart_product_wrapper")
    let total = parseInt(window.localStorage.getItem("totalPrice"))
    if(cartItems && productWrapper && total){
        productWrapper.innerHTML = '';
        Object.values(cartItems).map(item => {
            productWrapper.innerHTML += `
            <div>
                <div class="cart_product_container">
                    <div class="cart_product product_header">
                        <button class="delete_cart_item" aria-label="supprimer"><i class="fa-solid fa-trash-can"></i></button>
                        <a href="laptop/${item._id}" tabindex="-1"><img src="/images/${item.productType + "s"}/${item.image}" alt="image du produit" tabindex="0"></a>
                        <span class="cart_product_title">${item.title}</span>
                    </div>
                    <div class="cart_price other_header">${item.price},00 €</div>
                    <div class="cart_qty other_header">
                        <i class="fa-solid fa-circle-minus" role="button" tabindex="0" aria-label="baisser la quantity"></i>
                        <span class="single_Item_Qty">${item.productsInCart}</span>
                        <i class="fa-solid fa-circle-plus" role="button" tabindex="0" aria-label="augmenter la quantity"></i>
                    </div>
                    <div class="cart_quantity other_header">
                        <span>${item.productsInCart * item.price},00 €</span>
                    </div>
                </div>
            </div>`;
        })
        productWrapper.innerHTML += `
        <div class="cart_total">
            <span class="other_header">Prix Total: </span>
            <span class="other_header total"> ${total},00 €</span>
        </div>
        <div class="cart_btn" id="cart_btn">
            <form  method="POST" action="/order" encType="multipart/form-data" id="order_form_id" class="order_form">
                <div id="order_form_inputs_wrapper"></div>
                <button class="order_btn"><i class="fa-solid fa-circle-notch"></i> Commander</button>
            </form>
        </div>
        `;
    }
}

// delete items from cart ********************************************************************************************************************************
let deleteButtonsB = document.querySelectorAll('.delete_cart_item');
if(deleteButtonsB){
    for (let i =0; i < document.querySelectorAll('.delete_cart_item').length; i++) {
        deleteButtonsB[i].addEventListener('click', (e) => {
            const audio = document.querySelector(".cart_deleteicon_audio");
            if(audio){
                audio.volume = 0.2;
                playAudio(audio)
            }
            let cartItems = JSON.parse(window.localStorage.getItem("productsInLocalStorge"))
            let total = parseInt(window.localStorage.getItem("totalPrice"))
            let productsQty = parseInt(window.localStorage.getItem("productsQty"))
            let itemsInLocalStorge = [];
            if(cartItems && total && productsQty){
                for (const property in cartItems) {
                    itemsInLocalStorge.push(property);
                }
                let price = 0
                let inCart = 0

                // get item's price and in cart quantity before delete
                Object.values(cartItems).forEach(element => {
                    if(element._id === itemsInLocalStorge[i]) {
                        price = element.price;
                        inCart = element.productsInCart;
                    }
                });

                // delete item also in local storge
                if(itemsInLocalStorge.length === 1){
                    window.localStorage.clear()
                    document.querySelector('.productsQty').textContent = '';
                    document.querySelector('.mobile_productsQty').textContent = '';

                    // update total price of the cart page
                    document.querySelector('.cart_total .total').textContent = '';
                    document.getElementById('order_form_id').innerHTML = '';
                } else {
                    window.localStorage.setItem("productsQty", productsQty - inCart);
                    document.querySelector('.productsQty').textContent = productsQty - inCart;
                    document.querySelector('.mobile_productsQty').textContent = productsQty - inCart;

                    // recalculate the total price and save to local storge
                    window.localStorage.setItem("totalPrice", (total - (inCart * price)))
                    // update total price of the cart page
                    document.querySelector('.cart_total .total').textContent = ((total - (inCart * price )) + ',00 €');

                    // delete item
                    delete cartItems[itemsInLocalStorge[i]];
                    window.localStorage.setItem("productsInLocalStorge", JSON.stringify(cartItems))
                }
                // remove product from cart page (html)
                e.target.parentElement.parentElement.parentElement.classList.add("remove_tag"); /*.remove();*/
                setTimeout(() => {
                    window.location.assign('/cart');
                }, 1600);
            }
        })
    }
}




