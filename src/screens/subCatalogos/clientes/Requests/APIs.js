import axios from 'axios';

 const baseUrl = 'http://108.175.15.104:8080/api'

const getAllCities = async () => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.get(`${baseUrl}/customer/getCustomer/all`,{  headers: { Authorization: `${tokenApp}` }});
    return res;
  };
  const getAllStates = async () => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.get(`${baseUrl}/state/getState/all/enabled`,{  headers: { Authorization: `${tokenApp}` }});
    return res;
  };

  const deleteCity = async ({
    customerId,
    customerName,
    customerBase,
    customerRadio,
    enabled
    }) => {
      const tokenApp = window.localStorage.getItem('token') 
      const {data: res} = await axios.patch(`${baseUrl}/customer/update`,{ 
        customerId,
        customerName,
        customerBase,
        customerRadio,
        enabled
       },{  headers: { Authorization: `${tokenApp}` }});
      return res;
    };

  const putCity = async ({
    customerId,
    customerName,
    customerBase,
    customerRadio,
    enabled
    }) => {
      const tokenApp = window.localStorage.getItem('token') 
      const {data: res} = await axios.patch(`${baseUrl}/customer/update`,{ 
        customerId,
        customerName,
        customerBase,
        customerRadio,
        enabled
       },{  headers: { Authorization: `${tokenApp}` }});
      return res;
    };


  const postCity = async ({
    customerName,
    customerBase,
    customerRadio,
    enabled
  }) => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.post(`${baseUrl}/customer/save`,{ 
      customerName,
      customerBase,
      customerRadio,
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