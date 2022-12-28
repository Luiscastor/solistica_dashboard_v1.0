import axios from 'axios';

 const baseUrl = 'http://108.175.15.104:8080'

 const LoginF = async ({ 
    email,
    password
  }) => {
    const {data: res} = await axios.post(`${baseUrl}/login`,{ 
    email,
    password});
    return res;
  };

  export default {
    LoginF,
    }