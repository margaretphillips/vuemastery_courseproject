import axios from 'axios'

const ApiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents(perPage, page) {
    return ApiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id) {
    return ApiClient.get('/events/' + id)
  },
  postEvent(event) {
    return ApiClient.post('/events', event)
  }
}
