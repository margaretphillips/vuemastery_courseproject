import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
  events: [],
  event: {},
  eventsTotal: 0
}
export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENT_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}
export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(event => {
        commit('ADD_EVENT', event.data)
        const notification = {
          type: 'success',
          message: 'event was created'
        }
        dispatch('notification/add', notification, {
          root: true
        })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'there was an error in creating your event ' + error.message
        }
        dispatch('notification/add', notification, {
          root: true
        })
        throw error
      })
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(res => {
        commit('SET_EVENTS', res.data)
        commit('SET_EVENT_TOTAL', res.headers['x-total-count'])
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'there was an error in fetch events ' + error.message
        }
        dispatch('notification/add', notification, {
          root: true
        })
      })
  },
  fetchEvent({ commit, dispatch, getters }, id) {
    var event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then(res => {
          commit('SET_EVENT', res.data)
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'there was an error in fetch event ' + error.message
          }
          dispatch('notification/add', notification, {
            root: true
          })
        })
    }
  }
}
export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
