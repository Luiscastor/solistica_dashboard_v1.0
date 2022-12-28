import axios from 'axios';

 const baseUrl = 'http://108.175.15.104:8080/api'

const getAllCities = async () => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.get(`${baseUrl}/usuarios/getUser/all`,{  headers: { Authorization: `${tokenApp}` }});
    return res;
  };
  const getAllStates = async () => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.get(`${baseUrl}/state/getState/all/enabled`,{  headers: { Authorization: `${tokenApp}` }});
    return res;
  };

  const deleteCity = async ({
    userId,
    userName,
    userMail,
    userPassword,
    telefono,
    departamento,
    rol,
    distribucion,
    enabled
    }) => {
      const tokenApp = window.localStorage.getItem('token') 
      const {data: res} = await axios.patch(`${baseUrl}/usuarios/update/info`,{ 
        userId,
        userName,
        userMail,
        userPassword,
        telefono,
        departamento,
        rol,
        distribucion,
        enabled
       },{  headers: { Authorization: `${tokenApp}` }});
      return res;
    };

  const putCity = async ({
    userId,
    userName,
    userMail,
    userPassword,
    telefono,
    departamento,
    rol,
    distribucion,
    enabled
    }) => {
      const tokenApp = window.localStorage.getItem('token') 
      const {data: res} = await axios.patch(`${baseUrl}/usuarios/update/info`,{ 
        userId,
        userName,
        userMail,
        userPassword,
        telefono,
        departamento,
        rol,
        distribucion,
        enabled
       },{  headers: { Authorization: `${tokenApp}` }});
      return res;
    };


  const postCity = async ({

    userName,
    userMail,
    userPassword,
    telefono,
    departamento,
    rol,
    distribucion,
    enabled
  }) => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.post(`${baseUrl}/usuarios/save`,{ 

      userName,
      userMail,
      userPassword,
      telefono,
      departamento,
      rol,
      distribucion,
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