import React, { useContext } from 'react';
import { Context } from '../..';
import cl from './TypeItem.module.css'
import {observer} from 'mobx-react-lite'

const TypeItem = observer(({children, ...props}) => {
    return (
        <div
        className={props.type.id === props.device.selectedType.id?
            cl.typeItemActive:
            cl.typeItem
        }
        onClick={()=> (props.device.setSelectedType(props.type))}
        {...props}
        >
            {children}
        </div>
    );
});

export default TypeItem;