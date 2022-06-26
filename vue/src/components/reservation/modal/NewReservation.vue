<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog
          transition="dialog-bottom-transition"
          max-width="700"
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
              <v-toolbar-title>Nouveau Reservation</v-toolbar-title>
            </v-toolbar>
            <v-container>
              <v-col>
                <v-row>
                  <v-text-field label="Payment" readonly v-model="payment">Test</v-text-field>
                </v-row>
                <v-row>
                  <form @submit.prevent="post">

                    <vue-form-generator :schema.sync="schema" :model.sync="reservation" :options.sync="formOptions"
                                        class="panel-body"></vue-form-generator>
                  </form>
                </v-row>

              </v-col>
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
      payment: 0,
      dialog: false,
      reservation: {},
      schema: {},
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
    checkReservations() {
      let self = this;
      if (this.reservation && this.reservation.startAt && this.reservation.endAt) {
        let fiel = this.schema.fields.find(field => field.model === 'ressource');
        fiel.values = this.ressources.map(
            function (ressource) {
              let exist = ressource.reservations.filter((r) =>
                  (new Date(r.startAt).getTime() <= self.reservation.startAt || new Date(r.startAt).getTime() < self.reservation.endAt)
                  && (new Date(r.endAt).getTime() > self.reservation.startAt || new Date(r.endAt).getTime() >= self.reservation.endAt));
              if (exist.length === 0) {
                ressource['name'] = ressource.code;
                ressource['id'] = ressource['@id'];
                return ressource
              }

            }
        ).filter(x => typeof x !== "undefined");
      }
    },
    assignPrice(newVal, field) {
      let self = this;
      let reservation = self.ressources.find((r) => r['@id'] === field);
      self.payment = reservation.price * ((newVal.endAt - newVal.startAt) / (1000 * 3600 * 24));
      self.reservation.payment = reservation.price * ((newVal.endAt - newVal.startAt) / (1000 * 3600 * 24));

    }
  },

  mounted() {
    let self = this;
    this.schema = {
      deep: true,
      immediate: true,
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
          onChanged() {
            self.checkReservations()
          }
        },
        {
          type: 'input',
          inputType: 'date',
          label: "Date de fin",
          model: 'endAt',
          required: true,
          onChanged() {
            self.checkReservations()
          }
        },
        {
          type: 'select',
          label: 'Ressource',
          model: 'ressource',
          values: [],
          onChanged: function (newVal, field) {
            self.assignPrice(newVal, field);
          },
        },
        {
          type: 'submit',
          buttonText: 'Valider'
        },
      ]
    }
  },

}
</script>

<style>
fieldset {
  border: 0;
  padding: 10px 8px;
}
</style>