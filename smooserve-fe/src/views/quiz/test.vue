<script>

export default {
    data() {
        return {
            textInput: '',
            currentQuestion: 0,
            selectedOptions: {},
            backgroundImage: {  // Set background of webpage
                backgroundImage: `url(../../layout/images/quiz1.png)`
            },
            submitted: false, // Add this property to track form submission
            showHomepageButton: false, // Add this property to control button visibility
            activeIndex: 2,
            responsiveOptions: [
                {
                    breakpoint: '1300px',
                    numVisible: 4
                },
                {
                    breakpoint: '575px',
                    numVisible: 1
                }
            ],
            questions: [
                {
                    name: "first_name",
                    text: "1. What is your full name?",
                    type: "open-ended",
                    background: "../../layout/images/quiz1.png",
                    character_limit: 100,
                    response: ''
                },
                {
                    name: "last_name",
                    text: "2. What is your last name?",
                    type: "open-ended",
                    background: "../../layout/images/quiz2.png",
                    character_limit: 100,
                    response: ''
                },
                {
                    name: "telegram",
                    text: "3. What is your telegram handle? Eg. @donald",
                    type: "open-ended",
                    background: "../../layout/images/quiz3.png",
                    character_limit: 100,
                    response: ''
                },
                {
                    name: "year_of_study",
                    text: "4. What is your year of study?",
                    type: "single-select",
                    background: "../../layout/images/quiz4.png",
                    options: {
                        cols: [
                            "Year 1",
                            "Year 2",
                            "Year 3",
                            "Year 4"
                        ],
                    },
                },
                {
                    name: "passionate_about",
                    text: "5. What Causes or Issues Are You Passionate About?",
                    type: "multi-select",
                    background: "../../layout/images/quiz5.png",
                    options: {
                        cols: [
                            "Environmental Conservation",
                            "Education and Youth Development",
                            "Healthcare and Medical Services",
                            "Arts and Culture"
                        ],
                    },
                },
                {
                    name: "skills",
                    text: "6. What Skills or Talents Do You Have to Offer?",
                    type: "multi-select",
                    background: "../../layout/images/quiz6.png",
                    options: {
                        cols: [
                            "Teaching or Tutoring",
                            "Writing and Communication",
                            "Event Planning and Coordination",
                            "Artistic Skills Eg. Drawing"
                        ],
                    },
                },
                {
                    name: "commitment",
                    text: "7. How Much Time Can You Commit to Volunteering?",
                    type: "single-select",
                    background: "../../layout/images/quiz7.png",
                    options: {
                        cols: [
                            "Less than 5 hours per week",
                            "5-10 hours per week",
                            "10-20 hours per week",
                            "More than 20 hours per week"
                        ],
                    },
                },
                {
                    name: "volunteering_location",
                    text: "8. Are You Interested in Local or Global Volunteering?",
                    type: "multi-select",
                    background: "../../layout/images/quiz8.png",
                    options: {
                        cols: [
                            "Local (within Singapore)",
                            "International (outside Singapore)"
                        ],
                    },
                },
                {
                    name: "volunteering_experience",
                    text: "9. What Type of Volunteering Experience Are You Seeking?",
                    type: "multi-select",
                    background: "../../layout/images/quiz9.png",
                    options: {
                        cols: [
                            "Hands-On, Direct Interaction",
                            "Remote or Virtual Opportunities",
                            "Administrative or Behind-the-Scenes Roles",
                            "No Preference"
                        ],
                    },
                },
                {
                    name: "self_description",
                    text: "10. Describe yourself in 100 words.",
                    type: "open-ended",
                    background: "../../layout/images/quiz10.png",
                    character_limit: 1000,
                    response: ''
                },
                {
                    name: "self_awareness",
                    text: "11. What are your strengths and weaknesses?",
                    type: "open-ended",
                    background: "../../layout/images/quiz11.png",
                    character_limit: 1000,
                    response: ''
                },
            ],
        };
    },
    methods: {
        prevQuestion() {
            if (this.currentQuestion > 0) {
                this.currentQuestion--;
                this.updateBackground();
            }
        },
        nextQuestion() {
            if (this.currentQuestion < this.questions.length - 1) {
                this.currentQuestion++;
                this.updateBackground();
            }
        },
        updateBackground() {  // Update background of webpage
            this.backgroundImage.backgroundImage = 'url(' + this.questions[this.currentQuestion].background + ')';
        },
        goToQuestion(questionIndex) {
            this.currentQuestion = questionIndex;
        },
        updateMultiSelect(groupName, value) {
            if (!this.selectedOptions.hasOwnProperty(groupName)) {
                this.selectedOptions[groupName] = [];
            }

            let index = this.selectedOptions[groupName].findIndex(item => item === value);

            if (index < 0) {
                this.selectedOptions[groupName].push(value);
            } else {
                this.selectedOptions[groupName].splice(index, 1);
            }
            console.log(value)
        },
        updateResponse(groupName, value, questionType) {
            // Change to enum if got time
            if (questionType === "multi-select") {  // Process questions where type is multi-select
                this.updateMultiSelect(groupName, value);
            } else if (questionType === "single-select") {
                // Process questions where type is single-select
                this.selectedOptions[groupName] = value;
            } else {  // Process questions where type is open-ended (value here is question index)
                this.selectedOptions[groupName] = this.questions[value].response;
            }
            console.log(this.selectedOptions)
        },
        submitForm() {
            // Handle form submission here
            console.log("Form submitted with selected options:");

            Object.entries(this.selectedOptions).forEach(([k, v]) => {
                console.log("The key: ", k);
                console.log("The value: ", v);
            });

            // Set submitted to true and show the button
            this.submitted = true;
            this.showHomepageButton = true;
        },
    },
};
</script>
<style>
#bg {
    background-size: auto 100%;
    background-position: center top;
    width: 100%;
    height: 100vh;
    position: relative;
    /* Ensure proper positioning of the header */
}
</style>

<template>
    <div id="bg" :style="backgroundImage">
        <router-link :to="{ name: 'Home' }" style="display: flex; justify-content: center; align-items: center;">
            <img src="/layout/images/logo-white.png" height="80" class="mr-0 lg:mr-2" />
        </router-link>
        <h1 style="color:#064273; text-align: center;">CSP PREFERENCE QUIZ</h1>

        <!-- Questions -->
        <div class="c1 container card">
            <form @submit.prevent="submitForm">
                <Galleria :class="{ active: index === currentQuestion }" :showThumbnails="false" :showIndicators="true"
                    :value="questions" :responsiveOptions="responsiveOptions" :numVisible="5">
                    <template #item="question">
                        <div class="question-container">
                            <h2 style="text-align: center;" class="pl-3">{{ question.item.text }}</h2>
                            <div class="options-container w-100">
                                <!-- Display options if question type is multi-select  -->
                                <table v-if="question.item.type === 'multi-select'" class="w-100">
                                    <tr class="wrapping custom-radio-label"
                                        @click="updateResponse(question.item.name, option, question.item.type)" :class="{
                                            selected: question.item.name in selectedOptions
                                                && selectedOptions[question.item.name].indexOf(option) >= 0
                                        }" v-for="(option, optionIndex) in question.item.options.cols"
                                        style="display: flex; flex-direction: row;">
                                        <td :key="optionIndex" class="w-100 row-option text-align-start">{{ option }}</td>
                                        <td class="row-checkbox text-align-end">{{ question.item.name in selectedOptions &&
                                            selectedOptions[question.item.name].indexOf(option) >= 0 ? '✓' : '' }}</td>
                                    </tr>
                                </table>

                                <!-- Display options if question type is single-select  -->
                                <table v-else-if="question.item.type === 'single-select'" class="w-100">
                                    <tr class="wrapping custom-radio-label"
                                        @click="updateResponse(question.item.name, option, question.item.type)"
                                        :class="{ selected: selectedOptions[question.item.name] === option }"
                                        v-for="(option, optionIndex) in question.item.options.cols"
                                        style="display: flex; flex-direction: row;">
                                        <td :key="optionIndex" class="w-100 row-option text-align-start">{{ option }}</td>
                                        <td class="row-checkbox text-align-end">{{ selectedOptions[question.item.name] ===
                                            option
                                            ? '✓' : '' }}
                                        </td>
                                    </tr>
                                </table>

                                <!-- Display textarea if question type is open-ended -->
                                <div v-else style="display: flex; flex-direction: row;">
                                    <span class="p-float-label w-100 mt-3 mx-2">
                                        <Textarea v-model="question.response" :rows="10" :style="{ width: '350px' }"
                                            :maxlength="question.character_limit" class="w-100" style="resize: none;"
                                            @mouseout="updateResponse(question.name, index, question.type)" />
                                        <label>Enter response here</label>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </template>
                </Galleria>
                <div class="d-flex justify-content-between my-3 mx-2">
                    <Button v-if="currentQuestion > 0" label="Back" @click="prevQuestion">
                    </Button>
                    <div v-else> <!-- Empty div to force the next button to row end -->
                    </div>
                    <Button v-if="currentQuestion < questions.length - 1" label="Next" @click="nextQuestion">
                    </Button>
                    <!-- Display "Submit" button only on the last question -->
                    <Button v-if="currentQuestion === questions.length - 1" label="Submit">
                    </Button>
                </div>

            </form>
        </div>
    </div>
</template>

<style>
body {
    background-color: #f7f7f7;
    /* Light gray background */
    font-family: Arial, sans-serif;
    /* Change the font to a sans-serif font like Arial */
}


/* Style the container c1 */
.c1 {
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    background-color: #ffffff;
    /* White background */
    border: 2px solid #eaeaea;
    /* Light gray border */
    border-radius: 15px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    /* Add a subtle box shadow */
    max-width: 600px;
}

.question-container {
    margin-bottom: 20px;
}

.options-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}


/* Style the wrapping elements */
.wrapping {
    background-color: #f2f2f2;
    /* Light gray background */
    border: 2px solid #eaeaea;
    /* Light gray border */
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    /* Add a subtle box shadow */
}




/* Style the custom radio labels */
.custom-radio-label {
    cursor: pointer;
    padding: 10px 20px;
    border: 1px solid #eaeaea;
    /* Light gray border */
    border-radius: 15px;
    margin: 5px;
    display: block;
    background-color: #ffffff;
    /* White background */
    transition: background-color 0.3s;
    /* Add a smooth transition on hover */
}

.row-option {
    display: flex;
}

.row-checkbox {
    display: flex;
}

/* Highlight on hover */
.custom-radio-label:hover {
    background-color: #f7f7f7;
    /* Light gray on hover */
}

/* Add styles for the selected option */
.custom-radio-label.selected {
    background-color: rgb(107, 161, 237);
    /* Dark purple for selected option */
    color: #ffffff;
}
</style>