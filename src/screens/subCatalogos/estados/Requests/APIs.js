import axios from 'axios';

 const baseUrl = 'http://108.175.15.104:8080/api'

const getAllPaises = async () => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.get(`${baseUrl}/country/getCountry/all`,{  headers: { Authorization: `${tokenApp}` }});
    return res;
  };
  const getAllStates = async () => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.get(`${baseUrl}/state/getState/all/enabled`,{  headers: { Authorization: `${tokenApp}` }});
    return res;
  };

  const deleteCountry = async ({
    country,
    stateId, 
    stateCode,
    stateName,
    enabled,
    }) => {
      const tokenApp = window.localStorage.getItem('token') 
      const {data: res} = await axios.patch(`${baseUrl}/state/update/enabled`,{ 
        country,
        stateId, 
        stateCode,
        stateName,
        enabled,
       },{  headers: { Authorization: `${tokenApp}` }});
      return res;
    };

  const putCountry = async ({
    country, 
    stateCode,
    stateName,
    enabled,
    stateId,
    }) => {
      const tokenApp = window.localStorage.getItem('token') 
      const {data: res} = await axios.patch(`${baseUrl}/state/update`,{ 
        country, 
        stateCode,
        stateName,
        enabled,
        stateId
       },{  headers: { Authorization: `${tokenApp}` }});
      return res;
    };


  const postCountry = async ({
    country, 
    stateCode,
    stateName,
    enabled
  }) => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.post(`${baseUrl}/state/save`,{ 
      country, 
      stateCode,
      stateName,
      enabled
     },{  headers: { Authorization: `${tokenApp}` }});
    return res;
  };

  export default {
    getAllPaises,
    deleteCountry,
    postCountry,
    putCountry,
    getAllStates
    }