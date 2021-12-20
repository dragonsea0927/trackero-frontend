import axios from 'axios'

const API_KEY = 'qZt1AklRDJLnbf5cc4lBm6vUwkDzSNKfyz3XbJTEJuU'

export const PhotoService = {
   getPhotos
}

const apiClient = axios.create({
   baseURL: 'https://api.unsplash.com',
   headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
   }
})

function getPhotos() {
   return apiClient.get(`/collections/11649432/photos?client_id=${API_KEY}`)
}
