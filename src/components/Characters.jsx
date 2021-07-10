import React, { useState, useReducer, useMemo, useRef, useCallback } from "react";
import Card from "../components/Card";
import Search from "../components/Search";
import useCharacters from "../hooks/useCharacters";

const initialState = {
    favorites: []
}

const API = "https://rickandmortyapi.com/api/character/"

const favoriteReducer = (state,action) => {
    switch (action.type) {
        case 'ADD_TO_FAVORITE':
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            };
        default:
            return state;
    }
}

const Characters = () => {

    const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
    const [search, setSearch] = useState("");
    const searchInput = useRef(null);

    // const getCharacters = async () => {
    //     const response = await fetch("https://rickandmortyapi.com/api/character");
    //     const characters = await response.json();
    //     // const newCharacters = data.results
    //     setCharacters(characters.results);
    // };

    const characters = useCharacters(API);

    const handleClick = favorite => {
        dispatch({ type: 'ADD_TO_FAVORITE', 
        payload: favorite })
    }

    // const handleSearch = () => {
    //     setSearch(searchInput.current.value);
    // }

    const handleSearch = useCallback(() => {
        setSearch(searchInput.current.value);
    }, [])

    // const filteredUsers = characters.filter((user) => {
    //     return user.name.toLowerCase().includes(search.toLowerCase());
    // })

    const filteredUsers = useMemo(() =>
        characters.filter((user) => {
            return user.name.toLowerCase().includes(search.toLowerCase());
        }),
        [characters, search]
    )

    // if(characters.length === 0) return (null)

    return (
        <div className="Characters">

            {favorites.favorites.map(favorite =>(
                <li key={favorite.id}>
                    {favorite.name}
                </li>
            ))}

            <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />

            {filteredUsers.map(character => (
                <div className="item" key={character.id}>
                    <Card character={character} />
                    <button type="button" onClick={() => handleClick(character)}>Agregar a Favoritos</button>
                </div>
            ))}
        </div>
    );
}

export default Characters;