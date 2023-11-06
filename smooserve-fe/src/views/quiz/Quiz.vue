<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { onMounted, ref, computed } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import axios from 'axios';

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
      questionsAnswered: new Set(),
      allQuestionsAnswered: false,
      auth: getAuth(),
      studentId: null,      
      showAlertModal: false, // Add this property to control the alert modal
      progress: 0, // Add this property to track completion progress

      questions: [
        {
          name: "first_name",
          text: "1. What is your first name?",
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
          name: "teleHandle",
          text: "3. What is your telegram handle?",
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
              "Environment",
              "Education",
              "Youth Development"
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
              "Teaching",
              "Event Planning",
              "Communication",
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
          text: "10. Describe yourself briefly.",
          type: "open-ended",
          background: "../../layout/images/quiz10.png",
          character_limit: 1000,
          response: ''
        },
        {
          name: "past_experience",
          text: "11. What are your past volunteering experiences?",
          type: "open-ended",
          background: "../../layout/images/quiz11.png",
          character_limit: 1000,
          response: ''
        },
      ],
    };
  },
  // setup() {
  //   const auth = getAuth();
  //   // let studentId = null;
  //   onAuthStateChanged(auth, async (student) => {
  //     if (student) {
  //       try {
  //         const querySnapshot = await getDocs(collection(db, "students"));
  //         querySnapshot.forEach((doc) => {
  //           const studentEmail = doc.data().email;
  //           if (studentEmail === student.email) {
  //             this.studentId = doc.id;
  //           }
  //         });
  //         // If studentId is still null, no matching email was found in the collection
  //         if (this.studentId === null) {
  //           console.log("No matching email found in the database.");
  //         } else {
  //           console.log("Student ID found:", studentId);
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     } else {
  //       this.studentId = null;
  //     }
  //   });

  
  // },
  mounted(){
    const auth = getAuth();
    // let studentId = null;
    onAuthStateChanged(auth, async (student) => {
      if (student) {
        try {
          const querySnapshot = await getDocs(collection(db, "students"));
          querySnapshot.forEach((doc) => {
            const studentEmail = doc.data().email;
            if (studentEmail === student.email) {
              this.studentId = doc.id;
            }
          });
          // If studentId is still null, no matching email was found in the collection
          if (this.studentId === null) {
            console.log("No matching email found in the database.");
          } else {
            console.log("Student ID found:", this.studentId);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        this.studentId = null;
      }
    });

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
        const currentQuestionData = this.questions[this.currentQuestion];
        const isNextButtonDisabled = this.isNextButtonDisabled;

        if (isNextButtonDisabled) {
          this.showAlertModal = true; // Show the alert modal
          return; // Prevent moving to the next question
        }

        // ... Your existing nextQuestion logic ...
        this.currentQuestion++;
        this.updateBackground();
        this.progress = this.completionPercentage; // Update the progress
      }
    },

    updateBackground() {
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

      // Add a log statement to see which question was answered
      console.log("Answered question:", groupName);

      // Update the questionsAnswered set
      this.questionsAnswered.add(groupName);
    },

    updateResponse(groupName, value, questionType) {
      if (questionType === "multi-select") {
        this.updateMultiSelect(groupName, value);
      } else if (questionType === "single-select") {
        this.selectedOptions[groupName] = value;
      } else {
        this.selectedOptions[groupName] = this.questions[value].response;
      }

      // Add a log statement to see which question was answered
      console.log("Answered question:", this.questions[this.currentQuestion].name);

      // Update the questionsAnswered set
      this.questionsAnswered.add(groupName);
    },

    isQuestionAnswered(questionName) {
      return this.questionsAnswered.has(questionName);
    },

    submitForm() {
      // Check if all questions have been answered
      this.allQuestionsAnswered = this.questions.every(question => this.questionsAnswered.has(question.name));

      if (this.allQuestionsAnswered) {
        console.log("Form submitted with selected options:");
        Object.entries(this.selectedOptions).forEach(([k, v]) => {
          console.log("The key: ", k);
          console.log("The value: ", v);
        });

        this.submitted = true;
        this.showHomepageButton = true;
        console.log(this.selectedOptions);
        this.updateStudent(this.selectedOptions);
      }
    },
    async updateStudent(data) {
      
      try {
        // Ensure userId is not null before making the API request
        if (this.studentId != null) {
          const response = await axios.put(`https://smooserve-be.vercel.app/api/student/${this.studentId}`, {
            quizPreference: data,
          });
          console.log(response.data);
        } else {
          console.error('User is not authenticated.');
        }
      } catch (error) {
        console.error('Error updating quiz preference:', error);
      }
    }

  },

  computed: {

    isSubmitButtonVisible() {
      return this.allQuestionsAnswered && this.currentQuestion === this.questions.length - 1;
    },

    isNextButtonDisabled() {
      const currentQuestion = this.questions[this.currentQuestion];

      if (currentQuestion.type === "open-ended") {
        return !currentQuestion.response.trim();
      } else if (currentQuestion.type === "single-select") {
        return !this.selectedOptions[currentQuestion.name];
      } else if (currentQuestion.type === "multi-select") {
        return !this.selectedOptions[currentQuestion.name] || this.selectedOptions[currentQuestion.name].length === 0;
      }

      return false; // Enable the "Next" button by default
    },

    completionPercentage() {
      return (this.currentQuestion / (this.questions.length - 1)) * 100;
    },

  },
  

};
</script>


<template>
  <!-- Background image -->
  <div id="bg" :style="backgroundImage">

    <!-- Smooserve logo -->
    <a href="#" style="display: flex; justify-content: center; align-items: center;">
      <img src="/layout/images/logo-white.png" height="80" class="mr-0 lg:mr-2" />
    </a>

    <!-- Container for header -->
    <div class="header-container">
      <h1>CSP PREFERENCE QUIZ</h1>
    </div>

    <!-- Container for quiz content -->
    <div class="container c1 col-xxl-4 col-xl-5 col-lg-6 col-md-7 col-sm-8 col-10">

      <div v-if="showAlertModal" class="alert-modal">
        <div class="alert-content">
          <p>Please fill in the required fields.</p>
          <button @click="showAlertModal = false">OK</button>
        </div>
      </div>

      <form @submit.prevent="submitForm" class="w-full">

        <div class="progress-container">
          <div class="progress-bar" :style="{ width: completionPercentage + '%' }"></div>
        </div>

        <div>
          <!-- Display the current question -->
          <h2 style="text-align: left;" class="pl-3">{{ questions[currentQuestion].text }}</h2>

          <!-- Display question options or text area -->
          <div>
            <table v-if="questions[currentQuestion].type === 'multi-select'" class="w-full">
              <tr class="wrapping custom-radio-label" @click="updateMultiSelect(questions[currentQuestion].name, option)"
                :class="{
                  selected:
                    questions[currentQuestion].name in selectedOptions &&
                    selectedOptions[questions[currentQuestion].name].indexOf(option) >= 0,
                }" v-for="(option, optionIndex) in questions[currentQuestion].options.cols"
                style="display: flex; flex-direction: row;">
                <td :key="optionIndex" class="w-100 row-option text-align-start" :style="{
                  backgroundColor: questions[currentQuestion].name in selectedOptions &&
                    selectedOptions[questions[currentQuestion].name].indexOf(option) >= 0
                    ? 'rgb(107, 161, 237)' // Highlight background color for selected option
                    : 'transparent' // Background color for unselected options
                }">
                  {{ option }}</td>
                <td class="row-checkbox text-align-end">
                  {{
                    questions[currentQuestion].name in selectedOptions &&
                    selectedOptions[questions[currentQuestion].name].indexOf(option) >= 0
                    ? '✓'
                    : ''
                  }}
                </td>
              </tr>
            </table>

            <table v-else-if="questions[currentQuestion].type === 'single-select'" class="w-full">
              <tr class="wrapping custom-radio-label"
                @click="updateResponse(questions[currentQuestion].name, option, questions[currentQuestion].type)" :class="{
                  selected: selectedOptions[questions[currentQuestion].name] === option,
                }" v-for="(option, optionIndex) in questions[currentQuestion].options.cols"
                style="display: flex; flex-direction: row; align-items: center; cursor: pointer;">
                <td :key="optionIndex" class="w-full row-option text-align-start" :style="{
                  backgroundColor: selectedOptions[questions[currentQuestion].name] === option
                    ? 'rgb(107, 161, 237)' // Highlight background color for selected option
                    : 'transparent' // Background color for unselected options
                }">{{ option }}</td>
                <td class="row-checkbox text-align-end">
                  {{ selectedOptions[questions[currentQuestion].name] === option ? '✓' : '' }}
                </td>
              </tr>
            </table>

            <div v-else style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
              <span class="p-float-label w-full mt-3 mx-2">
                <Textarea v-model="questions[currentQuestion].response" :rows="10"
                  :maxlength="questions[currentQuestion].character_limit" class="w-full"
                  style="resize: none; width: auto;"
                  @mouseout="updateResponse(questions[currentQuestion].name, currentQuestion, questions[currentQuestion].type)" />
                <label>Enter response here</label>
              </span>
            </div>
          </div>

          <!-- Back and Next buttons for each question -->
          <div class="d-flex justify-content-between my-3 mx-2">
            <Button v-if="currentQuestion > 0" type="button" label="Back" @click="prevQuestion" class="mr-2"></Button>
            <div v-else></div> <!-- Render nothing in place of "Back" button on the first question -->
            <Button v-if="currentQuestion < questions.length - 1" type="button" label="Next" @click="nextQuestion"
              class="ml-2" :disabled="isNextButtonDisabled"></Button>
            <Button v-if="currentQuestion === questions.length - 1" type="submit" label="Submit"></Button>
            <!-- Render "Submit" button only on the last question -->
          </div>

          <!-- "Take Me to Homepage" button -->
          <router-link v-if="showHomepageButton" :to="{ name: 'Profile' }">
            <Button label="Take Me To My Profile"></Button>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>


<style>
#bg {
  background-size: auto 100%;
  background-position: center top;
  width: 100%;
  height: 100vh;
  position: relative;
}

.header-container {
  text-align: center;
  color: black;
  font-size: 25px;
  /* background-color: rgba(255, 255, 255, 0.7); */
  /* Add a semi-transparent background color */
}

/* body {
  background-color: #f7f7f7;
  /* Light gray background */
  /* font-family: Arial, sans-serif; */
  /* Change the font to a sans-serif font like Arial 
} */

/* Style the container c1 */
.container {
  display: flex;
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

/* alert */
.alert-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.alert-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.alert-content button {
  margin-top: 10px;
}

/* progress bar */
.progress-container {
  background-color: #eaeaea;
  /* Light gray background for the progress bar container */
  height: 20px;
  /* Set your desired height */
  border-radius: 10px;
  /* Rounded corners */
  margin-bottom: 10px;
}

.progress-bar {
  background-color: #6ba1ed;
  /* Color of the progress bar */
  height: 100%;
  /* Match the container's height */
  border-radius: 10px;
  /* Rounded corners */
  transition: width 0.3s;
  /* Add a smooth transition for the width changes */
}
</style>
