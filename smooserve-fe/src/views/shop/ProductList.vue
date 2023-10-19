<script>
import NavBar from "../../components/NavBar.vue";

export default {
    data() {
        return {
            showingTooltip: false,
            tooltipText: '',
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
                    showTooltip: false,
                    tooltipText: '',
                },
                {
                    id: 2,
                    name: 'Waterbottle',
                    href: '#',
                    price: '$25',
                    imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ7Pc6dUzwCP0Ec5o5AHkvaD8f99inu_ffeVgiE5uq3tb0o_vABlR9ML5izhDcYrQ5cDc&usqp=CAU",
                    imageAlt: 'A metal, insulated waterbottle',
                    quantity: 0,
                    showTooltip: false,
                    tooltipText: '',
                },
                {
                    id: 3,
                    name: 'Focus Paper Refill',
                    href: '#',
                    price: '$89',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
                    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
                    quantity: 0,
                    showTooltip: false,
                    tooltipText: '',
                },
                {
                    id: 4,
                    name: 'Machined Mechanical Pencil',
                    href: '#',
                    price: '$35',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
                    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
                    quantity: 0,
                    showTooltip: false,
                    tooltipText: '',
                },
                {
                    id: 4,
                    name: 'Machined Mechanical Pencil',
                    href: '#',
                    price: '$35',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
                    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
                    quantity: 0,
                    tooltipText: '',
                },
                {
                    id: 4,
                    name: 'Machined Mechanical Pencil',
                    href: '#',
                    price: '$35',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
                    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
                    quantity: 0,
                    showTooltip: false,
                    tooltipText: '',
                },
                {
                    id: 4,
                    name: 'Machined Mechanical Pencil',
                    href: '#',
                    price: '$35',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
                    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
                    quantity: 0,
                    showTooltip: false,
                    tooltipText: '',
                },
                {
                    id: 4,
                    name: 'Machined Mechanical Pencil',
                    href: '#',
                    price: '$35',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
                    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
                    quantity: 0,
                    showTooltip: false,
                    tooltipText: '',
                },
                {
                    id: 4,
                    name: 'Machined Mechanical Pencil',
                    href: '#',
                    price: '$35',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
                    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
                    quantity: 0,
                    showTooltip: false,
                    tooltipText: '',
                },
                {
                    id: 4,
                    name: 'Machined Mechanical Pencil',
                    href: '#',
                    price: '$35',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
                    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
                    quantity: 0,
                    showTooltip: false,
                    tooltipText: '',
                },
                // M
                // More products...
            ],
            cart: [],
        };
    },
    methods: {
        addToCart(product) {
            if (product.quantity === undefined) {
                this.$set(product, 'quantity', 1);
            } else {
                product.quantity++;
            }
            this.cart.push(product);
        },
        showTooltip(product) {
            this.showingTooltip = true;
            this.tooltipText = product.imageAlt;
        },
    },
    computed: {
        totalCartItems() {
            return this.cart.reduce((total, product) => total + product.quantity, 0);
        },
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
        <!-- Image with overlay -->
        <div class="bg-img">
            <img src="https://orientation.smu.edu.sg/sites/vivace.smu.edu.sg/files/styles/coverphoto/public/vivace/coverphotos/Verts%20Banner.jpeg?itok=HWSA3IuM"
                alt="Jumbotron Image" class="w-full h-auto" />
        </div>
        <div class="bg-text">
            <h1 class="text-5xl font-serif mb-4">Smooserve Shop</h1>
            <p class="text-lg font-italic">Support your favorite CSP's today by purchasing merchandise</p>
        </div>
    </div>

    <div class="container">
        <div class="row justify-content-center">
                <div class="col-md-3 mb-4" v-for="product in products" :key="product.id" >
                    <div class="p-card">
                        <div class="overflow-hidden rounded-lg bg-gray-200 product-image"
                            @mouseenter="showTooltip(product)">
                            <img :src="product.imageSrc" :alt="product.imageAlt" class="card-image" />
                        </div>
                        <div class="p-card-title mt-4 text-sm text-gray-700">{{ product.name }}</div>
                        <div class="p-card-subtitle mt-1 text-lg font-medium text-gray-900">{{ product.price }}</div>
                        <div class="p-card-body">
                            <button @click="addToCart(product)" class="p-button p-button-info p-button-raised">
                                Add to Cart
                            </button>
                        </div>
                        <div class="tooltip" v-if="showingTooltip">
                            <p class="text-lg text-gray-300">{{ tooltipText }}</p>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>
  

  
<style scoped>
/* Add your custom styles here */

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
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
    margin: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
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
</style>
  