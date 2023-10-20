<template>
  <!-- <div class="row justify-content-center m-0">
    <div class="col-md-8 mt-5 mb-5 cardsdetails">
      <div class="card">
        <div class="card-header bg-dark p-3">
          <div class="card-header-flex">
            <button class="btn btn-danger mt-0 btn-sm">
              <i class="fa fa-trash-alt mr-2"></i><span>EmptyCart</span>
            </button>
          </div>
        </div> -->
        <!-- <div class="card-body p-0">
          <div v-if="cartItems.length > 0" class="table-responsive-sm">
            <table class="table cart-table mb-0">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th class="text-right"> <span id="amount" class="amount">Total Amount</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in cartItems" :key="index">
                  Render your table rows based on the cart items -->
                  <!-- <td> </td>
                  <td>{{ item.product }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.price }}</td>
                  <td>{{ item.qty }}</td>
                  <td class="text-right">{{ item.price * item.qty }}</td> Calculate total amount -->
                <!-- </tr>
              </tbody>
            </table>
          </div>  -->
          <!-- <div class="cart-empty">
            <i class="fa fa-shopping-cart"></i>
            <p>Your Cart Is Empty</p>
          </div>
        </div>
      </div>
    </div> -->
  <div> 
    <Button label="Pay with Stripe" @click="makePayment"></Button>
  </div>
</template>
  
<script>
import { loadStripe } from '@stripe/stripe-js';
// const cartItems = [
//   // Your cart items data should be initialized here
//   { product: 'Product 1', name: 'Item Name', price: 10, qty: 1 }
// ]

// const emptyCart = () => {
//   // Your empty cart logic here
//   this.cartItems = []; // Set cartItems to an empty array to clear the cart
// }
// payment integration 
const makePayment = async () => {
  const stripe = await loadStripe("pk_test_51O2xN2Alv9o8wDQ6DHiLFi66uzbUSAzfH7mBVXC6qSd5ovfp6YWf0WWj8vohv8YVwVahLJNRA3zYf5qu64QrvgIW00Q54gVj13");

  const body = {
    products: carts
  }
  const headers = {
    "Content-Type": "application/json"
  }
  const response = await fetch("http://localhost:8080/api/create-checkout-session", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body)
  });

  const session = await response.json();

  const result = stripe.redirectToCheckout({
    sessionId: session.id
  });

  if (result.error) {
    console.log(result.error);
  }
}
</script>
 