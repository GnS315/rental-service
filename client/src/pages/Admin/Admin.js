import React, { useContext, useEffect } from "react";
import { useState } from "react";
import CreateType from "../../components/modals/CreateType";
import cl from './Admin.module.css'
import {createType, deleteType} from '../../http/deviceApi'
import { banUser, getAllUsers } from "../../http/userApi";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import DeleteType from "../../components/modals/DeleteType";


const Admin = observer(() => {
  const [value, setValue] = useState('')
  const [type, setType] = useState(false);
  const [deletedType, setDeletedType] = useState(false)
  const [selectedType, setSelectedType] = useState(0)
  const {user , device} = useContext(Context)
  const addType = () => {
    createType({name: value}).then(data => setValue())
    setType(false)
    setValue('')
  }

  const blockUser = (userId) => {
    banUser({id:userId}).then(data=> getAllUsers().then(data => user.setAllUsers(data)))
  }

  const removeType = () => {
    console.log(selectedType);
    deleteType({id:selectedType}).then(data => setDeletedType(false))
  }


  useEffect(() => {
    getAllUsers().then(data => user.setAllUsers(data))
  }, [])
  return (
      <div className={cl.admin}>
        <div className={cl.admin__main}>
          <div
          className={cl.admin__main__types}
          >
          <button 
          className={cl.admin__main__button}
          onClick = {() => setType(true)}
          >Добавить категорию</button>
          <button 
          className={cl.admin__main__button}
          onClick = {() => setDeletedType(true)}
          >Удалить категорию</button>
          </div>
          <DeleteType
          visible={deletedType}
          setVisible={setDeletedType}
          >
          <div
          className= {cl.admin__main__createType}
          >
            <h2>Удалить категорию</h2>
            <select
            onChange={(e) => (setSelectedType(e.target.value))}
            
            >
              <option>Выберите категорию</option>
                {device.types.map(type => 
                    <option
                    key={type.id}
                    value = {type.id}
                    >{type.name}</option>
                )}
            </select>
            <button onClick={removeType}>Удалить</button>
            <button onClick={() => setDeletedType(false)}>Закрыть</button>
          </div>
          </DeleteType>
          <CreateType 
          visible={type} 
          setVisible={setType}
          >
            <div className= {cl.admin__main__createType}>
            <h2>Добавить категорию</h2>
            <input
            value={value}
            onChange = {e=> setValue(e.target.value)}
            />
            <button onClick={addType}>Добавить</button>
            <button onClick={() => setType(false)}>Закрыть</button>
            </div>
          </CreateType>
          <div
          className={cl.admin__main__users}
          >
            <h2>Пользователи</h2>
            <div
            className={cl.admin__main__users__card}
            >
              {user.allUsers.map (user => 
              <div
              className={cl.admin__main__users__card__cards}
              key={user.id}
              >
                {user.login}
                <button
                onClick={() => blockUser(user.id)}
                >Забанить</button>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
});

export default Admin;