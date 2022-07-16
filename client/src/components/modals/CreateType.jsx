import React from 'react';
import cl from './Modals.module.css'


const CreateType = ({children, visible, setVisible}) => {

    const rootClasses = [cl.modal]
    if(visible) {
        rootClasses.push(cl.active)
    }


    return (
        <div className={rootClasses.join(' ')} onClick={()=> setVisible(false)} >
            <div className={cl.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default CreateType;