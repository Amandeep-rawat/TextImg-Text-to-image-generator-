import { assets } from '@/assets/assets';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from './myUi/button';
import { AppContext } from '@/context/AppContext';
import { Loader } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

const Navbar = () => {
   const {loading1,user,setShowLogin,logout,credit,}=useContext(AppContext);
    const navigate=useNavigate();
    if(loading1){
        return (
            <Loader className='w-10 h-10 animate-spin m-auto ' />
        )
    }
    return (
        <header className='flex items-center border-b border-red-400 justify-between py-4'>
            <Link to="/">
            <img src={assets.logo} className='w-14 sm:w-16 lg:w-16' alt="logo" />
            </Link>
            
    <div className='flex gap-x-6 items-center'>
    <DropdownMenu className="">
  <DropdownMenuTrigger className='cursor-pointer bg-gradient-to-br px-2 rounded-md py-2 from-[#407ad2] to-[#511d9a] text-[#fafafa] text-sm max-sm:text-[9px] max-sm:py-2 max-sm:font-normal   font-semibold'>What's New</DropdownMenuTrigger>
  <DropdownMenuContent className="bg-gradient-to-bl from-[#726a6f] to-[#3b32b1] text-white">
    <DropdownMenuLabel>Features Added</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="py-2" onClick={()=>{navigate('/')}}>Text to Image</DropdownMenuItem>
    <DropdownMenuItem className="py-2" onClick={()=>{navigate('/bgremoval')}}>Background Remover</DropdownMenuItem>
    <DropdownMenuItem className="py-2" onClick={()=>{navigate('/short-vid-gen')}}>Text to Video Generator</DropdownMenuItem>
   
  </DropdownMenuContent>
</DropdownMenu>

 
        {user? (
            <div className='flex items-center gap-2 sm:gap-3'>
                <Button onClick={()=>{navigate('/buycredit')}} className="max-sm:px-2 py-0.5" variant="outline" >
                    <img className='w-5 max-sm:w-3' src={assets.credit_star} alt="creditstar" />
                    <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits : {credit}</p>
                </Button>
                <p className='text-transparent bg-clip-text bg-gradient-to-r from-[#62c4eb] to-[#5c10cf] max-sm:hidden pl-4'>Hi,{user.name}</p>
                <div className='relative group '>
                    <img src={assets.profile_icon} alt="asssetsuser"  className='w-10 drop-shadow'/>
                    <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                            <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                                <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
                            </ul>
                    </div>
                </div>
            </div>
        ):
        (
            <div className='flex items-center gap-2 sm:gap-5'>
                <p className='cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-[#62c4eb] to-[#5c10cf] font-semibold' onClick={()=>{navigate('/buycredit')}}>Pricing</p>
                <Button onClick={()=>{setShowLogin(true)}} variant="destructive" >Login</Button>
            </div>
        )
    }
        
    </div>

        </header>

);
}

export default Navbar;
