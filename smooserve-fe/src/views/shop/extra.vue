<script>
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
};
</script>

<template>
    <div>
      <!-- Jumbotron -->
      <div class="relative py-16">
        <!-- Image with overlay -->
        <div class="relative">
          <img src="https://orientation.smu.edu.sg/sites/vivace.smu.edu.sg/files/styles/coverphoto/public/vivace/coverphotos/Verts%20Banner.jpeg?itok=HWSA3IuM"
            alt="Jumbotron Image" class="w-full h-auto" />
          <div class="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
          <!-- Text in the middle -->
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <h1 style="font-family:'New Century Schoolbook', TeX Gyre Schola, serif;font-size: 50px">Smooserve Shop</h1>
            <p class="text-lg text-gray-300" style="font-style: italic;font-size:18px">Support your favourite CSP's today by purchasing merchandise</p>
          </div>
        </div>
      </div>
  
      <!-- Product List -->
      <div class="container justify-center">
        <h2 class="text-2xl font-semibold">Products</h2>
        <div class="row">
            <div v-for="product in products" :key="product.id" class="group relative">
            <div col-md-4> 
                <div class="overflow-hidden rounded-lg bg-gray-200 product-image"
                 @mouseenter="showTooltip(product)">
              <img :src="product.imageSrc" :alt="product.imageAlt" class="w-full h-full object-cover object-center group-hover:opacity-75" />
            </div>
            <h3 class="mt-4 text-sm text-gray-700">{{ product.name }}</h3>
            <p class="mt-1 text-lg font-medium text-gray-900">{{ product.price }}</p>
            <button @click="addToCart(product)" class="p-button p-button-info p-button-raised">
              Add to Cart
            </button>
          </div>
        </div>
        <div class="tooltip" v-if="showingTooltip">
          <p class="text-lg text-gray-300">{{ tooltipText }}</p>
        </div>
            </div>
        </div> 
      </div>
   
  </template>
  

  
  <style scoped>
  /* Component-specific styles */
  .product-image:hover .tooltip {
    display: block;
  }
  
  .tooltip {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    display: none;
    align-items: center;
    justify-content: center;
  }

  .product-image {
  width: 100%;
  height: 250px; /* Set a fixed height for consistent product item height */
  object-fit: cover;
  object-position: center;
}

/* Media query for responsiveness */
@media (max-width: 640px) {
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 769px) and (max-width: 1023px) {
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
  </style>
  