import React, { useEffect } from 'react';
import DeviceItem from '../DeviceItem/DeviceItem';
import {observer} from 'mobx-react-lite'
import { useContext } from 'react';
import { Context } from '../..';
import cl from './DeviceList.module.css'
import { fetchDevices } from '../../http/deviceApi';


const DeviceList = observer(() => {
    const {device} = useContext(Context)
    useEffect(() => {
        fetchDevices().then(data => device.setDevices(data))
    }, [])
    useEffect(() => {
        fetchDevices(device.selectedType.id).then(data => device.setDevices(data))
    }, [device.selectedType])
    return (
        <div className={cl.deviceList}>
            {device.devices.length === 0? <h2>Объявлений нет...</h2> :
            <>
            {device.devices.map(item => 
                <DeviceItem
                key={item.id}
                item={item}
                ></DeviceItem>
                )}
                </>
                }
        </div>
    );
});

export default DeviceList;