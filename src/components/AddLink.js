import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from './Context'

const AddLink = () => {

    const {handleSubmit, handleChange} = useGlobalContext()
    const navigate = useNavigate();

    return (
        <div>
            Add New Link

            <form onSubmit={(e) => handleSubmit(e, navigate)}>
                <label htmlFor="name">Link Name:</label>
                <input 
                    type="text" 
                    name="name" 
                    onChange={(e) => handleChange(e)}
                />
                <label htmlFor="url">Link Url:</label>
                <input 
                    type="text" 
                    name="url" 
                    onChange={(e) => handleChange(e)}
                />
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}

export default AddLink