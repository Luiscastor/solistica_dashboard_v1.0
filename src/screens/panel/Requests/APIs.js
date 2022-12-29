import axios from 'axios';

 const baseUrl = 'http://108.175.15.104:8080/api'

const getAllCities = async () => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.get(`${baseUrl}/location/getError/all`,{  headers: { Authorization: `${tokenApp}` }});
    return res;
  };
  const getAllStates = async () => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.get(`${baseUrl}/state/getState/all/enabled`,{  headers: { Authorization: `${tokenApp}` }});
    return res;
  };

  const deleteCity = async (
    registrationErrorId
    ) => {
      const tokenApp = window.localStorage.getItem('token') 
      const {data: res} = await axios.delete(`${baseUrl}/location/deteleError/${registrationErrorId}`,{  headers: { Authorization: `${tokenApp}` }});
      return res;
    };
    const deleteAllErrors = async (
      
      ) => {
        const tokenApp = window.localStorage.getItem('token') 
        const {data: res} = await axios.delete(`${baseUrl}/location/deteleError/all`,{  headers: { Authorization: `${tokenApp}` }});
        return res;
      };

  const putCity = async ({
    locationTypeId,
    locationTypedescription,
    locationTypeName,
    enabled
    }) => {
      const tokenApp = window.localStorage.getItem('token') 
      const {data: res} = await axios.patch(`${baseUrl}/locationType/update`,{ 
        locationTypeId,
        locationTypedescription,
        locationTypeName,
        enabled
       },{  headers: { Authorization: `${tokenApp}` }});
      return res;
    };


  const postCity = async ({
    locationTypedescription,
    locationTypeName,
    enabled
  }) => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.post(`${baseUrl}/locationType/save`,{ 
      locationTypedescription,
      locationTypeName,
      enabled
     },{  headers: { Authorization: `${tokenApp}` }});
    return res;
  };

  export default {
    getAllCities,
    deleteCity,
    deleteAllErrors,
    putCity,
    postCity,
    getAllStates
    }