import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Context } from '../..';
import { createMessage, fetchAllRooms, getUserMessages } from '../../http/chatApi';
import { observer } from 'mobx-react-lite';
import socket from '../../socket'
import cl from './Chat.module.css'
import ChatWindow from '../../components/modals/ChatWindow';
import { useRef } from 'react';


const Chat = observer(() => {
    const [visible, setVisible] = useState(false)
    const [value, setValue] = useState('')
    const {chat, user} = useContext(Context)
    const messageRef = useRef(null)
    useEffect(() => {
        fetchAllRooms(user.user.id).then(data => chat.setChats(data))
        socket.removeAllListeners('leave room') 
        socket.removeAllListeners('new message')
        socket.removeAllListeners('join room')
    }, [])

    useEffect(() => {
        messageRef.current.scrollTo(0, 999999)
    },[chat.messages])


    const roomConection = () => {
        socket.emit('join room', {
            room: chat.selectedChat.room
        })
    }

    const sendMessage = () => {
        if (value) {
            socket.emit('new message' ,{ 
            username: user.user.login,
            message:value,
            room: chat.selectedChat.room
        })
        setValue('')
        }
    }
    
    useEffect(()=> {
        socket.on('new message', data => {
            const newMessage = 
            {
                id: Date.now(),
                username: data.username,
                message: data.message}
            chat.setMessages([...chat.messages, newMessage])
            socket.removeAllListeners('new message')
        })
        
    }, [chat.messages])

    const getMessagesInRoom = () => {
        getUserMessages({roomId : chat.selectedChat.room}).then(data => data.map(message => chat.setMessages([...chat.messages, {id: message.id, username: message.login, message:message.message}]))).then(data => (typeof(chat.messages?.[0]?.id) === 'number')? socket.removeAllListeners('new message'): console.log())
    }

    const createMessages = () => {
        if (value) {
            createMessage({userId: user.user.id, roomId: chat.selectedChat.room, message:value})
        }
    }

    return (
    <div className={cl.chat}>   
        <div className={cl.chat__main}>
            {chat.chats.map(i => 
                <div 
                onClick = {() => (chat.setSelectedChat(i),
                    setVisible(true),
                    roomConection(),
                    getMessagesInRoom()
                    )}
                className={cl.chat__main__room}
                key={i.id}
                > {i.login} 
                </div>
                )}
                <ChatWindow
                visible={visible}
                setVisible={setVisible}
                setMessages={chat.setMessages}
                >
                    <div 
                    className={cl.chat__main__window}
                    >
                        <div>Чат с {chat.selectedChat.login}</div>
                        <hr />
                        <div
                        ref={messageRef}
                        className={cl.chat__main__window__messages}
                        >
                        {chat.messages.map(message =>
                            <div
                            key={message.id}
                            className={cl.chat__main__window__messages__message}
                            ><div
                            className={
                                message.username === user.user.login?
                                cl.chat__main__window__messages__message__user : cl.chat__main__window__messages__message__companion}
                            >{message.username}</div>
                            <div
                            className={cl.chat__main__window__messages__message__value}
                            >{message.message}</div></div>
                            )}
                        </div>
                        <div
                        className={cl.chat__main__window__input}
                        >
                            <div>{user.user.login}</div>
                            <input
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            onKeyUp = {e => e.keyCode === 13 ? (createMessages(), sendMessage()) : console.log()}
                            />
                            <button
                            onClick={()=> (createMessages(),sendMessage())}
                            >Отправить</button>
                        </div>
                    </div>
                </ChatWindow>
        </div>
    </div>
    );
});

export default Chat;