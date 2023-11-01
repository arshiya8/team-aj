<template>
  <div id="bg" :style="backgroundImage">
    <a href="#" style="display: flex; justify-content: center; align-items: center;">
      <img src="layout/images/logo-white.png" height="80" class="mr-0 lg:mr-2" />
    </a>
    <div class="header-container">
      <h1>CSP PREFERENCE QUIZ</h1>
    </div>
    <div class="container c1 p-col-12 p-md-6 p-lg-4">
      <form @submit.prevent="submitForm">
        <div class="card container">
          <div class="container" style="display: flex; flex-direction: column; align-items: center;">
            <h2 style="text-align: center;" class="pl-3">{{ currentQuestionData.text }}</h2>
          </div>
          <div class="container">
            <table v-if="currentQuestionData.type === 'multi-select'" class="w-100">
              <tr class="wrapping custom-radio-label"
                @click="updateResponse(currentQuestionData.name, option, currentQuestionData.type)"
                :class="{ selected: currentQuestionData.name in selectedOptions && selectedOptions[currentQuestionData.name].indexOf(option) >= 0 }"
                v-for="(option, optionIndex) in currentQuestionData.options.cols"
                style="display: flex; flex-direction: row;">
                <td :key="optionIndex" class="w-100 row-option text-align-start">{{ option }}</td>
                <td class="row-checkbox text-align-end">
                  {{ currentQuestionData.name in selectedOptions &&
                    selectedOptions[currentQuestionData.name].indexOf(option) >= 0 ? '✓' : '' }}
                </td>
              </tr>
            </table>
            <table v-else-if="currentQuestionData.type === 'single-select'" class="w-100">
              <tr class="wrapping custom-radio-label"
                @click="updateResponse(currentQuestionData.name, option, currentQuestionData.type)"
                :class="{ selected: selectedOptions[currentQuestionData.name] === option }"
                v-for="(option, optionIndex) in currentQuestionData.options.cols"
                style="display: flex; flex-direction: row;">
                <td :key="optionIndex" class="w-100 row-option text-align-start">{{ option }}</td>
                <td class="row-checkbox text-align-end">
                  {{ selectedOptions[currentQuestionData.name] === option ? '✓' : '' }}
                </td>
              </tr>
            </table>
            <div v-else style="display: flex; flex-direction: row;">
              <span class="p-float-label w-100 mt-3 mx-2">
                <Textarea v-model="currentQuestionData.response" :rows="10"
                  :maxlength="currentQuestionData.character_limit" class="w-100" style="resize: none;"
                  @mouseout="updateResponse(currentQuestionData.name, index, currentQuestionData.type)" />
                <label>Enter response here</label>
              </span>
            </div>
          </div>

          <div class="buttons-container text-center">
            <!-- Back and Next Buttons for each question -->
            <div class="d-flex justify-content-between my-3 mx-2">
              <div class="mx-auto">
              <Button v-if="currentQuestion > 0" type="button" class="btn btn-secondary" @click="prevQuestion">
                Back
              </Button>
              <div v-else> <!-- Empty div to force the next Button to row end -->
              </div>
              <Button v-if="currentQuestion < questions.length - 1" type="button" class="btn btn-primary mx-auto"
                @click="nextQuestion">
                Next
              </Button>
            </div>
              <!-- Display "Submit" Button only on the last question -->
              <Button v-if="currentQuestion === questions.length - 1" type="submit" class="btn btn-primary">
                Submit
              </Button>
            </div>


            <!-- "Take Me to Homepage" Button -->
            <router-link v-if="showHomepageButton" :to="{ name: 'Home' }">
              <Button class="btn btn-primary">Take Me to Homepage</Button>
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>



<script>
import { ref } from 'vue';
import 'primeflex/primeflex.css'; 
import Button from 'primevue/button';
export default {
  data() {
    return {
      textInput: '',
      currentQuestion: 0,
      selectedOptions: {},
      backgroundImage: {
        backgroundImage: `url(../../layout/images/quiz1.png)`,
        backgroundSize: 'auto', // Set to 'cover' to make the image cover the entire container
        backgroundRepeat: 'repeat',
      },
      submitted: false,
      showHomepageButton: false,
      questions: [
        {
          name: "first_name",
          text: "1. What is your first name?",
          type: "open-ended",
          background: "../../layout/images/quiz1.png",
          character_limit: 1000,
          response: ''
        },
        {
          name: "last_name",
          text: "2. What is your last name?",
          type: "open-ended",
          background: "../../layout/images/quiz2.png",
          character_limit: 1000,
          response: ''
        },
        {
          name: "telegram",
          text: "3. What is your telegram handle? Eg. @donald",
          type: "open-ended",
          background: "../../layout/images/quiz3.png",
          character_limit: 1000,
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
  computed: {
    currentQuestionData() {
      return this.questions[this.currentQuestion];
    },
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
    updateBackground() {
      this.backgroundImage.backgroundImage = 'url(' + this.currentQuestionData.background + ')';
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
    },
    submitForm() {
      // Handle form submission here
      console.log("Form submitted with selected options:");

      Object.entries(this.selectedOptions).forEach(([k, v]) => {
        console.log("The key: ", k);
        console.log("The value: ", v);
      });

      // Set submitted to true and show the Button
      this.submitted = true;
      this.showHomepageButton = true;
    },
  },

  components: {
    Button,
  },
};
</script>


<style>
.buttons-container {
  align-self: flex-end; /* Align at the bottom of the card */
  margin-top: auto; /* Push buttons to the bottom */
  display: flex;
  justify-content: center; 
}


#bg {
  background-size: auto 100%;
  background-position: center top;
  width: 100%;
  height: auto;
  position: relative;
}

.header-container {
  text-align: center;
  color: black;
  font-size: 50px;
  background-color: rgba(255, 255, 255, 0.7);
  /* Add a semi-transparent background color */
}

body {
  background-color: #f7f7f7;
  font-family: Arial, sans-serif;
}

/* Customize the active indicator color in the Carousel */
.Carousel-indicators .active {
  background-color: #4338ca;
  /* Dark purple */
}
.container{ display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.c1 {
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
  margin: 0 auto;
  /* Center the container horizontally */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.Carousel {
  padding: 20px 0;
  /* Reduce top padding */
}

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

.Carousel-item {
  text-align: center;
  justify-content: center;
}

.btn-primary {
  background-color: #4338ca;
  /* Dark purple background */
  color: #ffffff;
  border: none;
  border-radius: 25px;
  padding: 12px 30px;
  /* Slightly larger padding */
  font-size: 18px;
  /* Slightly larger font size */
  cursor: pointer;
  /* Add pointer cursor */
}

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

.custom-radio-label:hover {
  background-color: #f7f7f7;
  /* Light gray on hover */
}

.custom-radio-label.selected {
  background-color: rgb(107, 161, 237);
  /* Dark purple for selected option */
  color: #ffffff;
}</style>
