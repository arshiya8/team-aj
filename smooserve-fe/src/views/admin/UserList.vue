<template>
    <div class="user-list">
      <h3>User List</h3>
      <div class="row">
        <div class="col-md-6">
          <ul>
            <li v-for="user in users" :key="user.id">
              <router-link :to="{ name: 'User', params: { id: user.username }}">{{ user.name }}</router-link>
            </li>
          </ul>
            </div>
      </div>
    </div>
  </template>
  
  <script>
    export default {
      name: 'UserList',
      data() {
        return {
          users: [
            {
              id: 1,
              username: 'johndoe',
              name: 'John Doe',
            },
            {
              id: 2,
              username: 'bobdoe',
              name: 'Bob Doe',
            },
            {
              id: 3,
              username: 'annedoe',
              name: 'Anne Doe',
            },
          ]
        }
      },
      created() {
        this.$store.commit('initUsers', this.users);
      }
    }
  </script>