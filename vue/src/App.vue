<template>
  <v-app>
    <v-app-bar
        v-if="checkConnected"
        app
        color="blue"
        dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ $t("title") }}</v-toolbar-title>
      <v-layout align-center justify-space-between>
        <v-spacer></v-spacer>
        <Logout/>
      </v-layout>

    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
    >
      <v-list
          nav
          dense
      >
        <v-list-item-group
            active-class="blue--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t("home") }}</v-list-item-title>
          </v-list-item>

          <v-list-item v-on:click="$router.push('/reservation').catch(err => {})">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t("reservation") }}</v-list-item-title>
          </v-list-item>
          <v-list-item v-on:click="$router.push('/ressources').catch(err => {})">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t("ressources") }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
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
  data: () => ({
    drawer: false,
  }),
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
