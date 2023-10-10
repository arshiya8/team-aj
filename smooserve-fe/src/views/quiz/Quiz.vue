<script>
import NavBar from "/src/components/NavBar.vue";

export default {
  components: {
    NavBar,
  },

  data() {
    return {
      currentQuestion: 0,
      selectedOptions: {},
      questions: [
        {
          name: "passionate_about",
          text: "1. What Causes or Issues Are You Passionate About?",
          options: {
            cols1: [
              "Environmental Conservation",
              "Education and Youth Development",
            ],
            cols2: [
              "Healthcare and Medical Services",
              "Construction"
            ]
          },
        },
        {
          name: "skills",
          text: "2. What Skills or Talents Do You Have to Offer?",
          options: {
            cols1: [
            "Teaching or Tutoring", "Writing and Communication"
            ],
            cols2: [
            "Event Planning and Coordination","Building"
            ]
          },
        },
        {
          name: "commitment",
          text: "3. How Much Time Can You Commit to Volunteering?",
          options: {
            cols1: [
            "Less than 5 hours per week", "5-10 hours per week"
            ],
            cols2: [
            "10-20 hours per week","More than 20 hours per week"
            ]
          },
        },
        {
          name: "volunteering_location",
          text: "4. Are You Interested in Local or Global Volunteering?",
          options: {
            cols1: [
              "Local (within Singapore)"
            ],
            cols2: [
            "International (outside Singapore)"
            ]
          },
        },
        {
          name: "volunteering_experience",
          text: "5. What Type of Volunteering Experience Are You Seeking?",
          options: {
            cols1: [
              "Hands-On, Direct Interaction",
              "Remote or Virtual Opportunities",
            ],
            cols2: [
              "Administrative or Behind-the-Scenes Roles",
              "No Preference"
            ]
          },
        },
      ],
    };
  },
  methods: {
    prevQuestion() {
      if (this.currentQuestion > 0) {
        this.currentQuestion--;
      }
    },
    nextQuestion() {
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++;
      }
    },
    goToQuestion(questionIndex) {
      this.currentQuestion = questionIndex;
    },
    updateRadioStyles(groupName, value) {
      this.selectedOptions[groupName] = value;
    },
    submitForm() {
      // Handle form submission here
      console.log("Form submitted with selected options:", this.selectedOptions);
    },
  },
};
</script>



<template>
  <NavBar />

  <div class="container c1">
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
          <div
            v-for="(question, index) in questions"
            :key="index"
            class="carousel-item"
            :class="{ active: index === currentQuestion }"
          >
            <h2>{{ question.text }}</h2>
            <div class="container w-100">
              <table class="w-100">
                <tr style="display: flex; flex-direction: row;">
                  <td v-for="(option, optionIndex) in question.options.cols1" :key="optionIndex" class="wrapping custom-radio-label w-100" @click="updateRadioStyles(question.name, option)" :class="{ selected: selectedOptions[question.name] === option }">{{ option }}</td>
                </tr>
                <tr style="display: flex; flex-direction: row;">
                  <td v-for="(option, optionIndex) in question.options.cols2" :key="optionIndex" class="wrapping custom-radio-label w-100" @click="updateRadioStyles(question.name, option)" :class="{ selected: selectedOptions[question.name] === option }">{{ option }}</td>
                </tr>
              </table>
            </div>

            <!-- Back and Next buttons for each question -->
            <div class="d-flex justify-content-between mt-3">
              <button
                v-if="currentQuestion > 0"
                type="button"
                class="btn btn-secondary"
                @click="prevQuestion"
              >
                Back
              </button>
              <button
                v-if="currentQuestion < questions.length - 1"
                type="button"
                class="btn btn-primary"
                @click="nextQuestion"
              >
                Next
              </button>
              <button
                v-if="currentQuestion === questions.length - 1"
                type="submit"
                class="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>


<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css');


body {
  background-color: #7fcdff;
}
.carousel-indicators .active {
  background-color: #4338ca;
}

.c1 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  border: 2px solid #4338ca;
  border-radius: 15px;
  background-color: #def3f6;
}
.carousel {
  padding: 50px 0px;
}

.wrapping {
  background-color: whitesmoke;
  border: 2px solid #4338ca;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
}

.c2 {
  display: flex;
  justify-content: center; /* Horizontal centering */
  align-items: center;
  padding: 50px;
}

.carousel-item {
  text-align: center;
}

.radio-group {
  display: flex;
  flex-direction: column;
}

.submit-button {
  background-color: #4338ca;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 16px;
}

.custom-textbox {
  border: 1px solid #064273;
  border-radius: 15px;
  padding: 5px;
}

.custom-radio-label {
  cursor: pointer;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 15px;
  margin: 5px;
  display: block;
}

.custom-radio-label:hover {
  background-color: #76b6c4;
}

/* Add styles for the selected option */
.custom-radio-label.selected {
  background-color: #4338ca;
  color: white;
}
</style>