import React, { useState } from 'react'
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate=useNavigate()
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState();
  const [errMsg,setErrMsg]= useState('')
  const [check,setCheck] = useState('')

  const handleUsernameInput = (e) =>setUsername(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);
  const handleConfirmPassword = (e) =>setConfirmPassword(e.target.value);
  const togglePasswordVisibility = () => {
    setCheck((prevState) => !prevState);
  };
  const apiUrl='http://127.0.0.1:8000';
  const handleSubmit = async(event) =>{
    event.preventDefault();
    if (password !==confirmPassword){
      setErrMsg('Passwords do not match')
      return;
    }
    try{
      await axios.post(`${apiUrl}/userreg/`,{
        username: username,
        password: password,
      });
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setErrMsg("");
      navigate('/login', { state: { successMessage: "Registration successful. Please log in." } })
    }catch(error){
      setErrMsg(error.response.data);
    }
  };
 return(
    <div>
      <div className='mx-auto mt-16 shadow-lg w-96 bg-slate-300 rounded-lg'>
        <h3 className='text-center uppercase font-bold text-2xl pt-3'>REGISTER</h3>
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
        <form onSubmit={handleSubmit} className='flex flex-col mx-auto p-5 '>
          <label>Username *</label>
          <input type="text" required onChange={handleUsernameInput} className='pl-1 outline-none  py-1'  />
          <label>Password * </label>
          <input type={check? "text": "password"} onChange={handlePasswordInput}required name=''className='pl-1 outline-none  py-1'/>
          <label>Password * </label>
          <input type={check? "text": "password"} onChange={handleConfirmPassword} required name=''className='pl-1 outline-none  py-1'/>
          <div className='flex gap-3 mb-3'>
            <label>Show password</label>
            <input type='checkbox' checked={check} onChange={togglePasswordVisibility}/>
          </div>
          <button className='bg-green-700 py-2 px-5 rounded-xl text-white font-semibold text-lg shadow-md '>Sign Up</button>
        </form>
        <p className='text-center text-sm pb-3'>Already have an account? 
          <Link className='underline text-blue-800' to='/login'>Login</Link></p>
      </div>
    </div>
  )
}

export default Register