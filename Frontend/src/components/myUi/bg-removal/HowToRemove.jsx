import React from 'react';
import {motion} from 'framer-motion';
const HowToRemove = () => {
  return (
    <motion.div initial={{opacity:0,y:120}} viewport={{once:true}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.8}} className=' mt-5 flex gap-y-4 flex-col items-center mb-10 border-b pb-2'>
        <motion.h1 initial={{opacity:0,y:30}} viewport={{once:true}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.8}} className='text-transparent bg-clip-text max-w-2xl text-center bg-gradient-to-br from-[#726a6f] to-[#342bb0] font-bold text-4xl '>How to Remove Background From the Picture ?</motion.h1>
        <motion.div initial={{opacity:0,y:50}} viewport={{once:true}} whileInView={{opacity:1,y:0}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.8}} className='flex rounded-xl max-lg:flex-col max-lg:gap-y-3  justify-center items-stretch    text-white  bg-gradient-to-bl from-[#726a6f] to-[#3b32b1] py-11  px-4 gap-x-5'>
            <div className='flex w-1/3 max-lg:w-full     flex-col gap-y-4 rounded-xl px-10 py-16 bg-blue-300/40'>
                <h1 className='flex text-transparent bg-clip-text bg-gradient-to-br from-[#fcf1f1] to-[#b1b1b1] font-bold text-xl gap-x-2'><p className=' w-6 h-6 rounded-full text-center bg-black/60 text-white'>1</p>Upload your Image</h1>
                <p className='max-w-md ml-3'>Upload a JPG, PNG or HEIC file. Try to choose an image where the subject has clear edges.</p>
            </div>
            <div className='flex w-1/3 flex-col max-lg:w-full  gap-y-4 rounded-xl px-10 py-16 bg-blue-300/40'>
            <h1 className='flex text-transparent bg-clip-text bg-gradient-to-br from-[#fcf1f1] to-[#b1b1b1] font-bold text-xl gap-x-2'><p className=' w-8 h-6 rounded-full text-center bg-black/60 text-white'>2</p>Automatically remove background online</h1>
            <p className='max-w-md ml-3'>Pixelcut will automatically remove the background from your image. Once the background is removed, you can refine the cutout if you need to.</p>
            </div>
            <div className='flex w-1/3 max-lg:w-full flex-col gap-y-4   rounded-xl px-10 py-16 bg-blue-300/40'>
            <h1 className='flex text-transparent bg-clip-text bg-gradient-to-br from-[#fcf1f1] to-[#b1b1b1] font-bold text-xl gap-x-2'><p className=' w-10 h-6 rounded-full text-center bg-black/60 text-white'>3</p>
            Download or save new image as PNG file with no background</h1>
            <p className='max-w-md ml-3'>Download your new cutout image to share, or keep editing and add new background details.</p>
            </div>
        </motion.div>
      
    </motion.div>
  );
}

export default HowToRemove;
