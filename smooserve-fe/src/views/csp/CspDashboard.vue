<template>
    <Toast></Toast>
  <div v-if="loading" class="card">
    <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
  </div>
  <div v-else>
    <h1>Volunteer Organizations</h1>
    <nav>
      <div class="card" style="background-color: #76c6b4">
        <TabView>
          <TabPanel header="Dashboard">
            <p class="line-height-3 m-0">
            <section id="dashboard">
              <h2>Dashboard</h2>
              <div id="dashboard">
                <!-- Import calendar Vue component here -->
                <CalendarComponent />
              </div>
            </section>
            </p>
          </TabPanel>
          <TabPanel header="Views">
            <p class="line-height-3 m-0">
            <section id="views">
              <h2>Views</h2>
              <p>Number of views: <span>{{ pageViewCount }}</span></p>
            </section>
            </p>
          </TabPanel>
          <TabPanel header="Signups">
            <section id="signups">
              <h2>Sign Ups</h2>
              <div class="card">
        <DataTable :value="registeredStudents" tableStyle="min-width: 50rem">
            <template #header>
                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                    <span class="text-xl text-900 font-bold">Students</span>
                    <Button icon="pi pi-refresh" rounded raised />
                </div>
            </template>
            <Column field="email" header="Email"></Column>
            <Column field="status" header="Status"></Column>
            <Column header="Action">
              <template #body="slotProps">
                <!-- if registered -->
                <Button v-if="slotProps.data.status=='registered'" rounded label="Schedule Interview" />
                <!-- if scheduled -->
                <Button v-if="slotProps.data.status=='scheduled'" rounded severity="success" label="Accept" />
                    <Button v-if="slotProps.data.status=='scheduled'" rounded severity="danger" label="Reject" />
                </template>
            </Column>
            <template #footer> In total there are {{ registeredStudents ? registeredStudents.length : 0 }} students. </template>
        </DataTable>
    </div>
              <table id="studentTable">
                <tr>
                  <th>Student Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                <tr v-for="student in students" :key="student.id">
                  <td @click="showStudentProfile(student)" @close-profile="clearStudentProfile">{{ student.name }}</td>
                  <td>
                    <span v-if="student.status === 'Enrolled'">{{ student.status }}</span>
                    <span v-else-if="student.status === 'Pending'">{{ student.status }}</span>
                    <span v-else>{{ student.status }}</span>
                  </td>
                  <td>
                    <Button @click="rejectStudent(student)">Reject</button>
                  </td>
                </tr>
              </table>
              <StudentProfile :student="showProfile" @close-profile="clearStudentProfile" />
            </section>
          </TabPanel>
          <TabPanel header="Schedule">
            <section id="schedule">
              <h2>Schedule</h2>
              <div id="calendar" style="background-color: #def3f6;">
                <h1>Interview Scheduler</h1>
                <label for="event">Event Name:</label>
                <input v-model="newEvent.eventName" type="text" id="event" placeholder="Event name">
                <label for="date">Date:</label>
                <input v-model="newEvent.date" type="date" id="date">
                <label for="startTime">Start Time:</label>
                <input v-model="newEvent.startTime" type="time" id="startTime">
                <label for="endTime">End Time:</label>
                <input v-model="newEvent.endTime" type="time" id="endTime">
                <button @click="addEvent">Add Event</button>
                <table>
                  <tr>
                    <th>Date</th>
                    <th>Event</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                  </tr>
                  <tr v-for="event in events" :key="event.id">
                    <td>{{ event.date }}</td>
                    <td>{{ event.eventName }}</td>
                    <td>{{ event.startTime }}</td>
                    <td>{{ event.endTime }}</td>
                  </tr>
                </table>
              </div>
            </section>
          </TabPanel>
        </TabView>
      </div>
    </nav>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import Button from 'primevue/button';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import CalendarComponent from './CSPCalender.vue';
import StudentProfile from './StudentProfile.vue'; // Adjust the path if needed
import axios from "axios";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, addDoc, doc, limit } from "firebase/firestore";
import { useToast } from "primevue/usetoast";
import { db } from "@/firebase";

export default {
  components: {
    CalendarComponent,
    StudentProfile,
  },
  created() {
    this.incrementViewCount();
  },
  data() {
    return {
      pageViewCount: 0,
      students: [
        { id: 1, name: 'John Doe', status: 'Enrolled' },
        { id: 2, name: 'Jane Smith', status: 'Pending' },
        { id: 3, name: 'Bob Johnson', status: 'Rejected' },
        // Add more dummy data as needed
      ],
      students_Profile: [
        { id: 1, name: 'John Doe', contact: '91234568', email: 'johndoe@gmail.com', desc: 'I am John' },
        { id: 2, name: 'Jane Smith', contact: '81234567', email: 'janesmith@gmail.com', desc: 'I am Jane' },
        { id: 3, name: 'Bob Johnson', contact: '98765432', email: 'bobjohnson@gmail.com', desc: 'I am Bob' },
        // Add more dummy data as needed
      ],
      newEvent: {
        eventName: '',
        date: '',
        startTime: '',
        endTime: '',
      },
      events: [],
      showProfile: null, // Added showProfile data
      loading: false,
      registeredStudents: null
    };
  },
  mounted() {
    const auth = getAuth();
    const toast = useToast();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        this.loading = true;
        console.log(await this.getDocumentIdByEmail(user.email, "CSPs"));

    axios
    .get("https://smooserve-be.vercel.app/api/csp/" + await this.getDocumentIdByEmail(user.email, "CSPs"))
    .then((response) => {
      console.log(response.data.registration.registeredStudents);
      this.registeredStudents = response.data.registration.registeredStudents
    })
    .catch((error) => {
      console.log(error);
      toast.add({
        severity: "error",
        summary: "Error",
        detail: error,
        life: 3000,
      });
    })
    .finally(() => (this.loading = false));
    } else {
          // User is signed out
          this.loggedIn = false;
        }
      });
  },
  methods: {
    
    async getDocumentIdByEmail(email, collectionName) {
      const q = query(collection(db, collectionName), where("email", "==", email), limit(1));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Get the first document (if there are multiple matching)
        const doc = querySnapshot.docs[0];
        // Access the document ID
        return doc.id;
      } else {
        // No matching document found
        return null;
      }
    },
    
    // Function to increment the view count
    incrementPageViewCount() {
      this.pageViewCount += 1;
    },

    acceptInterview(student) {
      console.log(`${student.name} has accepted the interview.`);
    },

    rejectStudent(student) {
      const index = this.students.findIndex((s) => s.id === student.id);
      if (index !== -1) {
        this.students.splice(index, 1);
      }
      console.log(`${student.name} has been rejected.`);
    },
    addEvent() {
      if (this.isClash(this.newEvent.date, this.newEvent.startTime, this.newEvent.endTime)) {
        alert('Event time clashes with an existing event.');
        return;
      }

      // Generate a unique event ID
      this.newEvent.id = this.events.length + 1;

      // Add the new event to the events array
      this.events.push({ ...this.newEvent });

      // Clear the input fields
      this.newEvent = {
        eventName: '',
        date: '',
        startTime: '',
        endTime: '',
      };
    },
    isClash(date, start, end) {
      for (const event of this.events) {
        if (event.date === date) {
          if (
            (start >= event.startTime && start < event.endTime) ||
            (end > event.startTime && end <= event.endTime) ||
            (start <= event.startTime && end >= event.endTime)
          ) {
            // Notify the user of the clash
            return true;
          }
        }
      }
      return false;
    },


    showStudentProfile(student) {
      // Implement your logic to show the student's profile
      const studentProfile = this.students_Profile.find(profile => profile.name === student.name);

      if (studentProfile) {
        this.showProfile = {
          name: studentProfile.name,
          email: studentProfile.email,
          contact: studentProfile.contact,
          description: studentProfile.desc,
          commitments: [], // You can populate this if needed
        };
      } else {
        // Handle the case when no matching profile is found
        this.showProfile = null;
      }
    },
    clearStudentProfile() {
      this.showProfile = null;
    }
  },
  rejectStudent(student) {
    student.status = 'Rejected';

    // Remove the student from the list
    const index = this.students.findIndex((s) => s.id === student.id);
    if (index !== -1) {
      this.students.splice(index, 1);
    }
    console.log(`${student.name} has been rejected.`);
  },
};
</script>

<style>
/* styles.css */

/* Style the tab buttons */
.tab-button {
  cursor: pointer;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 5px;
}

.tab-button.active {
  background-color: #3498db;
  color: #fff;
}

/* Style the cards */
/* .card {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
} */

/* styles.css */

/* Add this CSS rule for the "Take Quiz Again" button */
.quiz-button {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 25px;
  background-color: #064273;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  margin: 10px;
}

.quiz-button:hover {
  background-color: #042c4c;
}

/* styles.css */

/* Add this CSS rule for the selected card */
.selected-card {
  background-color: #76b6c4;
  color: #fff;
}

/* Style the cards */
.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  cursor: pointer;
}

th,
tr,
td {
  border: 1px solid black;
}

.card:hover {
  background-color: #f0f0f0;
}</style>
