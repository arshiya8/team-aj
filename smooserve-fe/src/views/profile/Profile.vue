<!--Start of Basic Form-->
<template>
  <div>
    <!-- Include NavBar component here -->
  </div>
  <main class="crypto_bg">
    <div class='flex-container'>
      <!-- Display User Profile -->
      <div class="flex-child user-profile" v-show="!editMode">
        <div class="card align-items-center justify-content-center">
          <Card style="width: 25em">
            <template #header>
              <img :src="profilePicture" class="circular-crop" alt="Profile Picture" />
            </template>
            <template #title>{{ first_name }}</template>
            <template #subtitle>{{ email }}</template>
            <template #content>
              <p v-if="contact"><strong>Contact Number:</strong> {{ contact }}</p>
              <p v-if="description"><strong>Description:</strong> {{ description }}</p>
              <!-- <p v-if="commitments && commitments.length > 0"><strong>Commitments:</strong> {{ commitments.join(", ") }}</p> -->
              <!-- <p v-else><strong>Commitments:</strong> {{ commitments }}</p> -->
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
            <input type="file" class="form-control" id="profilePicture" accept="image/*"
              @change="handleProfilePictureChange" />
            <img :src="profilePicture" class="circular-crop" alt="Profile Picture" />
          </div>
          <div class="col-lg-6">
            <label for="name" class="form-label">Name:</label>
            <input v-model="first_name" type="text" class="form-control" id="name1" required />
          </div>
          <div class="col-lg-6">
            <label for="contact" class="form-label">Contact Number:</label>
            <input v-model="contact" type="tel" class="form-control" id="contact" required />
          </div>
          <!-- <div class="col-lg-6">
            <label for="Description1" class="form-label">Describe yourself:</label>
            <textarea v-model="description" class="form-control" id="Description1" rows="5"></textarea>
          </div> -->
          <!-- <div class="col-lg-6 col-md-6 col-sm-12">
            <label for="commitment">Commitment:</label>
            <select v-model="selectedCommitment" id="commitment" name="commitment">
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
            </select>
            <button type="button" @click="addCommitment">Add</button>
          </div> -->
          <div class="pt-3 col-lg-6 col-md-6 col-sm-12 order-last">
            <button type="button" @click="updateProfile">Update Profile</button>
          </div>
        </form>

        <!-- Commitment List -->
        <!-- <div class="commitment-list">
          <ul>
            <li v-for="(commitment, index) in commitments" :key="index">
              {{ commitment }}
              <button @click="removeCommitment(index)">Remove</button>
            </li>
          </ul>
        </div> -->
      </div>

      <!-- Quiz Card -->
      <div class="flex-child quiz">
        <Card style="width: 25em">
          <template #header>
            <h2>Quiz Data</h2>
          </template>
          <template #content>
            <div v-if="quizPreference">
              <!-- Display quiz data fetched from the Quiz Vue component -->
              <p><strong>Commitment:</strong> {{ quizPreference.commitment }}</p>
              <p v-if="quizPreference.passionate_about.length > 0"><strong>Passionate About:</strong> {{
                quizPreference.passionate_about.join(', ') }}</p>
              <p v-else><strong>Passionate About:</strong> {{ quizPreference.passionate_about }}</p>
              <p><strong>Self Awareness:</strong> {{ quizPreference.self_awareness }}</p>
              <p><strong>Self Description:</strong> {{ quizPreference.self_description }}</p>
              <p v-if="quizPreference.skills.length > 0"><strong>Skills:</strong> {{ quizPreference.skills.join(', ') }}
              </p>
              <p v-else><strong>Skills:</strong> {{ quizPreference.skills }}</p>
              <p v-if="quizPreference.volunteering_experience.length > 0"><strong>Volunteering Experience:</strong> {{
                quizPreference.volunteering_experience.join(', ') }}</p>
              <p v-else><strong>Volunteering Experience:</strong> {{ quizPreference.volunteering_experience }} </p>
              <p v-if="quizPreference.volunteering_location.length > 0"><strong>Volunteering Location:</strong> {{ quizPreference.volunteering_location.join(', ') }}</p>
              <p v-else><strong>Volunteering Location:</strong> {{ quizPreference.volunteering_location }}</p>
            </div>
            <div v-else>
              <p>Loading quiz data...</p>
            </div>
          </template>
          <template #footer>
            <router-link :to="{ name: 'Quiz' }"><Button label="Take Quiz Again" @click="takeQuizAgain" /></router-link>
          </template>
        </Card>
      </div>
    </div>
  </main>
  <!--Registered CSPs-->
  <section class="registeredCSP">
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
  </section>
  <!-- Favourites Tab -->
  <div style="background-color: antiquewhite;">
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
import { ref, onMounted } from 'vue';
import Card from 'primevue/card';
import TabMenu from 'primevue/tabmenu';
import Tag from 'primevue/tag';
import TabPanel from 'primevue/tabpanel';
import Button from 'primevue/button';
import ShopCarousel from '../../components/ShopCarousel.vue';
import CSPCarousel from '../../components/CSPCarousel.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import axios from 'axios';
//import NavBar from 'NavBar.vue'; 

export default {
  components: {
    ShopCarousel,
    CSPCarousel,
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
    const first_name = ref('');
    const quizPreference = ref(['']);
    const favCSPs = ref([]);
    // const selectedCommitment = ref('');
    // const commitments = ref(['']);
    let studentId = null;
    const auth = getAuth();
    const profilePicture = ref('');
    const name = ref('');
    const email = ref('');
    const contact = ref('');
    // const description = ref('');
    // const selectedCommitment = ref('');
    // const commitments = ref(['']);
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

    onAuthStateChanged(auth, async (student) => {
      if (student) {
        try {
          const querySnapshot = await getDocs(collection(db, "students"));
          querySnapshot.forEach((doc) => {
            const studentEmail = doc.data().email;
            if (studentEmail === student.email) {
              studentId = doc.id;
            }
          });

          // If studentId is still null, no matching email was found in the collection
          if (studentId === null) {
            console.log("No matching id found in the database.");
          } else {
            console.log("Student ID found:", studentId);
            const response = await axios.get(`http://localhost:8080/api/student/${studentId}`, {
            });
            first_name.value = response.data.first_name;
            email.value = response.data.email;
            contact.value = response.data.contact;
            quizPreference.value = response.data.quizPreference;
            favCSPs.value = response.data.favoriteCsps;
            console.log(response.data)

          }
        } catch (error) {
          console.error(error);

        }
      } else {
        localStorage.remove('userProfile');
        studentId = null;

      }
    });

    const updateProfile = async () => {
      try {
        const response = await axios.put(`http://localhost:8080/api/student/${studentId}`, {
          first_name: first_name.value,
          email: email.value,
          contact: contact.value,
        });
        console.log(response.data); // Handle the response from the server if needed
        localStorage.setItem('userProfile', JSON.stringify({
          first_name: first_name.value,
          email: email.value,
          contact: contact.value,
        }));
        editMode.value = false;
      } catch (error) {
        console.error(error);
        // Handle errors if the update fails
      }
    };
    // onMounted(() => {
    //   const storedProfile = localStorage.getItem('userProfile');
    //   console.log(storedProfile)
    //   if (storedProfile) {
    //     const parsedProfile = JSON.parse(storedProfile);
    //     first_name.value = parsedProfile.first_name;
    //     email.value = parsedProfile.email;
    //     contact.value = parsedProfile.contact;
    //   }
    // });

    // const addCommitment = () => {
    //   if (selectedCommitment) {
    //     commitments.value.push(selectedCommitment.value);
    //     selectedCommitment.value = '';
    //   }
    // };

    // const removeCommitment = (index) => {
    //   commitments.value.splice(index, 1);
    // };

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
      first_name,
      email,
      quizPreference,
      favCSPs,
      contact,
      // description,
      // selectedCommitment,
      // commitments,
      // addCommitment,
      // removeCommitment,
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
.crypto_bg {
  background: linear-gradient(#064273, white)
}

.flex-container {
  display: flex;
  padding-top: 3%;
  padding-bottom: 3%;
}

.flex-child {
  flex: 1;
  margin-left: 5%;
  margin-right: 5%;

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