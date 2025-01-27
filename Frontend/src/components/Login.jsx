import { assets } from '@/assets/assets';
import { AppContext } from '@/context/AppContext';
import { User } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import {motion} from 'framer-motion';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setAuthUserr } from '@/Redux/auth.js';
const Login = () => {
    const [state,setState]=useState('Login');
    const {setShowLogin,setToken,setUser,loading1}=useContext(AppContext);
    const [form,setForm]=useState({username:"",email:"",password:""});
    const dispatch=useDispatch( );
    
    const handleForm=(e)=>{
      e.preventDefault();
      setForm({...form,[e.target.name]:e.target.value})  
      
      
    }
    useEffect(()=>{
      document.body.style.overflow='hidden';
      return ()=>{
        document.body.style.overflow='unset';
      }  
    },[])

    const onSubmitHandler = async (e) => {
      e.preventDefault();
      try {
        const url = state === 'Login'
          ? `${import.meta.env.VITE_BACKEND_URL}/api/user/login`
          : `${import.meta.env.VITE_BACKEND_URL}/api/user/register`;
       
        const res = await fetch(url, {
          
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
    
        if (!res.ok) {
          const errorData = await res.json();
          toast.error(errorData?.message || res.statusText);
          return;
        }
    
        const data = await res.json();
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
        toast.success(`${state} successfully`);
        setForm({ username: "", email: "", password: "" });
        setShowLogin(false);
        dispatch(setAuthUserr(data.user));
      
      } catch (error) {
        toast.error(error.message || "An error occurred");
      }
    };
    
   
  return (
    <div className='fixed top-0 left-0  right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center '>
      <motion.form   onSubmit={onSubmitHandler}  initial={{scale:0}} animate={{scale:1}} transition={{duration:0.5}}    className='relative bg-white p-10 rounded-xl text-slate-500' >
        <h1 className='text-3xl text-center text-neutral-700 font-medium'>{state}</h1>
        <p className='text-sm text-center'>{
                state == 'Login' ? 'Welcome back! Login to your account' : 'Create an account to get started'

}</p>
        
        {
            state != 'Login' &&

            <div  className='border px-6 py-2 flex  items-center gap-2 rounded-full mt-5'>
          
            <User/> 
            <input type="text" placeholder='Username' name='username' onChange={handleForm} value={form.username} className='outline-none text-sm' required />
            </div>
        }
        
        
            <div  className='border px-6 py-2 flex  items-center gap-2 rounded-full mt-5'>
            <img src={assets.email_icon} alt="" />
            <input type="email" autoComplete='off' placeholder='Email' name='email' onChange={handleForm} value={form.email} className='outline-none text-sm' required />
            </div>
            <div  className='border px-6 py-2 flex  items-center gap-2 rounded-full mt-5'>
            <img src={assets.lock_icon} alt="" />
            <input type="password" placeholder='Password' name='password' autoComplete='new-password'  className='outline-none text-sm' onChange={handleForm} value={form.password} required />
            </div>
            <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot Password?</p>
            <button type='submit' className='bg-blue-600 w-full text-white py-2 rounded-full'>{


                state == 'Login' ? 'Login' : 'Sign up'
}
</button>
{
state == 'Login' ?
(

            <p className='mt-5 text-center'>Don't have an account ? <span onClick={()=>setState('Sign up')} className='text-blue-600 cursor-pointer'>Sign up</span></p> ):
             <p className='mt-5 text-center'>Already have an account ? <span onClick={()=>setState('Login')} className='text-blue-600 
            cursor-pointer'>Sign in</span></p>
            
            }
            <img src={assets.cross_icon} onClick={()=>setShowLogin(false)} className='absolute top-5 right-5  cursor-pointer' alt="" />
      </motion.form>
    </div>
  );
}
export default Login;
