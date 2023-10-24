<script>
// nav and footer
import NavBar from "../../components/NavBar.vue";
import Footer from "../../components/Footer.vue";
// import ScrollTop from 'primevue/scrolltop';

export default {
    data() {
        return {

            visible: false,

            //products- dummy data
            products: [
                {
                    id: 1,
                    name: 'Name Tent',
                    href: '#',
                    price: '$1',
                    imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcdSa1as4Ctoa_HYDb0su-am9aBmKTO92gYrymCRPpBAy_DYoaDM0N_Y8MnCknKJcWRXs&usqp=CAU',
                    CSPName: 'CSP1',
                    imageAlt: 'A cute and vibrant name tent design',
                    quantity: 0,

                },
                {
                    id: 2,
                    name: 'Waterbottle',
                    href: '#',
                    price: '$25',
                    imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ7Pc6dUzwCP0Ec5o5AHkvaD8f99inu_ffeVgiE5uq3tb0o_vABlR9ML5izhDcYrQ5cDc&usqp=CAU",
                    imageAlt: 'A metal, insulated waterbottle',
                    CSPName: 'CSP1',
                    quantity: 0,

                },
                {
                    id: 3,
                    name: 'Focus Paper Refill',
                    href: '#',
                    price: '$89',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
                    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
                    CSPName: 'CSP1',
                    quantity: 0,

                },
                {
                    id: 4,
                    name: 'Machined Mechanical Pencil',
                    href: '#',
                    price: '$35',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
                    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
                    CSPName: 'CSP1',
                    quantity: 0,

                },
                {
                    id: 4,
                    name: 'Machined Mechanical Pencil',
                    href: '#',
                    price: '$35',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
                    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
                    CSPName: 'CSP1',
                    quantity: 0,

                },
                {
                    id: 4,
                    name: 'Machined Mechanical Pencil',
                    href: '#',
                    price: '$35',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
                    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
                    CSPName: 'CSP1',
                    quantity: 0,

                },
                {
                    id: 4,
                    name: 'Machined Mechanical Pencil',
                    href: '#',
                    price: '$35',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
                    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
                    CSPName: 'CSP1',
                    quantity: 0,

                },
                {
                    id: 4,
                    name: 'Machined Mechanical Pencil',
                    href: '#',
                    price: '$35',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
                    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
                    CSPName: 'CSP1',
                    quantity: 0,

                },

            ],
            // array of products(dictionary) that the user adds to cart
            cart: [],
        };
    },

    methods: {

        toggleCart() {
            this.visible = !this.visible;
            console.log("Modal opened")
        },
        addToCart(product) {
            const existingProduct = this.cart.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                // if the product is already in the cart, the quantity increases
                this.cart.push(Object.assign({}, product, { quantity: 1 }));
            }
            this.$emit("item-added-to-cart", product);
        },
        removeFromCart(index) {
            this.cart.splice(index, 1);

        },
        showCartModal() {


            // Optionally, you can add an event listener to detect outside clicks
            document.addEventListener('click', this.closeCartModalOnOutsideClick);
            console.log("Show Cart Modal Ended");
        },

        closeCartModalOnOutsideClick(event) {
            // Check if the click event occurred outside of the modal
            const modalElement = document.getElementById('cartModal');
            if (modalElement && !modalElement.contains(event.target)) {
                // Update the component's data property to hide the modal
                this.showCart = false;

                // Remove the event listener to stop listening for clicks outside the modal
                document.removeEventListener('click', this.closeCartModalOnOutsideClick);
            }

        },
        incrementQuantity(product, index) {
            // Increment the quantity of the selected product in the cart
            product.quantity++;
        },
        decrementQuantity(product, index) {
            // Decrement the quantity of the selected product in the cart
            if (product.quantity > 1) {
                product.quantity--;
            }
        },
    },
    computed: {
        totalCartItems() {
            return this.cart.reduce((accumulator, item) => {
                return accumulator + item.quantity;
            }, 0);
        },
        totalCartPrice() {
            return this.cart.reduce((total, item) => {
                // Calculate the total price of each item (price * quantity)
                const itemPrice = parseFloat(item.price.slice(1)); // Convert price from string to number
                const totalPriceForItem = itemPrice * item.quantity;

                // Add the total price for this item to the running total
                return total + totalPriceForItem;
            }, 0);
        },
    },
    components: {
        NavBar,
        Footer,
    },
};
</script>

<template>
    <div class="container-fluid">
        <NavBar :cart-items="totalCartItems" @toggle-cart="toggleCart" />
        <div class="bg-img relative">
            <img src="https://orientation.smu.edu.sg/sites/vivace.smu.edu.sg/files/styles/coverphoto/public/vivace/coverphotos/Verts%20Banner.jpeg?itok=HWSA3IuM"
                alt="Jumbotron Image" class="w-full h-auto" />
            <div
                class="bg-text flex flex-column justify-center items-center text-center absolute top-0 left-0 right-0 bottom-0">
                <h1 class="text-5xl mb-4 font-bold text-white"
                    style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">Smooserve Shop</h1>
                <p class="text-lg font-italic text-white"
                    style="position: absolute; top: 60%; left: 50%; transform: translate(-50%, -50%);">Support your
                    favourite
                    CSP's today by purchasing merchandise</p>
            </div>
        </div>
    </div>
    <div class="container">
        <!-- Badge and Cart Dialog -->
        <i v-badge.danger="totalCartItems" icon="p-overlay-badge" style="font-size: 2.5rem">
            <Button icon="pi pi-shopping-cart" style="font-size:3rem" @click="toggleCart" />
        </i>

        <Dialog v-model:visible="visible" modal header="&nbsp     Cart" :style="{ width: '50vw' }"
            :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
            <!-- Content for the Cart Dialog -->
            <div class="cart-dialog-content">
                <div v-for="(product, index) in cart" :key="product.id">
                    <div class="product-details">
                        <div class="d-flex justify-content-between align-items-center">
                            <!-- Product info -->
                            <div>
                                <p>{{ product.name }}</p>
                                <p>{{ product.price }}</p>
                            </div>

                            <!-- Quantity adjustment buttons -->
                            <div class="d-flex align-items-center quantity-box">
                                <!-- Minus quantity -->
                                <Button icon="pi pi-minus quantity-box" @click="decrementQuantity(product, index)" />
                                <!-- Quantity display -->
                                <div class="quantity-display">
                                    <p>{{ product.quantity }}</p>
                                </div>
                                <!-- Plus quantity -->
                                <Button icon="pi pi-plus quantity-box" @click="incrementQuantity(product, index)" />
                            </div>

                            <!-- Remove button -->
                            <Button icon="pi pi-trash" @click="removeFromCart(index)" />
                        </div>
                    </div>
                    <hr>
                </div>
                <div class="d-flex justify-content-between">
                    <p>&nbsp Total items in cart: {{ totalCartItems }}</p>
                    <p>&nbsp Total price :${{ totalCartPrice }}</p>
                    <Button icon="pi pi-arrow-right" label="&nbsp Checkout &nbsp" severity="info" rounded />
                </div>
            </div>
        </Dialog>

        <!-- Product Cards -->
        <div class="row justify-content-center">
            <div class="col-md-3 mb-4" v-for="product in products" :key="product.id">
                <div class="p-card">
                    <div class="overflow-hidden rounded-lg bg-gray-200 product-image">
                        <img :src="product.imageSrc" :alt="product.imageAlt" class="card-image" />
                    </div>
                    <div class="p-card-title mt-4 text-sm text-gray-700">{{ product.name }}</div>
                    <div class="p-card-subtitle mt-1 text-lg font-medium text-gray-900">{{ product.price }}</div>
                    <div class="p-card-subtitle mt-1 text-lg font-medium" style="color: #8c8a85">{{ product.CSPName }}</div>
                    <div class="p-card-body">
                        <i class="pi pi-cart-plus">
                            <button @click="addToCart(product)" class="p-button p-button-info p-button-raised"
                                style="font-family:Arial, Helvetica, sans-serif; color:blue ">&nbspAdd to Cart</button>
                        </i>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Footer -->
    <Footer />
</template>
  
<style scoped>

.quantity-box {
    padding: 4px 8px;
    /* Adjust the padding as needed */
    border: 1px solid #ccc;
    /* Border style */
    border-radius: 4px;
    /* Rounded corners */
}

.bg-img {
    position: relative;
    display: flex;
}

.bg-text {
    position: absolute;
    top: 0;
    right: 50%;
    color: white;
    font-weight: bold;
}

.p-card {
    width: 300px;
    height: 350px;
    /* Increase the card height to accommodate larger images */
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
    margin: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
}

.product-details {
    border: 1px solid #ccc;
    /* Add a border around the container */
    padding: 8px;
    /* Add padding for spacing */
    margin: 8px 0;
    /* Add margin to separate each product */
    border-radius: 5px;
    /* Rounded corners */
}

.card-image {
    width: 100%;
    /* Set the image width to 100% of its container */
    height: 200px;
    /* Set the image height as per your preference */
    object-fit: contain;
    /* Keep the image centered and fit the box */
}

.p-card-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 12px;
}

.p-card-subtitle {
    font-size: 1rem;
    color: #555;
    margin: 0 12px 12px 12px;
}

.p-card-body {
    margin: 0 12px 12px 12px;
}

/* Style for the "Add to Cart" button */
.p-button {
    background-color: transparent;
    /* Remove the background color */
    border: none;
    /* Remove the button border */
    color: #3490dc;
    /* Set the text color (you can choose your desired color) */
    cursor: pointer;
    font-size: 1rem;
    margin: 0;
    padding: 0;
}

.p-button:hover {
    text-decoration: underline;
    /* Add underline on hover (optional) */
}

cart-preview {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 10px;
    z-index: 1;
}

.cart-items {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.cart-items p {
    margin: 5px 0;
}
</style>