import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

function App() {
  const [data, setData] = useState('');
  const [requestParams, setRequestParams] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Component Mounted');
    async function getData() {
      let response = await axios.get(requestParams);
      console.log(requestParams)
      setData(response.data.results);
    }
    getData();
  }, []);

  let callApi = (formData) => {
    setLoading(true);
    setTimeout(() => {
      setData(formData);
      setRequestParams(formData);
      setLoading(false);
    },1000)
  }
  return (
    <>
      <Header />
      {/* <div>Request Method: {requestParams.method}</div> */}
      {/* <div>URL: {requestParams.url}</div> */}
      {/* <div>Data: {requestParams.json}</div> */}
      <Form handleApiCall={callApi} />
      <Results data={data} loading={loading}/>
      <Footer />
    </>
  );
}

export default App;