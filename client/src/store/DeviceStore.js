import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = []
        this._devices = []
        this._selectedType = {}
        this._userDevices = []
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }

    setDevices(devices) {
        this._devices = devices
    }

    setSelectedType(type) {
        this._selectedType = type
    }
    
    setUserDevices(devices) {
        this._userDevices = devices
    }

    get types() {
        return this._types
    }

    get devices() {
        return this._devices
    }

    get selectedType() {
        return this._selectedType
    }

    get userDevices() {
        return this._userDevices
    }

}
