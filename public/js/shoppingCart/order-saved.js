
// clear local storage after an order is send and saved 
let order_message_succeed = document.getElementById('order_succeed')
//console.log('ord saved')
if(order_message_succeed){
    if(order_message_succeed.textContent){
        //console.log('order saved')
        window.localStorage.clear()
        document.querySelector('.productsQty').textContent = '';
        document.querySelector('.mobile_productsQty').textContent = '';
        window.setTimeout(() => {
           window.location.assign('/');
        }, 3000)
    }
}


