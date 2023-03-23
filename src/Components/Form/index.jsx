import React, { useState, useReducer } from 'react';
import axios from 'axios';
import './Form.scss';

export const initialState = {
  name: 'Search Results',
  searchHistory: ['abc.com', 'xyz.com'],
};

export const searchReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SEARCH':
      return { ...state, searchHistory: [...state.searchHistory, action.payload] }
    case 'REMOVE':
      return { ...state, searchHistory: state.searchHistory.filter(search => search !== action.payload) };
    default:
      return state;
  }
};

const Search = () => {
  const [input, setInput] = useState('');
  const [quote, setQuote] = useState('');
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const addSearch = () => {
    let action = {
      type:'SEARCH',
      payload: input,
    };
    dispatch(action);
  }
  const removeSearch = () => {
    let action = {
      type: 'REMOVE',
      payload: input,
    };
    dispatch(action);
  };

  const axiosQuote = () => {
    axios.get('https://api.quotable.io/random')
    .then(response => {
      console.log(response.data.content)
      setQuote(response.data.content)
    }).catch(error => {
      console.log(error);
    })
  }


  return(
    <>
      <h1>{state.name}</h1>
      <input onChange={(e) => setInput(e.target.value)} />
      <button onClick={addSearch}>Search for a URL</button>
      <button onClick={removeSearch}>Delete A Search Result</button>
      <button onClick={axiosQuote}>Click here to generate a Motivational Quote</button>
      <h3>{quote && quote}</h3>

    <ul>
      {
        state.searchHistory.map((search, idx) => (
          <li key={`search=${idx}`}>{search}</li>
        ))
      }
    </ul>

    </>
  )
}

export default Search;