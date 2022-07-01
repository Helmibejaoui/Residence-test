<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog
          transition="dialog-bottom-transition"
          max-width="600"
          v-model="dialogEdit"

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
                  @click="dialogEdit = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Edit Reservation</v-toolbar-title>
            </v-toolbar>
            <v-container>
              <v-col>
                <v-row>
                  <v-text-field label="Payment" readonly v-model="item.payment"></v-text-field>
                </v-row>
                <v-row>
                  <form @submit.prevent="edit">
                    <vue-form-generator :schema="schema" :model="item" :options="formOptions"
                                        class="panel-body"></vue-form-generator>
                  </form>
                </v-row>
              </v-col>
            </v-container>


          </v-card>
        </template>

        <template v-slot:activator="{ on, attrs }">
          <v-btn
              icon
              v-bind="attrs"
              v-on="on">
            <v-icon>mdi-pencil</v-icon>
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
  name: "EditReservation",
  props: ['ressources', 'id'],
  data: () => {
    return {
      dialogEdit: false,
      schema: {},
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true
      }
    }
  },
  methods: {
    fixDate(date) {
      return new Date(new Date(date).toLocaleDateString('en-US', {
        timeZone: 'Africa/Tunis',
      }));
    },
    checkReservations() {
      let self = this;
      if (self.item && self.item.startAt && self.item.endAt) {
        let fiel = self.schema.fields.find(field => field.model === 'ressource');
        fiel.values = self.ressources.map(
            function (ressource) {
              let exist = ressource.reservations.filter((r) =>
                  (self.fixDate(r.startAt).getTime() <= self.fixDate(self.item.startAt) || self.fixDate(r.startAt).getTime() < self.fixDate(self.item.startAt))
                  && (self.fixDate(r.endAt).getTime() > self.fixDate(self.item.startAt) || self.fixDate(r.endAt).getTime() >= self.fixDate(self.item.startAt))
                  && (r.status !== 'Annuler'));
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
      self.item.payment = reservation.price * ((this.fixDate(newVal.endAt).getTime() - this.fixDate(newVal.startAt).getTime()) / (1000 * 3600 * 24));

    },
    async edit() {
      let toEdit = {
        id: this.item.id,
        status: this.item.status,
        firstname: this.item.firstname,
        lastname: this.item.lastname,
        cin: this.item.cin,
        payment: this.item.payment,
        type: this.item.type,
        advance: this.item.advance,
        dateAdvance: this.item.dateAdvance ? this.fixDate(this.item.dateAdvance).toLocaleDateString('en-CA') : null,
        startAt: this.fixDate(this.item.startAt).toLocaleDateString('en-CA'),
        endAt: this.fixDate(this.item.endAt).toLocaleDateString('en-CA'),
        ressource: this.item.ressource
      }
      await this.$store.dispatch("reservation/put", toEdit);
      this.$emit('reservations');
      this.$emit('ressources');
      this.dialogEdit = false;
    },
    getReservation(id) {
      this.$store.dispatch('reservation/getById', id);
    },

  },
  async mounted() {
    let self = this;
    this.schema = {
      fields: [
        {
          type: 'select',
          label: 'Status',
          model: 'status',
          values: ['Valider', 'Annuler'],
          required: true
        },
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
          model: 'dateAdvance',
        },
        {
          type: 'input',
          inputType: 'date',
          label: "Date debut",
          model: 'startAt',
          required: true,
          onChanged() {
            self.checkReservations()
            self.assignPrice(self.item, self.item.ressource);
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
            self.assignPrice(self.item, self.item.ressource);
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
    };
    await this.getReservation(this.id);
    let fiel = this.schema.fields.find(field => field.model === 'ressource');
    fiel.values = this.ressources.map(
        function (ressource) {
          ressource['name'] = ressource.code;
          ressource['id'] = ressource['@id'];
          return ressource
        }
    );


  },
  computed: {
    item() {
      return this.$store.state.reservation.reservation;
    }
  },
  watch: {
    id() {
      this.getReservation(this.id);
    }
  }
}
</script>

<style>
fieldset {
  border: 0;
  padding: 10px 8px;
}
</style>