import { $authHost, $host } from ".";

export const createType = async (type) => {
    const {data} = await $authHost.post ('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get ('api/type')
    return data
}

export const deleteType = async (id) => {
    const {data} = await $authHost.post ('api/type/delete', id)
    return data
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post ('api/device', device)
    return data
}

export const fetchDevices = async (typeId) => {
    const {data} = await $host.get ('api/device', {params:{
        typeId
    }})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get ('api/device/' + id )
    return data
}

export const fetchUserDevices = async (id) => {
    const {data} = await $authHost.post('api/device/user', {id})
    return data
}

export const deleteDevice = async (id) => {
    const {data} = await $authHost.post('api/device/delete', id)
    return data
}