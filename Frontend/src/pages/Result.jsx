import { assets } from '@/assets/assets';
import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '@/context/AppContext';
import { Loader } from 'lucide-react';
import Lottie from 'react-lottie-player';
import lottieJson from '@/assets/animation.json'
const Result = () => {
  const [image,setImage]=useState(assets.vrm);
  const [isImageLoaded,setIsImageLoaded]=useState(false);
  const [loading,setLoading]=useState(false);
  const [input,setInput]=useState('');
  const [congrats,setCongrats]=useState(false);

  const {generateImage} =useContext(AppContext);



  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    setLoading(true);
    if(input){
      const {image,success} =await generateImage(input);

      if(image){
        setIsImageLoaded(true);
        setImage(image);
      }
      if(success){
        setCongrats(true);
      }
    }
    setInput('');
    setLoading(false);
  }
  return (
    <motion.form 
    initial={{opacity:0,y:100}}
    transition={{duration:1}}
    viewport={{once:true}}
    whileInView={{opacity:1,y:0}}
    action="" onSubmit={onSubmitHandler} className='flex my-10 flex-col min-h-[90vh items-center justify-center]'>

    <div>
      <section className='relative'>
        <motion.img key={image} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}  className='max-w-sm max-sm:max-w-xs rounded' src={image} alt="spimage1" />

        {
          congrats &&
          <Lottie loop={false}  animationData={lottieJson} play  className='absolute top-0 left-0 w-full h-full' />
        }
        {
          loading &&

          <div className='absolute flex flex-col gap-2 items-center justify-center top-0 left-0  w-full h-full bg-black/80 z-10 '>

          <h2 className='text-white text-2xl'>Generating...</h2>
          <Loader className=' text-white  w-10 h-10 animate-spin mx-auto   ' />
        </div>
        }
        <span className={` ${!loading ? 'hidden' : 'block'} absolute bottom-0 left-0 h-1 bg-blue-500 w-full transition-all duration-[10s]`}>

        </span>
      </section>
      <p className={`${!loading ? 'hidden' : 'block'}`}> Loading...</p>


    </div>
    {
      !isImageLoaded &&
    <div className='flex w-full gap-1 max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-6 rounded-full'>
      <input onChange={(e)=>{
        e.preventDefault();
        setInput(e.target.value);
      }} value={input} type="text" placeholder='Describe what you want to generate..' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color ' />
      <button type='submit' disabled={loading} className={` bg-zinc-900 px-10 sm:px-16 py-3 rounded-full text-white`}>Generate</button>
    </div>
    }

    {
      isImageLoaded &&

    <div className='flex gap-2 flex-wrap justify-center text-white text-sm rounded-full p-0.5 mt-10 '>
      <p onClick={()=>{
        setIsImageLoaded(false);
      }} className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
      <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
    </div>
    }
    </motion.form>
  );
}

export default Result;
