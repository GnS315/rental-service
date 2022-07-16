import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../..';
import CreateDevice from '../../components/modals/CreateDevice';
import { createDevice, deleteDevice, fetchTypes, fetchUserDevices } from '../../http/deviceApi';
import { DEVICE_ROUTE, REACT_APP_API_URL } from '../../utils/consts';
import cl from './PersonalPage.module.css'


const PersonalPage = observer(() => {
    const [visible, setVisible] = useState(false)
    const [name, setName] = useState('')
    const [price, setPrice] = useState()
    const [file, setFile] = useState(null)
    const [type, setType] = useState(1)
    const [information, setInformation] = useState('')
    const {user, device} = useContext(Context)
    const navigate = useNavigate()
    
    const selectFile = e => {
            setFile(e.target.files[0]);
        }

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchUserDevices(user.user.id).then(data => device.setUserDevices(data))
    },[])


    const addDevice = () => {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('price', price)
            formData.append('typeId', type)
            formData.append('userId', user.user.id)
            formData.append('img', file)
            formData.append('info', information)
            createDevice(formData).then(data => setVisible(false)).then(data =>fetchUserDevices(user.user.id)).then(data => device.setUserDevices(data))
            setVisible(false)
            setName('')
            setPrice('')
            setInformation('')
    }

    const deleteUserDevice = (deviceId) => {
        console.log(deviceId);
        deleteDevice({id:deviceId}).then(data => fetchUserDevices(user.user.id).then(data => device.setUserDevices(data)))
    }

    return (
        <div className={cl.personal}>
            <div className={cl.personal__main}>
                <h1>{user.user.login}</h1>
                <hr />
                <div
                className={cl.personal__main__page}
                >
                    <button
                    className={cl.personal__main__create__button}
                    onClick={() => setVisible(true)}
                    >Добавить объявление</button>
                    <div 
                    className={cl.personal__main__page__devices}
                    >
                        <h2>Мои Объявления</h2>
                        <div
                        className={cl.personal__main__page__devices__items}
                        >
                        {device.userDevices.map(item => 
                            <div 
                            key={item.id}
                            className={cl.deviceCard}
                            onClick={() => navigate(DEVICE_ROUTE + '/' + item.id)}
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
                                <div className={cl.deviceCard__user}>
                                </div>
                                <button
                                className={cl.deviceCard__button}
                                onClick={(e) => (e.stopPropagation(), deleteUserDevice(item.id))}
                                >Удалить</button>
                            </div>
                        )}
                        </div>
                       
                    </div>
                </div>

                <CreateDevice
                visible={visible}
                setVisible={setVisible}
                >
                    <div
                    className={cl.personal__main__create}
                    >
                        <h2>Добавить объявление</h2>
                        <hr />
                        <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type='text'
                        placeholder= 'Введите название устройства'
                        />
                        <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder='Введите стоимость аренды устройства руб./мес.'
                        type='text'
                        />
                        <select
                        onChange={(e) => (setType(e.target.value))}
                        >
                            <option>Выберите категорию</option>
                            {device.types.map(type => 
                                <option
                                key={type.id}
                                value = {type.id}
                                >{type.name}</option>
                            )}
                        </select>
                        <input
                        type='file'
                        onChange={selectFile}
                        />
                        
                        <textarea
                        maxLength={254}
                        className={cl.personal__main__create__info}
                        placeholder='Введите описание товара'
                        value={information}
                        onChange={(e) => setInformation(e.target.value)}
                        ></textarea>

                        <button
                        className={cl.personal__main__create__accept}
                        onClick = {addDevice}
                        >Добавить</button>
                        <button
                        onClick={() => (setVisible(false), setName(''), setPrice(''), setInformation(''), setFile(null))}
                        className={cl.personal__main__create__deny}
                        >Закрыть</button>
                    </div>
                </CreateDevice>
            </div>
        </div>
    );
});

export default PersonalPage;