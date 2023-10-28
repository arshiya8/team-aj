<script>
// nav and footer
import NavBar from "../../components/NavBar.vue";
import Footer from "../../components/Footer.vue";
// import ScrollTop from 'primevue/scrolltop';

export default {
    data() {
        return {

            Cartvisible: false,
            wishlist: [],
            showWishlist: false,
            success: false,
            isClicked: false,
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
            this.Cartvisible = !this.Cartvisible;
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


        closeCartModalOnOutsideClick(event) {
            // Check if the click event occurred outside of the modal
            const modalElement = document.getElementById('cartModal');
            if (modalElement && !modalElement.contains(event.target)) {
                // Update the component's data property to hide the modal
                this.Cartvisible = false;

                // Remove the event listener to stop listening for clicks outside the modal
                document.removeEventListener('click', this.closeCartModalOnOutsideClick);
            }

        },
        closeWishlistModalOnOutsideClick(event) {
            // Check if the click event occurred outside of the modal
            const modalElement = document.getElementById('wishlistModal');
            if (modalElement && !modalElement.contains(event.target)) {
                // Update the component's data property to hide the modal
                this.showWishlist = false;

                // Remove the event listener to stop listening for clicks outside the modal
                document.removeEventListener('click', this.closeWishlistModalOnOutsideClick);
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
        toggleWishlist(product) {
            // Add product to wishlist logic here
            this.addToWishlist(product);

            // Toggle the isClicked property
            this.isClicked = !this.isClicked;
        },
        addToWishlist(product) {
            // Check if the product is already in the wishlist
            const existingProduct = this.wishlist.find(item => item.id === product.id);
            if (!existingProduct) {
                this.wishlist.push(product);
            }
        },
        toggleWishlistModal() {
            this.showWishlist = !this.showWishlist;
            console.log("Modalll opened")
        },
        removeFromWishlist(index) {
            this.wishlist.splice(index, 1);
        },
        // Method to show the success notification


        // Method to add the item to the cart and show success notification
        addToCartAndShowSuccess(item) {
            this.addToCart(item);
            this.showSuccess();
            this.removeFromWishlist(this.wishlist.indexOf(item));
        },
        showSuccess() {
            this.$toast.add({ severity: 'success', summary: 'Added to Cart', detail: 'Message Content', life: 3000 });
        },
        addAllToCart() {
            for (const item of this.wishlist) {
                // Check if the item is already in the cart
                const existingProduct = this.cart.find(cartItem => cartItem.id === item.id);
                if (existingProduct) {
                    existingProduct.quantity++;
                } else {
                    // If the item is not in the cart, add it
                    this.cart.push(Object.assign({}, item, { quantity: 1 }));
                }
            }

            // Clear the wishlist after adding items to the cart
            this.wishlist = [];

            // Optionally, you can show a success notification here
            this.showSuccess();

            // Close the wishlist modal
            this.showWishlist = false;
        }
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
        <NavBar />
        <div class="bg-img relative">
            <img src="https://orientation.smu.edu.sg/sites/vivace.smu.edu.sg/files/styles/coverphoto/public/vivace/coverphotos/Verts%20Banner.jpeg?itok=HWSA3IuM"
                alt="Jumbotron Image" class="w-full h-auto" />
            <div
                class="bg-text flex flex-column justify-center items-center text-center absolute top-0 left-0 right-0 bottom-0">
                <div class="title-container mt-4">
                    <h1 class="text-5xl mb-4 font-bold text-white">Smooserve Shop</h1>
                </div>
                <div class="subtitle-container">
                    <p class="text-lg font-italic text-white">Support your favourite CSP's today by purchasing merchandise
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <!-- Badge and Cart Dialog -->
        <i v-badge.danger="totalCartItems" icon="p-overlay-badge" style="font-size: 2.5rem">
            <Button icon="pi pi-shopping-cart" style="font-size:3rem" @click="toggleCart" />
        </i>
        <!-- wishlist button -->
        <Button label="&nbsp Wishlist &nbsp" icon="pi pi-heart" iconPos="right" @click="toggleWishlistModal" />


        <Dialog v-model:visible="showWishlist" modal header="&nbsp Wishlist" :style="{ width: '50vw' }"
            :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
            <!-- Content for the Wishlist Dialog -->
            <div class="wishlist-dialog-content">
                <div v-for="(item, index) in wishlist" :key="item.id">
                    <div class="product-details">
                        <div class="d-flex justify-content-between align-items-center">
                            <!-- product image  -->
                            <div>
                                <img :src="item.imageSrc" :alt="item.imageAlt" class="product-image"
                                    style="width: 225px; height: 225px;" />
                            </div>
                            <!-- Product info -->
                            <div>

                                <p>{{ item.name }}</p>
                                <p>{{ item.price }}</p>
                            </div>

                            <!-- Remove button -->
                            <Button icon="pi pi-trash" @click="removeFromWishlist(index)" />
                            <!-- add to cart -->
                            <Button label="Add To Cart" @click="addToCartAndShowSuccess(item)" />
                        </div>
                    </div>
                    <hr>
                </div>
                <div class="d-flex justify-content-between">
                    <p>&nbsp Total items in wishlist: {{ wishlist.length }}</p>
                    <p>
                        <Button label="Add All to Cart &nbsp" icon="pi pi-cart-plus " iconPos="right"
                            style="margin-right: 10px;" @click="addAllToCart" />
                    </p>
                </div>
            </div>
        </Dialog>
        <!-- cart modal -->
        <Dialog v-model:visible="Cartvisible" modal header="&nbsp     Cart" :style="{ width: '50vw' }"
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
                    <div class="wishlist-button">
                        <button @click="toggleWishlist(product)" :class="{ 'clicked': isClicked }">
                            <i class="pi pi-heart-fill"></i>
                        </button>
                    </div>

                    <div class="overflow-hidden rounded-lg bg-gray-200 product-image">
                        <img :src="product.imageSrc" :alt="product.imageAlt" class="card-image" />
                    </div>
                    <div class="p-card-title mt-4 text-sm text-gray-700">{{ product.name }}</div>
                    <div class="p-card-subtitle mt-1 text-lg font-medium text-gray-900">{{ product.price }}</div>
                    <div class="p-card-subtitle mt-1 text-lg font-medium" style="color: #8c8a85">{{ product.CSPName }}
                    </div>
                    <div class="p-card-body">
                        <i class="pi pi-cart-plus">
                            <button @click="addToCart(product)" class="p-button p-button-info p-button-raised"
                                style="font-family: Arial, Helvetica, sans-serif; color: blue ">&nbspAdd to
                                Cart</button>
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
.wishlist-button {

    
    /* Adjust the top margin as needed */

    /* Adjust the right margin as needed */
    position: absolute;
    right: 5px;
}



.title-container {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
}

.subtitle-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
}

.quantity-display {
    margin-top: 10px;
    /* Adjust the value as needed */
}

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
    position: relative;
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
.clicked {
  color: red;
}
</style>
