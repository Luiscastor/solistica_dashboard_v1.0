import axios from 'axios';

 const baseUrl = 'http://108.175.15.104:8080/api'

const getAllCities = async () => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.get(`${baseUrl}/timezone/getTimeZone/all`,{  headers: { Authorization: `${tokenApp}` }});
    return res;
  };
  const getAllStates = async () => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.get(`${baseUrl}/state/getState/all/enabled`,{  headers: { Authorization: `${tokenApp}` }});
    return res;
  };

  const deleteCity = async ({
    timeZoneId,
    timeZoneName,
    utcNumberHours,
    abbreviationCode,
    enabled
    }) => {
      const tokenApp = window.localStorage.getItem('token') 
      const {data: res} = await axios.patch(`${baseUrl}/timezone/update`,{ 
        timeZoneId,
        timeZoneName,
        utcNumberHours,
        abbreviationCode,
        enabled
       },{  headers: { Authorization: `${tokenApp}` }});
      return res;
    };

  const putCity = async ({
    timeZoneId,
    timeZoneName,
    utcNumberHours,
    abbreviationCode,
    enabled
    }) => {
      const tokenApp = window.localStorage.getItem('token') 
      const {data: res} = await axios.patch(`${baseUrl}/timezone/update`,{ 
        timeZoneId,
        timeZoneName,
        utcNumberHours,
        abbreviationCode,
        enabled
       },{  headers: { Authorization: `${tokenApp}` }});
      return res;
    };


  const postCity = async ({
    timeZoneName,
    utcNumberHours,
    abbreviationCode,
    enabled
  }) => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.post(`${baseUrl}/timezone/save`,{ 
      timeZoneName,
      utcNumberHours,
      abbreviationCode,
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