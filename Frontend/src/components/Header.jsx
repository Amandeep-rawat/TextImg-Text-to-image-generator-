import { assets } from '@/assets/assets';
import React, { useContext } from 'react';
import { Button } from './myUi/button';
import {motion} from "framer-motion";
import { AppContext } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';

import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
const Header = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const navigate=useNavigate();
    const {user,setShowLogin}=useContext(AppContext);
    const onClickHandler=async()=>
    {
        if(user){
            navigate('/result')
        }
        else{
            setShowLogin(true);
        }
    }
    return (
        <div className='headerDiv relative  '>
             <div className='videoclass absolute w-screen left-1/2 overflow-visible transform -translate-x-1/2   top-0  right-0 bottom-0  h-full    bg-black z-[-1]'>
        <video className='w-full h-full max-sm:hidden object-cover opacity-45  ' src="/vid.mp4" autoPlay  muted loop />

        <img src="/websiteBg.png" className='w-full h-full sm:hidden object-cover' alt="" />
        
      </div> 
        {isHomePage && <Navbar/>}
    <motion.section
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    className='flex flex-col justify-center overflow-x-hidden items-center text-center my-10'>
       
        
        <motion.div initial={{opacity:0,y:-20}} viewport={{once:true}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.8}} className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'>
            <p className='capitalize'>
            Best Stunning Visuals Generator
            </p>
            <img src={assets.star_icon} alt="staricon" />
        </motion.div>
        <motion.h1 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4,duration:0.8}} className='text-4xl font-semibold  max-w-[300px]  bg-gradient-to-b from-[#69968a] to-[#e7e9f4] bg-clip-text sm:text-7xl sm:max-w-[740px] mx-auto mt-6 text-transparent text-center '>Create Stunning  <span className=' bg-clip-text bg-gradient-to-r from-[#b73076] to-[#69968a]'> Visuals</span> in Seconds with <span className=' text-transparent bg-clip-text  bg-gradient-to-r from-[#b73076] to-[#69968a] font-semibold'>TextImg</span>
        </motion.h1>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.6,duration:0.8}} className='text-center text-white  max-w-xl max-sm:text-white/65 mx-auto mt-5'>Unleash your creativity with our AI-powered text to image generator, transform your written text into captivating images.</motion.p>
        <motion.button onClick={()=>{onClickHandler()}} initial={{opacity:0}} animate={{opacity:1}} transition={{default:{duration:0.5,opacity:{delay:0.8,duration:1}} }} whileHover={{scale:1.05}} whileTap={{scale:1.05}}   variant="outline" className='sm:text-lg   bg-gradient-to-r from-[#4943bb] to-[#69968a]  text-black/80 font-medium mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full w-auto '>
            Generate Images
            <img className='h-6' src={assets.star_group} alt="stargroup" />
        </motion.button>
        <motion.div     
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:1,duration:1}}
        
        
        className='flex items-center justify-center mt-8 flex-wrap gap-3'>
            {Array(6).fill('').map((item,index)=>{
                return(
                    
                    <motion.img
                    whileHover={{scale:1.05,duration:0.1}}
                    
                    className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' src={index%2 ? assets.sample_img_1 : assets.sample_img_2} alt="" key={index} width={70} />
                )
            })}
        </motion.div>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2,duration:1}}   className='mt-2 text-white/60 pb-2'>
            Generated images from <span className='font-normal'>Text</span><span className='text-blue-500'>I</span><span className='font-bold'>mg</span>
        </motion.p>
    </motion.section>
    </div>
  );
}

export default Header;
