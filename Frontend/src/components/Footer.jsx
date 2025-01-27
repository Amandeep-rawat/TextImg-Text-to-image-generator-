import { assets } from '@/assets/assets';
import { Section } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <section className='flex items-center justify-between gap-4 py-3 mt-20'>
        <img src={assets.logo} alt="assetlogo" width={40} />
        <p className='flex-1 pl-4 border-l border-gray-400 text-sm text-gray-500 max-sm:hidden'>Copyright @RwtPro | All right reserved.</p>
        <div className='flex items-center gap-2.5'>
            <img src={assets.facebook_icon} alt="fbicon" width={35} />
            <img src={assets.instagram_icon} alt="fbicon" width={35} />
            <img src={assets.twitter_icon} alt="fbicon" width={35} />
        </div>

    </section>
  )  
}

export default Footer;
