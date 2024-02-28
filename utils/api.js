import axios from 'axios'
import { useAuth } from '../app/context/AuthContext'

const sonataApi = axios.create({
    baseURL: 'https://sonata-gj0z.onrender.com/api',
})

export const getLessons = () => {
    return newsApi.get('/lessons').then(({data}) => {
        return data.topics;
    })
}