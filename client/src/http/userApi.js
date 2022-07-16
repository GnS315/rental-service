import { $authHost, $host } from ".";
import jwt_decode from 'jwt-decode'

export const registration = async (login, password) => {
    const {data} = await $host.post ('api/user/registration', {login, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const auth = async (login, password) => {
    const {data} = await $host.post ('api/user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get ('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const getAllUsers = async () => {
    const {data} = await $authHost.get('api/user/users')
    return data
}

export const banUser = async (id) => {
    const {data} = await $authHost.post('api/user/ban', id)
    return data
}