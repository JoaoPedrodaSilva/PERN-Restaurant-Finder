import axios from 'axios'

export default axios.create({
    baseURL: 'https://joaopedro-pern-restaurant.herokuapp.com/api/restaurants'
})