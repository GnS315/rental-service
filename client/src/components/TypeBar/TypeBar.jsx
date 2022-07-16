import React, { useContext, useEffect } from 'react';
import TypeItem from '../TypeItem/TypeItem';
import {observer} from 'mobx-react-lite'
import { Context } from '../..'
import cl from './TypeBar.module.css'
import { fetchTypes } from '../../http/deviceApi';


const TypeBar = observer(() => {
    const {device} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
    }, [])
    return (
        <div>
            <div className={cl.typeBarHeader} >Категории</div>
            <button
            className={device.selectedType === '' ?cl.typeBarHeader__button__active : cl.typeBarHeader__button}
            onClick={() => device.setSelectedType('')}
            >Все</button>
            {device.types.map(type => 
                <TypeItem
                key={type.id}
                type={type}
                device={device}
                >
                    {type.name}
                </TypeItem>
                )}
        </div>
    );
});

export default TypeBar;