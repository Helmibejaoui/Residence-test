<template>
  <v-app>
    <v-parallax
        dark
        style="background-color: lightgray;height: 100vh"
    >
      <v-container>
        <v-layout wrap>
          <v-flex sm12 md6 offset-md3>
            <v-alert v-if="error" border="top" color="red lighten-2" dark>
              {{ error }}
            </v-alert>
            <v-hover v-slot="{ hover }">
              <v-card class="pa-5" :elevation="hover ? 12 : 2" light height="400" :class="{ 'on-hover': hover }">
                <v-layout align-center justify-center column fill-height>
                  <v-flex row align-center>
                    <v-card-title class="justify-center flex">
                      <v-img
                          alt="Shiri Logo"
                          class="shrink mr-2"
                          contain
                          src="/logo.jpeg"
                          transition="scale-transition"
                          width="150"
                      />
                    </v-card-title>
                    <v-card-text>
                      <v-row>
                        <v-text-field v-model="user.email" placeholder="email"></v-text-field>
                      </v-row>
                      <v-row>
                        <v-text-field v-model="user.password" placeholder="password" type="password"></v-text-field>
                      </v-row>
                      <v-row>
                        <v-btn class="justify-center flex success" @click="handleLogin">Login</v-btn>
                      </v-row>

                    </v-card-text>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-hover>
          </v-flex>
        </v-layout>
      </v-container>
    </v-parallax>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  data: () => {
    return {
      user: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    async handleLogin() {
      await this.$store.dispatch("auth/login", this.user);
      await this.$router.push("/");
    }
  },
  computed: {
    error() {
      return this.$store.state.auth.error;
    }
  },
}
</script>

<style scoped>

</style>