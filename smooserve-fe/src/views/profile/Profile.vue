<!--Start of Basic Form-->
<template>
  <div>
    <!-- Display User Profile -->
    <div class="user-profile" v-show="!editMode">
      <div class="card left align-items-center justify-content-center">
          <Card style="width: 25em">
          <template #header>
            <img :src="profilePicture" class="circular-crop" alt="Profile Picture" />
          </template>
          <template #title>{{ name }}</template>
          <template #subtitle>{{ email }}</template>
          <template #content>
            <p><strong>Contact Number:</strong> {{ contact }}</p>
            <p><strong>Description:</strong> {{ description }}</p>
            <p><strong>Commitments:</strong> {{ commitments.join(", ") }}</p>
          </template>
          <template #footer>
            <Button icon="pi pi-pencil" label="Edit" @click="editProfile" />
          </template>
        </Card>
      </div>
    </div>

    <!-- User Profile Form -->
    <div id="userProfile" v-show="editMode">
      <form class="row g-3" id="userDetailsForm">
        <div class="col-lg-6">
          <label for="profilePicture" class="form-label">Profile Picture:</label>
          <input
            type="file"
            class="form-control"
            id="profilePicture"
            accept="image/*"
            @change="handleProfilePictureChange"
          />
          <img :src="profilePicture" class="circular-crop" alt="Profile Picture" />
        </div>
        <div class="col-lg-6">
          <label for="name" class="form-label">Name:</label>
          <input v-model="name" type="text" class="form-control" id="name1" required />
        </div>
        <div class="col-lg-6">
          <label for="email" class="form-label">Email:</label>
          <input v-model="email" type="email" class="form-control" id="email1" required />
        </div>
        <div class="col-lg-6">
          <label for="contact" class="form-label">Contact Number:</label>
          <input v-model="contact" type="tel" class="form-control" id="contact" required />
        </div>
        <div class="col-lg-6">
          <label for="Description1" class="form-label">Describe yourself:</label>
          <textarea v-model="description" class="form-control" id="Description1" rows="5"></textarea>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
          <label for="commitment">Commitment:</label>
          <select v-model="selectedCommitment" id="commitment" name="commitment">
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </select>
          <button type="button" @click="addCommitment">Add</button>
        </div>
        <div class="pt-3 col-lg-6 col-md-6 col-sm-12 order-last">
          <button type="button" @click="updateProfile">Update Profile</button>
        </div>
      </form>

      <!-- Commitment List -->
      <div class="commitment-list">
        <ul>
          <li v-for="(commitment, index) in commitments" :key="index">
            {{ commitment }}
            <button @click="removeCommitment(index)">Remove</button>
          </li>
        </ul>
      </div>
    </div>
  
   <!-- Quiz Card -->
   <div class="quiz-card">
    <Card right style="width: 40em">
      <template #header>
        <h2>Quiz Data</h2>
      </template>
      <template #content>
        <div v-if="quizDataLoaded">
          <!-- Display quiz data fetched from the Quiz Vue component -->
          <div v-for="(question, index) in quizData.questions" :key="index">
            <h4>Question {{ index + 1 }}</h4>
            <p>{{ question.text }}</p>
            <!-- Display answer options -->
            <ul>
              <li v-for="(answer, aIndex) in question.answers" :key="aIndex">
                <input type="radio" :id="`q${index}_a${aIndex}`" :name="`q${index}`" />
                <label :for="`q${index}_a${aIndex}`">{{ answer.text }}</label>
              </li>
            </ul>
          </div>
        </div>
        <div v-else>
          <p>Loading quiz data...</p>
        </div>
      </template>
      <template #footer>
        <Button label="Take Quiz Again" @click="takeQuizAgain" />
      </template>
    </Card>
  </div>
</div>

  <!--Registered CSPs-->
  <h2>Registered-CSP</h2>
      <div id="noRegisteredCspMessage" style="display: none;">There are no registered CSPs.</div>
      <section class="registeredCSP">
      <table class="registered-CSP-table">
          <thead>
              <tr>
                  <th>Registered CSP </th>
                  <th>CSP Contact</th>
                  <th>Status</th>
                  <th>Schedule Interview</th>
              </tr>
          </thead>
          <tbody>
              <!-- Example CSP entry -->
              <tr>
                  <td>CSP Name</td>
                  <td>CSP Contact Information</td>
                  <td>Pending</td>
                  <td>
                      <button @click="showScheduleDropdown(this)">Schedule Interview</button>
                      <div class="schedule-dropdown" style="display: none;">
                          <label for="interviewTime">Select Time Slot:</label>
                          <select id="interviewTime">
                              <option value="9:00 AM">9:00 AM</option>
                              <option value="10:00 AM">10:00 AM</option>
                              <!-- Add more time slots as needed -->
                          </select>
                          <button @click="scheduleInterview(this)">Schedule</button>
                      </div>
                  </td>
              </tr>
              <!-- More CSP entries... -->
          </tbody>
      </table>
      
          <tbody>
              <!-- Add upcoming interview data here -->
          </tbody>
  </section>
  <!-- Favourites Tab -->
  <div>
    <h2>Favourites</h2>
  </div>
  
  <div class="card">
    <TabView>
      <TabPanel v-for="tab in tabs" :key="tab.title" :header="tab.title">
        <ShopCarousel v-if="tab.title === 'Smooserve Shops'" :shops="shops" />
        <CSPCarousel v-if="tab.title === 'CSPs'" :csps="csps" />
        <p class="m-0" v-else>{{ tab.content }}</p>
      </TabPanel>
    </TabView>
  </div>
  <div id="noFavoritesMessage" style="display: none;">You have no favorites currently.</div>

 

</template>

<script>
import { ref } from 'vue';
import Card from 'primevue/card';
import TabMenu from 'primevue/tabmenu';
import TabPanel from 'primevue/tabpanel'; 
import Tag from 'primevue/tag'; 
import Button from 'primevue/button';
import ShopCarousel from './ShopCarousel.vue';
import CSPCarousel from './CSPCarousel.vue';

export default {
components: {
  ShopCarousel,
  CSPCarousel,
},

setup() {
  const profilePicture = ref('');
  const name = ref('');
  const email = ref('');
  const contact = ref('');
  const description = ref('');
  const selectedCommitment = ref('');
  const commitments = ref(['']);
  const editMode = ref(false);
  const tabs = ref([
    {
      title: 'Smooserve Shops',
      content: '',
    },
    {
      title: 'CSPs',
      content: '',
    },
  ]);

  const addCommitment = () => {
    if (selectedCommitment) {
      commitments.value.push(selectedCommitment.value);
      selectedCommitment.value = '';
    }
  };

  const removeCommitment = (index) => {
    commitments.value.splice(index, 1);
  };

  const updateProfile = () => {
    editMode.value = false;
  };

  const editProfile = () => {
    editMode.value = true;
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      profilePicture.value = URL.createObjectURL(file);
    }
  };

  // Dummy data for shops and csps
  const shops = ref([
    { name: 'Shop 1', price: 100, inventoryStatus: 'INSTOCK', image: 'image1.jpg' },
    { name: 'Shop 2', price: 120, inventoryStatus: 'LOWSTOCK', image: 'image2.jpg' },
    // Add more shop data as needed
  ]);

  const csps = ref([
    { name: 'CSP 1', price: 50, inventoryStatus: 'INSTOCK', image: 'csp1.jpg' },
    { name: 'CSP 2', price: 70, inventoryStatus: 'LOWSTOCK', image: 'csp2.jpg' },
    // Add more CSP data as needed
  ]);

  return {
    profilePicture,
    name,
    email,
    contact,
    description,
    selectedCommitment,
    commitments,
    addCommitment,
    removeCommitment,
    updateProfile,
    editProfile,
    handleProfilePictureChange,
    editMode,
    tabs,
    shops,
    csps,
  };
},
};
// Hide the "Registered CSP" table initially
const registeredCspTable = document.querySelector('.registered-CSP');
const noRegisteredCspMessage = document.getElementById('noRegisteredCspMessage'); // Get the message element

// Example data fetching logic (replace with your actual data fetching)
fetch('get_registered_csp_data.php') // Replace with your actual data source URL
  .then(response => response.json())
  .then(data => {
      // Check if there is data
      if (data.length > 0) {
          // There are registered CSPs, hide the message and display the table
          noRegisteredCspMessage.style.display = 'none';
          registeredCspTable.style.display = 'table'; // Display the table

          // Get the table body
          const tableBody = registeredCspTable.querySelector('tbody');

          // Clear previous content
          tableBody.innerHTML = '';

          // Iterate through the data and create rows
          data.forEach(item => {
              const row = tableBody.insertRow();
              const cell1 = row.insertCell(0);
              const cell2 = row.insertCell(1);
              const cell3 = row.insertCell(2);
              const cell4 = row.insertCell(3);

              cell1.textContent = item.cspName; // Replace with your actual data property
              cell2.textContent = item.registeredDate; // Replace with your actual data property
              cell3.textContent = item.cspContact; // Replace with your actual data property
              cell4.textContent = item.status; // Replace with your actual data property
          });
      } else {
          // There are no registered CSPs, display the message and hide the table
          noRegisteredCspMessage.style.display = 'block';
          registeredCspTable.style.display = 'none';
      }
  })
  .catch(error => {
      console.error('Error fetching registered CSP data:', error);
      // Handle the error here
      noRegisteredCspMessage.style.display = 'block';
      registeredCspTable.style.display = 'none';
  });

  function showScheduleDropdown(button) {
      const dropdown = button.nextElementSibling; // Get the sibling div containing the dropdown
      dropdown.style.display = "block";
  }
  
  function scheduleInterview(button) {
      const dropdown = button.parentNode; // Get the parent div containing the dropdown
      const selectedTimeSlot = dropdown.querySelector("#interviewTime").value;
      const cspName = button.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent; // Get CSP name
  
      // Send scheduling information to the CSP organization (You can use AJAX or other methods)
  
      // Example: Display a confirmation message
      alert(`Scheduled an interview with ${cspName} on ${selectedTimeSlot}`);
  }
  const statusCells = document.querySelectorAll("td:nth-child(4)"); // Select all "Status" cells

  statusCells.forEach(statusCell => {
      if (statusCell.textContent === "Accepted") {
          const buttonCell = statusCell.nextElementSibling; // Get the cell with the button
          buttonCell.innerHTML = ""; // Remove the button
      }
  });
</script>

<style scoped>
.circular-crop {
width: 150px;
height: 150px;
border-radius: 50%;
object-fit: cover;
margin: 0 auto;
display: block;
}

/* CSS for the "Schedule Interview" button */
.schedule-button {
position: relative;
}

/* Style for tables */
table {
width: 100%;
border-collapse: collapse;
}

th, td {
border: 1px solid black;
padding: 8px;
}

th {
background-color: #f2f1f1;
}

.user-profile,
.quiz-card {
flex: 1;
margin: 10px; /* Adjust the margin as needed */
display: flex;
flex-direction: column;
align-items: center;
}

.user-profile {
margin-right: 5px; /* Adjust the margin between cards */
}

.quiz-card {
margin-left: 5px; /* Adjust the margin between cards */
}
</style>

<!-- End of Basic Profile -->