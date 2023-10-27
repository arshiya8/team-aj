<template>
    <div class="container">
        <div>
            <span class="typed-text" v-html="typeValue"></span>
            <span class="cursor" :class="{ 'typing': typeStatus }">&nbsp;</span>
        </div>
        <div class="quiz-button" v-if="typeStatus">
            <router-link :to="{ name: 'Quiz'}"><Button label="Take me to Volunteer Preference quiz" @click="startQuiz"></Button></router-link>
        </div>
    </div>
</template>
  
<script>
// import { setTimeout } from 'timers';

export default {
    data: () => {
        return {
            typeValue: '',
            typeStatus: false,
            textToType: "<h1>Welcome to Smooserve! 🌟 </h1> <br> We're thrilled to have you join us at Smooserve, where wonderful adventures and meaningful connections await! 🚀Our mission is to match you with the perfect Community Service Projects (CSP) where your unique skills will match the skills required by the CSP! Remember, your profile is a canvas; paint it with the vibrant colors that describes your personality best! Answer the questions in the quiz as detailed as possible as your profiles will be viewed by CSP leaders to asses you ✨ Ready to begin? Click below to start your journey! 🎉<br>",
            charIndex: 0,
            typingSpeed: 10
        }
    },
    methods: {
        typeText() {
            if (this.charIndex < this.textToType.length) {
                this.typeValue += this.textToType.charAt(this.charIndex);
                this.charIndex += 1;
                setTimeout(this.typeText, this.typingSpeed);
            } else {
                this.typeStatus = true;
            }
        },
        startQuiz() {
            // Handle button click logic here, e.g., route to the quiz page
            // For example: this.$router.push('/quiz');
        }
    },
    created() {
        setTimeout(this.typeText, 1000); // Delay the typing animation for 1 second after component creation
    }
}
</script>
  
<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

h1 {
    font-size: 2rem;
    font-weight: normal;

    span.typed-text {
        color: #D2B94B;
    }

    span.cursor {
        display: inline-block;
        margin-left: 3px;
        width: 4px;
        background-color: #fff;
        animation: cursorBlink 1s infinite;
    }

    span.cursor.typing {
        animation: none;
    }
}



.quiz-button button {
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
}


</style>
  