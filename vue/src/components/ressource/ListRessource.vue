<template>
  <v-data-table
      :headers="headers"
      :items="ressources"
      sort-by="calories"
      class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>Mes ressources</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="success"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                v-on:click="ressource={}"
            >
              Nouveau Ressource
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <form v-if="editedIndex===-1" @submit.prevent="post">
                  <vue-form-generator :schema="schema" :model="ressource" :options="formOptions"
                                      class="panel-body"></vue-form-generator>
                </form>
                <form v-else @submit.prevent="put">
                  <vue-form-generator :schema="schema" :model="ressource" :options="formOptions"
                                      class="panel-body"></vue-form-generator>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Êtes-vous sûr de bien vouloir supprimer cet élément?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Annuler</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Valider</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "ListRessource",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {text: 'Code', value: 'code'},
      {text: 'Prix', value: 'price'},
      {text: 'Capacité', value: 'capacity'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    editedIndex: -1,
    editedItem: {},
    ressource: {},
    schema: {
      fields: [
        {
          type: 'input',
          inputType: 'text',
          label: 'Code',
          model: 'code',
          required: true
        },
        {
          type: 'input',
          inputType: 'number',
          label: 'Prix',
          model: 'price',
          featured: true,
          required: true
        },
        {
          type: 'input',
          inputType: 'number',
          label: 'Capacité',
          model: 'capacity',
          required: true,
        },
        {
          id:'btn',
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
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Cree Ressource' : 'Modifier Ressource'
    },
    ressources() {
      return this.$store.state.ressource.ressources;
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.getRessources()
  },

  methods: {
    getRessources() {
      this.$store.dispatch('ressource/getAll',{});
    },

    editItem(item) {
      this.editedIndex = this.ressources.indexOf(item)
      this.ressource = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.ressources.indexOf(item)
      this.ressource = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.delete();
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.ressource)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.ressource)
        this.editedIndex = -1
      })
    },

    post() {
      this.$store.dispatch('ressource/post', this.ressource).then(() => {
        this.close()
        this.getRessources()
      });

    },
    put() {
      this.$store.dispatch('ressource/put', this.ressource).then(() => {
        this.close()
        this.getRessources()
      });

    },
    delete() {
      this.$store.dispatch('ressource/delete', this.ressource).then(() => {
        this.close()
        this.getRessources()
      });

    },
  },
}
</script>

<style>
#btn{
  background-color: green !important;
}
</style>