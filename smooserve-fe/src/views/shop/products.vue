<template>
    <Navbar />
    <CaroPics />
    <div class="row pb-3">
        <h2 style="color:black; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: bold;
          text-align: center; margin-top: 30px; font-size: 2rem">
            WHAT'S NEW AT SMOOSHOP!</h2>
    </div>
    <Button style="margin-bottom: 5px" @click="visible = true">Check cart <i class="px-2 pi pi-shopping-cart"></i> </Button>

    <Dialog v-model:visible="visible" modal header="Cart Items" :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <DataView :value="cart">
            <template #list="slotProps">
                <div class="col-12">
                    <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                        <img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                            :src="`${slotProps.data.pic}`" :alt="slotProps.data.name" />
                        <div
                            class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div class="text-2xl font-bold text-900">{{ slotProps.data.name }}</div>
                                <div class="flex align-items-center gap-3">
                                    <span class="flex align-items-center gap-2">
                                        <span class="text-xl font-semibold">Price: <i class="pi pi-tag px-2"></i>${{
                                            slotProps.data.price }}</span>
                                        <span class="font-semibold"></span>
                                    </span>
                                </div>
                                <div class="flex align-items-center gap-3">
                                    <span class="text-xl font-semibold">Quantity: <i class="pi pi-inbox px-2"></i>{{
                                        slotProps.data.quantity }}
                                        <span class="font-semibold"></span>
                                    </span>
                                </div>
                            </div>
                            <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <span class="text-2xl font-semibold">${{ slotProps.data.quantityPrice }}</span>
                                <div class="flex gap-2"> <!-- Use a flex container to position buttons side by side -->
                                    <Button icon="pi pi-trash" rounded @click="removeItem(slotProps.data)"></Button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </template>
        </DataView>
        <div class="text-2xl font-bold text-900">Total Price: {{ totalPrice }}</div>
        <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
            <div class="flex gap-2"> <!-- Use a flex container to position buttons side by side -->
                <Button label="Proceed to checkout" @click="redirect"></Button>
            </div>
        </div>

    </Dialog>
    <!-- favourites clickable heart -->
    <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
    </div>


    <div class="grid">
        <div v-for="product in products" class="flex align-items-center justify-content-center sm:col-12 md:col-6 lg:col-4">
            <div class="p-2 border-round-xl"
                style="background: var(--style-cards-fancy-bg); border: 1px solid rgba(255, 255, 255, 0.1); backgroundBlendMode: normal, color-dodge; width: 300px;background-color: black;">
                <div class="content border-round-sm">
                    <div class="content-image bg-cover bg-no-repeat bg-center relative" style="height: 244px; ">
                        <img :src="product.pic" style="width: 14em; margin-left: 30px;" />
                        <div class="heart-container">
                            <i class="fas fa-heart clickable" :class="{ 'heart-red': isProductFavorite(product) }"
                                @click="toggleHeartColor(product)"></i>
                        </div>
                    </div>
                    <div class="content-info mt-2 border-round-sm bg-white-alpha-10 shadow-1 py-1"
                        style="backdropFilter: blur(27px);">
                        <div class="flex align-items-center justify-content-between py-2 px-3">
                            <span class="font-medium text-white">{{ product.name }}</span>
                            <i class="pi pi-verified text-white"></i>
                        </div>
                        <div class="flex align-items-center justify-content-between py-2 px-3 gap-2">
                            <div class="flex align-items-center gap-2">
                                <i class="pi pi-tag p-mr-2 text-white"></i>
                                <span class="font-small text-white white-space-nowrap"> Price: {{ product.price }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex align-items-center justify-content-center pt-2 gap-2">
                        <button
                            class="p-3 flex align-items-center justify-content-center w-7 gap-2 border-round-sm bg-white-alpha-10 shadow-1 border-none cursor-pointer hover:bg-white-alpha-20 transition-duration-200"
                            style="backdropFilter: blur(27px);" @click="addToCart(product)">
                            <span class="font-medium text-white white-space-nowrap">Add to cart</span>
                            <i class="pi pi-cart-plus text-white"></i>
                        </button>

                        <button
                            class="p-3 flex align-items-center justify-content-center w-7 gap-2 border-round-sm bg-white-alpha-10 shadow-1 border-none cursor-pointer hover:bg-white-alpha-20 transition-duration-200"
                            style="backdropFilter: blur(27px);" rounded @click="decreaseItem(product)"> <i
                                class="pi pi-minus text-white"></i></button>
                        <button
                            class="p-3 flex align-items-center justify-content-center w-7 gap-2 border-round-sm bg-white-alpha-10 shadow-1 border-none cursor-pointer hover:bg-white-alpha-20 transition-duration-200"
                            style="backdropFilter: blur(27px);" rounded @click="increaseItem(product)"> <i
                                class="pi pi-plus text-white"></i></button>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <Footer />
</template>

<script>
import Navbar from '@/components/NavBar.vue';
import CaroPics from '@/components/CaroPics.vue';
import Footer from '@/components/Footer.vue';
import { ref, watch, onMounted } from 'vue';
import { loadStripe } from "@stripe/stripe-js";

export default {
    components: {
        Navbar,
        CaroPics,
        Footer
    },
    setup() {
        const visible = ref(false);
        const favProducts = ref([]);
        const cart = ref([]);
        const totalPrice = ref(null);
        let stripe = null;
        let loading = ref(true);
        let elements = null;
        onMounted(async () => {
            // const ELEMENT_TYPE = "card";

            stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);


            // elements = stripe.elements();
            // const element = elements.create(ELEMENT_TYPE, style);
            // element.mount("#stripe-element-mount-point");
            loading.value = false;
        });
        function redirect() {
            stripe.redirectToCheckout({
                successUrl: "http://localhost:8080/success",
                cancelUrl: "http://localhost:8080/cancel",
                lineItems: cart.value.map((item) => {
                    return {
                        price: item.stripePrice,
                        quantity: item.quantity,
                    };
                }),
                mode: "payment"
            })
        }



        const toggleHeartColor = (product) => {
            //   if (auth.currentUser) {
            const index = favProducts.value.findIndex((favProduct) => favProduct.name === product.name);
            if (index === -1) {
                // CSP is not in favorites, add it
                favProducts.value.push(product);
            } else {
                // CSP is already in favorites, remove it
                favProducts.value.splice(index, 1);
            }
            // Update the student's favorite CSPs in the database
            // updateStudent(favoriteCSPs.value);
            // Update localStorage with the updated favorite CSPs list
            // localStorage.setItem('favoriteCSPs', JSON.stringify(favoriteCSPs.value));
            //   } else {
            //     console.error('User is not authenticated.');
            //     alert("Sign in first!");
            //   }
        };

        const isProductFavorite = (product) => {
            return favProducts.value.some((favProduct) => favProduct.name === product.name);
        };

        const addToCart = (product) => {
            // Check if the product is already in the cart
            const existingProductIndex = cart.value.findIndex((item) => item.name === product.name);

            if (existingProductIndex !== -1) {
                // If the product is already in the cart, increase its quantity
                cart.value[existingProductIndex].quantity++;
                cart.value[existingProductIndex].quantityPrice = cart.value[existingProductIndex].quantity * cart.value[existingProductIndex].price;
            } else {
                // If the product is not in the cart, add it with a quantity of 1
                cart.value.push({ ...product, quantity: 1, quantityPrice: product.price });

            }

            // Optionally, you can save the cart in local storage for persistence
            localStorage.setItem('cart', JSON.stringify(cart.value));
        };
        console.log(cart)

        const increaseItem = (product) => {
            const index = cart.value.findIndex((item) => item.name === product.name);
            if (index !== -1) {
                cart.value[index].quantity++;
                cart.value[index].quantityPrice = cart.value[index].quantity * cart.value[index].price;
            } else {
                // If the product is not in the cart, add it with a quantity of 1 and calculate quantityPrice
                const newItem = { ...product, quantity: 1, quantityPrice: product.price };
                cart.value.push(newItem);
            }
        };
        const decreaseItem = (product) => {
            const index = cart.value.findIndex((item) => item.name === product.name);
            if (index !== -1) {
                if (cart.value[index].quantity > 1) {
                    cart.value[index].quantity--;
                    cart.value[index].quantityPrice = cart.value[index].quantity * cart.value[index].price;
                } else {
                    cart.value.splice(index, 1);
                }
            }

        };

        const removeItem = (product) => {
            const index = cart.value.findIndex((item) => item.name === product.name);
            if (index !== -1) {
                cart.value.splice(index, 1);
            }
        }


        watch(cart, () => {
            totalPrice.value = cart.value.reduce((total, item) => total + item.quantityPrice, 0);
        }, { deep: true });

        const products = [
            {
                name: 'Name Tent',
                price: 2,
                stripePrice: 'price_1O8OHbAlv9o8wDQ6gBNPnCuD',
                pic: '/layout/shopImg/cap.jpg',
                quantity: 0,
                quantityPrice: 0
            },
            {
                name: 'PNK T-shirt',
                price: 15,
                stripePrice: 'price_1O8OIRAlv9o8wDQ6clLitvqh',
                pic: '/layout/shopImg/shirt1.jpg',
                quantity: 0,
                quantityPrice: 0
            },
            {
                name: 'Capybara T shirt',
                price: 15,
                stripePrice: 'price_1O8OJ5Alv9o8wDQ6qt03SQIZ',
                pic: '/layout/shopImg/capy.jpg',
                quantity: 0,
                quantityPrice: 0
            },
            {
                name: 'Tote bag',
                price: 12,
                stripePrice: 'price_1O8OEcAlv9o8wDQ6jyoCfbXf',
                pic: '/layout/shopImg/tote.jpg',
                quantity: 0,
                quantityPrice: 0
            },
            {
                name: 'Handmade Terranium',
                price: 12,
                stripePrice: 'price_1O8OFtAlv9o8wDQ6sLp8Hrs1',
                pic: '/layout/shopImg/terranium.jpg',
                quantity: 0,
                quantityPrice: 0
            },
            {
                name: 'Ankle Socks',
                price: 4,
                stripePrice: 'price_1O8OGZAlv9o8wDQ6UE6OfrS8',
                pic: '/layout/shopImg/socks.jpg',
                quantity: 0,
                quantityPrice: 0
            },
        ]
        return {
            products,
            isProductFavorite,
            toggleHeartColor,
            addToCart,
            visible,
            cart,
            increaseItem,
            decreaseItem,
            removeItem,
            totalPrice,
            redirect

        }
    }


}
</script>

<style>
.heart-container {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 1;
    color: white
}

.heart-red {
    color: red;
}

.clickable {
    cursor: pointer;
}
</style>