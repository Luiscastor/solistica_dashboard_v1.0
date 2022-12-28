import axios from 'axios';

 const baseUrl = 'http://108.175.15.104:8080/api'

const getAllCities = async () => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.get(`${baseUrl}/city/getCity/all`,{  headers: { Authorization: `${tokenApp}` }});
    return res;
  };
  const getAllStates = async () => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.get(`${baseUrl}/state/getState/all/enabled`,{  headers: { Authorization: `${tokenApp}` }});
    return res;
  };

  const deleteCity = async ({
    cityId,
    state, 
    cityName,
    enabled
    }) => {
      const tokenApp = window.localStorage.getItem('token') 
      const {data: res} = await axios.patch(`${baseUrl}/city/update`,{ 
        cityId,
        state, 
        cityName,
        enabled
       },{  headers: { Authorization: `${tokenApp}` }});
      return res;
    };

  const putCity = async ({
    cityId,
    state, 
    cityName,
    enabled
    }) => {
      const tokenApp = window.localStorage.getItem('token') 
      const {data: res} = await axios.patch(`${baseUrl}/city/update`,{ 
        cityId,
        state, 
        cityName,
        enabled
       },{  headers: { Authorization: `${tokenApp}` }});
      return res;
    };


  const postCity = async ({
    state, 
    cityName,
    enabled
  }) => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.post(`${baseUrl}/city/save`,{ 
      state, 
      cityName,
      enabled
     },{  headers: { Authorization: `${tokenApp}` }});
    return res;
  };

  export default {
    getAllCities,
    deleteCity,
    putCity,
    postCity,
    getAllStates
    }