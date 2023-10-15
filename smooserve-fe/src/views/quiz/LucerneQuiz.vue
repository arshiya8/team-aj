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
      questions: [
        {
          name: "passionate_about",
          text: "1. What Causes or Issues Are You Passionate About?",
          type: "multi-select",
          background: "../../layout/images/quiz1.png",
          options: {
            cols: [
              "Environmental Conservation",
              "Education and Youth Development",
              "Healthcare and Medical Services",
              "Construction"
            ],
          },
        },
        {
          name: "skills",
          text: "2. What Skills or Talents Do You Have to Offer?",
          type: "multi-select",
          background: "../../layout/images/quiz2.png",
          options: {
            cols: [
              "Teaching or Tutoring",
              "Writing and Communication",
              "Event Planning and Coordination",
              "Building"
            ],
          },
        },
        {
          name: "commitment",
          text: "3. How Much Time Can You Commit to Volunteering?",
          type: "single-select",
          background: "../../layout/images/quiz3.png",
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
          text: "4. Are You Interested in Local or Global Volunteering?",
          type: "multi-select",
          background: "../../layout/images/quiz4.png",
          options: {
            cols: [
              "Local (within Singapore)",
              "International (outside Singapore)"
            ],
          },
        },
        {
          name: "volunteering_experience",
          text: "5. What Type of Volunteering Experience Are You Seeking?",
          type: "multi-select",
          background: "../../layout/images/quiz5.png",
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
          text: "6. Describe yourself in 100 words.",
          type: "open-ended",
          background: "../../layout/images/quiz6.png",
          character_limit: 1000,
          response: ''
        },
        {
          name: "self_awareness",
          text: "7. What are your strengths and weaknesses?",
          type: "open-ended",
          background: "../../layout/images/quiz7.png",
          character_limit: 1000,
          response: ''
        },
        {
          name: "contributions",
          text: "8. Why do you want to join this CSP?",
          type: "open-ended",
          background: "../../layout/images/quiz8.png",
          character_limit: 1000,
          response: ''
        }
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

      Object.entries(this.selectedOptions).forEach(([k,v]) => {
        console.log("The key: ", k)
        console.log("The value: ", v)
      })
    }
  },
};
</script>

<template>
  <!-- Background image -->
  <div id="bg" :style="backgroundImage">

    <!-- smooserve logo -->
    <a href="#" style="display: flex; justify-content: center; align-items: center;">
      <img src="layout/images/logo-white.png" height="80" class="mr-0 lg:mr-2" />
    </a>

    <!-- Container for header -->
    <div class="container" style="text-align: center; color:black; font-size: 50px;">
      <h1>VOLUNTEER PERSONALITY TEST</h1>
    </div>

    <!-- Container for carousel -->
    <div class="container c1 col-xxl-4 col-xl-5 col-lg-6 col-md-7 col-sm-8 col-10">
      <form @submit.prevent="submitForm">

        <div id="carouselExampleIndicators" class="carousel slide">
          <!-- Carousel indicators for questions -->
          <ol class="carousel-indicators">
            <li
              v-for="(question, index) in questions"
              :key="index"
              :class="{ active: index === currentQuestion }"
              @click="goToQuestion(index)"
            ></li>
          </ol>

          <!-- Carousel items -->
          <div class="carousel-inner">
            <div v-for="(question, index) in questions" :key="index"
                 class="carousel-item" :class="{ active: index === currentQuestion }">

              <div class="container justify-content-start" style="display: flex; flex-direction: row;">
                <h2 style="text-align: left;" class="pl-3">{{ question.text }}</h2>
              </div>

              <div class="container">
                <!-- Display this table if question is multi-select -->
                <table v-if="question.type === 'multi-select'" class="w-100">
                  <tr class="wrapping custom-radio-label"
                      @click="updateResponse(question.name, option, question.type)"
                      :class="{ selected: question.name in selectedOptions
                    && selectedOptions[question.name].indexOf(option) >= 0 }"
                      v-for="(option, optionIndex) in question.options.cols"
                      style="display: flex; flex-direction: row;">
                    <td :key="optionIndex" class="w-100 row-option text-align-start">{{ option }}</td>
                    <td class="row-checkbox text-align-end">{{ question.name in selectedOptions && selectedOptions[question.name].indexOf(option) >= 0 ? '✓' : '' }}</td>
                  </tr>
                </table>

                <!-- Display this table if question is single-select -->
                <table v-else-if="question.type === 'single-select'" class="w-100">
                  <tr class="wrapping custom-radio-label"
                      @click="updateResponse(question.name, option, question.type)"
                      :class="{ selected: selectedOptions[question.name] === option }"
                      v-for="(option, optionIndex) in question.options.cols"
                      style="display: flex; flex-direction: row;">
                    <td :key="optionIndex" class="w-100 row-option text-align-start">{{ option }}</td>
                    <td class="row-checkbox text-align-end">{{ selectedOptions[question.name] === option ? '✓' : '' }}</td>
                  </tr>
                </table>

                <!-- Display this table if question is open-ended -->
                <div v-else style="display: flex; flex-direction: row;">
              <span class="p-float-label w-100 mt-3 mx-2">
                <Textarea v-model="question.response" :rows="10" :maxlength="question.character_limit"
                          class="w-100" style="resize: none;" @mouseout="updateResponse(question.name, index, question.type)"/>
                <label>Enter response here</label>
              </span>
                </div>

                <!-- Back and Next buttons for each question -->
                <div class="d-flex justify-content-between my-3 mx-2">
                  <button
                    v-if="currentQuestion > 0"
                    type="button"
                    class="btn btn-secondary"
                    @click="prevQuestion"
                  >
                    Back
                  </button>
                  <div
                    v-else
                  >  <!-- Empty div to force the next button to row end -->
                  </div>
                  <button
                    v-if="currentQuestion < questions.length - 1"
                    type="button"
                    class="btn btn-primary"
                    @click="nextQuestion"
                  >
                    Next
                  </button>
                  <button
                    v-else
                    type="submit"
                    class="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css');

#bg {
  background-size: auto 100%;
  background-position: center; /* Adjust the position as needed */
  /* Other styles for the element */
  width: 100%;
  height: 100vh;
}

/* Adjust the background color of the body */
body {
  background-color: #f7f7f7; /* Light gray background */
  font-family: Arial, sans-serif; /* Change the font to a sans-serif font like Arial */
}

/* Customize the active indicator color in the carousel */
.carousel-indicators .active {
  background-color: #4338ca; /* Dark purple */
}

/* Style the container c1 */
.c1 {
  background-color: #ffffff; /* White background */
  border: 2px solid #eaeaea; /* Light gray border */
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow */
  max-width: 600px;
}

/* Add styles to the carousel */
.carousel {
  padding: 20px 0; /* Reduce top padding */
}

/* Style the wrapping elements */
.wrapping {
  background-color: #f2f2f2; /* Light gray background */
  border: 2px solid #eaeaea; /* Light gray border */
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow */
}

/* Style the carousel items */
.carousel-item {
  text-align: center;
}

/* Customize the submit button */
.btn-primary {
  background-color: #4338ca; /* Dark purple background */
  color: #ffffff;
  border: none;
  border-radius: 25px;
  padding: 12px 30px; /* Slightly larger padding */
  font-size: 18px; /* Slightly larger font size */
  cursor: pointer; /* Add pointer cursor */
}

/* Style the custom radio labels */
.custom-radio-label {
  cursor: pointer;
  padding: 10px 20px;
  border: 1px solid #eaeaea; /* Light gray border */
  border-radius: 15px;
  margin: 5px;
  display: block;
  background-color: #ffffff; /* White background */
  transition: background-color 0.3s; /* Add a smooth transition on hover */
}

.row-option {
  display: flex;
}

.row-checkbox {
  display: flex;
}

/* Highlight on hover */
.custom-radio-label:hover {
  background-color: #f7f7f7; /* Light gray on hover */
}

/* Add styles for the selected option */
.custom-radio-label.selected {
  background-color: #4338ca; /* Dark purple for selected option */
  color: #ffffff;
}
</style>