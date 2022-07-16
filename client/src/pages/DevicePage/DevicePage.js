import React, { useContext, useEffect, useState } from 'react';
import cl from './DevicePage.module.css'
import {useNavigate, useParams} from 'react-router-dom'
import { fetchOneDevice } from '../../http/deviceApi';
import { CHAT_ROUTE, REACT_APP_API_URL } from '../../utils/consts';
import { createRoom } from '../../http/chatApi';
import {observer} from 'mobx-react-lite'
import { Context } from '../..';

const DevicePage = observer(() => {
    const [device, setDevice] = useState({description:[]})
    const {id} = useParams()
    const {user} = useContext(Context)
    const navigate = useNavigate()
    useEffect(() => {
        fetchOneDevice(id).then((data) => setDevice(data))
    }, [])

    const  createNewRoom = () => {
        createRoom({firstId:user.user.id, secondId: device.device?.[0].user_id}).then(data => navigate(CHAT_ROUTE))
    }

    return (
        <div className={cl.device}>
            <div className={cl.device__main}>
                <div className={cl.device__main__head}>
                    <img src={REACT_APP_API_URL + device?.device?.[0].img}
                    alt=''
                    className={cl.device__main__head__img}
                    >
                    </img>
                    <div
                    className={cl.device__main__head__about}
                    >
                        <div
                        className={cl.device__main__head__about__name}
                        >{device.device?.[0].name}</div>
                        <div
                        className={cl.device__main__head__about__price}
                        >{device.device?.[0].price} руб./мес.</div>
                        <div
                        className={cl.device__main__head__about__login}
                        >
                            <div
                            className={cl.device__main__head__about__img}
                            ></div>{device.device?.[0].login}</div>
                        <button
                        onClick={createNewRoom}
                        >Написать пользователю</button>
                        <hr></hr>
                        <div>
                            <div
                            className={cl.device__main__head__about__rules}
                            >Как взять в аренду?</div>
                            <ul>
                                <li>Выберите товар</li>
                                <li>Напишите продавцу и договоритесь о встрече</li>
                                <li>Заплатите за товар</li>
                                <li>Теперь вы можете забрать товар и пользоваться им</li>
                                <li>После окончания срока аренды верните товар продавцу</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={cl.device__main__description}>
                    <h2>Описание:</h2>
                        <div
                        className={cl.device__main__description__text}
                        >{device.device?.[0].info}</div>
                        
                </div>
            </div>
        </div>
    );
});

export default DevicePage;