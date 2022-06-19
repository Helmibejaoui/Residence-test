<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog
          transition="dialog-bottom-transition"
          max-width="600"
          v-model="dialog"

      >
        <template>
          <v-card>
            <v-toolbar
                color="primary"
                dark
            >
              <v-btn
                  icon
                  dark
                  @click="dialog = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>New Reservation</v-toolbar-title>
            </v-toolbar>
            <v-container>
              <form @submit.prevent="post">
                <vue-form-generator :schema="schema" :model="reservation" :options="formOptions"
                                    class="panel-body"></vue-form-generator>
              </form>
            </v-container>


          </v-card>
        </template>

        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="blue"
              dark
              v-bind="attrs"
              v-on="on"
          >
            Cree reservation
          </v-btn>
        </template>
      </v-dialog>

    </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg.css'

Vue.use(VueFormGenerator)
export default {
  name: "NewReservation",
  props: ['ressources'],
  data: () => {
    return {
      dialog: false,
      reservation: {},
      schema: {
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'Nom',
            model: 'lastname',
            required: true
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Prenom',
            model: 'firstname',
            featured: true,
            required: true
          },
          {
            type: 'input',
            inputType: 'number',
            label: 'CIN',
            model: 'cin',
            min: 8,
            required: true,
          },
          {
            type: 'input',
            inputType: 'number',
            label: 'Payment',
            model: 'payment',
            required: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Type',
            model: 'type',
            required: true,
          },
          {
            type: 'input',
            inputType: 'number',
            label: 'Avance',
            model: 'advance',
          },
          {
            type: 'input',
            inputType: 'date',
            label: "Date d'Avance",
            model: 'dataAdvance',
          },
          {
            type: 'input',
            inputType: 'date',
            label: "Date debut",
            model: 'startAt',
            required: true,
          },
          {
            type: 'input',
            inputType: 'date',
            label: "Date de fin",
            model: 'endAt',
            required: true,
          },
          {
            type: 'select',
            label: 'Ressource',
            model: 'ressource',
            values: []
          },
          {
            type: 'submit',
            buttonText: 'Valider'
          },
        ]
      },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true
      }
    }
  },
  methods: {
    async post() {
      let toPost = {
        status: 'En cours',
        firstname: this.reservation.firstname,
        lastname: this.reservation.lastname,
        cin: this.reservation.cin,
        payment: this.reservation.payment,
        type: this.reservation.type,
        advance: this.reservation.advance,
        dateAdvance: this.reservation.dateAdvance ? new Date(this.reservation.dateAdvance).toISOString() : null,
        startAt: new Date(this.reservation.startAt).toISOString(),
        endAt: new Date(this.reservation.endAt).toISOString(),
        ressource: this.reservation.ressource
      }
      await this.$store.dispatch("reservation/post", toPost);
      this.$emit('reservations');
      this.dialog = false;
    },
  },
  mounted() {
    let fiel = this.schema.fields.find(field => field.model === 'ressource');
    fiel.values = this.ressources.map(
        function (ressource) {
          ressource['name'] = ressource.code;
          ressource['id'] = ressource['@id'];
          return ressource
        }
    );
  },
  computed: {}
}
</script>

<style>
fieldset {
  border: 0;
  padding: 10px 8px;
}
</style>