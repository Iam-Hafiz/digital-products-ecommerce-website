// order of the cart succuss or fail page
document.addEventListener("DOMContentLoaded", (event) => {
    let order_form = document.getElementById('order_form_inputs_wrapper');
    if(order_form){
        //console.log('event done')
        let cartItems = JSON.parse(window.localStorage.getItem("productsInLocalStorge"))
        let total = parseInt(window.localStorage.getItem("totalPrice"))
        let productsQty = parseInt(window.localStorage.getItem("productsQty"))
        let cart_product_wrapper = document.querySelector('.cart_product_wrapper').innerHTML
        let totalPrice = total;
        let totalProducts = productsQty
        let productId = null;
        let quantity = null;
        let title = null;
        if(cartItems){
            Object.values(cartItems).forEach(product => {
                order_form.innerHTML += `<input type="text" name="productId" value=${JSON.stringify(product._id)}>`
                order_form.innerHTML += `<input type="number" name="productsInCart" value=${JSON.stringify(product.productsInCart)}>`
                order_form.innerHTML += `<input type="text" name="title" value=${JSON.stringify(product.title)}>`
            });
            order_form.innerHTML += `<input type="number" name="totalPrice" value=${JSON.stringify(totalPrice)}>`
            order_form.innerHTML += `<input type="number" name="totalProducts" value=${JSON.stringify(totalProducts)}>`
        }
    }
});

        //order_form.addEventListener('submit', async (event) => {
        //event.preventDefault();

        //let products = [];
        //Object.values(cartItems).forEach(product => {
        //    productId = product._id;
        //    quantity = product.productsInCart;
        //    title = product.title;
        //    products.push({ productId, quantity, title });
        //});
        ////console.log('products are: ', products)
        //const order = { products, totalPrice, totalProducts };
        //    JSON.stringify(order)
        //console.log(' order object is: ', order)


            //order_form.innerHTML += `<input type="text" name="totalPrice" value=${JSON.stringify(order)}>`
            // send order
           /* if(products && totalPrice && totalProducts){
                try {
                    console.log(' order object inside try block is: ', order)
                    const res = await window.fetch('/order', {
                      method: 'POST',
                      body: JSON.stringify({ hello: 'me'} ),
                      headers: {'Content-Type': 'application/json'}
                    });
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
            }*/
        //});

