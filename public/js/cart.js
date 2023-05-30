const products_Ids = document.querySelectorAll('.product_Id');
const products_titles = document.querySelectorAll('.product_title');
const products_imgs_wrappers = document.querySelectorAll('.product_img_wrapper');
const products_imgs = document.querySelectorAll('.product_img_wrapper > img');
const products_prices = document.querySelectorAll('.product_price');
const buttons = document.querySelectorAll('.addToCart');

// on reloading the page check the local storge to update the cart if these is items
function setproductsQty(){
    const productsQty = parseInt(window.localStorage.getItem('productsQty'))
    // if it's not null or empty
    if(productsQty) {
        // productsQty is cart nomber stored in a variable in local storge
       document.querySelector('.productsQty').textContent = productsQty
        // for mobile cart design
       document.querySelector('.mobile_productsQty').textContent = productsQty
    }
}
setproductsQty();

// loop throuth the buttons and get the product info
for (let i =0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        const product_title = products_titles[i].textContent;
        const product_id = products_Ids[i].textContent;
        const product_price = products_prices[i].textContent;
        const product_image_href = products_imgs_wrappers[i].attributes.href.value;
        const product_image_src = products_imgs[i].attributes.src.value;
        const product_image_alt = products_imgs[i].attributes.alt.value;
        let product = {
            _id: product_id,
            title: product_title,
            price: parseInt(product_price.replace('€', '')),
            image_href: product_image_href,
            image_src: product_image_src,
            image_alt: product_image_alt
        };
        const cartItems = JSON.parse(window.localStorage.getItem('productsInLocalStorge'))
        if (cartItems) {
            if(!cartItems[product._id]){
                product = {
                    _id: product_id,
                    title: product_title,
                    // remove the € sign 
                    price: parseInt(product_price.replace('€', '')),
                    image_href: product_image_href,
                    image_src: product_image_src,
                    image_alt: product_image_alt,
                    productsInCart: 0
                };
            }
        } else {
            product.productsInCart = 0
        }
        products_quantity_in_cart(product)
        totalPrice(product)
    });
}

//update the number in the cart icon and local storge
function products_quantity_in_cart(product) {
    const productsQty = parseInt(window.localStorage.getItem('productsQty'))
    if( productsQty ) {
        window.localStorage.setItem('productsQty', productsQty + 1)
        // increase the cart number text also by 1
        document.querySelector('.productsQty').textContent = productsQty + 1
        document.querySelector('.mobile_productsQty').textContent = productsQty + 1
    } else {
        window.localStorage.setItem('productsQty', 1)
        // increase the cart number text also by 1
        document.querySelector('.productsQty').textContent = 1
        document.querySelector('.mobile_productsQty').textContent = 1
    }
    saveProductsToLS(product);
}

// get and save products to local storge
function saveProductsToLS(product) {
    let cartItems = JSON.parse(window.localStorage.getItem('productsInLocalStorge'))
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
    window.localStorage.setItem('productsInLocalStorge', JSON.stringify(cartItems))
}

// calculate the total price and save to local storge
function totalPrice(product) {
    let total = parseInt(window.localStorage.getItem('totalPrice'))
    if (total) {
        window.localStorage.setItem('totalPrice', total + product.price)
    } else {
        window.localStorage.setItem('totalPrice', product.price)
    }
}

// get products from local storage and display shopping cart
function displayCart() {
    let cartItems = JSON.parse(window.localStorage.getItem('productsInLocalStorge'))
    let productWrapper = document.querySelector('.cart_product_wrapper')
    let total = parseInt(window.localStorage.getItem('totalPrice'))
    if(cartItems && productWrapper){
        productWrapper.innerHTML = '';
        Object.values(cartItems).map(item => {
            productWrapper.innerHTML += `
            <div>
                <div class="cart_product_container">
                    <div class="cart_product product_header">
                        <button class="delete_cart_item"><i class="fa-solid fa-trash-can"></i></button>
                        <a href="${item.image_href}" tabindex="-1"><img src="${item.image_src}" alt="${item.image_alt}" tabindex="0"></a>
                        <span class="cart_product_title">${item.title}</span>
                    </div>
                    <div class="cart_price other_header">${item.price},00 €</div>
                    <div class="cart_qty other_header">
                        <i class="fa-solid fa-circle-minus"></i>
                        <span class="single_Item_Qty">${item.productsInCart}</span>
                        <i class="fa-solid fa-circle-plus"></i>
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
        </div>`;
    }
}
displayCart();

// delete items from cart 
const deleteButtons = document.querySelectorAll('.delete_cart_item');
for (let i =0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', (e) => {
        // remove product from cart page (html)
        e.target.parentElement.parentElement.parentElement.remove();
        const cartItems = JSON.parse(window.localStorage.getItem('productsInLocalStorge'))
        const itemsInLocalStorge = [];
        for (const property in cartItems) {
          itemsInLocalStorge.push(property);
        }
        let price = 0
        let inCart = 0

        // get item's price and in cart quantity before delete
        Object.values(cartItems).forEach(element => {
            if(element._id == itemsInLocalStorge[i]) {
                price = element.price;
                inCart = element.productsInCart;
            }
        });
        const total = parseInt(window.localStorage.getItem('totalPrice'))
        const productsQty = parseInt(window.localStorage.getItem('productsQty'))

        // delete item also in local storge 
        if(itemsInLocalStorge.length == 1){
            window.localStorage.removeItem('productsQty')
            document.querySelector('.productsQty').textContent = '';
            document.querySelector('.mobile_productsQty').textContent = '';

            window.localStorage.removeItem('productsInLocalStorge')
            window.localStorage.removeItem('totalPrice')

            // update total price of the cart page
            document.querySelector('.cart_total .total').textContent = '';
        } else {
            window.localStorage.setItem('productsQty', productsQty - inCart);
            document.querySelector('.productsQty').textContent = productsQty - inCart;
            document.querySelector('.mobile_productsQty').textContent = productsQty - inCart;

            // recalculate the total price and save to local storge
            window.localStorage.setItem('totalPrice', (total - (inCart * price)))
            // update total price of the cart page
            document.querySelector('.cart_total .total').textContent = ((total - (inCart * price )) + ',00 €');

            // delete item
            delete cartItems[itemsInLocalStorge[i]];
            window.localStorage.setItem('productsInLocalStorge', JSON.stringify(cartItems));
        }
    })
}



// add item by 1 from cart icons 
/*
function increment(){
    const cartPlusIcons = document.querySelectorAll('.cart_qty .fa-circle-plus');
    const cartPlusIconsContentTag = document.querySelectorAll('.cart_qty .single_Item_Qty')
    for (let i = 0; i < cartPlusIcons.length; i++) {
        cartPlusIcons[i].addEventListener('click', (e) => { 
            let productsQty = parseInt(window.localStorage.getItem('productsQty'))
            const cartItems = JSON.parse(window.localStorage.getItem('productsInLocalStorge'))
            const total = parseInt(window.localStorage.getItem('totalPrice'))
            const itemsInLocalStorge = [];
            for (const property in cartItems) {
              itemsInLocalStorge.push(property);
            }
            let price = 0
            let inCart = 0
        
            // get item's price and in cart quantity before delete
            Object.values(cartItems).forEach(element => {
                if(element._id == itemsInLocalStorge[i]) {
                    element.productsInCart += 1;
                    price = element.price;
                    inCart = element.productsInCart;
                }
            });
            
            // increase by 1
            window.localStorage.setItem('totalPrice', total + price)
            window.localStorage.setItem('productsInLocalStorge', JSON.stringify(cartItems));
            window.localStorage.setItem('productsQty', productsQty + 1)
            document.querySelector('.productsQty').textContent = productsQty + 1;
            document.querySelector('.mobile_productsQty').textContent = productsQty + 1;
        
            // update total price of the cart page 
            cartPlusIconsContentTag[i].textContent = inCart;
            document.querySelector('.cart_total > .total').textContent = total + price + ',00 €';
            displayCart();
            
        })
    }
}
*/

