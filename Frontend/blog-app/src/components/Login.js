import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { login } from '../features/authentication/authSlice';
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const Login = () => {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [check,setCheck] =useState(false);
  const [errMsg,setErrMsg]=useState('');
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const handleUsernameInput = (e) => setUsername(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);
  const togglePasswordVisibility = () => {
    setCheck((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    try {
      await dispatch(login({ username, password }));
      setUsername('');
      setPassword('');
      // setLoading(false);
      navigate('/');
    } catch (error) {
      // setLoading(false);
      if (!error?.originalStatus) {
        setErrMsg(error.response?.data?.detail);
      } else if (error.originalStatus === 400) {
        setErrMsg(error.response?.data?.detail);
      } else if (error.originalStatus === 401) {
        setErrMsg(error.response?.data?.detail);
      } else {
        setErrMsg("Login Failed");
      }
      navigate("/login");
    }
  };


  return (
    <div>
      <div className='mx-auto mt-16 shadow-lg w-96 bg-slate-300 rounded-lg'>
        <h3 className='text-center uppercase font-bold text-2xl pt-3'>LOGIN </h3>
        <div>
         {errMsg && 
         <div className='error'>
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">  
              {errMsg}!
            </Alert>
          </Stack>  
          </div>}
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col mx-auto p-5'>
          <label>Username *</label>
          <input type='text' required name=''onChange={handleUsernameInput} className='pl-1 outline-none  py-1' />
          <label>Password * </label>
          <input type={check? "text": "password"} onChange={handlePasswordInput} required name=''className='pl-1 outline-none  py-1'/>
          <div className='flex content-center gap-3 mb-3 '>
            <label>Show password</label>
            <input type='checkbox' checked={check} onChange={togglePasswordVisibility}/>
          </div>
          <button className='bg-green-700 py-2 px-5 rounded-xl text-white font-semibold text-lg shadow-md '>Login</button>
        </form>
        <p className='text-center text-sm pb-3'>Dont have an account? 
          <Link className='underline text-blue-800' to='/register'>Register</Link></p>
      </div>
    </div>
  )
}

export default Login;
















































































































































































































































































































































































