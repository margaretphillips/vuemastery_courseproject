<template>
  <div>
    <NavBar />
    <h1>Event List</h1>
    <EventCard v-for="event in events" :event="event" :key="event.id" />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'

export default {
  components: {
    NavBar,
    EventCard
  },
  data() {
    return {
      events: []
    }
  },
  created() {
    EventService.getEvents()
      .then(res => (this.events = res.data))
      .catch(error => console.log(error))
  }
}
</script>
