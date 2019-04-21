<template>
  <div>
    <div class="event-card">
      <router-link :to="{ name: 'event-show', params: { id: event.id } }">
        <span>@ {{ event.time }} on {{ event.date }}</span>
        <h4>{{ event.title }}</h4>
        <BaseIcon name="users">{{ event.attendees.length }} attending</BaseIcon>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: Object
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
h4 {
  color: green;
}
.event-card {
  margin: 1em auto;
}
</style>
