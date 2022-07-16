import {makeAutoObservable} from 'mobx'


export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._allUsers = []
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    setAllUsers(users) {
        this._allUsers = users
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }

    get allUsers() {
        return this._allUsers
    }
}