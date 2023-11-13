import React from 'react';
import cl from './DeviceItem.module.css';
import {observer} from 'mobx-react-lite';
import {useNavigate} from 'react-router-dom';
import {DEVICE_ROUTE, REACT_APP_API_URL} from '../../utils/consts';

const DeviceItem = observer(({item}) => {
  const navigate = useNavigate();
  return (
    <div className={cl.deviceCard}
      onClick={() => navigate(`${DEVICE_ROUTE}/${item.id}`)}
    >
      <div className={cl.deviceCard__name}>{item.name}</div>
      <div
        className={cl.deviceCard__img__wrap}
      >
        <img
          src={REACT_APP_API_URL + item.img}
          alt=''
          className={cl.deviceCard__img}

        >{}</img>
      </div>
      <div className={cl.deviceCard__price}>{item.price} руб/мес</div>
      <div className={cl.deviceCard__user}><div className={cl.deviceCard__user__img} ></div>{item.login}</div>
    </div>
  );
});

export default DeviceItem;