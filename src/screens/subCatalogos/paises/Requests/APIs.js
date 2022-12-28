import axios from 'axios';

 const baseUrl = 'http://108.175.15.104:8080/api'

const getAllPaises = async () => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.get(`${baseUrl}/country/getCountry/all`,{  headers: { Authorization: `${tokenApp}` }});
    return res;
  };

  const deleteCountry = async ({
    countryName,
    countryCode, 
    countryId,
    enabled,
    }) => {
      const tokenApp = window.localStorage.getItem('token') 
      const {data: res} = await axios.patch(`${baseUrl}/country/update`,{ 
        countryName,
        countryCode, 
        countryId,
        enabled,
       },{  headers: { Authorization: `${tokenApp}` }});
      return res;
    };

  const putCountry = async ({
    countryName,
    countryCode, 
    countryId,
    enabled,
    }) => {
      const tokenApp = window.localStorage.getItem('token') 
      const {data: res} = await axios.patch(`${baseUrl}/country/update`,{ 
        countryId,
        countryName, 
        countryCode,
        enabled
       },{  headers: { Authorization: `${tokenApp}` }});
      return res;
    };


  const postCountry = async ({
  countryName, 
  countryCode,
  }) => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.post(`${baseUrl}/country/save`,{ 
      countryName, 
      countryCode,
     },{  headers: { Authorization: `${tokenApp}` }});
    return res;
  };

  export default {
    getAllPaises,
    deleteCountry,
    postCountry,
    putCountry
    }