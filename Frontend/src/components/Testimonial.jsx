import { assets, testimonialsData } from '@/assets/assets';
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import Autoplay from "embla-carousel-autoplay"

export function Example() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      // ...
    </Carousel>
  )
}


const Testimonial = () => {
  return (
 <motion.section 
 
 initial={{opacity:0,y:100}}
 transition={{duration:1}}
 whileInView={{opacity:1,y:0}}
 viewport={{once:true}}
 
 className='flex flex-col items-center justify-center my-20 py-12 '>
    <h1 className='text-3xl bg-gradient-to-r text-transparent from-[#b73076] to-[#342bb0] bg-clip-text sm:text-4xl font-semibold  mb-2 '>
    Customer testimonials
    </h1>
    <p className='text-gray-500 mb-8'>
    What our customers say about us ?
    </p>
    <Carousel className="overflow-x-hidden w-full"  plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}>
  <CarouselContent className="">
  {
    testimonialsData.map((testimonial,index)=>{
        return(
           
          <CarouselItem className="sm:basis-1/2 lg:basis-1/3 2xl:basis-1/4  " key={index} >
            <div className='testimonialCards bg-gradient-to-b from-[#662783] to-[#0c61bc] p-1 rounded-lg shadow-md border w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all  ' >
                <div className='flex flex-col py-12 bg-white/95 items-center px-2'>
              {/* { testimonial.member ===true &&  <Badge variant="destructive">Creator of Site</Badge>} */}

                    <img src={testimonial.image} alt="testiimage" className='rounded-full h-14 bg-black   object-cover object-top w-14' />
                    <h2 className='text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#d33e8b] to-[#4c43d0] font-semibold mt-3'>{testimonial.name}</h2>
                    <p className='text-gray-500 mb-4'>{testimonial.role}</p>

                    <div className='flex mb-4'>
                        {
                            Array(testimonial.stars).fill().map((item,index)=>(
                                    <img src={assets.rating_star} key={index} alt="" />
                            ))
                        }
                    </div>
                    <p className='text-center text-sm text-gray-600 '>{testimonial.text}</p>
                </div>
            </div>

          </CarouselItem>
        )
    })
}
  
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
  
   




 </motion.section> 
 );
}

export default Testimonial;
