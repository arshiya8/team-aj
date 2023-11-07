<script>
import Navbar from '@/components/NavBar.vue';
import CaroPics from '@/components/CaroPics.vue';
import Footer from '@/components/Footer.vue';
import { ref, watch, onMounted } from 'vue';
import { loadStripe } from "@stripe/stripe-js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import axios from "axios";
import { useToast } from "primevue/usetoast";

export default {
    components: {
        Navbar,
        CaroPics,
        Footer
    },
    setup() {
        const visible = ref(false);

        const cart = ref([]);
        const totalPrice = ref(null);
        let stripe = null;
        let loading = ref(true);
        const auth = getAuth();
        let studentId = null;
        const csps = ref([]);
        const products = ref([])
        const loggedIn = ref(false);
        const toast = useToast();

        onMounted(async () => {
            // const ELEMENT_TYPE = "card";

            stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);
            axios
                .get("https://smooserve-be.vercel.app/api/csps")
                .then((response) => {
                    csps.value = response.data;
                    console.log(csps.value);
                    csps.value.forEach((csp) => {
                        if (csp.merchItem.name != "") {
                            products.value.push(csp.merchItem);
                        }
                    });
                    console.log(products.value);
                })
                .catch((error) => {
                    console.log(error);
                    toast.add({
                        severity: "info",
                        summary: "Info",
                        detail: error,
                        life: 3000,
                    });
                });
            // elements = stripe.elements();
            // const element = elements.create(ELEMENT_TYPE, style);
            // element.mount("#stripe-element-mount-point");
            loading.value = false;
        });
        function redirect() {
            stripe.redirectToCheckout({
                successUrl: "https://smooserve-fe.vercel.app/#/success",
                cancelUrl: "https://smooserve-fe.vercel.app/#/cancel",
                lineItems: cart.value.map((item) => {
                    return {
                        price: item.stripePrice,
                        quantity: item.quantity,
                    };
                }),
                mode: "payment"
            })
        }

        onAuthStateChanged(auth, async (student) => {
            if (student) {
                try {
                    const querySnapshot = await getDocs(collection(db, "students"));
                    querySnapshot.forEach((doc) => {
                        const studentEmail = doc.data().email;
                        if (studentEmail === student.email) {
                            studentId = doc.id;
                            cart.value = doc.data().cart || [];
                            loggedIn.value = true;
                        }
                    });

                    // If studentId is still null, no matching email was found in the collection
                    if (studentId === null) {
                        console.log("No matching id found in the database.");

                    } else {
                        console.log("Student ID found:", studentId);
                        loggedIn.value = true;
                    }
                } catch (error) {
                    console.error(error);
                }
            } else {
                studentId = null;
                cart.value = []; // Clear favorites for non-authenticated users
                loggedIn.value = false;

            }
        });
        const checkCart = () => {
            if (loggedIn.value) {
                visible.value = true
            } else {
                toast.add({
                    severity: "info",
                    summary: "Info",
                    detail: "Please login first",
                    life: 3000,
                });
            }
        }
        // const toggleHeartColor = (product) => {
        //     if (auth.currentUser) {
        //         const index = favProducts.value.findIndex((favProduct) => favProduct.name === product.name);
        //         if (index === -1) {
        //             // CSP is not in favorites, add it
        //             favProducts.value.push(product);
        //         } else {
        //             // CSP is already in favorites, remove it
        //             favProducts.value.splice(index, 1);
        //         }
        //         // Update the student's favorite Products in the database
        //         updateStudent(favProducts.value);
        //         // Update localStorage with the updated favorite CSPs list
        //         localStorage.setItem('favoriteProducts', JSON.stringify(favProducts.value));
        //     } else {
        //         console.error('User is not authenticated.');
        //         alert("Sign in first!");
        //     }
        // };

        const updateStudent = async (updatedProducts) => {
            try {
                // Ensure userId is not null before making the API request

                if (studentId != null) {
                    const response = await axios.put(
                        `https://smooserve-be.vercel.app/api/student/${studentId}`,
                        {
                            cart: updatedProducts
                        }
                    );
                    console.log(response.data);
                } else {
                    console.error("User is not authenticated.");
                    toast.add({
                        severity: "info",
                        summary: "Info",
                        detail: "Please login first",
                        life: 3000,
                    });
                }
            } catch (error) {
                console.error("Error updating to cart:", error);

            }
        };

        // const isProductFavorite = (product) => {
        //     return favProducts.value.some((favProduct) => favProduct.name === product.name);
        // };

        const addToCart = (product) => {

            if (!loggedIn.value) {
                toast.add({
                    severity: "info",
                    summary: "Info",
                    detail: "Please login first",
                    life: 3000,
                });
            } else {
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
                // Update the cart in the database
                updateStudent(cart.value);
                // Optionally, you can save the cart in local storage for persistence
                localStorage.setItem('cart', JSON.stringify(cart.value));
            }

        };
        console.log(cart)

        const increaseItem = (product) => {
            const index = cart.value.findIndex((item) => item.name === product.name);
            if (index !== -1) {
                cart.value[index].quantity++;
                cart.value[index].quantityPrice = cart.value[index].quantity * cart.value[index].price;
                updateStudent(cart.value);
                localStorage.setItem('cart', JSON.stringify(cart.value));
            } else {
                // If the product is not in the cart, add it with a quantity of 1 and calculate quantityPrice
                const newItem = { ...product, quantity: 1, quantityPrice: product.price };
                cart.value.push(newItem);
                updateStudent(cart.value);
                localStorage.setItem('cart', JSON.stringify(cart.value));
            }
        };
        const decreaseItem = (product) => {
            const index = cart.value.findIndex((item) => item.name === product.name);
            if (index !== -1) {
                if (cart.value[index].quantity > 1) {
                    cart.value[index].quantity--;
                    cart.value[index].quantityPrice = cart.value[index].quantity * cart.value[index].price;
                    updateStudent(cart.value);
                    localStorage.setItem('cart', JSON.stringify(cart.value));
                } else {
                    cart.value.splice(index, 1);
                    updateStudent(cart.value);
                    localStorage.setItem('cart', JSON.stringify(cart.value));
                }
            }

        };

        const removeItem = (product) => {
            const index = cart.value.findIndex((item) => item.name === product.name);
            if (index !== -1) {
                cart.value.splice(index, 1);
                updateStudent(cart.value);
                localStorage.setItem('cart', JSON.stringify(cart.value));
            }
        }


        watch(cart, () => {
            totalPrice.value = cart.value.reduce((total, item) => total + item.quantityPrice, 0);
        }, { deep: true });

        // const products = [
        //     {
        //         name: 'Name Tent',
        //         price: 2,
        //         stripePrice: 'price_1O8OHbAlv9o8wDQ6gBNPnCuD',
        //         pic: '/layout/shopImg/cap.jpg',
        //         quantity: 0,
        //         quantityPrice: 0
        //     },
        //     {
        //         name: 'PNK T-shirt',
        //         price: 15,
        //         stripePrice: 'price_1O8OIRAlv9o8wDQ6clLitvqh',
        //         pic: '/layout/shopImg/shirt1.jpg',
        //         quantity: 0,
        //         quantityPrice: 0
        //     },
        //     {
        //         name: 'Capybara T shirt',
        //         price: 15,
        //         stripePrice: 'price_1O8OJ5Alv9o8wDQ6qt03SQIZ',
        //         pic: '/layout/shopImg/capy.jpg',
        //         quantity: 0,
        //         quantityPrice: 0
        //     },
        //     {
        //         name: 'Tote bag',
        //         price: 12,
        //         stripePrice: 'price_1O8OEcAlv9o8wDQ6jyoCfbXf',
        //         pic: '/layout/shopImg/tote.jpg',
        //         quantity: 0,
        //         quantityPrice: 0
        //     },
        //     {
        //         name: 'Handmade Terranium',
        //         price: 12,
        //         stripePrice: 'price_1O8OFtAlv9o8wDQ6sLp8Hrs1',
        //         pic: '/layout/shopImg/terranium.jpg',
        //         quantity: 0,
        //         quantityPrice: 0
        //     },
        //     {
        //         name: 'Ankle Socks',
        //         price: 4,
        //         stripePrice: 'price_1O8OGZAlv9o8wDQ6UE6OfrS8',
        //         pic: '/layout/shopImg/socks.jpg',
        //         quantity: 0,
        //         quantityPrice: 0
        //     },
        // ]
        return {
            products,
            // isProductFavorite,
            // toggleHeartColor,
            addToCart,
            visible,
            cart,
            increaseItem,
            decreaseItem,
            removeItem,
            totalPrice,
            redirect,
            toast,
            checkCart

        }
    }
}
</script>


<template>
    <Toast></Toast>
    <Navbar />
    <CaroPics />
    <div class="row pb-3">
        <h2 style="color:black; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: bold;
          text-align: center; margin-top: 30px; font-size: 2rem">
            WHAT'S NEW AT SMOOSHOP!</h2>
    </div>

    <!-- <div class="grid px-5 align-items-center justify-content-between">
        <div class="flex items-center ml-auto">
            <Button style="margin-bottom: 5px" @click="checkCart">
                Check cart <i class="px-2 pi pi-shopping-cart"></i>
            </Button>
        </div>
    </div> -->

    <Dialog v-model:visible="visible" modal header="Cart Items" :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <DataView :value="cart">
            <template #list="slotProps">
                <div class="col-12">
                    <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                        <img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                            :src="`${slotProps.data.merchPicture}`" :alt="slotProps.data.name" />
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

 
        <div >
            <Button class="mb-4" @click="checkCart">
                Check cart <i class="px-2 pi pi-shopping-cart"></i>
            </Button>
       

        <div class="grid mx-4">
            <div v-for="product in products"
                class="flex align-items-center justify-content-center mb-4 sm:col-12 md:col-6 lg:col-4">
                <div class="p-2 border-round-xl"
                    style="background: var(--style-cards-fancy-bg); border: 1px solid rgba(255, 255, 255, 0.1); backgroundBlendMode: normal, color-dodge; width: 300px;background-color: black;">
                    <div class="content border-round-sm">
                        <div class="content-image bg-cover bg-no-repeat bg-center relative" style="height: 244px; ">
                            <img :src="product.merchPicture" style="width: 14em; margin-left: 30px;" />
                            <!-- <div class="heart-container">
                            <i class="fas fa-heart clickable" :class="{ 'heart-red': isProductFavorite(product) }"
                                @click="toggleHeartColor(product)"></i>
                        </div> -->
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
                                    <span class="font-small text-white white-space-nowrap"> Price: {{ product.price
                                    }}</span>
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
    </div>
    <Footer />
</template>


<style>
.p-galleria .p-galleria-indicators .p-galleria-indicator.p-highlight button {
    background-color: #0053a6;
}

/* .grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    /* Center the cards horizontally 
}

.grid-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.card-container {
  flex: 0 0 calc(100% - 20px); /* Adjust the width as needed */
  margin: 10px; /* Add margin for spacing between cards 
}

.button-container {
  display: flex;
  justify-content: center;
  margin: 10px; /* Adjust margin as needed 
}

@media (min-width: 576px) {
  .card-container {
    flex: 0 0 calc(50% - 20px); /* 2 cards in a row at medium breakpoint 
  }
}

@media (min-width: 992px) {
  .card-container {
    flex: 0 0 calc(33.33% - 20px); /* 3 cards in a row for larger screens 
  }
} */

</style>