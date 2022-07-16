import React from 'react';
import cl from './Modals.module.css'
import socket from '../../socket'
import { useContext } from 'react';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

const ChatWindow = observer(({children, visible, setVisible, setMessages}) => {
    const {chat} = useContext(Context)
    const rootClasses = [cl.modal]
    if(visible) {
        rootClasses.push(cl.active)
    }
    

    const disconnect = () => {
        socket.emit('leave room', {
            room: chat.selectedChat.room
        })
        socket.removeAllListeners('new message') 
        chat.setMessages([]) 
    }

    return (
        <div className={rootClasses.join(' ')} onClick={()=> (setVisible(false), 
            disconnect()
        )} >
            <div className={cl.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
});

export default ChatWindow;