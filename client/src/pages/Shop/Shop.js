import React from 'react';
import DeviceList from '../../components/DeviceList/DeviceList';
import TypeBar from '../../components/TypeBar/TypeBar';
import cl from './Shop.module.css'
import { observer } from 'mobx-react-lite';


const Shop = observer(() => {


    return (
        <div className={cl.shop}>   
            <div className={cl.shop__main}>
                <TypeBar />
                <div className={cl.shop__main__content}>
                    <div className={cl.shop__main__content__devices}>
                        <DeviceList />
                    </div>
                </div>
            </div>
        </div>

    );
});

export default Shop;