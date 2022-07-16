import { $authHost } from ".";

export const fetchAllRooms = async (id) => {
    const {data} = await $authHost.get('api/message', {params:{
        id
    }})
    return data
}

export const createRoom = async(info) => {
    const {data} = await $authHost.post('api/message', info)
    return data
}

export const createMessage = async (info) => {
    const {data} = await $authHost.post('api/message/create', info)
    return data
}

export const getUserMessages = async (roomId) => {
    const {data} = await $authHost.post('api/message/get', roomId)
    return data
}