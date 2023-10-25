<template>
    <div class="student-profile" v-if="student">
      <div class="card align-items-center justify-content-center" style="border:transparent">
        <Card style="width: 25em">
          <template #header>
            <img :src="student.profilePicture" class="circular-crop" alt="Profile Picture" />
          </template>
          <template #title>{{ student.name }}</template>
          <template #subtitle>{{ student.email }}</template>
          <template #content>
            <p><strong>Contact Number:</strong> {{ student.contact }}</p>
            <p><strong>Description:</strong> {{ student.description }}</p>
            <p><strong>Commitments:</strong> {{ student.commitments.join(', ') }}</p>
          </template>
          <template #footer>
            {{ student.interviewTiming }}
        <Button severity="success" @click="acceptInterview(student)">Accept Interview</button>
        <Button severity="danger" @click="rejectInterview(student)">Reject Interview</button>
          <Button @click="closeProfile">Close Profile</button>
          </template>
        </Card>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      student: Object, // The student profile data passed as a prop
    },
    methods: {
      closeProfile() {
      // Emit an event to notify the parent component to hide the profile
      this.$emit('close-profile');
    },
  },

  };
  </script>
  
  <style scoped>
  /* Add your styling for the StudentProfile component here */
  </style>
  