<template>
  <v-btn @click="logout">Déconnexion</v-btn>
</template>

<script>
export default {
  name: "Logout",
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout');
      this.$router.push('/login').then(() => {
      })
    }
  }
}
</script>

<style scoped>

</style>