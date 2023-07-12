
// add or substract item by 1 from cart plus and minus icons *******************************************************************************************************************
let productsQty = parseInt(window.localStorage.getItem('productsQty'))
let cartItems = JSON.parse(window.localStorage.getItem('productsInLocalStorge'))
let total = parseInt(window.localStorage.getItem('totalPrice'))
const cartPlusIcons = document.querySelectorAll('.cart_qty .fa-circle-plus');
const cartminusIcons = document.querySelectorAll('.cart_qty .fa-circle-minus');
if(cartPlusIcons || cartminusIcons){
    for (let i = 0; i < cartPlusIcons.length || i < cartminusIcons.length; i++) {
        // add item by 1
        cartPlusIcons[i].addEventListener('click', (e) => {
            productsQty = parseInt(window.localStorage.getItem('productsQty'))
            cartItems = JSON.parse(window.localStorage.getItem('productsInLocalStorge'))
            total = parseInt(window.localStorage.getItem('totalPrice'))

            let itemsInLocalStorge = [];
            for (const property in cartItems) {
              itemsInLocalStorge.push(property);
            }
            let price = 0
            let inCart = 0
            // get item's price and in cart quantity before delete
            Object.values(cartItems).forEach(element => {
                if(element._id === itemsInLocalStorge[i]) {
                    element.productsInCart += 1;
                    price = element.price;
                    inCart = element.productsInCart;
                }
            })
            // increase by 1
            window.localStorage.setItem('totalPrice', total + price)
            window.localStorage.setItem('productsInLocalStorge', JSON.stringify(cartItems));
            window.localStorage.setItem('productsQty', productsQty + 1)
            document.querySelector('.productsQty').textContent = productsQty + 1;
            document.querySelector('.mobile_productsQty').textContent = productsQty + 1
            // update total price of the cart page
            // total price of the item
            document.querySelectorAll('.cart_quantity')[i].textContent = inCart * price + ',00 €'
            document.querySelectorAll('.cart_qty .single_Item_Qty')[i].textContent = inCart;
            // global total price
            document.querySelector('.cart_total > .total').textContent = (total + price) + ',00 €';
        })

        // add item by 1 *****************************************************************
        cartminusIcons[i].addEventListener('click', (e) => {
            productsQty = parseInt(window.localStorage.getItem('productsQty'))
            cartItems = JSON.parse(window.localStorage.getItem('productsInLocalStorge'))
            total = parseInt(window.localStorage.getItem('totalPrice'))
            let itemsInLocalStorge = [];
            for (const property in cartItems) {
              itemsInLocalStorge.push(property);
            }
            let price = 0
            let inCart = 0
            // get item's price and in cart quantity before delete
            Object.values(cartItems).forEach(element => {
                if(element._id === itemsInLocalStorge[i] && element.productsInCart > 1) {
                    element.productsInCart -= 1;
                    price = element.price;
                    inCart = element.productsInCart;

                    // decrease by 1
                    window.localStorage.setItem('totalPrice', total - price)
                    window.localStorage.setItem('productsInLocalStorge', JSON.stringify(cartItems));
                    window.localStorage.setItem('productsQty', productsQty - 1)
                    document.querySelector('.productsQty').textContent = productsQty - 1;
                    document.querySelector('.mobile_productsQty').textContent = productsQty - 1
                    // update total price of the cart page
                    // total price of the item
                    document.querySelectorAll('.cart_quantity')[i].textContent = inCart * price + ',00 €'
                    document.querySelectorAll('.cart_qty .single_Item_Qty')[i].textContent = inCart;
                    // global total price
                    document.querySelector('.cart_total > .total').textContent = (total - price) + ',00 €';
                }
            })
        })
    }
}

// order of the cart succuss or fail page ***************************************************************************************
const order_form_id = document.querySelector('#order_form_id')
if(order_form_id){
    order_form_id.addEventListener("submit", (event) => {
        let order_form = document.getElementById('order_form_inputs_wrapper');
        if(order_form){
            //console.log('event done')
            productsQty = parseInt(window.localStorage.getItem('productsQty'))
            cartItems = JSON.parse(window.localStorage.getItem('productsInLocalStorge'))
            total = parseInt(window.localStorage.getItem('totalPrice'))
            let totalPrice = total;
            let totalProducts = productsQty
            //let productId = null;
            //let quantity = null;
            //let title = null;
            //let price = null;
            //let image = null;
            //let productType = null;
            if(cartItems){
                Object.values(cartItems).forEach(product => {
                    order_form.innerHTML += `
                     <input type="text" name="productId" value=${JSON.stringify(product._id)}>
                     <input type="number" name="productsInCart" value=${JSON.stringify(product.productsInCart)}>
                     <input type="text" name="title" value=${JSON.stringify(product.title)}>
                     <input type="number" name="price" value=${JSON.stringify(product.price)}>
                     <input type="text" name="image" value=${JSON.stringify(product.image)}>
                     <input type="text" name="productType" value=${JSON.stringify(product.productType)}>`
                });
                order_form.innerHTML += `<input type="number" name="totalPrice" value=${JSON.stringify(totalPrice)}>
                <input type="number" name="totalProducts" value=${JSON.stringify(totalProducts)}>`
            }
        }
    });
}

// order button animation
/*function animate_order_btn() {
    let order_btn = document.querySelector('.order_form .order_btn');
    let spinIcon = document.querySelector('.order_btn fa-circle-notch');
    if(order_btn) {
        order_btn.style.cursor = "wait";
        order_btn.textContent = "";
        spinIcon.classList.add("order_btn_spin_icon");
        setTimeout(() => {
            order_btn.style.pointerEvents = "none";
            order_btn.textContent = "";
            //spinIcon[i].classList.replace("spin_icon", "checked_icon");
            //spinIcon[i].classList.replace("fa-spinner", "fa-check");
            order_btn.textContent = "Bien ajouté";
        }, 1000); //1s = 1000ms
    }
}*/


// another way to send a post request
/*
if(document.querySelector('#order_form_id')){
document.querySelector('#order_form_id').addEventListener('submit', async (event) => {
            event.preventDefault()
            productsQty = parseInt(window.localStorage.getItem('productsQty'))
            cartItems = JSON.parse(window.localStorage.getItem('productsInLocalStorge'))
            total = parseInt(window.localStorage.getItem('totalPrice'))
            //console.log('check this total', total)
            let totalPrice = total;
            let totalProducts = productsQty
            let productId = null;
            let quantity = null;
            let title = null;
            let price = null;
            let products = [];

            Object.values(cartItems).forEach(product => {
                productId = product._id;
                quantity = product.productsInCart;
                title = product.title;
                price = product.price;
                products.push({ productId, quantity, title, price });
            });
            //console.log('products are: ', products)
            const order = { products, totalPrice, totalProducts };
            //JSON.stringify(order)
            //console.log(' order object is: ', order)

            //order_form.innerHTML += `<input type="text" name="totalPrice" value=${JSON.stringify(order)}>`
            // send orders
            //if(products && totalPrice && totalProducts){
                try {
                    console.log(' order object inside try block is: ', order)
                    const res = await fetch('/order', {
                      method: 'POST',
                      body: JSON.stringify({ hello: "me", hi: "h"}),
                      headers: {'Content-Type': 'application/json'}
                    })
                    const data = await res.json();
                    if (data.orderFailed) {
                        order_form.innerHTML = '';
                        cart_product_wrapper = '';
                        cart_product_wrapper = '<p class="order_message_fail"> Votre commande n\'a pas été enregistrée, Veuillez réessayer </p>';
                    }
                    if (data.order) {
                        // delete local storge content
                        window.localStorage.clear();
                        document.querySelector('.productsQty').textContent = '';
                        document.querySelector('.mobile_productsQty').textContent = '';
                        document.querySelector('.cart_total .total').textContent = '';
                        order_form.innerHTML = '';
                        cart_product_wrapper = '';
                        cart_product_wrapper = '<p class="order_message_succeed"> Votre commande a été envoyer, merci pour votre confiance en DIGITAL PRO </p>';
                        setTimeout(() => {
                            window.location.assign('/')
                        }, "2500");
                    }
                }
                catch (err) {
                    console.log('error is :', err)
                }
            //}
        });
    }
*/