<script>
// nav and footer
import NavBar from "../../components/NavBar.vue";
import Footer from "../../components/Footer.vue";
// import ScrollTop from 'primevue/scrolltop';

export default {
    data() {
        return {
            showCart: false,


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

                // M
                // More products...
            ],
            cart: [],
        };
    },
    
        methods: {
            toggleCart() {
                this.showCart = !this.showCart;
            },
            addToCart(product) {
                if (product.quantity === undefined) {
                    this.$set(product, "quantity", 1);
                } else {
                    product.quantity++;
                }
                this.cart.push(product);
                this.$emit("item-added-to-cart", product);
            },
            removeFromCart(productId) {
                const index = this.cart.findIndex((item) => item.id === productId);
                if (index !== -1) {
                    this.cart.splice(index, 1);
                }
            },
        },
        computed: {
            totalCartItems() {
                return this.cart.reduce((total, product) => total + product.quantity, 0);
            },
        },
        components: {
            NavBar,
            Footer,
            // ScrollTop,
        },

        props: {
            cardTitle: String,
            cardSubtitle: String,
            cardDescription: String,
        },
        };
    
</script>

<template>
    <div class="container-fluid">
        <!-- adding a cart to the nav bar -->
        <NavBar :cart-items="totalCartItems" @toggle-cart="toggleCart" />
        <!-- Image with overlay -->
        <div class="bg-img relative">
            <img src="https://orientation.smu.edu.sg/sites/vivace.smu.edu.sg/files/styles/coverphoto/public/vivace/coverphotos/Verts%20Banner.jpeg?itok=HWSA3IuM"
                alt="Jumbotron Image" class="w-full h-auto" />
            <div
                class="bg-text flex flex-column justify-center items-center text-center absolute top-0 left-0 right-0 bottom-0">
                <h1 class="text-5xl mb-4 font-bold text-white"
                    style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">Smooserve Shop</h1>
                <p class="text-lg font-italic text-white"
                    style="position: absolute; top: 60%; left: 50%; transform: translate(-50%, -50%);">Support your favorite
                    CSP's today by purchasing merchandise</p>
            </div>
        </div>
    </div>
    <div class="container">
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
                        <button @click="addToCart(product)" class="p-button p-button-info p-button-raised">
                            Add to Cart
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <!-- cart preview -->
    <div class="cart-preview" v-if="showCart">
        <div class="cart-items">
            <div v-for="item in cart" :key="item.id">
                <p>{{ item.name }} - {{ item.price }}</p>
                <button @click="removeFromCart(item.id)">Remove</button>
            </div>
        </div>
        <p>Total items in cart: {{ totalCartItems }}</p>
    </div>
    <!-- scroll to the top  -->
    <ScrollTop :target="`.container-fluid`" :threshold="100" class="custom-scrolltop" icon="pi pi-arrow-up" />
    <Footer />
</template>
  

  
<style scoped>
/* @import 'primevue/resources/primevue.min.css';
@import 'primeicons/primeicons.css'; */

/* Add your custom styles here */
/* ::v-deep(.custom-scrolltop) {
    width: 2rem;
    height: 2rem;
    border-radius: 4px;
    background-color: var(--primary-color);
}

::v-deep(.custom-scrolltop:hover) {
    background-color: var(--primary-color);
}

::v-deep(.custom-scrolltop .p-scrolltop-icon) {
    font-size: 1rem;
    color: var(--primary-color-text); */
/* } */

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
