<template>
  <div>
    <!-- Include NavBar component here -->
    <NavBar />
  </div>
  <main class="crypto_bg">
    <!-- Display User Profile -->
    <div class="center-container">
      <div class="user-profile" v-show="!editMode">
        <div class="card">
          <img :src="profilePicture" class="circular-crop" alt="Profile Picture" />
          <Card style="width: 75em;">
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
    </div>


    <!-- User Profile Form -->
    <div id="userProfile" v-show="editMode">
      <form class="row g-3" id="userDetailsForm"> 
        <div class="col-lg-6">
          <label for="profilePicture" class="form-label">Profile Picture:</label>
          <input type="file" style="display: none" id="profilePicture" accept="image/*"
            @change="handleProfilePictureChange" />
          <!-- Create a custom PrimeVue-styled button -->
          <Button @click="selectFile" severity="success">
            <i class="pi pi-upload"></i> Choose File
          </Button>
          <img :src="profilePicture" class="circular-crop" alt="Profile Picture" />
        </div>
        <div class="grid p-fluid center-container">
          <div class="col-12 md:col-5">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-user"></i>
              </span>
              <InputText placeholder="Name" v-model="name" type="text" class="form-control" id="name1" required />
            </div>
          </div>

          <div class="col-12 md:col-5">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-phone"></i>
              </span>
              <InputText placeholder="Contact Number" v-model="contact" type="tel" class="form-control" id="contact"
                required />
              <span class="p-inputgroup-addon"></span>
            </div>
          </div>

          <div class="col-12 md:col-5">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon"><i class="pi pi-envelope"></i></span>
              <InputText placeholder="Email" v-model="email" type="email" class="form-control" id="email1" required />
            </div>
          </div>
        
        <div class="col-12 md:col-5">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-pencil"></i>
            </span>
            <InputText placeholder="Description" v-model="description" class="form-control" id="Description1" rows="5" />
          </div>
        </div>
      </div>
    <div class="col-12 md:col-5 center-container">
      <label for="commitment">Commitment:</label>
      <select v-model="selectedCommitment" id="commitment" name="commitment">
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
      </select>
      <Button type="button" @click="addCommitment">Add</button>
    </div>
    <div class="col-12 md:col-5 right-align-div">
      <Button type="button" @click="updateProfile">Update Profile</button>
    </div>
  </form>
  
    <!-- Commitment List -->
    <div class="commitment-list">
      <ol style="padding-left:100px">
        <li v-for="(commitment, index) in commitments" :key="index">
          {{ commitment }}
          <Button @click="removeCommitment(index)" severity="danger">Remove</button>
        </li>
      </ol>
    </div>
  </div>
  </main>

  <TabView>
    <!-- Quiz Tab -->
    <TabPanel header="Quiz Data">
      <div class="quiz" style="background-color: antiquewhite;">
        <h2>Quiz Data</h2>
      </div>
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
      <Button label="Take Quiz Again" @click="takeQuizAgain" />

    </TabPanel>

    <!-- Registered CSPs Tab -->
    <TabPanel header="Registered CSPs">
      <div style="background-color: antiquewhite;">
        <h2>Registered CSPs</h2>
      </div>
      <table class="registered-CSP-table">
        <thead>
          <tr>
            <th>Registered CSP</th>
            <th>CSP Contact</th>
            <th>Status</th>
            <th>Schedule Interview</th>
          </tr>
        </thead>
        <template v-if="registeredCSPs.length > 0">
          <tbody>
            <!-- Example CSP entry -->
            <tr v-for="(csp, index) in registeredCSPs" :key="index">
              <td>{{ csp.cspName }}</td>
              <td>{{ csp.cspContact }}</td>
              <td>{{ csp.status }}</td>
              <td>
                <Dropdown v-model="csp.selectedTimeSlot" :options="csp.availableTimeSlots" optionLabel="time"
                  placeholder="Select Time Slot" class="p-dropdown">
                  <template #selected>
                    {{ csp.selectedTimeSlot || 'Select Time Slot' }}
                  </template>
                </Dropdown>
              </td>
            </tr>
            <!-- More CSP entries... -->
          </tbody>
        </template>
        <template v-else>
          <div>
            <!-- Show this message when there are no registered CSPs -->
            There are no registered CSPs.
          </div>
        </template>
      </table>
      <tbody>
        <!-- Add upcoming interview data here -->
      </tbody>
    </TabPanel>

    <!-- Favorites Tab -->
    <TabPanel header="Favorites">
      <div style="background-color: antiquewhite;">
        <h2>Favorites</h2>
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
    </TabPanel>
  </TabView>

  <!-- ... rest of your code ... -->
</template>

<script>
import { ref } from 'vue';
import Card from 'primevue/card';
import Textarea from 'primevue/textarea';
import TabMenu from 'primevue/tabmenu';
import TabPanel from 'primevue/tabpanel';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import ShopCarousel from './ShopCarousel.vue';
import CSPCarousel from './CSPCarousel.vue';
import NavBar from "/src/components/NavBar.vue";
import InputText from 'primevue/inputtext';


export default {
  components: {
    ShopCarousel,
    CSPCarousel,
    NavBar,
  },
  methods: {
    selectFile() {
      // Trigger the file input when the button is clicked
      document.getElementById('profilePicture').click();
    },
    // ... Your existing methods ...
  },

  setup() {
    const registeredCSPs = ref([
      {
        cspName: 'CSP Name 1',
        cspContact: 'CSP Contact Information 1',
        status: 'Pending',
        availableTimeSlots: [
          { time: 'Monday 12:30pm' },
          { time: 'Tuesday 8:30am' },],
        selectedTimeSlot: '',
      },
      {
        cspName: 'CSP Name 2',
        cspContact: 'CSP Contact Information 2',
        status: 'Accepted',
      },
      {
        cspName: 'CSP Name 3',
        cspContact: 'CSP Contact Information 3',
        status: 'Pending',
        availableTimeSlots: [
          { time: 'Wednesday 4:30pm' },
          { time: 'Thursday 10:30am' },],
        selectedTimeSlot: '',
      },
      // Add more fake data objects as needed
    ]);
    const profilePicture = ref('');
    const name = ref('');
    const email = ref('');
    const contact = ref('');
    const description = ref('');
    const selectedCommitment = ref(null);
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
      registeredCSPs, // Replace with your CSP data
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
  // Get the parent row containing the button and dropdown
  const row = button.parentElement.parentElement;

  // Find the dropdown within the row
  const dropdown = row.querySelector(".schedule-dropdown");

  // Toggle the visibility of the dropdown
  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
  } else {
    dropdown.style.display = "block";
  }
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

.right-align-div {
  float: right;
  padding-right: 100px;
}
.center-container {
  display: flex;
  justify-content: center;
  /* Center horizontally */
  align-items: center;
  /* Center vertically */
  /* Adjust the height as needed */
}


.crypto_bg {
  background: linear-gradient(#064273, white)
}


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

th,
td {
  border: 1px solid black;
  padding: 8px;
}

th {
  background-color: #f2f1f1;
}
</style>

<!-- End of Basic Profile -->