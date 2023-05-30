// order of the cart
const order_form = document.querySelector('.order_form');
order_form.addEventListener('submit', async (e) => {
    const cartItems = JSON.parse(window.localStorage.getItem('productsInLocalStorge'))
    const total = parseInt(window.localStorage.getItem('totalPrice'))
    const productsQty = parseInt(window.localStorage.getItem('productsQty'))
    const cart_product_wrapper = document.querySelector('.cart_product_wrapper');
    e.preventDefault();
    const totalPrice = total;
    const totalProducts = productsQty;
    let productId = null;
    let quantity = null;
    const products = [];
    Object.values(cartItems).forEach(product => {
        productId = product._id;
        quantity = product.productsInCart;
        products.push({ productId, quantity, title: product.title });
    });
    const order = { products, totalPrice, totalProducts };

    // send order
    if(products && totalPrice && totalProducts){
        try {
        const res = await window.fetch('/order', {
          method: 'POST',
          body: JSON.stringify(order),
          headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        if (data.orderFailed) {
            order_form.innerHTML = '';
            cart_product_wrapper.innerHTML = '';
            cart_product_wrapper.innerHTML = '<p class="order_message_fail"> Votre commande n\'a pas été enregistrée, Veuillez réessayer </p>';
        }
        if (data.order) {
            // delete local storge content
            localStorage.clear();
            document.querySelector('.productsQty').textContent = '';
            document.querySelector('.mobile_productsQty').textContent = '';
            document.querySelector('.cart_total .total').textContent = '';
            order_form.innerHTML = '';
            cart_product_wrapper.innerHTML = '';
            cart_product_wrapper.innerHTML = '<p class="order_message_succeed"> Votre commande a été envoyer, merci pour votre confiance en DIGITAL PRO </p>';
            setTimeout(() => {
                window.location.assign('/');
            }, "3000");              
        }
        }
        catch (err) {
            console.log(err);
        }
    }
  });

