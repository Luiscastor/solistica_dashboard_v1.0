import axios from 'axios';

 const baseUrl = 'http://108.175.15.104:8080/api'

const getAllPaises = async () => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.get(`${baseUrl}/corporation/getCorporation/all`,{  headers: { Authorization: `${tokenApp}` }});
    return res;
  };

  const deleteCountry = async ({
    corporationId,
    enabled,
    }) => {
      const tokenApp = window.localStorage.getItem('token') 
      const {data: res} = await axios.patch(`${baseUrl}/corporation/update/enabled`,{ 
        corporationId,
        enabled,
       },{  headers: { Authorization: `${tokenApp}` }});
      return res;
    };

  const putCountry = async ({
    corporationName,
    corporationId,
    enabled,
    }) => {
      const tokenApp = window.localStorage.getItem('token') 
      const {data: res} = await axios.patch(`${baseUrl}/corporation/update`,{ 
        corporationId,
        corporationName, 
        enabled
       },{  headers: { Authorization: `${tokenApp}` }});
      return res;
    };


  const postCountry = async ({
    corporationName, 
    enabled
  }) => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.post(`${baseUrl}/corporation/save`,{ 
      corporationName, 
      enabled
     },{  headers: { Authorization: `${tokenApp}` }});
    return res;
  };

  export default {
    getAllPaises,
    deleteCountry,
    postCountry,
    putCountry
    }