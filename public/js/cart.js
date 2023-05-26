const buttons = document.querySelectorAll('.addToCart');
const products = [];

// get products data from the server
addEventListener("load", async (e) => {
    try {
      const res = await window.fetch('/products', {
        method: 'GET'
      });
      const data = await res.json();
      data.laptops.forEach(laptop => {
          laptop.image = `/images/laptops/${laptop.image}`;
          products.push(laptop)
      })
      data.allinOnes.forEach(allinOne => {
          allinOne.image = `/images/allinOne/${allinOne.image}`;
          products.push(allinOne)
      })
      data.monitors.forEach(monitor => {
          monitor.image = `/images/monitors/${monitor.image}`;
          products.push(monitor)
      })

      products.forEach(product => {
         product.productsInCart = 0;
      })

       //console.log(products);
    }
    catch (err) {
      console.log(err);
    }

    for (let i =0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => {
            products_quantity_in_cart(products[i])
            totalPrice(products[i])
        });
    }

    // on reloading the page check the local storge to update the cart if these is items
    function setproductsQty(){
        const productsQty = parseInt(window.localStorage.getItem('productsQty'))
        // if it's not null or empty
        if(productsQty) {
           document.querySelector('.productsQty').textContent = productsQty

            // for mobile cart design
           document.querySelector('.mobile_productsQty').textContent = productsQty
        }
    }
    setproductsQty();

    //update the number in the cart icon and local storge
    function products_quantity_in_cart(product) {
        const productsQty = parseInt(window.localStorage.getItem('productsQty'))
        if( productsQty ) {
            window.localStorage.setItem('productsQty', productsQty + 1)
            document.querySelector('.productsQty').textContent = productsQty + 1
            document.querySelector('.mobile_productsQty').textContent = productsQty + 1
        } else {
            window.localStorage.setItem('productsQty', 1)
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
                    [product.title]: product
                }
            }
            cartItems[product.title].productsInCart += 1
        } else {
            product.productsInCart = 1
            cartItems = {
                [product.title]: product
            }
        }
        // save to local storage
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
        // mobile cart design
        let mobileProductWrapper = document.querySelector('.mobile_cart_wrapper')
        let total = parseInt(window.localStorage.getItem('totalPrice'))
        if(cartItems && productWrapper){
            productWrapper.innerHTML = '';
            mobileProductWrapper.innerHTML = '';
            Object.values(cartItems).map(item => {
                productWrapper.innerHTML += `
                <div class="cart_product_container">
                    <div class="cart_product product_header">
                        <button><i class="fa-solid fa-trash-can"></i></button>
                        <img src="${item.image}" alt="image du produit">
                        <span>${item.title}</span>
                    </div>
                    <div class="cart_price other_header">${item.price},00 €</div>
                    <div class="cart_qty other_header">
                        <i class="fa-solid fa-circle-minus"></i>
                        <span>${item.productsInCart}</span>
                        <i class="fa-solid fa-circle-plus"></i>
                    </div>
                    <div class="cart_quantity other_header">
                        <span>${item.productsInCart * item.price},00 €</span>
                    </div>
                </div>`;

                mobileProductWrapper.innerHTML += `
                <div class="cart_product_container">
                    <div class="product_title">
                        <span>${item.title}</span>
                    </div>
                    <div class="product_info">
                        <div>
                            <div class="cart_product">
                            <img src="${item.image}" alt="image du produit">
                        </div>
                        <div class="cart_price">
                            <span>Prix: ${item.price},00 € </span>
                            <span>Total: ${item.productsInCart * item.price},00 €</span>
                        </div>
                        <div class="cart_qty">
                            <div>
                                <i class="fa-solid fa-circle-minus"></i>
                                <span>${item.productsInCart}</span>
                                <i class="fa-solid fa-circle-plus"></i>
                            </div>
                            <button class="delete_item"><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>
                </div>`;
            })
            productWrapper.innerHTML += `
            <div class="cart_total">
                <span class="other_header">Prix Total:</span>
                <span class="other_header">${total},00 €</span>
            </div>
            <div class="cart_btn">
                <button>Commander</button>
            </div>
            `;

            mobileProductWrapper.innerHTML += `
            <div class="cart_total">
                <div>
                    <span class="total_price">Prix Total: </span>
                    <span class="total_price">${total},00 €</span>
                </div>
            </div>
            <div class="cart_btn">
                <button>Commander</button>
            </div>
            `;
        }
    }
    displayCart();
 });

