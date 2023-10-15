<template>
  <div class="container-fluid">
    <!-- Smooserve logo -->
    <a href="#" style="display: flex; justify-content: center; align-items: center;">
      <img src="layout/images/logo-white.png" height="80" class="mr-0 lg:mr-2" />
    </a>
    <div class="container" style="text-align: center; color: black; font-size: 50px;">
      <h1>VOLUNTEER PERSONALITY TEST</h1>
    </div>

    <!-- Carousel with quiz -->
    <div class="container c1">
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <!-- Carousel indicators for questions -->
        <ol class="carousel-indicators">
          <li
              v-for="(question, index) in questions"
              :key="index"
              :class="{ active: index === currentQuestion }"
              @click="goToQuestion(index)"
          ></li>
        </ol>

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
                  <td
                      v-for="(option, optionIndex) in question.options.cols1"
                      :key="optionIndex"
                      class="wrapping custom-checkbox-label w-100"
                  >
                    <label>
                      <input
                          type="checkbox"
                          :value="option"
                          :id="option"
                          @click="updateCheckboxStyles(question.name, option)"
                      />
                      {{ option }}
                    </label>
                  </td>
                </tr>
                <tr style="display: flex; flex-direction: row;">
                  <td
                      v-for="(option, optionIndex) in question.options.cols2"
                      :key="optionIndex"
                      class="wrapping custom-checkbox-label w-100"
                  >
                    <label>
                      <input
                          type="checkbox"
                          :value="option"
                          :id="option"
                          @click="updateCheckboxStyles(question.name, option)"
                      />
                      {{ option }}
                    </label>
                  </td>
                </tr>
              </table>
            </div>
            <!-- Open-ended text input for questions 6-8 -->
            <div v-if="index >= 5" class="mt-3">
              <textarea
                  v-model="selectedOptions[question.name]"
                  class="form-control"
                  rows="4"
                  placeholder="Your answer..."
              ></textarea>
            </div>
          </div>
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

    <!-- Image -->
    <div style="display: flex; justify-content: center; align-items: center;">
      <img :src="questions[currentQuestion].image" style="max-width: 100%;" alt="Image">
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      currentQuestion: 0,
      questions: [
        {
          name: "passionate_about",
          text: "1. What Causes or Issues Are You Passionate About?",
          options: {
            cols1: ["Environmental Conservation", "Education and Youth Development"],
            cols2: ["Healthcare and Medical Services", "Construction"],
          },
          image: "/layout/images/quiz1.png", // Add the path to the image
        },
        {
          name: "skills",
          text: "2. What Skills or Talents Do You Have to Offer?",
          options: {
            cols1: ["Teaching or Tutoring", "Writing and Communication"],
            cols2: ["Event Planning and Coordination", "Building"],
          },
          image: "/layout/images/quiz2.png", // Add the path to the image
        },
        {
          name: "commitment",
          text: "3. How Much Time Can You Commit to Volunteering?",
          options: {
            cols1: ["Less than 5 hours per week", "5-10 hours per week"],
            cols2: ["10-20 hours per week", "More than 20 hours per week"],
          },
          image: "/layout/images/quiz3.png", // Add the path to the image
        },
        {
          name: "volunteering_location",
          text: "4. Are You Interested in Local or Global Volunteering?",
          options: {
            cols1: ["Local (within Singapore)"],
            cols2: ["International (outside Singapore)"],
          },
          image: "/layout/images/quiz4.png", // Add the path to the image
        },
        {
          name: "volunteering_experience",
          text: "5. What Type of Volunteering Experience Are You Seeking?",
          options: {
            cols1: ["Hands-On, Direct Interaction", "Remote or Virtual Opportunities"],
            cols2: ["Administrative or Behind-the-Scenes Roles", "No Preference"],
          },
          image: "/layout/images/quiz5.png", // Add the path to the image
        },
        {
          name: "describe",
          text: "6. Describe yourself in 100 words.",
          options: {
            cols1: [],
          },
          image: "/layout/images/quiz6.png",
        },
        {
          name: "strengths_weakness",
          text: "7. What are your strengths and weaknesses?",
          options: {
            cols1: [],
          },
          image: "/layout/images/quiz7.png",
        },
        {
          name: "purpose",
          text: "8. Why do you want to join this CSP?",
          options: {
            cols1: [],
          },
          image: "/layout/images/quiz8.png",
        },
      ],
      selectedOptions: {},
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
    updateCheckboxStyles(groupName, value) {
      if (!this.selectedOptions[groupName]) {
        this.selectedOptions[groupName] = [];
      }
      const index = this.selectedOptions[groupName].indexOf(value);
      if (index === -1) {
        this.selectedOptions[groupName].push(value);
      } else {
        this.selectedOptions[groupName].splice(index, 1);
      }
    },
    submitForm() {
      console.log("Form submitted with selected options:", this.selectedOptions);
    },
  },
};
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css");

body {
  background-color: white;
}

.carousel-indicators .active {
  background-color: #4338ca;
}

.wrapping {
  background-color: whitesmoke;
  border: 2px solid #4338ca;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
}

.carousel-item {
  text-align: center;
}

.custom-checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 15px;
  margin: 5px;
  text-align: center;
  justify-content: center;
}

.custom-checkbox-label input {
  margin-right: 10px;
}

.custom-checkbox-label.selected {
  background-color: lightblue;
  color: white;
}
</style>
