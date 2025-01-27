import logo from './logo.png'
import logo_icon from './logo_icon.svg'
import facebook_icon from './facebook_icon.svg'
import instagram_icon from './instagram_icon.svg'
import twitter_icon from './twitter_icon.svg'
import star_icon from './star_icon.svg'
import rating_star from './rating_star.svg'
import sample_img_1 from './sample_img_1.png'
import sample_img_2 from './sample_img_2.png'
import rb from './rb.jpg'
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import saurabh from './saurabh.jpg'
import belwal from './belwal.jpg'
import giri from './giri.jpg'
import step_icon_1 from './step_icon_1.svg'
import step_icon_2 from './step_icon_2.svg'
import step_icon_3 from './step_icon_3.svg'
import email_icon from './email_icon.svg'
import lock_icon from './lock_icon.svg'
import cross_icon from './cross_icon.svg'
import star_group from './star_group.png'
import credit_star from './credit_star.svg'
import profile_icon from './profile_icon.png'
import aman_n_rwt from './aman_n_rwt.jpg'
import vrm from './vrm.jpg'

export const assets = {
    logo,
    logo_icon,
    facebook_icon,
    instagram_icon,
    twitter_icon,
    star_icon,
    rating_star,
    sample_img_1,
    sample_img_2,
    email_icon,
    lock_icon,
    cross_icon,
    star_group,
    credit_star,
    profile_icon,
    vrm
}

export const stepsData = [
    {
      title: 'Describe Your Vision',
      description: 'Type a phrase, sentence, or paragraph that describes the image you want to create.',
      icon: step_icon_1,
    },
    {
      title: 'Watch the Magic',
      description: 'Our AI-powered engine will transform your text into a high-quality, unique image in seconds.',
      icon: step_icon_2,
    },
    {
      title: 'Download & Share',
      description: 'Instantly download your creation or share it with the world directly from our platform.',
      icon: step_icon_3,
    },
  ];

  export const testimonialsData = [
    {
        image: rb,
        member:true,
        name: 'Rahul Bisht',
        role: 'BCA Student',
        stars: 4,
        text: `The background removal tool is fantastic, and I use it regularly for my projects. Looking forward to exploring more features!`,
    },
    {
        image: aman_n_rwt,
        name: 'Amandeep Rawat',
        member:true,
        role: 'Visitor of Site',
        stars: 5,
        text: `The text-to-image converter is incredibly accurate and creative. It has helped me visualize my ideas perfectly!`,
    },
    {
      image: saurabh,
      name: 'Saurabh Gupta',
      role: 'BCA Student',
      stars: 4,
      text: `This app is a game-changer for students. I especially enjoy experimenting with the text-to-image conversion feature.`,
  },
    {
        image: giri,
        name: 'Suraj Giri',
        member:true,
        role: 'BCA Student',
        stars: 4,
        text: `A great platform for students like me! The features are user-friendly and constantly improving.`,
    },
   
    {
        image: belwal,
        name: 'Rahul Belwal',
        member:true,
        role: 'BCA Student',
        stars: 4,
        text: `The app makes my daily design work much easier. The background removal and text-to-image tools are lifesavers!`,
    },
    {
        image: saurabh,
        name: 'Mansi Negi',
        role: 'Visitor of Site',
        stars: 5,
        text: `I love the intuitive interface. The text-to-image feature has been particularly helpful in my creative projects.`,
    },
   
];



export const plans = [
    {
      id: 'Basic',
      price: 1,
      credits: 10,
      points:["Spend 1 doller",'Get 10 credits instantly ','faster response as compare to free plans'],
      desc: 'Best for personal use.'
    },
    {
      id: 'Advanced',
      price: 2,
      credits: 20,
      points:["Spend 2 doller",'Get 20 credits instantly ','faster response as compare to free plans'],
      desc: 'Best for business use.'
    },
    {
      id: 'Business',
      price: 3,
      credits: 35,
      points:["Spend 3 doller",'Get 35 credits instantly ','faster response as compare to free plans'],
      desc: 'Best for enterprise use.'
    },
  ]