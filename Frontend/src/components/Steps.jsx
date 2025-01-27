import React from 'react';
import { stepsData } from '@/assets/assets';
import {motion} from 'framer-motion';
const Steps = () => {
  return (
    <motion.section
    
    initial={{opacity:0,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    
    className='flex flex-col items-center justify-center my-32 w-full   '>
        <h1 className='text-3xl  sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#b73076] to-[#342bb0]  font-semibold mb-2'>How it works?</h1>
        <p className='text-lg text-gray-600 mb-8'>Transform Words Into Stunning Images</p>
        <div className='space-y-4  max-w-4xl xl:w-[80%] xl:max-w-full  text-sm'>
          {
            stepsData.map((item,index)=>{
              return(
                <div className='flex rounded-t-[60px] items-center gap-4 p-10 max-sm:p-6 px-8 bg-gradient-to-tr from-[#8360a1] to-[#3a3586] shadow-md border cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg' key={index}>
                  <img width={40} src={item.icon} alt="itemicon" />
                  <div>
                    <h2 className='text-xl text-[#e6e9e6] font-medium'>{item.title}</h2>
                    <p className='text-black/70'>{item.description}</p>

                  </div>
                </div>
              )
            })
          }
        </div>
    </motion.section>
  );
}

export default Steps;
