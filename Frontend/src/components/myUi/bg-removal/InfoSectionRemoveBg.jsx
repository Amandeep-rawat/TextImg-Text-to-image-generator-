import React from 'react';
import {motion} from 'framer-motion';
const InfoSectionRemoveBg = () => {
  return (
    <div className='min-h-screen '>
      <motion.div initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}} className='flex flex-col items-center gap-y-3'>
        <motion.h1 initial={{opacity:0,y:20}} viewport={{once:true}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.8}} className='text-4xl max-w-3xl mx-auto text-center sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#726a6f] to-[#342bb0] font-bold mb-2' >Remove Backgrounds 100% Automatically in seconds. </motion.h1>
        <motion.p initial={{opacity:0,y:30}} viewport={{once:true}} animate={{opacity:1,y:0}} transition={{delay:0.4,duration:0.8}} className='text-gray-500 max-w-2xl mx-auto text-center'>Our online background remover instantly detects the subject from any photo and gives you a smooth & clear cutout. Now you can save a incredible amount of time as our AI is capable of handling hair, fur or any complex edges in just a few seconds.</motion.p>
        <div initial={{opacity:0,y:60}} viewport={{once:true}} animate={{opacity:1,y:0}} transition={{delay:0.6,duration:0.8}} className='cardsHere w-1/2 max-sm:w-full mx-auto mt-11 flex justify-between '>
            <div  className='flex items-center flex-col'>
                <img className='w-60 object-cover h-72' src="/productWithBg.jpg" alt="" />
                <p className='text-gray-400'>With Background</p>
            </div>
            <div className='flex items-center flex-col'>
            <img className='w-60 object-cover h-72' src="/productWithoutBg.jpg" alt="" />
            <p className='text-gray-400'>Without Background</p>
            </div>
        </div>
      </motion.div>
    </div>
  );
}

export default InfoSectionRemoveBg;
