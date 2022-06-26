<template>
  <v-col>

    <v-data-table
        :headers="headers"
        :items="reservations"
        sort-by="calories"
        class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-toolbar-title>Ma recette du jour</v-toolbar-title>
          <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
    </v-data-table>
    <v-row
        class="mt-1"
        justify="end"
    >

      <v-col cols="1">
        <v-text-field readonly label="Totale" v-model="check"></v-text-field>
      </v-col>
    </v-row>

  </v-col>
</template>

<script>
export default {
  name: "TodayCheck",
  data: () => ({
    headers: [
      {text: 'Nom', value: 'lastname'},
      {text: 'Prenom', value: 'firstname'},
      {text: 'Date de debut', value: 'startAt'},
      {text: 'Date de fin', value: 'endAt'},
      {text: 'Payment', value: 'payment'},
      {text: 'Ressource', value: 'ressource.code'},
      {text: 'Statut', value: 'status'},
    ],
  }),
  methods: {
    getReservation() {
      this.$store.dispatch('reservation/getAll', {date: new Date().toISOString().slice(0, 10), status: 'Confirmer'});
    },
    getCheck() {
      this.$store.dispatch('check/getCheck');
    }
  },
  mounted() {
    console.log(new Date().toISOString())
    this.getReservation();
    this.getCheck();
  },
  computed: {
    reservations() {
      return this.$store.state.reservation.reservations;
    },
    check() {
      return this.$store.state.check.check;
    }
  }
}
</script>

<style scoped>

</style>