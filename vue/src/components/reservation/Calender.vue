<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
            flat
        >
          <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
          >
            Aujourd'hui
          </v-btn>
          <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu
              bottom
              right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  outlined
                  color="grey darken-2"
                  v-bind="attrs"
                  v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Jour</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Semaine</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Mois</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar v-if="loading && reservations"
                    ref="calendar"
                    v-model="focus"
                    color="primary"
                    :events="updateEvents"
                    :event-color="getEventColor"
                    :type="type"
                    @click:event="showEvent"
                    @click:more="viewDay"
                    @click:date="viewDay"
                    @change="updateRange"
                    locale="fr"
        ></v-calendar>
        <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
        >
          <v-card
              color="grey lighten-4"
              min-width="350px"
              flat
          >
            <v-toolbar
                :color="selectedEvent.color"
                dark
            >
              <EditReservation style="justify-content: normal !important;"
                               v-if="ressources.length > 0"
                               @reservations="getReservations" :ressources="ressources"
                               :item="reservation"/>

              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="selectedOpen = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

          </v-card>
        </v-menu>
      </v-sheet>
      <v-row>
        <v-spacer></v-spacer>
        <NewReservation v-if="ressources.length >= 0" @reservations="getReservations" :ressources="ressources"/>
        <v-spacer></v-spacer>
      </v-row>
    </v-col>

  </v-row>


</template>

<script>


import NewReservation from "@/components/reservation/modal/NewReservation";
import EditReservation from "@/components/reservation/modal/EditReservation";

export default {
  name: "Reservation",
  components: {EditReservation, NewReservation},
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Mois',
      week: 'Semaine',
      day: 'Jour',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: []
  }),
  async mounted() {
    await this.getRessources();
    await this.getReservations();
    this.updateRange()
    this.$refs.calendar.checkChange()
  },
  methods: {
    viewDay({date}) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = ''
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    showEvent({nativeEvent, event}) {
      const open = () => {
        this.getReservation(event.id);
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange() {
      let res = this.$store.state.reservation.reservations;
      const events = []
      ;
      for (const element of res) {
        let startAt = new Date(element.startAt);
        let endAt = new Date(element.endAt);
        events.push({
          ressource: element.ressource,
          id: element.id,
          name: element.firstname + ' ' + element.lastname + ' ' + element.ressource.code,
          start: startAt.setHours(startAt.getHours() + 2),
          end: endAt.setHours(endAt.getHours() + 2),
          color: 'blue',
          timed: 0,
        })
      }
      this.events = events;
      return this.events
    },
    getReservations() {
      this.$store.dispatch("reservation/getAll");
    },
    getRessources() {
      this.$store.dispatch('ressource/getAll');
    },
    getReservation(id) {
      this.$store.dispatch('reservation/getById', id);
    }
  },
  computed: {
    updateEvents() {
      return this.updateRange();
    },
    reservations() {
      return this.$store.state.reservation.reservations
    },
    loading() {
      return this.$store.state.reservation.loading
    },
    ressources() {
      return this.$store.state.ressource.ressources;
    },
    reservation() {
      return this.$store.state.reservation.reservation;
    }
  }
}
</script>

<style>
.v-calendar-daily__head {
  height: 100%;
}

</style>