import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import './App.scss';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
// import History from './Components/History';

export const initialState = {
  data: null,
  requestParams: false,
  loading: false,
  history: [],
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_REQUEST':
      return {
        ...state,
        loading: true,
        requestParams: action.payload
      };
    case 'FINISH_REQUEST':
      return {
        ...state,
        loading: false,
        data: action.payload,
        history: [
          ...state.history, 
          {
          requestParams: { ...state.requestParams },
          data: action.payload
        }
        ],
      }
      case 'CHANGE_HISTORY':
        return {
          ...state,
          history: [...state.history, action.payload],
        }
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  let callApi = (requestParams) => {
    let action = {
      type: 'START_REQUEST',
      payload: requestParams
    }
    dispatch(action)
  }

  const changeHistory = (idx) => {
    let action = {
      type: 'CHANGE_HISTORY',
      payload: idx,
    }
    dispatch(action)
  }

  useEffect(() => {
    const getData = async () => {
      if (state.requestParams.method && state.requestParams.url) {
        const response = await axios(state.requestParams);
        const data = response.data;
        let action = {
          type: 'FINISH_REQUEST',
          payload: data,
        }
        dispatch(action);
      }
    }
    getData();
  }, [state.requestParams])

  return (
    <>
      <Header />
      <div>Request Method: {state.requestParams.method}</div>
      <div>URL: {state.requestParams.url}</div>
      <div>Data: {state.requestParams.data}</div>
      <Form handleApiCall={callApi} />
      {/* <History history={state.history}changeHistory={changeHistory}/> */}
      <Results data={state.data} loading={state.loading} />
      <Footer />
    </>
  );
}

export default App;
