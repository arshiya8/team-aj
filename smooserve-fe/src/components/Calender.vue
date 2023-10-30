<template>
    <div ref="SchedulerComponent"></div>
  </template>
   
  <script>
  import { scheduler } from "dhtmlx-scheduler";
   
   
  export default {
    props: {
      events: {
        type: Array,
        default() {
          return []
        },
      },
    },
    mounted: function () {
      scheduler.skin = "material";
      scheduler.config.header = [
        "day",
        "week",
        "month",
        "date",
        "prev",
        "today",
        "next",
      ];  
      scheduler.init(
        this.$refs.SchedulerComponent,
        new Date(2020, 0, 20),
        "week"
      );
      scheduler.parse(this.$props.events);
    },
  };
  </script>
   
  <style>
  @import "~dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css";
  </style>