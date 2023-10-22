<template>
  <header>
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
                <p>Number of views: <span id="viewCount">0</span></p>
              </section>
            </p>
          </TabPanel>
          <TabPanel header="Signups">
            <section id="signups">
              <h2>Sign Ups</h2>
              <table id="studentTable">
                <tr>
                  <th>Student Name</th>
                  <th>Status</th>
                </tr>
                  <tr v-for="student in students" :key="student.id">
                    <td @mouseover="showStudentProfile(student)" @mouseout="clearStudentProfile">{{ student.name }}</td>
                    <td>{{ student.status }}</td>
                </tr>
              </table>
              <StudentProfile :student="showProfile" />
            </section>
          </TabPanel>
          <TabPanel header="Schedule">
            <section id="schedule">
              <h2>Schedule</h2>
              <div id="calendar">
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
  </header>
</template>
<script>
import { ref } from 'vue';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import CalendarComponent from './CSPCalender.vue';
import StudentProfile from './StudentProfile.vue'; // Adjust the path if needed


export default {
  components: {
    CalendarComponent,
    StudentProfile,
  },
  data() {
    return {
      students: [
        { id: 1, name: 'John Doe', status: 'Enrolled' },
        { id: 2, name: 'Jane Smith', status: 'Pending' },
        { id: 3, name: 'Bob Johnson', status: 'Rejected' },
        // Add more dummy data as needed
      ],
      students_Profile: [
        { id: 1, name: 'John Doe', contact: '91234568', email: 'johndoe@gmail.com', desc: 'I am John' },
        { id: 2, name: 'Jane Smith', contact: '81234567', email: 'johndoe@gmail.com', desc: 'I am John' },
        { id: 3, name: 'Bob Johnson', contact: '98765432', email: 'johndoe@gmail.com', desc: 'I am John' },
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
    };
  },
  methods: {
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
    this.showProfile = this.showProfile = {
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  contact: '91234568',
  description: 'I am John',
  commitments: ['Commitment1', 'Commitment2'],
};

  },
  clearStudentProfile() {
    this.showProfile = null;
  }
  },
}
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
.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
}

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
th,tr,td {
  border:1px solid black;
}
.card:hover {
  background-color: #f0f0f0;
}
</style>
