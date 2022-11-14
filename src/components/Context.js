import React, { useContext, useEffect, useState } from "react";
import { v4 as uuid } from 'uuid'

const AppContext = React.createContext();

const initialValues = {
    name: '',
    url: '',
    vote: 0
}

const dataPerPage = 5;

const AppProvider = ({ children }) => {

    const [numberVisited, setNumberVisited] = useState(0)
    const [info, setInfo] = useState(initialValues)
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [paginatedData, setPaginatedData] = useState([])
    const [pages, setPages] = useState([1])
    const [sortType, setSortType] = useState('Most Voted')
    const [isModalOpen, setIsModelOpen] = useState(false)
    const [id, setId] = useState()

    const handleFilter = (e) => {
        setSortType(e.target.value)
        if (e.target.value === 'most') {
            //Bigger to lower sorted
            const sorted = [...data].sort((a,b) => b['vote'] - a['vote'])
            setData(sorted)
        }
        if (e.target.value === 'less') {
            //Lower to bigger
            const sorted = [...data].sort((a,b) => a['vote'] - b['vote'])
            setData(sorted)
        }
    }

    const handleDelete = (itemId) => {
        setIsModelOpen(true)
        let newId = checkWhicId(itemId)
        setId(newId)
    }

    const checkWhicId = (itemId) => {
        data.filter(i => i.id === itemId)
        return itemId
    }

    const correctRemove = (e, itemId) => {
        if (e.target.value === 'cancel') {
            setIsModelOpen(false)
            setId()
            return 
        }

        if (e.target.value === 'ok') {
            setIsModelOpen(false)
            const newData = data.filter(i => i.id !== itemId)
            setData(newData)
            setId()
            return 
        }
        
        if (e.target.value === 'close') {
            setIsModelOpen(false)
            setId()
            return 
        }
    }

    const handleVote = (e, item) => {
        if (e.target.name === 'up') {
            let newData = data.map(i => {
                if (i.id === item.id) {
                    return {...i, vote: i.vote+1}
                }
                return i
            })
            newData = [...newData].sort((a,b) => b['vote'] - a['vote'])
            setData(newData)   
        }

        if (e.target.name === 'down') {
            let newData = data.map(i => {
                if (i.id === item.id) {
                    return {...i, vote: i.vote-1}
                }
                return i
            })
            newData = [...newData].sort((a,b) => b['vote'] - a['vote'])
            setData(newData)
        }
        
    }

    const getPaginateData = () => {
        //We are gonna limit page size the data.length === 5
        if (data.length <= 5) return

        const totalPages = Math.ceil(data.length/5)
        let newPages = []
        for (let i=1 ; i<=totalPages; i++){
            newPages.push(i)
        }
        setPages(newPages)
    }

    const getPaginatedGroup = () => {
        const newData = data.slice(numberVisited, numberVisited + dataPerPage)
        setPaginatedData(newData)
    }

    useEffect(() => {
        getPaginateData()
        getPaginatedGroup()
    }, [data, numberVisited])

    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setInfo({...info, id: uuid(), [name]: value});
    }

    const handleSubmit = (e, navigate) => {
        e.preventDefault();
        let newData = data
        newData = [...newData].sort((a,b) => a['vote'] - b['vote'])
        newData = newData.concat(info)
        setData(newData.reverse())
        setInfo(initialValues)
        navigate('/')
    }


    return (
        <AppContext.Provider
        value={{
            handleSubmit,
            handleChange,
            handleDelete,
            handleVote,
            currentPage,
            setCurrentPage,
            paginatedData,
            pages,
            setNumberVisited,
            sortType,
            handleFilter,
            isModalOpen,
            correctRemove,
            id
        }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
