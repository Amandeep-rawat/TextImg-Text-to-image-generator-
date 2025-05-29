import React, { useContext, useState } from "react";
import { ImagePlus, Loader, Loader2, LucideImages } from "lucide-react";
import { AppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { assets } from "@/assets/assets";
import InfoSectionRemoveBg from "@/components/myUi/bg-removal/InfoSectionRemoveBg";
import HowToRemove from "@/components/myUi/bg-removal/HowToRemove";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BackgroundRemover = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [resultImage, setResultImage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate();
  const {token,loadCreditData}=useContext(AppContext)
// const navigate = useNavigat();
  const ref = React.useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    // console.log(file);
    
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveBackground = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please upload an image first!");
      return;
    }
  
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append("image_file", selectedFile);
  
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/image/removebg`, {
        method: "POST",
        headers: {
            "token":token
        },
        body: formData,
      });
  
      if(!res.ok){
        const errordata=await res.json();
        toast.error(errordata.message);
        loadCreditData();
        console.log(errordata)
        if(errordata.creditBalance<=0){
            navigate('/buycredit');
        }

    }
    else{

      
      
      const result = await res.json();
      const resultURL = result.resultImage;
      setPreviewImage('')
      setResultImage(resultURL);
      setLoading(false);
      toast.success("Background removed successfully!");
      loadCreditData();
    }

    } catch (error) {
      console.error("Error removing background:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className=" min-h-screen max-w-[1600px] mx-auto  ">
      
<div className="flex my-10 w-full justify-around max-md:flex-col  border-b-2  ">

      <motion.div initial={{ opacity: 0, x: -500 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5 }}  className="left1 flex flex-col max-md:text-center max-md:items-center  justify-center gap-3">
        <div>
          <h1 className="text-5xl max-lg:text-3xl 2xl:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#b73076] to-[#342bb0] font-bold 2xl:max-w-3xl max-w-lg">Remove Image Background in Seconds !</h1>
          <p className="text-2xl 2xl:text-3xl text-gray-600">Sign up and get 5 free credits !! </p>
        </div>
        <div>
          <video className="max-w-2xl max-md:w-[80%] max-md:mx-auto max-xl:w-[400px]  border border-gray-300 object-cover " src="/bg-removal-video.mp4" autoPlay loop muted></video>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 500 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5 }} className="right1 flex flex-col gap-y-3 ">
        <div className="flex relative max-md:mt-3 transition-all duration-300 flex-col items-center justify-center p-1 bg-gradient-to-t from-[#b73076] to-[#342bb0] rounded-xl shadow-2xl">
          <div className={` ${loading ? "flex" : "hidden"} flex-col bg-black/85 items-center rounded-md justify-center top-0 absolute w-full h-full`}>
            <Loader2 className="animate-spin text-white w-10 h-10 mx-auto" />
            <p className="text-transparent font-semibold bg-clip-text bg-gradient-to-b from-[#efefef] to-[#6a64bb]">Removing Background...</p>
          </div>

        <div className=" flex w-96 2xl:w-[650px] max-md:w-full max-lg:w-72 h-80 flex-col items-center justify-center gap-y-4 bg-slate-50 rounded-xl shadow-2xl">
          {
            !previewImage && !resultImage &&(

              <>
          <LucideImages size={70} className="text-gray-800"/>
          <button onClick={()=>{ref.current.click()}} className="px-10 gap-2 flex items-center py-4 bg-[#1d4ed8] text-white rounded-full shadow-lg hover:bg-blue-700" ><span><ImagePlus /></span>Upload Image</button>
          <h1 className="text-xl text-transparent bg-gradient-to-b from-[#b73076] to-[#342bb0] bg-clip-text font-base">Upload Image From Gallery</h1>
          </>
        )
          }
          {previewImage && (
          <div className="w-full h-full">
            
          <img src={previewImage} className="w-full rounded-lg h-full object-cover" alt="" />
          </div>
        )}
        {
          resultImage &&
          (
            <div className="w-full h-full">
            
          <img src={resultImage} className="w-full h-full rounded-lg object-cover" alt="" />
          </div>
          )
        }
        </div>
        
         </div>
         <div className="flex items-center justify-center gap-x-2">
          {
            resultImage && (
              <button onClick={()=>{
                setResultImage('');
                setPreviewImage('');
                ref.current.click();
              }} className="px-4 gap-2 flex items-center py-3 bg-[#1d4ed8] text-white rounded-full shadow-lg hover:bg-blue-700" ><span><ImagePlus size={20} /></span>Upload Another</button>
            )}
        { !resultImage && <button disabled={loading} onClick={handleRemoveBackground} className="px-4 gap-2 flex items-center py-3 bg-[#1d4ed8] text-white rounded-full shadow-lg hover:bg-blue-700">
         {loading ? <Loader2  className="animate-spin w-5 h-5 mx-auto"/>: "Remove Background"}    <img className='h-4' src={assets.star_group} alt="stargroup" />
         </button>}
         {
           resultImage &&(
            <a href={resultImage} className="px-4 cursor-pointer gap-2 flex items-center py-3 bg-[#1d4ed8] text-white rounded-full shadow-lg hover:bg-blue-700" download >Download now</a>
           )
         }
         </div>
        </motion.div>
      </div>

      <input
        type="file"
        ref={ref}
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 hidden p-2 border border-gray-300 rounded"
        />

      {/* <button
        onClick={handleRemoveBackground}
        className="px-6 py-2 bg-blue-600 text-white rounded shadow-lg hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? <Loader className="animate-spin w-5 h-5 mx-auto" /> : "Remove Background"}
      </button> */}
      <HowToRemove/>
      <InfoSectionRemoveBg/>
     
    </div>
  );
};

export default BackgroundRemover;
