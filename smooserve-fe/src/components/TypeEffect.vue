<template>
    <div class="container">
        <div ref="typedText" class="typed-text"></div>
        <span class="cursor" :class="{ 'typing': typeStatus }">&nbsp;</span>
        <div class="quiz-button" v-if="typeStatus">
            <router-link :to="{ name: 'Quiz' }">
                <Button label="Take me to Volunteer Preference quiz"></Button>
            </router-link>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            segments: [
                { text: "Welcome to Smooserve! 🌟 ", style: "color: #064273; font-size: 1.9rem;" },
                { text: "We're thrilled to have you join us at Smooserve, where wonderful adventures and meaningful connections await! 🚀Our mission is to match you with the perfect Community Service Projects (CSP) where your unique skills will match the skills required by the CSP!✨", style: "color: black; font-size: 1.3rem;" },
                { text: "Ready to begin? Click below to start your journey! 🎉", style: "color: black; font-size: 1.25rem;" },
            ],
            typeStatus: false,
            currentSegmentIndex: 0,
            charIndex: 0,
            typingSpeed: 20,
        };
    },
    methods: {
        typeText() {
            const currentSegment = this.segments[this.currentSegmentIndex];
            if (this.charIndex < currentSegment.text.length) {
                const char = currentSegment.text.charAt(this.charIndex);
                const style = currentSegment.style || '';
                this.$refs.typedText.innerHTML += `<span style="${style}">${char}</span>`;
                this.charIndex += 1;
                setTimeout(this.typeText, this.typingSpeed);
            } else {
                this.$refs.typedText.innerHTML += '<br> <br>'; // Add a line break after each segment
                this.currentSegmentIndex += 1;
                this.charIndex = 0;
                if (this.currentSegmentIndex < this.segments.length) {
                    setTimeout(this.typeText, 500);
                } else {
                    this.typeStatus = true;
                }
            }
        },
    },
    created() {
        setTimeout(this.typeText, 1000); // Delay the typing animation for 1 second after component creation
    },
};
</script>
  
<style lang="scss" scoped>
.container {
    width: 80%;
    max-width: 600px;
    margin: 0 auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.surface-card {
    border-radius: 53px;
    padding: 1rem; // Increase padding to provide space between text and border
    background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%);
}

.typed-text {
    font-size: 1.3rem;

    @media (max-width: 768px) {
        font-size: 1rem;
    }

    @media (max-width: 480px) {
        font-size: 0.9rem;
    }
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

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        padding: 8px 16px;
    }
}
</style>

  