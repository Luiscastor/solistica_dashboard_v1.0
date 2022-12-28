import axios from 'axios';

 const baseUrl = 'http://108.175.15.104:8080/api/usuarios/getUser'

const getAllEmployees = async () => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.get(`${baseUrl}/all`,{  headers: { Authorization: `${tokenApp}` }});
    return res;
  };

  const deleteEmployee = async (id_contacto,userID) => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.delete(`${baseUrl}/${id_contacto}`,{  headers: { Authorization: `${tokenApp}` }});
    return res;
  };



  const postNewEmployee = async ({
      
      id_usuario, 
      active_visibility,
      email,
      name,
      phone_number,

  }) => {
    const tokenApp = window.localStorage.getItem('token') 
    const {data: res} = await axios.post(`${baseUrl}`,{ 
      active_visibility,
      email,
      name,
      phone_number, },{  headers: { Authorization: `${tokenApp}` }});
    return res;
  };

  export default {
    getAllEmployees,
    deleteEmployee,
    postNewEmployee,
    }