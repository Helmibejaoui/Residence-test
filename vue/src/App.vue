<template>
  <v-app>
    <v-app-bar
        v-if="checkConnected"
        app
        color="blue"
        dark
    >
      <v-layout align-center justify-space-between>
        <div class="d-flex align-center">

        </div>
        <v-spacer></v-spacer>
        <Logout/>
      </v-layout>

    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>

</template>

<script>

import Logout from './components/authentification/Logout'

export default {
  name: 'App',
  components: {Logout},
  computed: {
    checkConnected() {
      return this.$store.state.auth.token;
    }
  },
  mounted() {
    if (!this.checkConnected) {
      this.$router.push('/login').catch(() => {
      });
    }
  },
};
</script>
