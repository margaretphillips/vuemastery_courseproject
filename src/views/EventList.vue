<template>
  <div>
    <NavBar />
    <h1>Event List</h1>
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >PREV</router-link
      >||
    </template>
    <router-link
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
      >Next</router-link
    >
    <EventCard v-for="event in events" :event="event" :key="event.id" />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    NavBar,
    EventCard
  },
  created() {
    this.$store.dispatch('fetchEvents', {
      perPage: 3,
      page: this.page
    })
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    ...mapState(['events'])
  }
}
</script>
