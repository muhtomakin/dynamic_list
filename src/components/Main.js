import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from './Context'
import Modal from './Modal';

const Main = () => {

    const {
        handleDelete, 
        handleVote, 
        paginatedData,
        pages,
        setNumberVisited,
        sortType,
        handleFilter,
        isModalOpen,
        correctRemove,
        id,
    } = useGlobalContext();

    const navigate = useNavigate();

    return (
        <div>
            <div onClick={() => navigate('/add-link')}>Submit A Link</div>
            <select onChange={(e) => handleFilter(e)} value={sortType}> 
                <option value="most">Most Voted</option>
                <option value="less">Less Voted</option>
            </select>
            <div>
                 {paginatedData?.map((item) => {
                     return (
                        <div key={item.id}>
                            <div>
                                {item.name}
                                {item.url}
                                {item.vote}
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                                <button onClick={(e) => handleVote(e, item)} name='up'>Up Vote</button>
                                <button onClick={(e) => handleVote(e, item)} name='down'>Down Vote</button>
                                <br />
                            </div>
                            
                        </div>
                     )
                 })}
            </div>
            {pages?.map((i, index) => {
                return (
                    <button key={index} onClick={() => setNumberVisited((i-1)*5)}>{i}</button>
                )
            })}
            <Modal 
                isModalOpen={isModalOpen}
                correctRemove={correctRemove}
                id={id}
            />
            
        </div>
    )
}

export default Main