<template>
    <div class="student-profile" v-if="student">
      <div class="card align-items-center justify-content-center">
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
            <Button icon="pi pi-times" label="Reject" @click="deleteProfile" />
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
      deleteProfile() {
        // Implement the logic to delete a student profile here
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styling for the StudentProfile component here */
  </style>
  