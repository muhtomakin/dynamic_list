import React from 'react'

const Modal = (props) => {
    const {
        isModalOpen,
        correctRemove,
        id
    } = props
  return (
    <div className={`${isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'}`}>
        <div className='modal-container'>
            <h3>modal content</h3>
            <button 
                className='close-btn' 
                value='close' 
                onClick={(e) => correctRemove(e, id)}
            >
                {/* <CloseIcon /> */}
                close
            </button>
            <button 
                className='ok' 
                value='ok' 
                onClick={(e) => correctRemove(e, id)}
            >
                ok
            </button>
            <button 
                className='cancel' 
                value='cancel' 
                onClick={(e) => correctRemove(e, id)}
            >
                cancel
            </button>
        </div>
    </div>
  )
}

export default Modal