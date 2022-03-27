import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { getVideogamesByName } from '../../Redux/Actions';
import './searchBar.css'

export const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange (e) {
        e.preventDefault();
        setName(e.target.value)
    }
    console.log("ACAAAAA", name)

    function handleSubmit (e) {
        e.preventDefault();
        dispatch(getVideogamesByName(name))
        setName('');
        
    }
   

    return (
        <form onSubmit={handleSubmit} className='search-container'>
            <input 
                placeholder="Search more games..."
                type='text'
                name='search'
                id='Search' 
                value={name}
                onChange={handleInputChange}
                className='search-input'>
            </input>
            <button className='search-boton'>Search</button>
        </form>
    )
}