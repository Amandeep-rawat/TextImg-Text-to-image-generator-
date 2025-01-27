import { assets } from '@/assets/assets';
import React from 'react';
import { motion } from 'framer-motion';
const Description = () => {
  return (
    <motion.section
    
    initial={{opacity:0,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    
    className='flex flex-col items-center justify-center my-24 p-6 md:px-20'>
        <h1 className='text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#b73076] to-[#342bb0] font-semibold mb-2 '>Generate Stunning AI Images</h1>
        <p className='text-gray-500 mb-8 '>Turn your imagination into reality</p>

        <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
           <img className='w-80 object-cover xl:w-96 rounded-lg' src="websiteBg.png" alt="" />
            <div >
                <h2 className='text-3xl font-medium max-w-lg text-transparent bg-clip-text bg-gradient-to-r from-[#d33e8b] to-[#4c43d0] mb-4'>Introducing the AI-Powered Stunning Visuals Generator</h2>
                <p className='text-gray-600 '>Easily bring your ideas to life with our AI-powered text to image generator. Transform your written text into stunning images in seconds. Our tool utilizes cutting-edge technology to generate high-quality images that capture your vision. Hence you can focus on your creativity.</p>


            </div>
        </div>
    </motion.section>
  );
}

export default Description;
