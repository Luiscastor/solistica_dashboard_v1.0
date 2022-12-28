import axios from 'axios';

 const baseUrl = 'http://108.175.15.104:8080/api'

const getAllCities = async () => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.get(`${baseUrl}/taxType/getTaxType/all`,{  headers: { Authorization: `${tokenApp}` }});
    return res;
  };
  const getAllStates = async () => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.get(`${baseUrl}/state/getState/all/enabled`,{  headers: { Authorization: `${tokenApp}` }});
    return res;
  };

  const deleteCity = async ({
    taxTypeName, 
    taxTypeDescription,
    enabled,
    taxTypeId
    }) => {
      const tokenApp = window.localStorage.getItem('token') 
      const {data: res} = await axios.patch(`${baseUrl}/taxType/update`,{ 
        taxTypeName, 
        taxTypeDescription,
        enabled,
        taxTypeId
       },{  headers: { Authorization: `${tokenApp}` }});
      return res;
    };

  const putCity = async ({
    taxTypeName, 
    taxTypeDescription,
    enabled,
    taxTypeId
    }) => {
      const tokenApp = window.localStorage.getItem('token') 
      const {data: res} = await axios.patch(`${baseUrl}/taxType/update`,{ 
        taxTypeName, 
        taxTypeDescription,
        enabled,
        taxTypeId
       },{  headers: { Authorization: `${tokenApp}` }});
      return res;
    };


  const postCity = async ({
    taxTypeName, 
    taxTypeDescription,
    enabled
  }) => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.post(`${baseUrl}/taxType/save`,{ 
      taxTypeName, 
      taxTypeDescription,
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