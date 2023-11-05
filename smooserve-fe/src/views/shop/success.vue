<template>
    <NavBar/>
    <h1 style="text-align: center;"> Payment Successful!</h1>
    <p style="text-align: center;">Remember to take a screenshot of your payments as proof</p>
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
                                <span class="text-2xl font-semibold"> Total Price: ${{ slotProps.data.quantityPrice }}</span>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </template>
        </DataView>
       
   <Footer/>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import { ref, watch, onMounted } from 'vue';
import { loadStripe } from "@stripe/stripe-js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import axios from "axios";

export default{
    components: {
        NavBar,
        Footer
    },

    setup() {
        let cart = ref([]);
        const auth = getAuth();
        let studentId = null;
        const csps = ref([]);
        onAuthStateChanged(auth, async (student) => {
            if (student) {
                try {
                    const querySnapshot = await getDocs(collection(db, "students"));
                    querySnapshot.forEach((doc) => {
                        const studentEmail = doc.data().email;
                        if (studentEmail === student.email) {
                            studentId = doc.id;
                            cart.value = doc.data().cart || [];
                            
                        }
                    });

                    // If studentId is still null, no matching email was found in the collection
                    if (studentId === null) {
                        console.log("No matching id found in the database.");
                    } else {
                        console.log("Student ID found:", studentId, cart.value);
                    }
                } catch (error) {
                    console.error(error);
                }
            } else {
                studentId = null;
                cart.value = []; // Clear favorites for non-authenticated users
            }
        });

        return {cart}
    }

    
}
</script>