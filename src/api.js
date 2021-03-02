import axios from "axios"

export const Api = axios.create({
    baseURL: 'http://158.101.166.74:8080/api/data/malyukinandrew',
})