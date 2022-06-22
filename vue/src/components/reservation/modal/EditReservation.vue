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
              <form @submit.prevent="edit">
                <vue-form-generator :schema="schema" :model="item" :options="formOptions"
                                    class="panel-body"></vue-form-generator>
              </form>
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
  props: ['ressources', 'item'],
  data: () => {
    return {
      dialogEdit: false,
      schema: {
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
        dateAdvance: this.item.dateAdvance ? new Date(this.item.dateAdvance).toISOString() : null,
        startAt: new Date(this.item.startAt).toISOString(),
        endAt: new Date(this.item.endAt).toISOString(),
        ressource: this.item.ressource
      }
      await this.$store.dispatch("reservation/put", toEdit);
      this.$emit('reservations');
      this.dialogEdit = false;
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
}
</script>

<style>
fieldset {
  border: 0;
  padding: 10px 8px;
}
</style>