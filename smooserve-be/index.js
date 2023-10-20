'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const studentRoutes = require('./routes/student-routes');
const cspRoutes = require('./routes/csp-routes');
const stripe = require("stripe")('sk_test_51O2xN2Alv9o8wDQ6TVmtjDWdmWlrmZwIXsXaOmxarWnjDH48KNuvwiCEGwtsNkEtuAMNyCJ71izX8uEjUvXM1gRu00cl9eyumN');
const app = express();


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', studentRoutes.routes);
app.use('/api', cspRoutes.routes);



// const USER_SHOPPING_CART = [
//     {
//         id: 1,
//         name: 'Name Tent',
//         href: '#',
//         stripePriceId: 'price_1O2xe5Alv9o8wDQ6thRbfbAX',
//         imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcdSa1as4Ctoa_HYDb0su-am9aBmKTO92gYrymCRPpBAy_DYoaDM0N_Y8MnCknKJcWRXs&usqp=CAU',
//         CSPName: 'CSP1',
//         imageAlt: 'A cute and vibrant name tent design',
//         quantity: 0,
//         showTooltip: false,
//         tooltipText: '',
//     },
//     {
//         id: 2,
//         name: 'Waterbottle',
//         href: '#',
//         stripePriceId: 'price_1O2xeuAlv9o8wDQ6nIdGrYSu',
//         imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ7Pc6dUzwCP0Ec5o5AHkvaD8f99inu_ffeVgiE5uq3tb0o_vABlR9ML5izhDcYrQ5cDc&usqp=CAU",
//         imageAlt: 'A metal, insulated waterbottle',
//         quantity: 0,
//         showTooltip: false,
//         tooltipText: '',
//     },
//     {
//         id: 3,
//         name: 'Focus Paper Refill',
//         href: '#',
//         stripePriceId: 'price_1O2xfkAlv9o8wDQ65yOlLqMv',
//         imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
//         imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
//         quantity: 0,
//         showTooltip: false,
//         tooltipText: '',
//     },
//     {
//         id: 4,
//         name: 'Machined Mechanical Pencil',
//         href: '#',
//         stripePriceId: 'price_1O2xgaAlv9o8wDQ6wanqtghz',
//         imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
//         imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
//         quantity: 0,
//         showTooltip: false,
//         tooltipText: '',
//     },
//     {
//         id: 4,
//         name: 'Machined Mechanical Pencil',
//         href: '#',
//         stripePriceId: 'price_1O2xgaAlv9o8wDQ6wanqtghz',
//         imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
//         imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
//         quantity: 0,
//         tooltipText: '',
//     },
//     {
//         id: 4,
//         name: 'Machined Mechanical Pencil',
//         href: '#',
//         stripePriceId: 'price_1O2xgaAlv9o8wDQ6wanqtghz',
//         imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
//         imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
//         quantity: 0,
//         showTooltip: false,
//         tooltipText: '',
//     },
//     {
//         id: 4,
//         name: 'Machined Mechanical Pencil',
//         href: '#',
//         stripePriceId: 'price_1O2xgaAlv9o8wDQ6wanqtghz',
//         imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
//         imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
//         quantity: 0,
//         showTooltip: false,
//         tooltipText: '',
//     },
//     {
//         id: 4,
//         name: 'Machined Mechanical Pencil',
//         href: '#',
//         stripePriceId: 'price_1O2xgaAlv9o8wDQ6wanqtghz',
//         imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
//         imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
//         quantity: 0,
//         showTooltip: false,
//         tooltipText: '',
//     },
//     {
//         id: 4,
//         name: 'Machined Mechanical Pencil',
//         href: '#',
//         stripePriceId: 'price_1O2xgaAlv9o8wDQ6wanqtghz',
//         imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
//         imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
//         quantity: 0,
//         showTooltip: false,
//         tooltipText: '',
//     },
//     {
//         id: 4,
//         name: 'Machined Mechanical Pencil',
//         href: '#',
//         stripePriceId: 'price_1O2xgaAlv9o8wDQ6wanqtghz',
//         imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
//         imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
//         quantity: 0,
//         showTooltip: false,
//         tooltipText: '',
//     },
//     // M
//     // More products...
// ];





// app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));

//data for cart
app.get("/shopping-cart", (req,res) => {
    res.send({cart: USER_SHOPPING_CART});
});

// create a checkout session 
app.post("/create-checkout-session",async (req,res) => {
    // make an array of just Stripe Price ID and quantities
    const lineItems = USER_SHOPPING_CART.map((item) => {
        return {
            price: item.stripePriceId,
            quantity: item.quantity,
        };
    });

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: lineItems,
        success_url:`https://localhost:5173/success`,
        cancel_url: 'http://localhost:5173/cancel',
    });
    return res.send({url:session.url});
});

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));