import {makeAutoObservable} from 'mobx'


export default class ChatStore {
    constructor() {
        this._chats = []
        this._selectedChat = {}
        this._messages = []
        this._companionName = ''
        makeAutoObservable(this)
    }

    setChats(chats) {
        this._chats = chats
    }

    setCompanionName(name) {
        this._companionName = name
    }

    setSelectedChat(chat) {
        this._selectedChat = chat
    }

    setMessages(messages) {
        this._messages = messages
    }

    get chats() {
        return this._chats
    }

    get selectedChat() {
        return this._selectedChat
    }

    get companionName() {
        return this._companionName
    }

    get messages() {
        return this._messages
    }
}