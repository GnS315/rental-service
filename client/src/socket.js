import io from 'socket.io-client'
import configs from './configs/index'


const socket = io(configs.development.server.url)

export default socket