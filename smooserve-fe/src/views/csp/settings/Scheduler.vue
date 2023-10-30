<template>
    <div class="container">
      <SchedulerComponent class="left-container" :events="events" @event-updated="logEventUpdate"></SchedulerComponent>
    </div>
  </template>
   
  <script>
  import SchedulerComponent from '../../../components/Calender.vue';
   
  export default {
    name: "app",
    components: { SchedulerComponent },
    data() {
      return {
        events: [
          {
            id: 1,
            start_date: "2020-01-20 6:00",
            end_date: "2020-01-20 15:00",
            text: "Event 1",
          },
          {
            id: 2,
            start_date: "2020-01-23 6:00",
            end_date: "2020-01-23 20:00",
            text: "Event 2",
          },
        ],
      };
    },
  };
  </script>
   
  <style>
  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
   
  .container {
    height: 100%;
    width: 100%;
  }
   
  .left-container {
    overflow: hidden;
    position: relative;
    height: 99vh;
    display: inline-block;
    width: 80%;
  }
  </style>